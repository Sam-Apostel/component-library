import {
	CloudAlertIcon,
	FunnelXIcon,
	GraduationCap,
	RotateCcw,
	SquareUser,
	WandSparklesIcon,
	WaypointsIcon,
} from 'lucide-react'
import { ComponentProps } from 'react'
import { cn } from '../../util.ts'

export default function EmptyState() {
	return (
		<div className="grid md:grid-cols-2 gap-4 items-center ">
			<ProjectCard />
			<RoutingCard />
			<FiltersCard />
			<RoutingErrorCard />
		</div>
	)
}

function FiltersCard() {
	return (
		<div className="flex flex-col gap-4 items-center border border-dashed rounded-lg px-6 pt-12 pb-4 border-sky-600/20 overflow-clip">
			<h3 className="text-sky-900/80 text-sm font-medium">
				The filters you chose don't match any orders.
			</h3>
			<div className="cards relative my-20 mx-40">
				<div className="absolute -translate-1/2 h-30 w-90 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] inset-shadow-white inset-shadow-10xl rounded-full" />
				<Card
					className="grid-cols-[5rem_7rem_3rem] grid-rows-[1rem_.125rem_1.5rem_.75rem] border-dashed opacity-70"
					transform="-rotate-5 scale-90"
				>
					<Field className="col-start-1 col-end-2 row-start-1 row-end-5" />
					<Field className="col-start-2 col-end-3 row-start-1 row-end-3" />
					<Field className="col-start-2 col-end-3 row-start-3 row-end-4" />
					<Field className="col-start-2 col-end-3 row-start-4 row-end-5" />
					<Field
						className="col-start-3 col-end-4 row-start-1 row-end-2"
						accent
					/>
				</Card>
			</div>
			<span className="text-sky-900/40 text-sm max-w-sm text-center">
				Remove some filters to keep searching <br />
				or clear all filters to see all orders again.
			</span>
			<div className="flex gap-2">
				<button className="m-1 flex gap-2 bg-blue-900 hover:bg-blue-800 text-white h-9 rounded-sm items-center px-4 text-sm cursor-pointer active:scale-98 transition-all duration-150 ring-4 ring-blue-900/20">
					<FunnelXIcon className="size-4" />
					Clear All Filters
				</button>
			</div>
		</div>
	)
}

function RoutingErrorCard() {
	return (
		<div className="flex flex-col gap-4 items-center border border-dashed rounded-lg px-6 pt-12 pb-4 border-red-600/20 overflow-clip">
			<h3 className="text-red-600/80 text-sm font-medium">
				The routing service is currently unavailable.
			</h3>
			<div className="cards relative my-20 mx-40 hue-rotate-150">
				<div className="absolute -translate-1/2 h-30 w-90 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] inset-shadow-white inset-shadow-10xl rounded-full" />
				<svg
					className="absolute -translate-1/2 stroke-sky-600/10 fill-none stroke-2"
					viewBox="0 0 160 80"
					width={160}
					height={80}
				>
					<path d="M8 53Q45 43 65 50M99 68C129 75 130 75 162 71" />
					<path d="M 8 38 Q 16 35 15 24 T 22 10" />
					<path d="M 150 36 Q 143 34 143 23 T 136 10" />
				</svg>

				<div className=" absolute text-sky-600/80 -translate-x-[15px] translate-y-[3px] border-sky-600/50 bg-white border-dashed border rounded-full p-1.5">
					<CloudAlertIcon className="size-5" />
				</div>
				<Card
					className="grid-cols-[4rem_4rem] grid-rows-[repeat(3,1rem)]"
					transform="-rotate-4 -translate-x-30 scale-65"
				>
					<Field className="col-start-1 col-end-3" accent />
					<Field className="col-start-2 col-end-3" />
					<Field className="col-start-2 col-end-3" />
				</Card>
				<Card
					className="grid-cols-[4rem_4rem] grid-rows-[repeat(4,1rem)]"
					transform="-rotate-2 translate-x-30 scale-65"
				>
					<Field className="col-start-1 col-end-3" accent />
					<Field className="col-start-1 col-end-2" />
					<Field className="col-start-1 col-end-2" />
					<Field className="col-start-1 col-end-2" />
				</Card>
				<Card
					className="grid-cols-[4rem_4rem] grid-rows-[repeat(3,1rem)]"
					transform=" -translate-y-8 scale-75"
				>
					<Field className="col-start-1 col-end-3" accent />
					<Field className="col-start-1 col-end-2" />
					<Field className="col-start-2 col-end-3" />
					<Field className="col-start-1 col-end-2" />
					<Field className="col-start-2 col-end-3" />
				</Card>
			</div>
			<span className="text-red-600/50 text-sm">
				Try again later or contact support.
			</span>
			<div className="flex gap-x-2 gap-y-1 flex-wrap-reverse justify-center items-center">
				<button className="m-1 flex gap-2 bg-blue-900 hover:bg-blue-800 active:ring-[4.5px] text-white h-9 rounded-sm items-center px-4 text-sm cursor-pointer active:scale-98 transition-all duration-150 ring-4 ring-blue-900/20 whitespace-nowrap">
					<RotateCcw className="size-4" />
					Retry
				</button>
				<button className="m-1 flex gap-2 bg-blue-900/8 hover:bg-blue-900/12 text-blue-900 h-9 rounded-sm items-center px-4 text-sm cursor-pointer active:scale-98 transition-all duration-150 whitespace-nowrap">
					<SquareUser className="size-4" />
					Contact Support
				</button>
			</div>
		</div>
	)
}

