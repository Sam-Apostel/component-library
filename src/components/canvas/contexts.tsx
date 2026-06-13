import {
	createContext,
	Dispatch,
	PropsWithChildren,
	RefObject,
	SetStateAction,
	useCallback,
	useMemo,
	useRef,
	useState,
} from 'react';

export type Parameter = {
	id: string;
	name: string;
};

export type NodeDefinition = {
	id: string;
	name: string;
	parameters: Array<Parameter>;
	version: number;
};

export type Node = {
	id: string;
	definition: NodeDefinition;
	position: [number, number];
	parameters: Array<{ id: string; value: string }>;
};

// Zoom is stored as a scale factor where 1 === 100%.
export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 4;

const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

export type Camera = {
	// Pan offset in viewport pixels.
	x: number;
	y: number;
	// Scale factor (1 === 100%).
	zoom: number;
};

type Point = { x: number; y: number };

type CameraControls = {
	camera: Camera;
	// Multiply the zoom by `factor`, keeping `anchor` (a point in viewport
	// pixels, relative to the canvas top-left) visually fixed.
	zoomAtPoint: (factor: number, anchor: Point) => void;
	// Zoom relative to the current selection, falling back to the centre of the
	// visible viewport (excluding the sidebar) when nothing is selected.
	zoomBySelection: (factor: number) => void;
	// Jump to an absolute zoom level, anchored like `zoomBySelection`.
	setZoom: (zoom: number) => void;
	// Pan by a delta expressed in viewport pixels.
	panBy: (dx: number, dy: number) => void;
	// Reset zoom to 100% and panning back to the origin.
	resetView: () => void;
	// Fit all nodes within the visible viewport (excluding the sidebar),
	// setting both zoom and panning.
	zoomToFit: () => void;
	viewportRef: RefObject<HTMLDivElement | null>;
	sidebarRef: RefObject<HTMLDivElement | null>;
};

// biome-ignore lint/suspicious/noEmptyBlockStatements: noop default value
const noop = () => {};

export const cameraContext = createContext<CameraControls>({
	camera: { x: 0, y: 0, zoom: 1 },
	zoomAtPoint: noop,
	zoomBySelection: noop,
	setZoom: noop,
	panBy: noop,
	resetView: noop,
	zoomToFit: noop,
	viewportRef: { current: null },
	sidebarRef: { current: null },
});

export const selectedNodeContext = createContext<string | null>(null);
export const setSelectedNodeContext =
	createContext<Dispatch<SetStateAction<string | null>>>(noop);

export const nodesContext = createContext<{
	nodes?: Array<Node>;
	setNodes?: Dispatch<SetStateAction<Array<Node>>>;
}>({});

