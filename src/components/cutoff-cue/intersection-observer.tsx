import { useEffect, useRef, useState } from 'react';
import { cn } from '../../util';
import { DemoBody, DemoHeader, frameClasses, headerClasses } from './demo';

/**
 * A 1px sentinel sits at the very top of the scrollable content. An
 * IntersectionObserver (rooted to the scroll container) reports when the
 * sentinel is no longer fully visible — i.e. the header is stuck. No work per
 * scroll frame; the callback only fires on the transition.
 */
export default function CutoffCueIntersectionObserver() {
	const scrollerRef = useRef<HTMLDivElement>(null);
	const sentinelRef = useRef<HTMLDivElement>(null);
	const [stuck, setStuck] = useState(false);

	useEffect(() => {
		if (!scrollerRef.current || !sentinelRef.current) return;
		const observer = new IntersectionObserver(
			([entry]) => setStuck(!entry.isIntersecting),
			{ root: scrollerRef.current, threshold: 1 },
		);
		observer.observe(sentinelRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={scrollerRef} className={frameClasses}>
			<div ref={sentinelRef} className="absolute top-0 h-px w-full" />
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
