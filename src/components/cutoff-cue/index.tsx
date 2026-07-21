import CutoffCueAnimationTimeline from './animation-timeline';
import CutoffCueCoverTrick from './border-cover';
import CutoffCueIntersectionObserver from './intersection-observer';
import CutoffCueScrollListener from './scroll-listener';
import CutoffCueScrollState from './scroll-state';

const variants = [
	{ label: 'scroll-state container query', Variant: CutoffCueScrollState },
	{ label: 'scroll-driven animation', Variant: CutoffCueAnimationTimeline },
	{ label: 'scroll listener', Variant: CutoffCueScrollListener },
	{ label: 'IntersectionObserver', Variant: CutoffCueIntersectionObserver },
	{ label: 'border cover', Variant: CutoffCueCoverTrick },
];

export default function CutoffCue() {
	return (
		<div className="flex max-w-3xl flex-wrap justify-center gap-8">
			{variants.map(({ label, Variant }) => (
				<div key={label} className="flex flex-col gap-2">
					<span className="text-sm text-stone-500">{label}</span>
					<Variant />
				</div>
			))}
		</div>
	);
}

export {
	CutoffCueScrollState,
	CutoffCueAnimationTimeline,
	CutoffCueScrollListener,
	CutoffCueIntersectionObserver,
	CutoffCueCoverTrick,
};
