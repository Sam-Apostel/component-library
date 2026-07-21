import ShyBorderAnimationTimeline from './animation-timeline';
import ShyBorderCoverTrick from './border-cover';
import ShyBorderIntersectionObserver from './intersection-observer';
import ShyBorderScrollListener from './scroll-listener';
import ShyBorderScrollState from './scroll-state';

const variants = [
	{ label: 'scroll-state container query', Variant: ShyBorderScrollState },
	{ label: 'scroll-driven animation', Variant: ShyBorderAnimationTimeline },
	{ label: 'scroll listener', Variant: ShyBorderScrollListener },
	{ label: 'IntersectionObserver', Variant: ShyBorderIntersectionObserver },
	{ label: 'border cover', Variant: ShyBorderCoverTrick },
];

export default function ShyBorder() {
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
	ShyBorderScrollState,
	ShyBorderAnimationTimeline,
	ShyBorderScrollListener,
	ShyBorderIntersectionObserver,
	ShyBorderCoverTrick,
};