function RoutingCard() {
	return (
		<div className="flex flex-col gap-4 items-center border border-dashed rounded-lg px-6 pt-12 pb-4 border-sky-600/20 overflow-clip">
			<h3 className="text-sky-900/80 text-sm font-medium">
				You don't have any routings yet.
			</h3>
			<div className="cards relative my-20 mx-40">
				<div className="absolute -translate-1/2 h-30 w-90 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] inset-shadow-white inset-shadow-10xl rounded-full" />
				<svg
					className="absolute -translate-1/2 stroke-sky-600/10 fill-none stroke-2"
					viewBox="0 0 160 80"
					width={160}
					height={80}
				>
					<path d="M8 53 Q50 46 84 60 T162 65" />
					<path d="M 8 38 Q 16 35 15 24 T 22 10" />
					<path d="M 150 36 Q 143 34 143 23 T 136 10" />
				</svg>
				<Card
					className="grid-cols-[4rem_4rem] grid-rows-[repeat(3,1rem)]"
					transform="-rotate-4 -translate-x-30 scale-65"
				>
					<Field className="col-start-1 col-end-3" accent />
					<Field className="col-start-2 col-end-3" />
					<Field className="col-start-2 col-end-3" />
				</Card>
				<Card
					className="grid-cols-[4rem_4rem] grid-rows-[repeat(4,1rem)]"
					transform="-rotate-2 translate-x-30 scale-65"
				>
					<Field className="col-start-1 col-end-3" accent />
					<Field className="col-start-1 col-end-2" />
					<Field className="col-start-1 col-end-2" />
					<Field className="col-start-1 col-end-2" />
				</Card>
				<Card
					className="grid-cols-[4rem_4rem] grid-rows-[repeat(3,1rem)]"
					transform=" -translate-y-8 scale-75"
				>
					<Field className="col-start-1 col-end-3" accent />
					<Field className="col-start-1 col-end-2" />
					<Field className="col-start-2 col-end-3" />
					<Field className="col-start-1 col-end-2" />
					<Field className="col-start-2 col-end-3" />
				</Card>
			</div>
			<span className="text-sky-900/40 text-sm">
				How about creating your first routing right now?
			</span>
			<div className="flex gap-x-2 gap-y-1 flex-wrap-reverse justify-center items-center">
				<button className="m-1 flex gap-2 bg-blue-900 hover:bg-blue-800 text-white h-9 rounded-sm items-center px-4 text-sm cursor-pointer active:scale-98 transition-all duration-150 ring-4 ring-blue-900/20 whitespace-nowrap">
					<WaypointsIcon className="size-4" />
					Create Routing
				</button>
				<button className="m-1 flex gap-2 bg-blue-900/8 hover:bg-blue-900/12 text-blue-900 h-9 rounded-sm items-center px-4 text-sm cursor-pointer active:scale-98 transition-all duration-150 whitespace-nowrap">
					<GraduationCap className="size-4" />
					Teach me how
				</button>
			</div>
		</div>
	)
}

