export const frameClasses =
	'relative w-80 h-72 overflow-y-auto rounded-md border border-stone-700 bg-stone-900';

export const headerClasses =
	'sticky top-0 h-12 px-4 flex items-center bg-stone-900';

export function DemoHeader() {
	return (
		<div className="flex flex-1 items-baseline justify-between">
			<span className="text-stone-200 font-medium">Release notes</span>
			<span className="text-sm text-stone-500">v2.4.0</span>
		</div>
	);
}

export function DemoBody() {
	return (
		<div className="flex flex-col gap-3 px-4 pb-4 text-sm text-stone-400">
			<p>
				A sticky header without a border looks broken the moment you
				scroll: content slides underneath and gets clipped at a
				seemingly arbitrary line.
			</p>
			<p>
				The obvious fix is a permanent border at the bottom of the
				header. But the resting state pays for it — you need spacing
				between the header and the border, and again between the border
				and the content. Double the gap, for a line that is only useful
				while scrolling.
			</p>
			<p>
				So the border should be shy. At rest it stays hidden and a
				single gap does its job. The moment content starts sliding under
				the header, the border shows up to give the clipped edge a
				reason to be there.
			</p>
			<p>
				Scroll this card and watch the line appear at the bottom of the
				header. Scroll back up and it steps out of the way again.
			</p>
			<p>
				The interesting part is how many different primitives can
				express this one behaviour: scroll-state container queries,
				scroll-driven animations, a scroll listener, an
				IntersectionObserver, or nothing but stacked elements.
			</p>
			<p>
				They all agree at the extremes — hidden at rest, visible while
				stuck — but differ in the in-between: some snap, some fade over
				time, and some scrub with the scroll position itself.
			</p>
			<p>
				Details like this are invisible when they work. That is the
				point.
			</p>
		</div>
	);
}
