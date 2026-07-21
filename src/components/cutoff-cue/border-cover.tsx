import { cn } from '../../util';
import { DemoBody, DemoHeader, frameClasses, headerClasses } from './demo';

/**
 * No modern CSS, no JS — just stacking. The border is its own sticky element
 * pinned directly below the header, so it is "stuck" from the start. At rest
 * it is hidden by a background-coloured cover occupying the same pixel. The
 * cover scrolls away with the content (sliding under the opaque header),
 * uncovering the border.
 *
 * z-stack, top to bottom: sticky header (30), scrolling cover (20),
 * sticky border (10), scrolling content. Both border and cover use a
 * negative bottom margin so neither takes up layout space.
 */
export default function CutoffCueCoverTrick() {
	return (
		<div className={frameClasses}>
			<div className={cn(headerClasses, 'z-30')}>
				<DemoHeader />
			</div>
			<div className="sticky top-12 z-10 -mb-px h-px bg-stone-700" />
			<div className="relative z-20 -mb-px h-px bg-stone-900" />
			<DemoBody />
		</div>
	);
}
