import { cn } from '../../util';
import { DemoBody, DemoHeader, frameClasses, headerClasses } from './demo';
import './cutoff-cue.css';

/**
 * Scroll-driven animation (Chrome 115+): the scroll container exposes a named
 * `scroll-timeline` and the border plays a fade-in keyframe on it, scrubbed
 * over the first 3rem of scroll. Unlike the boolean variants this one is
 * progressive — dragging slowly fades the border in and out with the scroll
 * position itself.
 */
export default function CutoffCueAnimationTimeline() {
	return (
		<div className={cn(frameClasses, 'cutoff-cue-timeline-scroller')}>
			<div className={headerClasses}>
				<DemoHeader />
				<div className="cutoff-cue-timeline-border absolute inset-x-0 bottom-0 h-px bg-stone-700" />
			</div>
			<DemoBody />
		</div>
	);
}
