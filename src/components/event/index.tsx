type Event = {
	datetime: Date;
	title: string;
	description: string;
	id: string;
};

export default function Event({ datetime, title, description, id }: Event) {
	const addToCalendar = (id: string) => {
		alert(id);
	};

	if (!(datetime instanceof Date)) datetime = new Date(datetime);

	return (
		<div className="group flex max-w-3xl gap-4 rounded-lg bg-white p-3 outline-4 outline-white/20">
			<div className="flex flex-col justify-center rounded-sm bg-blue-100 py-3 px-4 text-center">
				<span className="text-xs uppercase">
					{datetime.toLocaleDateString('nl-BE', {
						day: 'numeric',
						month: 'short',
					})}
				</span>
				<span className="font-serif text-2xl">
					{datetime.toLocaleTimeString('nl-BE', {
						hour: '2-digit',
						minute: '2-digit',
					})}
				</span>
			</div>
			<div className="py-3">
				<h3 className="font-serif text-lg font-semibold">{title}</h3>
				<p className="text-balance text-sm">{description}</p>
			</div>
			<div className="py-4 px-4">
				<button
					className="h-10 cursor-pointer whitespace-nowrap rounded-md px-4 text-sm transition-colors group-has-hover:bg-zinc-100 hover:bg-zinc-800 hover:text-white"
					onClick={() => {
						addToCalendar(id);
					}}
				>
					+ Add to calendar
				</button>
			</div>
		</div>
	);
}
