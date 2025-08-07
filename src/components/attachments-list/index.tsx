import {
	CircleCheckBig,
	CircleIcon,
	DownloadIcon,
	ExternalLinkIcon,
	FileIcon,
	ImageIcon,
	Link2Icon,
	MicIcon,
	PlayIcon,
	XIcon,
} from 'lucide-react'
import { PropsWithChildren, useState } from 'react'
import { cn } from '../../util.ts'

export default function AttachmentsList() {
	return (
		<div className="flex flex-col gap-2 font-medium text-gray-700">
			<h2>Attachments:</h2>
			<div className="flex flex-col gap-2 w-md items-stretch">
				<ListItem>
					<FileIcon className="size-4" />
					<span className="text-sm font-mono">
						file-attachment01.pdf
					</span>

					<div className="ml-auto flex gap-2 items-center text-xs tabular-nums ">
						<span>32 MB</span>
						<DownloadIcon className="size-3" />
					</div>
				</ListItem>
				<ListItem>
					<Link2Icon className="size-4" />
					<span className="text-sm font-mono">
						url-to-attachment01.com
					</span>
					<div className="ml-auto flex gap-2 items-center text-xs tabular-nums">
						<span>Web</span>
						<ExternalLinkIcon className="size-3" />
					</div>
				</ListItem>
				<ListItem>
					<ImageIcon className="size-4" />
					<span className="text-sm font-mono">
						media-attachment01.jpeg
					</span>

					<div className="ml-auto flex gap-2 items-center text-xs tabular-nums">
						<span>198 KB</span>
						<DownloadIcon className="size-3" />
					</div>
				</ListItem>
				<ListItem>
					<MicIcon className="size-4" />
					<div className="text-xs ml-auto flex gap-3 items-center tabular-nums">
						<span>0:12</span>
						<div className="flex gap-[3px] h-6 items-center">
							{Array.from({ length: 40 }).map((_, i, arr) => (
								<div
									key={i}
									className="w-[3px] bg-gray-300 rounded-full data-[played=true]:bg-gray-500"
									data-played={i < arr.length / 4}
									style={{
										height: `${Math.random() * 90 + 10}%`,
									}}
								/>
							))}
						</div>
						<span>0:48</span>
					</div>

					<div className="ml-auto flex gap-2 items-center text-xs tabular-nums">
						<PlayIcon className="size-3" />
					</div>
				</ListItem>
			</div>
		</div>
	)
}

function ListItem({ children }: PropsWithChildren) {
	const [checked, setChecked] = useState(false)
	return (
		<div
			className={cn([
				'bg-gray-200 p-px rounded-sm h-10 text-gray-500',
				'has-[button:active]:bg-gray-300 has-[button[aria-checked=false]:active]:bg-teal-300 has-[button.destructive:active]:bg-rose-200 has-[button:active]:scale-[0.99]',
				'grid grid-rows-1 transition-all duration-150',
				'[--col-1:0px] [--col-2:0px] grid-cols-[var(--col-1)_calc(2.25rem-var(--col-1))_1fr_calc(2.25rem-var(--col-2))_var(--col-2)]',
				'has-[>:first-child:hover]:[--col-1:2.25rem] has-aria-checked:[--col-1:2.25rem] has-[>:last-child:hover]:[--col-2:2.25rem] ',
			])}
		>
			<button
				className=" w-9 h-full grid rounded-[7px] place-items-center cursor-pointer peer row-1 col-start-1 col-span-2"
				onClick={() => setChecked((c) => !c)}
				aria-checked={checked}
			>
				{checked ? (
					<CircleCheckBig className="size-4 text-green-600" />
				) : (
					<CircleIcon className="size-4 text-gray-400/50" />
				)}
			</button>
			<div className="bg-white rounded-[7px] w-full flex items-center p-2 gap-3 z-1 pointer-events-none col-start-2 -col-end-2 row-1">
				{children}
			</div>
			<button className="w-9 h-full grid rounded-[7px] place-items-center cursor-pointer col-start-4 col-span-2 row-1 destructive">
				<XIcon className="size-4 text-red-400" />
			</button>
		</div>
	)
}
