import {
	createContext,
	Dispatch,
	PropsWithChildren,
	RefObject,
	SetStateAction,
	useCallback,
	useEffect,
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

// Easing for the animated toolbar zoom transitions.
const easeInOutCubic = (t: number) =>
	t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

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

	// Keep the latest selection and camera available to the (stable) camera
	// callbacks without making them depend on those values.
	const selectedNodeRef = useRef(selectedNode);
	selectedNodeRef.current = selectedNode;
	const cameraRef = useRef(camera);
	cameraRef.current = camera;

	// Handle of the running toolbar animation, if any.
	const animationRef = useRef<number | null>(null);
	const cancelAnimation = useCallback(() => {
		if (animationRef.current !== null) {
			cancelAnimationFrame(animationRef.current);
			animationRef.current = null;
		}
	}, []);
	// Stop any animation when the provider unmounts.
	useEffect(() => cancelAnimation, [cancelAnimation]);

	// Smoothly move the camera to `target` while holding the screen point
	// `focus` fixed along the way (so a button zoom keeps its pivot put). Zoom
	// is interpolated geometrically so it feels even at any scale; the focus
	// point is interpolated in canvas space so pan and zoom blend together.
	const animateCamera = useCallback(
		(target: Camera, focus: Point) => {
			cancelAnimation();
			const start = cameraRef.current;

			const reduceMotion = window.matchMedia?.(
				'(prefers-reduced-motion: reduce)',
			).matches;
			if (reduceMotion) {
				setCamera(target);
				return;
			}

			// The focus point in canvas coords, under the start and end cameras.
			const startFocusX = (focus.x - start.x) / start.zoom;
			const startFocusY = (focus.y - start.y) / start.zoom;
			const endFocusX = (focus.x - target.x) / target.zoom;
			const endFocusY = (focus.y - target.y) / target.zoom;
			const zoomRatio = target.zoom / start.zoom;

			// Shorter for small hops, longer for big ones.
			const duration = clamp(
				180 + Math.abs(Math.log(zoomRatio)) * 140,
				180,
				420,
			);

			const t0 = performance.now();
			const tick = (now: number) => {
				const t = Math.min(1, (now - t0) / duration);
				const e = easeInOutCubic(t);
				const zoom = start.zoom * zoomRatio ** e;
				const focusX = startFocusX + (endFocusX - startFocusX) * e;
				const focusY = startFocusY + (endFocusY - startFocusY) * e;
				setCamera({
					zoom,
					x: focus.x - focusX * zoom,
					y: focus.y - focusY * zoom,
				});
				animationRef.current =
					t < 1 ? requestAnimationFrame(tick) : null;
			};
			animationRef.current = requestAnimationFrame(tick);
		},
		[cancelAnimation],
	);

	const zoomAtPoint = useCallback(
		(factor: number, anchor: Point) => {
			// Direct gesture input takes over from any running animation.
			cancelAnimation();
			setCamera((cam) => {
				const zoom = clamp(cam.zoom * factor, MIN_ZOOM, MAX_ZOOM);
				// Clamped zoom keeps the anchor fixed even at the limits.
				const scale = zoom / cam.zoom;
				return {
					zoom,
					x: anchor.x - (anchor.x - cam.x) * scale,
					y: anchor.y - (anchor.y - cam.y) * scale,
				};
			});
		},
		[cancelAnimation],
	);

	// Centre of the visible viewport, excluding the sidebar on the right.
	const getVisibleCenter = useCallback((): Point => {
		const container = viewportRef.current;
		if (!container) return { x: 0, y: 0 };
		const containerRect = container.getBoundingClientRect();
		const sidebar = sidebarRef.current;
		const visibleRight = sidebar
			? sidebar.getBoundingClientRect().left - containerRect.left
			: containerRect.width;
		return { x: visibleRight / 2, y: containerRect.height / 2 };
	}, []);

	// The point (in viewport pixels) the zoom buttons pivot around: the selected
	// node's centre, or the centre of the visible viewport.
	const getAnchor = useCallback((): Point => {
		const container = viewportRef.current;
		const selectedId = selectedNodeRef.current;
		if (container && selectedId !== null) {
			const node = container.querySelector(
				`[data-node-id="${selectedId}"]`,
			);
			if (node) {
				const containerRect = container.getBoundingClientRect();
				const rect = node.getBoundingClientRect();
				return {
					x: rect.left + rect.width / 2 - containerRect.left,
					y: rect.top + rect.height / 2 - containerRect.top,
				};
			}
		}
		return getVisibleCenter();
	}, [getVisibleCenter]);

	// Multiply the zoom by `factor` around the current pivot, animated.
	const zoomBySelection = useCallback(
		(factor: number) => {
			const anchor = getAnchor();
			const start = cameraRef.current;
			const zoom = clamp(start.zoom * factor, MIN_ZOOM, MAX_ZOOM);
			const scale = zoom / start.zoom;
			animateCamera(
				{
					zoom,
					x: anchor.x - (anchor.x - start.x) * scale,
					y: anchor.y - (anchor.y - start.y) * scale,
				},
				anchor,
			);
		},
		[getAnchor, animateCamera],
	);

	// Jump to an absolute zoom around the current pivot. Instant: this backs the
	// % text field, where animating every keystroke would be jarring.
	const setZoom = useCallback(
		(zoom: number) => {
			if (!Number.isFinite(zoom)) return;
			cancelAnimation();
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
		[getAnchor, cancelAnimation],
	);

	const panBy = useCallback(
		(dx: number, dy: number) => {
			cancelAnimation();
			setCamera((cam) => ({ ...cam, x: cam.x + dx, y: cam.y + dy }));
		},
		[cancelAnimation],
	);

	const resetView = useCallback(() => {
		animateCamera({ x: 0, y: 0, zoom: 1 }, getVisibleCenter());
	}, [animateCamera, getVisibleCenter]);

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

		// Convert the screen-space box into canvas coords with the live camera.
		const start = cameraRef.current;
		const contentWidth = (maxX - minX) / start.zoom;
		const contentHeight = (maxY - minY) / start.zoom;
		if (contentWidth <= 0 || contentHeight <= 0) return;
		const contentCenterX = (minX - start.x) / start.zoom + contentWidth / 2;
		const contentCenterY =
			(minY - start.y) / start.zoom + contentHeight / 2;

		const zoom = clamp(
			Math.min(
				availableWidth / contentWidth,
				availableHeight / contentHeight,
			),
			MIN_ZOOM,
			MAX_ZOOM,
		);
		animateCamera(
			{
				zoom,
				x: visibleRight / 2 - contentCenterX * zoom,
				y: containerRect.height / 2 - contentCenterY * zoom,
			},
			getVisibleCenter(),
		);
	}, [animateCamera, getVisibleCenter]);

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
