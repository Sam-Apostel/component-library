import { cn } from '../../util';
import { DemoBody, DemoHeader, frameClasses, headerClasses } from './demo';
import './shy-border.css';

/**
 * Pure CSS via `container-type: scroll-state` (Chrome 133+). The only variant
 * that reacts to the header actually being pinned, instead of inferring it
 * from scroll position — so it also works when the header starts partway down
 * the scroll container.
 */
export default function ShyBorderScrollState() {
	return (
		<div className={frameClasses}>
			<div className={cn(headerClasses, 'shy-scroll-state-header')}>
				<DemoHeader />
				<div className="shy-scroll-state-border absolute inset-x-0 bottom-0 h-px bg-stone-700" />
			</div>
			<DemoBody />
		</div>
	);
}
