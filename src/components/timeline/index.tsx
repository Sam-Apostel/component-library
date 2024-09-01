import {
	createContext,
	Dispatch,
	PropsWithChildren,
	useContext,
	useReducer,
} from 'react';

export default function Timeline({
	dayProgress,
	columns = 12,
	rows = 3,
}: {
	dayProgress?: number;
	columns?: number;
	rows?: number;
}) {
	const items = useTimeLineItems();

	return (
		<div className="rounded-lg bg-[#f6f6f6] p-8">
			<div
				className="relative grid border border-[#d3d3d388]"
				style={{
					gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
				}}
			>
				{Array.from({ length: rows }).map((_, y) =>
					Array.from({ length: columns }).map((_, x) => (
						<div
							key={`${x}-${y}`}
							className="size-12 border border-[#d3d3d388]"
							style={{
								gridColumnStart: x + 1,
								gridRowStart: y + 1,
							}}
						/>
					)),
				)}
				{typeof dayProgress === 'number' && (
					<div
						className="absolute top-0 bottom-0 w-1 bg-[#668eed] transition-all duration-300"
						style={{ left: `${dayProgress}%`, translate: '-50% 0' }}
					>
						<svg
							style={{
								width: '1rem',
								aspectRatio: 1 / (Math.sqrt(3) / 2),
								translate: 'calc(-50% + 2px) -1rem',
							}}
							viewBox="0 0 100 100"
						>
							<polygon
								points="15 15, 85 15, 50 80"
								fill="#668eed"
								stroke="#668eed"
								strokeWidth="30"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				)}
				{items.map((item) => (
					<StatefullTimelineItem key={item} id={item} />
				))}
			</div>
		</div>
	);
}

function StatefullTimelineItem({ id }: { id: string }) {
	const { item } = useTimelineItem(id);
	if (!item) return null;

	return <TimelineItem {...item} children={item.label} />;
}

export function TimelineItem({
	children,
	row,
	column,
	span,
	color,
}: PropsWithChildren<{
	row: number;
	column: number;
	span: number;
	color: string;
}>) {
	// TODO: use context for updating row, column and span

	// TODO: add popup card for editing on click without dragging

	return (
		<div
			className="rounded-xs col-span-6 col-start-3 row-start-2 m-[3px] flex cursor-grab items-center border-2 border-white bg-[#e3e8ec88] px-1 shadow-inner shadow-lg backdrop-blur-sm active:cursor-grabbing"
			style={{
				gridColumn: `${column} / span ${span}`,
				gridRowStart: row,
				'--tw-shadow-color': `${color}88`,
				'--tw-shadow': 'var(--tw-shadow-colored)',
			}}
		>
			<div
				className="mr-2 h-7 w-1 cursor-ew-resize rounded-full"
				style={{
					backgroundColor: color,
				}}
			/>
			<span className="text-[#2d669f] select-none">{children}</span>
			<div
				className="ml-auto h-7 w-1 cursor-ew-resize rounded-full opacity-0 transition-opacity duration-300 hover:opacity-100"
				style={{
					backgroundColor: color,
				}}
			/>
		</div>
	);
}

type TimelineItem = {
	id: string;
	row: number;
	column: number;
	span: number;
	color: string;
	label: string;
};

type TimelineItemAction = {
	type: 'move';
	payload: {
		id: string;
		row: number;
		column: number;
		span: number;
	};
};

const TimelineContext = createContext<
	[Map<string, TimelineItem>, Dispatch<TimelineItemAction>]
>([new Map(), () => {}]);

function timelineItemReducer(
	state: Map<string, TimelineItem>,
	action: TimelineItemAction,
) {
	switch (action.type) {
		case 'move': {
			const item = state.get(action.payload.id);
			if (!item) return state;
			return state.set(action.payload.id, {
				...item,
				row: action.payload.row,
				column: action.payload.column,
				span: action.payload.span,
			});
		}
		default:
			return state;
	}
}

export function TimelineProvider({
	children,
	initialState,
}: PropsWithChildren<{ initialState: Array<TimelineItem> }>) {
	const [items, dispatch] = useReducer(timelineItemReducer, null, () => {
		return new Map(initialState.map((item) => [item.id, item]));
	});

	return (
		<TimelineContext.Provider value={[items, dispatch]}>
			{children}
		</TimelineContext.Provider>
	);
}

function useTimelineItem(id: string) {
	const [items, dispatch] = useContext(TimelineContext);
	const item = items.get(id);
	return { item, dispatch };
}

function useTimeLineItems() {
	const [items] = useContext(TimelineContext);
	return Array.from(items.keys());
}