function ProjectCard() {
	return (
		<div className="flex flex-col gap-4 items-center border border-dashed rounded-lg px-6 pt-12 pb-4 border-sky-600/20 overflow-clip">
			<div className="cards relative my-20 mx-40">
				<div className="absolute -translate-1/2 h-30 w-90 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] inset-shadow-white inset-shadow-10xl rounded-full" />
				<Card
					className="grid-cols-[2.5rem_10rem_3rem] grid-rows-[1rem_1rem_.75rem]"
					transform="rotate-4 -translate-y-8 translate-x-3 scale-90"
				>
					<Field className="col-start-1 col-end-2 row-start-1 row-end-3" />
					<Field
						className="col-start-2 col-end-3 row-start-1 row-end-2"
						accent
					/>
					<Field className="col-start-2 col-end-3 row-start-2 row-end-3" />
					<Field className="col-start-2 col-end-3 row-start-3 row-end-4" />
					<Field className="col-start-3 col-end-4 row-start-1 row-end-2" />
				</Card>
				<Card
					className="grid-cols-[3rem_5rem_3rem] grid-rows-[1rem_1.5rem_.75rem_1.5rem_.75rem]"
					transform="rotate-8 translate-x-17 translate-y-2 scale-80"
				>
					<Field className="col-start-1 col-end-2 row-start-1 row-end-3" />
					<Field className="col-start-1 col-end-4 row-start-3 row-end-4" />
					<Field className="col-start-1 col-end-4 row-start-4 row-end-5" />
					<Field
						className="col-start-1 col-end-4 row-start-5 row-end-6"
						accent
					/>
					<Field className="col-start-3 col-end-4 row-start-1 row-end-2" />
				</Card>
				<Card
					className="grid-cols-[5rem_7rem_3rem] grid-rows-[1rem_.125rem_1.5rem_.75rem]"
					transform="-rotate-5 -translate-x-9 translate-y-4 scale-90"
				>
					<Field className="col-start-1 col-end-2 row-start-1 row-end-5" />
					<Field className="col-start-2 col-end-3 row-start-1 row-end-3" />
					<Field
						className="col-start-2 col-end-3 row-start-3 row-end-4"
						accent
					/>
					<Field className="col-start-2 col-end-3 row-start-4 row-end-5" />
					<Field className="col-start-3 col-end-4 row-start-1 row-end-2" />
				</Card>
			</div>
			<span className="text-sky-900/40 text-sm">
				How about creating a project right now?
			</span>
			<button className="m-1 flex gap-2 bg-blue-900 text-white h-9 rounded-sm items-center px-4 text-sm cursor-pointer active:scale-98 transition-all duration-150 ring-4 ring-blue-900/20">
				<WandSparklesIcon className="size-4" />
				Add Project
			</button>
		</div>
	)
}

function Card({
	className,
	transform,
	...props
}: ComponentProps<'div'> & { transform?: string }) {
	return (
		<div className={transform}>
			<div
				className={cn(
					'absolute border inset-shadow-white inset-shadow-2xl border-sky-800/10 rounded-sm bg-white/40 backdrop-blur-md grid p-2 gap-2 shadow-blue-600/3 shadow-xl -translate-1/2',
					className,
				)}
				{...props}
			/>
		</div>
	)
}

function Field({
	className,
	accent,
	...props
}: ComponentProps<'div'> & { accent?: boolean }) {
	return (
		<div
			className={cn(className, 'bg-sky-500/9 rounded-xs', {
				'bg-sky-500/20': accent,
			})}
			{...props}
		/>
	)
}
