import { CommandIcon, PlusIcon, SearchIcon, SettingsIcon } from 'lucide-react';
import { use, useEffect, useRef, useState } from 'react';
import useAbortable from '../../hooks/use-abortable.ts';
import { Button } from './button.tsx';
import { NodeDefinition, nodesContext } from './contexts.tsx';

export const latestDefinitions = new Map<string, NodeDefinition>([
	[
		'1',
		{
			id: '1',
			name: 'Main Sensor',
			parameters: [
				{ id: 'a', name: 'Parameter A' },
				{ id: 'b', name: 'Parameter B' },
			],
			version: 2,
		},
	],
	[
		'2',
		{
			id: '2',
			name: 'Display Unit',
			parameters: [
				{ id: 'x', name: 'Width' },
				{ id: 'y', name: 'Height' },
			],
			version: 1,
		},
	],
	[
		'3',
		{
			id: '3',
			name: 'Thermal Regulator',
			parameters: [{ id: 'temp', name: 'Temperature' }],
			version: 3,
		},
	],
	[
		'4',
		{
			id: '4',
			name: 'UI Overlay',
			parameters: [
				{ id: 'c', name: 'Color' },
				{ id: 's', name: 'Size' },
				{ id: 'o', name: 'Opacity' },
			],
			version: 2,
		},
	],
	[
		'5',
		{
			id: '5',
			name: 'Geo Locator',
			parameters: [
				{ id: 'lat', name: 'Latitude' },
				{ id: 'lng', name: 'Longitude' },
			],
			version: 4,
		},
	],
	[
		'6',
		{
			id: '6',
			name: 'Audio Mixer',
			parameters: [{ id: 'vol', name: 'Volume' }],
			version: 1,
		},
	],
	[
		'7',
		{
			id: '7',
			name: 'Motor Driver',
			parameters: [
				{ id: 'm', name: 'Mode' },
				{ id: 'spd', name: 'Speed' },
			],
			version: 5,
		},
	],
	[
		'8',
		{
			id: '8',
			name: 'Circle Drawer',
			parameters: [
				{ id: 'r', name: 'Radius' },
				{ id: 'deg', name: 'Degrees' },
			],
			version: 2,
		},
	],
	[
		'9',
		{
			id: '9',
			name: 'Basic Switch',
			parameters: [{ id: 'a', name: 'Parameter A' }],
			version: 3,
		},
	],
	[
		'10',
		{
			id: '10',
			name: 'Range Validator',
			parameters: [
				{ id: 'min', name: 'Minimum' },
				{ id: 'max', name: 'Maximum' },
			],
			version: 1,
		},
	],
	[
		'11',
		{
			id: '11',
			name: 'Schedule Manager',
			parameters: [
				{ id: 'start', name: 'Start Time' },
				{ id: 'end', name: 'End Time' },
				{ id: 'tz', name: 'Time Zone' },
			],
			version: 2,
		},
	],
	[
		'12',
		{
			id: '12',
			name: 'ID Generator',
			parameters: [{ id: 'id', name: 'Identifier' }],
			version: 4,
		},
	],
	[
		'13',
		{
			id: '13',
			name: '3D Model Loader',
			parameters: [
				{ id: 'w', name: 'Weight' },
				{ id: 'h', name: 'Height' },
				{ id: 'd', name: 'Depth' },
			],
			version: 3,
		},
	],
	[
		'14',
		{
			id: '14',
			name: 'Tag Filter',
			parameters: [{ id: 'cat', name: 'Category' }],
			version: 1,
		},
	],
	[
		'15',
		{
			id: '15',
			name: 'Level Tracker',
			parameters: [
				{ id: 'lvl', name: 'Level' },
				{ id: 'xp', name: 'Experience' },
			],
			version: 2,
		},
	],
	[
		'16',
		{
			id: '16',
			name: 'Network Adapter',
			parameters: [{ id: 'ip', name: 'IP Address' }],
			version: 2,
		},
	],
	[
		'17',
		{
			id: '17',
			name: 'Auth Service',
			parameters: [
				{ id: 'u', name: 'Username' },
				{ id: 'p', name: 'Password' },
			],
			version: 1,
		},
	],
	[
		'18',
		{
			id: '18',
			name: 'Link Previewer',
			parameters: [{ id: 'url', name: 'URL' }],
			version: 5,
		},
	],
	[
		'19',
		{
			id: '19',
			name: 'Order Line',
			parameters: [
				{ id: 'q', name: 'Quantity' },
				{ id: 'pr', name: 'Price' },
			],
			version: 3,
		},
	],
	[
		'20',
		{
			id: '20',
			name: 'Notes Collector',
			parameters: [
				{ id: 'note', name: 'Notes' },
				{ id: 'tag', name: 'Tags' },
			],
			version: 4,
		},
	],
]);

let latestX = 100;
export function NodesCatalog() {
	const [open, setOpen] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);

	// TODO: add nodes catalog data and add node to canvas

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
			if (!open || !dialogRef.current || justOpened) {
				justOpened = false;
				return;
			}

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

	const { setNodes } = use(nodesContext);

	return (
		<>
			<div className="flex gap-2 items-center">
				<button
					className="flex gap-2 border border-gray-400/30 bg-white rounded-sm h-10 px-2 items-center text-sm text-gray-500 flex-1"
					onClick={() => setOpen(true)}
				>
					<SearchIcon className="size-4 ml-1" />
					<span>Add Node</span>
					<kbd className="border flex items-center gap-px border-gray-400/30 px-2 text-xs rounded-xs text-gray-400 ml-auto">
						<CommandIcon className="size-2.5" />k
					</kbd>
				</button>
				<Button variant="secondary" className="aspect-square px-0">
					<SettingsIcon className="size-4" />
				</Button>
			</div>
			{open && (
				<dialog
					ref={dialogRef}
					className="mx-auto min-w-lg max-w-[95vw] mt-24 p-4 bg-white rounded-md border-2 border-gray-900/20 shadow-2xl backdrop:bg-grey-900/50"
				>
					<h2 className="font-bold">Operations catalog</h2>
					<div className="flex flex-col gap-2 my-4">
						{Array.from(latestDefinitions.entries()).map(
							([id, definition]) => (
								<div
									key={id}
									className="flex gap-2 items-center hover:bg-gray-500/10 pl-2 rounded-sm cursor-pointer"
									onClick={() =>
										setNodes?.((nodes) => [
											...nodes,
											{
												id: Math.floor(
													Math.random() * 1000,
												).toString(16),
												definition,
												position: [
													(latestX += 200),
													100,
												],
												parameters:
													definition.parameters.map(
														() => ({
															id: Math.random().toString(),
															value: '',
														}),
													),
											},
										])
									}
								>
									<div>
										{definition.name}{' '}
										<span className="text-xs text-gray-600 ">
											v{definition.version}
										</span>
									</div>
									<Button
										variant="secondary"
										className="aspect-square px-0 ml-auto size-8"
									>
										<PlusIcon className="size-4" />
									</Button>
								</div>
							),
						)}
					</div>
					<Button variant="secondary" onClick={() => setOpen(false)}>
						Close Dialog
					</Button>
				</dialog>
			)}
		</>
	);
}
