import { useState } from 'react';
import { cn } from '../../util';
import { DemoBody, DemoHeader, frameClasses, headerClasses } from './demo';

/**
 * The classic: a JS scroll listener toggles a boolean once the container has
 * scrolled at all. Works everywhere, but the state flip happens on the main
 * thread, so the border can lag a frame behind a fast fling.
 */
export default function ShyBorderScrollListener() {
	const [stuck, setStuck] = useState(false);

	return (
		<div
			className={frameClasses}
			onScroll={(event) => setStuck(event.currentTarget.scrollTop > 0)}
		>
			<div className={headerClasses}>
				<DemoHeader />
				<div
					className={cn(
						'absolute inset-x-0 bottom-0 h-px bg-stone-700 transition-opacity duration-250 ease-in-out',
						stuck ? 'opacity-100' : 'opacity-0',
					)}
				/>
			</div>
			<DemoBody />
		</div>
	);
}
