import {
	ComponentProps,
	PropsWithChildren,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { cn } from '../../util.ts';
import { items } from './mock-data.ts';
import {
	ActivityIcon,
	CheckIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	CrossIcon,
	DeleteIcon,
	DuplicateIcon,
	EditStatusIcon,
	ExportIcon,
	ProgressIcon,
} from '../../icons';

const dateFormatter = new Intl.DateTimeFormat('en-UK', {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
});
const currencyFormatter = new Intl.NumberFormat('en-US', { currency: 'USD' });

function StatusBadge({
	status,
	progress,
}: {
	status: string;
	progress?: number;
}) {
	switch (status) {
		case 'Pending':
			return (
				<Badge className="border-gray-600/60 pl-1.5 text-gray-400">
					<ProgressIcon className="size-4" progress={progress} />
					In Progress
				</Badge>
			);
		case 'In Progress':
			return (
				<Badge className="border-sky-600/60 pl-1.5 text-sky-400">
					<ActivityIcon className="size-4" />
					Active
				</Badge>
			);
		case 'Cancelled':
			return (
				<Badge className="border-red-600/60 pl-1.5 text-red-400">
					<CrossIcon className="size-4" />
					Cancelled
				</Badge>
			);
		case 'Completed':
			return (
				<Badge className="border-emerald-600/60 pl-1.5 text-emerald-400">
					<CheckIcon className="size-4" />
					Complete
				</Badge>
			);
	}
}

function Badge({ className, ...props }: ComponentProps<'span'>) {
	return (
		<span
			className={cn(
				'rounded-xs inline-flex items-center gap-2 self-start border py-1 px-2.5 text-xs',
				className,
			)}
			{...props}
		/>
	);
}

function Checkbox({
	className,
	indeterminate,
	...props
}: Omit<ComponentProps<'input'>, 'type'> & { indeterminate?: boolean }) {
	const ref = useRef<HTMLInputElement>(null);

	useLayoutEffect(() => {
		if (!ref.current) return;
		ref.current.indeterminate = Boolean(indeterminate);
	}, [indeterminate]);

	return (
		<input
			ref={ref}
			type="checkbox"
			className={cn(
				'rounded-xs size-4 appearance-none border border-gray-700 bg-gray-700/30 checked:bg-blue-500 indeterminate:bg-emerald-500',
				className,
			)}
			{...props}
		/>
	);
}

export default function TableActionBar() {
	const [page, setPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [selected, setSelected] = useState<Array<string>>([]);

	const pageItems = items.slice(
		page * itemsPerPage,
		(page + 1) * itemsPerPage,
	);

	const allSelected = selected.length === items.length;

	return (
		<div className="flex flex-col">
			<div className="grid w-[70rem] grid-cols-[auto_1fr_repeat(7,auto)] tabular-nums text-white/80">
				<div className="col-start-1 -col-end-1 grid grid-cols-[subgrid] gap-x-6 border-b border-black/30 font-semibold text-gray-400/60">
					<label className="flex cursor-pointer items-center justify-center">
						<Checkbox
							checked={allSelected}
							indeterminate={selected.length > 0}
							onClick={() => {
								if (allSelected) return setSelected([]);
								if (selected.length > 0)
									return setSelected(
										items.map((item) => item.id),
									);

								setSelected(pageItems.map((item) => item.id));
							}}
						/>
					</label>
					<div className="col-start-2 -col-end-1 grid grid-cols-[subgrid] gap-x-16 py-2">
						<div>Customer</div>
						<div>Status</div>
						<div>Products</div>
						<div>Total</div>
						<div>Start Date</div>
						<div>End date</div>
					</div>
				</div>
				<div className="col-start-1 -col-end-1 grid grid-cols-[subgrid]">
					{pageItems.map((item) => (
						<div
							key={item.id}
							className="col-start-1 -col-end-1 grid grid-cols-[subgrid] gap-x-6"
						>
							<label className="flex cursor-pointer items-center justify-center">
								<Checkbox
									checked={selected.includes(item.id)}
									onChange={() =>
										setSelected((selected) => {
											if (selected.includes(item.id))
												return selected.filter(
													(id) => id !== item.id,
												);
											return [...selected, item.id];
										})
									}
								/>
							</label>
							<div className="col-start-2 -col-end-1 grid grid-cols-[subgrid] gap-x-16 border-b border-gray-700/60 py-3">
								<div>{item.name}</div>
								<div>
									<StatusBadge
										status={item.status}
										progress={item.progress}
									/>
								</div>
								<div>
									{item.products.at(0)}
									<span
										className={cn('hidden', {
											'inline pl-1':
												item.products.length - 1,
										})}
									>
										& +{item.products.length - 1} more
									</span>
								</div>
								<div>
									$ {currencyFormatter.format(item.total)}
								</div>
								<div>
									{dateFormatter.format(item.startDate)}
								</div>
								<div>
									{item.endDate
										? dateFormatter.format(item.endDate)
										: 'Forever'}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="mt-8 flex justify-between text-sm tabular-nums text-gray-500">
				<div className="flex items-center gap-2">
					<div>
						{page * itemsPerPage + 1}-
						{Math.min((page + 1) * itemsPerPage, items.length)} of{' '}
						{items.length}
					</div>
					<div>·</div>
					<div>
						Results per Page
						<input
							type="number"
							value={itemsPerPage}
							onChange={(e) => setItemsPerPage(+e.target.value)}
							step={5}
							className="rounded-xs ml-2 max-w-14 border-gray-500/60 py-px px-2 text-white"
						/>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<IconButton
						onClick={() => setPage((page) => page - 1)}
						disabled={page === 0}
					>
						<ChevronLeftIcon className="size-4" />
					</IconButton>
					<div>
						<span className="text-white">{page + 1}</span>
						<span>/</span>
						<span>{Math.ceil(items.length / itemsPerPage)}</span>
					</div>
					<IconButton
						onClick={() => setPage((page) => page + 1)}
						disabled={
							page === Math.ceil(items.length / itemsPerPage) - 1
						}
					>
						<ChevronRightIcon className="size-4" />
					</IconButton>
				</div>
			</div>
			<ActionBar visible={selected.length > 0}>
				<ActionBarItem className="text-gray-500">
					<span className="tabular-nums text-white/80">
						{selected.length}
					</span>
					of
					<span className="tabular-nums text-white/80">
						{items.length}
					</span>
					selected
				</ActionBarItem>
				{/*<Popover>*/}
				{/*	<PopoverTrigger>*/}
				<ActionBarButton>
					<EditStatusIcon className="size-4" />
					Change status
				</ActionBarButton>
				{/*</PopoverTrigger>*/}
				{/*<PopoverContent>*/}
				{/*	<div></div>*/}
				{/*</PopoverContent>*/}
				{/*</Popover>*/}
				<ActionBarButton>
					<DuplicateIcon className="size-4" />
					Duplicate
				</ActionBarButton>
				<ActionBarButton>
					<ExportIcon className="size-4" />
					Export
				</ActionBarButton>
				<ActionBarButton className="text-rose-500">
					<DeleteIcon className="size-4" />
					Delete
				</ActionBarButton>
			</ActionBar>
		</div>
	);
}
//
// function Popover({ children }: PropsWithChildren) {
// 	return <>{children}</>;
// }
//
// function PopoverTrigger({ children }: PropsWithChildren) {
// 	return <>{children}</>;
// }
//
// function PopoverContent({ children }: PropsWithChildren) {
// 	return (
// 		<div className="bg-dg-700 fixed flex h-12 self-center overflow-hidden rounded-md border border-gray-500/50 ring shadow-xl ring-black/50">
// 			{children}
// 		</div>
// 	);
// }

function IconButton({ className, ...props }: ComponentProps<'button'>) {
	return (
		<button
			className={cn(
				'rounded-xs grid size-8 cursor-pointer place-items-center border border-gray-500/60 text-base text-white disabled:cursor-default disabled:opacity-40',
				className,
			)}
			{...props}
		/>
	);
}

function ActionBar({
	children,
	visible,
}: PropsWithChildren<{ visible: boolean }>) {
	return (
		<div
			className={cn(
				'bg-dg-700 fixed flex h-12 self-center overflow-hidden rounded-md border border-gray-500/50 ring shadow-xl ring-black/50',
				'-bottom-16 scale-80 opacity-0 transition-all duration-200',
				{ 'bottom-8 scale-100 opacity-100': visible },
			)}
		>
			{children}
		</div>
	);
}
function ActionBarItem({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'flex items-center gap-2 border-r border-gray-500/50 px-4 text-white/80 last:border-none',
				className,
			)}
			{...props}
		/>
	);
}

function ActionBarButton({ className, ...props }: ComponentProps<'button'>) {
	return (
		<button
			className={cn(
				'hover:bg-dg-600 flex cursor-pointer items-center gap-2 border-r border-gray-500/50 px-4 text-white/80 last:border-none',
				className,
			)}
			{...props}
		/>
	);
}
