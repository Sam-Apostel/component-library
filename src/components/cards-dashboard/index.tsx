import { ChevronDownIcon, CircleCheckIcon, TicketIcon } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';
import { cn } from '../../util.ts';
import banner from './banner.jpg';
import background from './image.png';

export default function CardsDashboard() {
	return (
		<div className="flex relative flex-col gap-6 p-12  min-h-screen text-white font-big-shoulders tracking-wider">
			<img
				src={background}
				alt=""
				className="absolute inset-0 h-full w-full -z-1 object-cover"
			/>
			<h2 className="font-medium text-xl text-shadow-md">
				Special Missions
			</h2>
			<div className="grid grid-cols-2 gap-2">
				<Card className="col-span-2" background>
					<div className="px-4 py-7 pe-6 flex justify-between items-center">
						<div className="flex flex-col">
							<h3 className="font-bold text-lg">
								Event Specials
							</h3>
							<p className="text-sm">Summer Fest</p>
						</div>
						<div className="flex gap-2">
							<Timer label="Days" value={99} />
							<Timer label="Hours" value={99} />
							<Timer label="Minutes" value={99} />
						</div>
					</div>
				</Card>
				<Card>
					<div className="pt-4 pb-2">
						<div className="px-4 pb-1 flex justify-between items-center">
							<h3>Traders</h3>
							<div className="text-xs border border-neutral-300/20 rounded px-2 py-2 flex gap-1">
								<CircleCheckIcon className="size-4 [&_circle]:fill-blue-500 [&_circle]:stroke-blue-500 text-neutral-800" />
								Qualified
							</div>
						</div>
						<Separator />
						<div className="px-4 ">
							<div className="flex justify-between items-center">
								<h4 className="text-sm">Your wallet</h4>
								<div className="font-mono border-neutral-500/50 border rounded py-2 px-4 text-xs bg-stone-900 ring-2 ring-black">
									0x3bDjs1Lk......84930
								</div>
							</div>
							<div className="flex gap-2 flex-col mt-8 mb-6">
								<div className="flex rounded-sm outline -outline-offset-1 outline-black/30 overflow-hidden items-stretch h-7 text-xs text-shadow-sm">
									<div className="bg-linear-to-r from-red-400 to-red-500 flex-1 grid place-items-center">
										200
									</div>
									<div className="bg-linear-to-r from-orange-400 to-orange-500 flex-1 grid place-items-center">
										500
									</div>
									<div className="bg-linear-to-r from-yellow-300 to-yellow-400 flex-1 grid place-items-center">
										450
									</div>
								</div>
								<div className="flex text-xs">
									<div className="flex-1 flex gap-2 items-center justify-center">
										<div className="bg-red-500 rounded-xs size-3 outline-2 -outline-offset-1 outline-white/30" />
										Bera
									</div>
									<div className="flex-1 flex gap-2 items-center justify-center">
										<div className="bg-orange-500 rounded-xs size-3 outline-2 -outline-offset-1 outline-white/30" />
										Inpra
									</div>
									<div className="flex-1 flex gap-2 items-center justify-center">
										<div className="bg-yellow-400 rounded-xs size-3 outline-2 -outline-offset-1 outline-white/30" />
										Hub
									</div>
								</div>
							</div>

							<div className="flex justify-center gap-8 items-center ">
								<span>Total Score</span>
								<div className="bg-black rounded-sm px-5 py-2 text-sm flex items-center gap-4">
									60 PB{' '}
									<s className="text-white/30 decoration-white text-xs">
										40 PB
									</s>
								</div>
							</div>
						</div>
					</div>
				</Card>
				<Card className="row-span-2">
					<div className="py-4">
						<div className="px-4 pb-1 flex justify-between items-center">
							<h3>Leaderboard</h3>
							<div className="text-[10px] border border-neutral-300/20 rounded px-2 py-0.5 flex gap-2 items-center">
								Sort
								<ChevronDownIcon className="size-3" />
							</div>
						</div>
						<Separator />
						<div className="px-4 ">
							<div className="flex gap-2 flex-col">
								{Array.from({ length: 10 }).map((_, i) => (
									<ScoreLine key={i} rank={i} />
								))}
							</div>
						</div>
					</div>
				</Card>
				<Card>
					<div className="py-4">
						<div className="px-4 pb-1">
							<h3>Roffle Ticket</h3>
						</div>
						<Separator />
						<div className="px-4 flex flex-col gap-2">
							<div className="flex justify-between items-center">
								<h4 className="text-sm">Your wallet</h4>
								<div className="bg-black rounded text-sm px-5 py-0.5 flex items-center gap-1.5">
									450
									<TicketIcon className="size-4 text-black [&_path:first-child]:fill-blue-500 [&_path:first-child]:stroke-blue-500 rotate-170" />
								</div>
							</div>
							<div className="flex justify-between items-center">
								<h4 className="text-sm">1 Ticket</h4>
								<div className="text-sm px-5 py-0.5">
									50 pts
								</div>
							</div>
							<div
								className="mt-2 flex bg-slate-300/10 h-4 rounded overflow-clip items-stretch outline outline-white/20 -outline-offset-1 bg-size-[1rem_1rem]"
								style={{
									backgroundImage:
										'linear-gradient(-45deg, #ffffff10 25%, #0000 25% 50%, #ffffff10 50% 75%, #0000 75%, #0000)',
								}}
							>
								<div className="bg-sky-600 rounded-r h-4 basis-[50%]" />
							</div>
						</div>
						<Separator />
						<div className="px-4 grid grid-cols-2 gap-2">
							<div className="rounded-md h-20 bg-black"></div>
							<div className="rounded-md bg-black"></div>
							<div className="rounded-md h-32 bg-black col-span-2"></div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}

function ScoreLine({ rank }: { rank: number }) {
	return (
		<div className="bg-black/90 rounded-[5px] h-12 flex items-stretch p-px">
			<div className="w-10 grid place-items-center text-[10px]">
				{rank}.
			</div>
			<div className="flex-1 bg-linear-to-b from-stone-700/50 to-stone-900/50 border border-stone-500/50 rounded-xs flex overflow-clip items-center text-xs gap-2">
				<div className="bg-stone-600/60 shadow-md shadow-black w-12 -translate-x-2 h-30 rotate-15 grid place-items-center">
					<img
						src={`https://avatar.iran.liara.run/public?id=${rank}`}
						alt="user avatar"
						className="-rotate-15 size-5 translate-x-1"
					/>
				</div>
				<div>
					ox
					{Math.floor(
						Math.pow(Math.random() * 25, Math.random() * 25),
					).toString(36)}
				</div>
			</div>
		</div>
	);
}

function Separator() {
	return <hr className="border-white/15 my-4" />;
}
function Card({
	className,
	children,
	background,
}: ComponentProps<'div'> & { background?: boolean }) {
	return (
		<div
			className={cn(
				className,
				'bg-sky-50/20 rounded-xl p-2 backdrop-blur-[2px] relative overflow-clip',
			)}
		>
			<div className="absolute inset-0 border border-white/90 rounded-tl-xl rounded-br-xl blur-[1px]"></div>
			{background && (
				<img
					src={banner}
					alt=""
					className="absolute inset-2 object-cover overflow-clip size-[calc(100%-1rem)] rounded-md object-[50%_50%]"
				/>
			)}
			<div
				className={cn(
					'h-full rounded-md',
					'box-border bg-clip-padding border-2 border-transparent relative',
					"before:content-[''] before:absolute before:inset-0 before:-z-1 before:-m-0.5 before:rounded-[inherit] before:bg-linear-to-br before:from-blue-600 before:to-30% before:to-blue-600/0",
					"after:content-[''] after:absolute after:inset-0 after:-z-20 after:-m-0.5 after:rounded-[inherit] after:bg-neutral-900",
					{
						'bg-neutral-900 ': !background,
						'bg-linear-to-r from-neutral-900 to-60% to-neutral-900/0':
							background,
					},
				)}
			>
				{children}
			</div>
		</div>
	);
}

function Timer({ label, value }: { label: ReactNode; value: number }) {
	const [d0, d1] = value.toString().split('');
	return (
		<div className="flex flex-col items-center tabular-nums bg-black p-1.5 rounded-sm gap-1 border border-neutral-800">
			<div className="text-sm font-mono font-medium flex gap-0.5 ">
				<div className="bg-neutral-800 size-6 rounded-[4px] grid place-items-center">
					{d0}
				</div>
				<div className="bg-neutral-800 size-6 rounded-[4px] grid place-items-center">
					{d1}
				</div>
			</div>
			<span className="text-xs font-sans text-gray-500">{label}</span>
		</div>
	);
}