export function CanvasProvider({ children }: PropsWithChildren) {
	const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });
	const [selectedNode, setSelectedNode] = useState<string | null>(null);
	const [nodes, setNodes] = useState<Array<Node>>([
		{
			id: '1',
			definition: {
				id: '1',
				name: 'Node 1',
				parameters: [
					{
						id: 'b',
						name: 'Parameter B',
					},
					{
						id: 'a',
						name: 'Prameter A',
					},
				],
				version: 1,
			},
			position: [100, 100],
			parameters: [
				{ id: 'b', value: 'value b' },
				{ id: 'a', value: 'value a' },
			],
		},
	]);

	const viewportRef = useRef<HTMLDivElement>(null);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Keep the latest selection available to the (stable) camera callbacks
	// without making them depend on it.
	const selectedNodeRef = useRef(selectedNode);
	selectedNodeRef.current = selectedNode;

	const zoomAtPoint = useCallback((factor: number, anchor: Point) => {
		setCamera((cam) => {
			const zoom = clamp(cam.zoom * factor, MIN_ZOOM, MAX_ZOOM);
			// Use the clamped zoom so the anchor stays fixed even at the limits.
			const scale = zoom / cam.zoom;
			return {
				zoom,
				x: anchor.x - (anchor.x - cam.x) * scale,
				y: anchor.y - (anchor.y - cam.y) * scale,
			};
		});
	}, []);

	// The point (in viewport pixels) the zoom buttons should pivot around.
	const getAnchor = useCallback((): Point => {
		const container = viewportRef.current;
		if (!container) return { x: 0, y: 0 };
		const containerRect = container.getBoundingClientRect();

		const selectedId = selectedNodeRef.current;
		if (selectedId !== null) {
			const node = container.querySelector(
				`[data-node-id="${selectedId}"]`,
			);
			if (node) {
				const rect = node.getBoundingClientRect();
				return {
					x: rect.left + rect.width / 2 - containerRect.left,
					y: rect.top + rect.height / 2 - containerRect.top,
				};
			}
		}

		// Centre of the visible viewport, excluding the sidebar on the right.
		const sidebar = sidebarRef.current;
		const visibleRight = sidebar
			? sidebar.getBoundingClientRect().left - containerRect.left
			: containerRect.width;
		return { x: visibleRight / 2, y: containerRect.height / 2 };
	}, []);

	const zoomBySelection = useCallback(
		(factor: number) => zoomAtPoint(factor, getAnchor()),
		[zoomAtPoint, getAnchor],
	);

	const setZoom = useCallback(
		(zoom: number) => {
			if (!Number.isFinite(zoom)) return;
			const anchor = getAnchor();
			setCamera((cam) => {
				const next = clamp(zoom, MIN_ZOOM, MAX_ZOOM);
				const scale = next / cam.zoom;
				return {
					zoom: next,
					x: anchor.x - (anchor.x - cam.x) * scale,
					y: anchor.y - (anchor.y - cam.y) * scale,
				};
			});
		},
		[getAnchor],
	);

	const panBy = useCallback((dx: number, dy: number) => {
		setCamera((cam) => ({ ...cam, x: cam.x + dx, y: cam.y + dy }));
	}, []);

	const resetView = useCallback(() => {
		setCamera({ x: 0, y: 0, zoom: 1 });
	}, []);

	const zoomToFit = useCallback(() => {
		const container = viewportRef.current;
		if (!container) return;
		const nodeElements = container.querySelectorAll('[data-node-id]');
		if (nodeElements.length === 0) return;
		const containerRect = container.getBoundingClientRect();

		// Bounding box of all nodes, in viewport pixels relative to the canvas.
		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;
		for (const node of nodeElements) {
			const rect = node.getBoundingClientRect();
			minX = Math.min(minX, rect.left - containerRect.left);
			minY = Math.min(minY, rect.top - containerRect.top);
			maxX = Math.max(maxX, rect.right - containerRect.left);
			maxY = Math.max(maxY, rect.bottom - containerRect.top);
		}

		// Visible area: the viewport minus the sidebar, with some breathing room.
		const sidebar = sidebarRef.current;
		const visibleRight = sidebar
			? sidebar.getBoundingClientRect().left - containerRect.left
			: containerRect.width;
		const padding = 64;
		const availableWidth = visibleRight - padding * 2;
		const availableHeight = containerRect.height - padding * 2;

		setCamera((cam) => {
			// Convert the screen-space box into canvas (content) coordinates.
			const contentMinX = (minX - cam.x) / cam.zoom;
			const contentMinY = (minY - cam.y) / cam.zoom;
			const contentWidth = (maxX - minX) / cam.zoom;
			const contentHeight = (maxY - minY) / cam.zoom;
			if (contentWidth <= 0 || contentHeight <= 0) return cam;

			const zoom = clamp(
				Math.min(
					availableWidth / contentWidth,
					availableHeight / contentHeight,
				),
				MIN_ZOOM,
				MAX_ZOOM,
			);

			// Centre the content within the visible area.
			const contentCenterX = contentMinX + contentWidth / 2;
			const contentCenterY = contentMinY + contentHeight / 2;
			return {
				zoom,
				x: visibleRight / 2 - contentCenterX * zoom,
				y: containerRect.height / 2 - contentCenterY * zoom,
			};
		});
	}, []);

	const camControls = useMemo<CameraControls>(
		() => ({
			camera,
			zoomAtPoint,
			zoomBySelection,
			setZoom,
			panBy,
			resetView,
			zoomToFit,
			viewportRef,
			sidebarRef,
		}),
		[
			camera,
			zoomAtPoint,
			zoomBySelection,
			setZoom,
			panBy,
			resetView,
			zoomToFit,
		],
	);

	return (
		<nodesContext.Provider value={{ nodes, setNodes }}>
			<cameraContext.Provider value={camControls}>
				<selectedNodeContext.Provider value={selectedNode}>
					<setSelectedNodeContext.Provider value={setSelectedNode}>
						{children}
					</setSelectedNodeContext.Provider>
				</selectedNodeContext.Provider>
			</cameraContext.Provider>
		</nodesContext.Provider>
	);
}
