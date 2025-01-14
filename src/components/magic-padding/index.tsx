export default function MagicPadding() {
	return (
		<div className="max-w-sm p-2 border border-stone-700 rounded-md flex flex-col gap-2">
			<div className="flex justify-between items-center peer">
				<span className="text-stone-200 ml-4">Confirm your action</span>
				<button className="flex items-center justify-center font-thin hover:bg-stone-700/60 size-8 rounded-xs text-stone-200 text-lg pb-[2px] cursor-pointer transition-colors duration-250 ease-in-out">&times;</button>
			</div>
			<hr className="border-stone-700 ml-3 mr-2 peer-has-[button:hover]:mr-0 transition-[margin] duration-250 ease-in-out"/>
			<div className="mx-4 my-3">
				<p className="text-stone-400">Simplicity is not the consequence of simplicity. Simplicity is describing the purpose and place of an object and product. The absence of clutter is just a clutter-free product.</p>
			</div>
		</div>
	);
}
