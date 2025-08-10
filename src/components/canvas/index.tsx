import {
	CommandIcon,
	EyeIcon,
	FullscreenIcon,
	MaximizeIcon,
	MinusIcon,
	PlusIcon,
	SearchIcon,
} from 'lucide-react';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import useAbortable from '../../hooks/use-abortable.ts';
import { cn } from '../../util.ts';

export default function CanvasUi() {
	return (
		<div className="w-full h-screen relative">
			<Canvas />
			<aside className="absolute right-2 inset-y-2 flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<Button variant="secondary" className="aspect-square px-0">
						<EyeIcon className="size-4" />
					</Button>
					<Button variant="primary" className="flex-1">
						Save
					</Button>
				</div>
				<OperationsCatalog />
				<OperationParameters />
				<Minimap />
				<ZoomWidget />
			</aside>
		</div>
	);
}

function OperationParameters() {
	return (
		<div className="min-w-xs flex gap-2 border border-gray-400/30 bg-white rounded-sm p-2 items-center text-gray-500 flex-1" />
	);
}
function Canvas() {
	return (
		<div className="absolute inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
			{/*	TODO add a couple of sample nodes */}
		</div>
	);
}

function ZoomWidget() {
	const [zoom, setZoom] = useState(100);
	return (
		<div className="flex gap-2 items-center">
			<div className="flex gap-2 items-center">
				<button
					onClick={() => setZoom((z) => z - 10)}
					disabled={zoom <= 20}
					className="disabled:opacity-50 enabled:cursor-pointer enabled:hover:bg-gray-100 enabled:active:hover:bg-gray-200/80 enabled:active:scale-98 aspect-square justify-center flex gap-2 border border-gray-400/30 bg-white rounded-sm h-10 px-2 items-center text-sm text-gray-500"
				>
					<MinusIcon className="size-4" />
				</button>
				<div className="flex gap-2 border border-gray-400/30 bg-white rounded-sm h-10 pl-2 pr-3 items-center text-sm text-gray-500">
					<input
						className="w-8 text-right"
						value={zoom}
						onChange={(e) => setZoom(+e.target.value)}
					/>
					%
				</div>
				<button
					onClick={() => setZoom((z) => z + 10)}
					disabled={zoom >= 150}
					className="disabled:opacity-50 enabled:cursor-pointer enabled:hover:bg-gray-100 enabled:active:hover:bg-gray-200/80 enabled:active:scale-98 aspect-square justify-center flex gap-2 border border-gray-400/30 bg-white rounded-sm h-10 px-2 items-center text-sm text-gray-500"
				>
					<PlusIcon className="size-4" />
				</button>
			</div>

			<div className="flex border border-gray-400/30 bg-white rounded-sm  items-center overflow-clip">
				<button
					onClick={() => setZoom(100)}
					aria-checked={zoom === 100 ? true : undefined}
					className="bg-white aria-checked:bg-blue-800/10 enabled:cursor-pointer enabled:hover:bg-gray-100 enabled:active:hover:bg-gray-200/80 enabled:active:scale-98 aspect-square justify-center flex gap-2 h-10 px-2 items-center text-sm text-gray-500"
				>
					<MaximizeIcon className="size-4" />
				</button>
				<button
					onClick={() => setZoom(75)}
					aria-checked={zoom === 75 ? true : undefined}
					className="bg-white aria-checked:bg-blue-800/10 enabled:cursor-pointer enabled:hover:bg-gray-100 enabled:active:hover:bg-gray-200/80 enabled:active:scale-98 aspect-square justify-center flex gap-2 h-10 px-2 items-center text-sm text-gray-500"
				>
					<FullscreenIcon className="size-4" />
				</button>
			</div>
		</div>
	);
}

function Minimap() {
	return (
		<div className="h-32 border border-gray-400/30 bg-white rounded-sm ">
			<div
				className="bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] w-full h-full"
				style={{ zoom: 0.5 }}
			></div>
		</div>
	);
}

function OperationsCatalog() {
	const [open, setOpen] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);

	useAbortable((signal) => {
		window.addEventListener(
			'keydown',
			(event) => {
				if (event.metaKey && event.key === 'k') {
					setOpen((open) => !open);
					event.preventDefault();
				}
			},
			{ signal },
		);
	});

	useEffect(() => {
		let justOpened = false;
		if (dialogRef.current) {
			if (open) {
				dialogRef.current.showModal();
				justOpened = true;
			} else {
				dialogRef.current.close();
			}
		}

		const onClick = (e: MouseEvent) => {
			// dont close on initial open/click
			if (!open || !dialogRef.current || justOpened) {
				justOpened = false;
				return;
			}

			// Bounding box as checking target wont work
			// if the dialog has padding (default browser behavior)
			const rect = dialogRef.current.getBoundingClientRect();
			const isInDialog =
				rect.top <= e.clientY &&
				e.clientY <= rect.top + rect.height &&
				rect.left <= e.clientX &&
				e.clientX <= rect.left + rect.width;

			if (!isInDialog) {
				setOpen(false);
			}
		};

		if (open) {
			document.addEventListener('click', onClick);
		} else {
			document.removeEventListener('click', onClick);
		}

		return () => {
			document.removeEventListener('click', onClick);
		};
	}, [open]);

	return (
		<>
			<button
				className="flex gap-2 border border-gray-400/30 bg-white rounded-sm h-10 px-2 items-center text-sm text-gray-500"
				onClick={() => setOpen(true)}
			>
				<SearchIcon className="size-4 ml-1" />
				<span>Add Operations</span>
				<kbd className="border flex items-center gap-px border-gray-400/30 px-2 text-xs rounded-xs text-gray-400 ml-auto">
					<CommandIcon className="size-2.5" />k
				</kbd>
			</button>
			{open && (
				<dialog
					ref={dialogRef}
					className="mx-auto min-w-lg max-w-[95vw] mt-24 p-4 bg-white rounded-md border-2 border-gray-900/20 shadow-2xl backdrop:bg-grey-900/50"
				>
					<h2 className="font-bold mb-4">Operations catalog</h2>
					<Button variant="secondary" onClick={() => setOpen(false)}>
						Close Dialog
					</Button>
				</dialog>
			)}
		</>
	);
}

function Button({
	className,
	variant,
	...props
}: ComponentProps<'button'> & { variant: 'primary' | 'secondary' }) {
	if (variant === 'secondary') {
		return (
			<button
				{...props}
				className={cn(
					'justify-center my-1 flex gap-2 bg-blue-900/8 backdrop-blur-sm hover:bg-blue-900/12 text-blue-900 h-9 rounded-sm items-center px-4 text-sm cursor-pointer active:scale-98 transition-all duration-150 whitespace-nowrap',
					className,
				)}
			/>
		);
	}

	return (
		<button
			{...props}
			className={cn(
				'justify-center m-1 flex gap-2 bg-blue-900 text-white h-9 rounded-sm items-center px-4 text-sm cursor-pointer active:scale-98 transition-all duration-150 ring-4 ring-blue-900/20',
				className,
			)}
		/>
	);
}
