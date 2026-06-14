import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	CircleFadingArrowUpIcon,
	EyeIcon,
	FullscreenIcon,
	MaximizeIcon,
	MinusIcon,
	PlusIcon,
	TrashIcon,
} from 'lucide-react';
import {
	Dispatch,
	SetStateAction,
	use,
	useCallback,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import { Button } from './button.tsx';
import {
	CanvasProvider,
	cameraContext,
	MAX_ZOOM,
	MIN_ZOOM,
	type Node,
	NodeDefinition,
	nodesContext,
	selectedNodeContext,
	setSelectedNodeContext,
} from './contexts.tsx';
import {
	useCanvasGestures,
	useDragProps,
	usePanProps,
	useTouchDrag,
} from './drag-and-drop.ts';
import { latestDefinitions, NodesCatalog } from './nodes-catalog.tsx';

export default function CanvasUi() {
	return (
		<CanvasProvider>
			<CanvasLayout />
		</CanvasProvider>
	);
}

function CanvasLayout() {
	const { viewportRef, sidebarRef } = use(cameraContext);
	return (
		<div
			ref={viewportRef}
			className="w-full h-screen relative overflow-hidden"
		>
			<Canvas />
			<aside
				ref={sidebarRef}
				className="absolute right-2 inset-y-2 flex flex-col gap-2"
			>
				<div className="flex items-center gap-2">
					<Button variant="primary" className="flex-1">
						Save
					</Button>
					<Button variant="secondary" className="aspect-square px-0">
						<EyeIcon className="size-4" />
					</Button>
				</div>
				<NodesCatalog />
				<OperationParameters />
				<Minimap />
				<ZoomWidget />
			</aside>
		</div>
	);
}

function OperationParameters() {
	const selectedNodeId = use(selectedNodeContext);
	const [isUpgrading, setUpgrading] = useState(false);
	const [container] = useAutoAnimate();

	if (selectedNodeId === null) {
		// TODO: show instructions
		return (
			<div className="min-w-xs flex gap-2 border border-gray-400/30 bg-white rounded-sm p-2 items-center text-gray-500 flex-1"></div>
		);
	}

	const { nodes, setNodes } = use(nodesContext);
	const selectedNode = nodes?.find((node) => node.id === selectedNodeId);

	if (selectedNode === undefined) {
		use(setSelectedNodeContext)(null);
		return null;
	}

	const latestDefinition = latestDefinitions.get(selectedNode.definition.id);

	if (!latestDefinition) {
		// TODO: archived (replace with other node definition
		return (
			<div className="min-w-xs flex gap-2 border border-gray-400/30 bg-white rounded-sm p-2 items-center text-gray-500 flex-1">
				archived <Button variant="primary">Replace</Button>
			</div>
		);
	}

	return (
		<div
			className="flex gap-2 flex-1 w-xs justify-end"
			data-upgrading={isUpgrading}
			ref={container}
		>
			<div
				key={selectedNode.definition.version}
				className="shrink-0 w-xs flex flex-col gap-2 border border-gray-400/30 bg-white rounded-sm p-2 items-center text-gray-500 "
			>
				<h3 className="font-bold">
					Selected Node: [{selectedNode.definition.name}] v
					{selectedNode.definition.version}
				</h3>
				<div className="flex-1 flex flex-col gap-4 self-stretch px-2 py-4 ">
					{selectedNode.definition.parameters.map((parameter) => (
						<label
							key={parameter.id}
							className="flex flex-col gap-2 items-stretch"
						>
							<span>{parameter.name}</span>
							<input
								id={`${parameter.id}-${selectedNode.definition.version}`}
								type="text"
								value={
									selectedNode.parameters.find(
										({ id }) => id === parameter.id,
									)?.value ?? ''
								}
								onChange={(e) => {
									setNodes?.((nodes) =>
										nodes.map((node) => {
											if (node.id !== selectedNodeId)
												return node;
											return {
												...node,
												parameters: node.parameters.map(
													(p) => {
														if (
															p.id !==
															parameter.id
														)
															return p;
														return {
															...p,
															value: e.target
																.value,
														};
													},
												),
											};
										}),
									);
								}}
								className="border border-gray-400/30 bg-white rounded-sm px-2 py-1 text-sm text-gray-500"
							/>
						</label>
					))}
				</div>
				<div className="flex gap-2 items-center self-stretch mt-auto">
					<Button
						variant="secondary"
						className="flex-1"
						disabled={isUpgrading}
						onClick={() => {
							setNodes?.((nodes) =>
								nodes.filter(
									(node) => node.id !== selectedNodeId,
								),
							);
						}}
					>
						<TrashIcon className="size-4" />
						Delete
					</Button>
					{selectedNode.definition.version <
						latestDefinition.version && (
						<Button
							variant="primary"
							className="flex-1"
							onClick={() => setUpgrading(true)}
							disabled={isUpgrading}
						>
							<CircleFadingArrowUpIcon className="size-4" />
							Upgrade
						</Button>
					)}
				</div>
			</div>

			{isUpgrading && (
				<UpgradeSideBar
					setUpgrading={setUpgrading}
					definition={latestDefinition}
					currentParameters={selectedNode.parameters}
					selectedNodeId={selectedNodeId}
					setNodes={setNodes}
				/>
			)}
		</div>
	);
}

function UpgradeSideBar({
	setUpgrading,
	definition,
	currentParameters,
	selectedNodeId,
	setNodes,
}: {
	setUpgrading: Dispatch<SetStateAction<boolean>>;
	definition: NodeDefinition;
	currentParameters: Array<{ id: string; value: string }>;
	selectedNodeId: string;
	setNodes?: Dispatch<SetStateAction<Array<Node>>>;
}) {
	const [parameters, setParameters] = useState(
		definition.parameters.map((parameter) => ({
			name: parameter.name,
			id: parameter.id,
			value:
				currentParameters.find((p) => p.id === parameter.id)?.value ??
				'',
		})),
	);

	return (
		<div
			key={definition.version}
			className="shrink-0 w-xs flex flex-col gap-2 border border-gray-400/30 bg-white rounded-sm p-2 items-center text-gray-500"
		>
			<h3 className="font-bold">
				Upgraded Node: [{definition.name}] v{definition.version}
			</h3>
			<div className="flex-1 flex flex-col gap-4 self-stretch px-2 py-4">
				{parameters.map((parameter) => (
					<label
						key={parameter.id}
						className="flex flex-col gap-2 items-stretch"
					>
						<span>{parameter.name}</span>
						<input
							id={`${parameter.id}-${definition.version}`}
							type="text"
							value={parameter.value}
							onChange={(e) =>
								setParameters((parameters) =>
									parameters.map((p) =>
										p.id === parameter.id
											? { ...p, value: e.target.value }
											: p,
									),
								)
							}
							className="border border-gray-400/30 bg-white rounded-sm px-2 py-1 text-sm text-gray-500"
						/>
					</label>
				))}
			</div>
			<div className="flex gap-2 items-center self-stretch mt-auto">
				<Button
					variant="secondary"
					className="flex-1"
					onClick={() => setUpgrading(false)}
				>
					<ArrowLeftIcon className="size-4" />
					Cancel
				</Button>
				<Button
					variant="primary"
					className="flex-1"
					onClick={() => {
						setUpgrading(false);
						setNodes?.((nodes) =>
							nodes.map((node) => {
								if (node.id !== selectedNodeId) return node;
								return {
									...node,
									definition,
									parameters,
								};
							}),
						);
					}}
				>
					Upgrade
					<ArrowRightIcon className="size-4" />
				</Button>
			</div>
		</div>
	);
}

// Half-size of the dotted grid plane, in canvas units. Large enough to read as
// infinite for any realistic pan/zoom.
const GRID_EXTENT = 50000;

function Canvas() {
	const { camera, zoomAtPoint, panBy } = use(cameraContext);
	const setSelectedNode = use(setSelectedNodeContext);
	const { nodes } = use(nodesContext);
	const canvasRef = useRef<HTMLDivElement>(null);

	const panProps = usePanProps(panBy);

	// Mouse wheel, trackpad pinch/swipe and touch gestures.
	useCanvasGestures(canvasRef, zoomAtPoint, panBy);

	return (
		<div
			ref={canvasRef}
			className="absolute inset-0 cursor-grab active:cursor-grabbing bg-white"
			{...panProps}
			onClick={() => setSelectedNode(null)}
		>
			<div
				className="absolute top-0 left-0 origin-top-left"
				style={{
					transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`,
					willChange: 'transform',
				}}
			>
				{/*
				 * The dotted grid lives inside the node transform as a large
				 * plane tiled in canvas units, so it scales and slides exactly
				 * like the nodes (no separate transform math to drift). The
				 * shared layer is composited, so panning slides a cached bitmap.
				 */}
				<div
					className="absolute pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
					style={{ inset: `${-GRID_EXTENT}px` }}
				/>
				{nodes?.map((node) => (
					<Node key={node.id} {...node} />
				))}
			</div>
		</div>
	);
}

function Node({ id, definition, position }: Node) {
	const { camera } = use(cameraContext);
	const selectedNodeId = use(selectedNodeContext);
	const setSelectedNode = use(setSelectedNodeContext);
	const { setNodes } = use(nodesContext);
	const nodeRef = useRef<HTMLDivElement>(null);
	const setPosition = useCallback<Dispatch<SetStateAction<[number, number]>>>(
		(positionUpdater) => {
			setNodes?.((nodes) =>
				nodes.map((node) => {
					if (node.id !== id) return node;
					return {
						...node,
						position:
							typeof positionUpdater === 'function'
								? positionUpdater(node.position)
								: positionUpdater,
					};
				}),
			);
		},
		[setNodes, id],
	);

	const dragProps = useDragProps(setPosition, camera.zoom);
	// On touch, only drag a node once it is selected; otherwise the touch
	// falls through to the canvas and pans.
	useTouchDrag(nodeRef, selectedNodeId === id, setPosition, camera.zoom);

	return (
		<div
			ref={nodeRef}
			data-node-id={id}
			className="active:z-100 absolute flex items-center px-4 text-gray-500 border gap-6 h-12 border-gray-400/30 bg-white rounded-sm justify-between select-none"
			style={{
				left: position[0],
				top: position[1],
			}}
			{...dragProps}
			onClick={(e) => {
				e.stopPropagation();
				setSelectedNode(id.toString());
			}}
		>
			<span>{definition.name}</span>
			<span className="text-xs">v{definition.version}</span>
		</div>
	);
}

// Each step multiplies the zoom by this factor so the buttons feel
// proportional at every zoom level.
const ZOOM_STEP = 1.2;

function ZoomWidget() {
	const { camera, zoomBySelection, setZoom, resetView, zoomToFit } =
		use(cameraContext);
	const percent = Math.round(camera.zoom * 100);

	return (
		<div className="flex gap-2 items-center">
			<div className="flex gap-2 items-center">
				<button
					onClick={() => zoomBySelection(1 / ZOOM_STEP)}
					disabled={camera.zoom <= MIN_ZOOM}
					className="disabled:opacity-50 enabled:cursor-pointer enabled:hover:bg-gray-100 enabled:active:hover:bg-gray-200/80 enabled:active:scale-98 aspect-square justify-center flex gap-2 border border-gray-400/30 bg-white rounded-sm h-10 px-2 items-center text-sm text-gray-500"
				>
					<MinusIcon className="size-4" />
				</button>
				<div className="flex gap-2 border border-gray-400/30 bg-white rounded-sm h-10 pl-2 pr-3 items-center text-sm text-gray-500">
					<input
						className="w-8 text-right"
						value={percent}
						onChange={(e) => setZoom(+e.target.value / 100)}
					/>
					%
				</div>
				<button
					onClick={() => zoomBySelection(ZOOM_STEP)}
					disabled={camera.zoom >= MAX_ZOOM}
					className="disabled:opacity-50 enabled:cursor-pointer enabled:hover:bg-gray-100 enabled:active:hover:bg-gray-200/80 enabled:active:scale-98 aspect-square justify-center flex gap-2 border border-gray-400/30 bg-white rounded-sm h-10 px-2 items-center text-sm text-gray-500"
				>
					<PlusIcon className="size-4" />
				</button>
			</div>

			<div className="flex border border-gray-400/30 bg-white rounded-sm  items-center overflow-clip">
				<button
					onClick={resetView}
					title="Reset zoom"
					aria-checked={
						percent === 100 && camera.x === 0 && camera.y === 0
							? true
							: undefined
					}
					className="bg-white aria-checked:bg-blue-800/10 enabled:cursor-pointer enabled:hover:bg-gray-100 enabled:active:hover:bg-gray-200/80 enabled:active:scale-98 aspect-square justify-center flex gap-2 h-10 px-2 items-center text-sm text-gray-500"
				>
					<MaximizeIcon className="size-4" />
				</button>
				<button
					onClick={zoomToFit}
					title="Zoom to fit"
					className="bg-white enabled:cursor-pointer enabled:hover:bg-gray-100 enabled:active:hover:bg-gray-200/80 enabled:active:scale-98 aspect-square justify-center flex gap-2 h-10 px-2 items-center text-sm text-gray-500"
				>
					<FullscreenIcon className="size-4" />
				</button>
			</div>
		</div>
	);
}

function Minimap() {
	const { camera, viewportRef } = use(cameraContext);
	const { nodes } = use(nodesContext);

	// Re-measure after mount (refs are attached on commit) and on resize; pan
	// and zoom already re-render this via the camera context.
	const [, refresh] = useReducer((n: number) => n + 1, 0);
	useEffect(() => {
		refresh();
		window.addEventListener('resize', refresh);
		return () => window.removeEventListener('resize', refresh);
	}, []);

	const container = viewportRef.current;

	// Node rectangles in canvas units (measured size, falling back to a default).
	const nodeRects = (nodes ?? []).map((node) => {
		const rect = container
			?.querySelector(`[data-node-id="${node.id}"]`)
			?.getBoundingClientRect();
		return {
			id: node.id,
			x: node.position[0],
			y: node.position[1],
			width: rect ? rect.width / camera.zoom : 176,
			height: rect ? rect.height / camera.zoom : 48,
		};
	});

	// The visible viewport, also in canvas units.
	const containerRect = container?.getBoundingClientRect();
	const viewport = containerRect
		? {
				x: -camera.x / camera.zoom,
				y: -camera.y / camera.zoom,
				width: containerRect.width / camera.zoom,
				height: containerRect.height / camera.zoom,
			}
		: null;

	// World bounding box (nodes + viewport) with a little padding.
	const boxes = viewport ? [...nodeRects, viewport] : nodeRects;
	const minX = boxes.length ? Math.min(...boxes.map((b) => b.x)) : 0;
	const minY = boxes.length ? Math.min(...boxes.map((b) => b.y)) : 0;
	const maxX = boxes.length
		? Math.max(...boxes.map((b) => b.x + b.width))
		: 100;
	const maxY = boxes.length
		? Math.max(...boxes.map((b) => b.y + b.height))
		: 100;
	const padding = Math.max(maxX - minX, maxY - minY) * 0.08 + 24;
	const viewBox = `${minX - padding} ${minY - padding} ${
		maxX - minX + padding * 2
	} ${maxY - minY + padding * 2}`;

	return (
		<div className="h-32 border border-gray-400/30 bg-white rounded-sm overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
			<svg
				className="w-full h-full"
				viewBox={viewBox}
				preserveAspectRatio="xMidYMid meet"
				aria-hidden="true"
			>
				{nodeRects.map((rect) => (
					<rect
						key={rect.id}
						x={rect.x}
						y={rect.y}
						width={rect.width}
						height={rect.height}
						rx={6}
						className="fill-gray-400/70"
					/>
				))}
				{viewport && (
					<rect
						x={viewport.x}
						y={viewport.y}
						width={viewport.width}
						height={viewport.height}
						className="fill-gray-500/10 stroke-gray-500/70"
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
					/>
				)}
			</svg>
		</div>
	);
}
