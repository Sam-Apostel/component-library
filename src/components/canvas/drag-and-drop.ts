import {
	Dispatch,
	MouseEventHandler,
	RefObject,
	SetStateAction,
	useCallback,
	useEffect,
} from 'react';

// Drag a node around the canvas. Movement is in viewport pixels, so it is
// divided by the zoom scale to translate it into canvas (content) units.
export function useDragProps(
	setPosition: Dispatch<SetStateAction<[number, number]>>,
	zoom: number,
) {
	const onMouseDown = useCallback<MouseEventHandler<HTMLDivElement>>(
		(e) => {
			e.stopPropagation();

			const abortController = new AbortController();
			window.addEventListener(
				'mousemove',
				(e) => {
					setPosition((position) => {
						return [
							position[0] + e.movementX / zoom,
							position[1] + e.movementY / zoom,
						];
					});
				},
				{ signal: abortController.signal },
			);

			window.addEventListener(
				'mouseup',
				() => {
					abortController.abort();
				},
				{ signal: abortController.signal },
			);
		},
		[setPosition, zoom],
	);

	return {
		onMouseDown,
	};
}

// Pan the camera by dragging the canvas background. The camera pan offset is
// stored in viewport pixels, so movement is applied directly.
export function usePanProps(panBy: (dx: number, dy: number) => void) {
	const onMouseDown = useCallback<MouseEventHandler<HTMLDivElement>>(() => {
		const abortController = new AbortController();
		window.addEventListener(
			'mousemove',
			(e) => panBy(e.movementX, e.movementY),
			{ signal: abortController.signal },
		);

		window.addEventListener(
			'mouseup',
			() => {
				abortController.abort();
			},
			{ signal: abortController.signal },
		);
	}, [panBy]);

	return {
		onMouseDown,
	};
}

// Drag a node with a single finger, but only while `enabled` (i.e. the node is
// already selected). When enabled, the touch is stopped from bubbling so the
// canvas pans/pinches; when disabled the hook attaches nothing, so touches fall
// through to the canvas and pan it instead.
export function useTouchDrag(
	ref: RefObject<HTMLElement | null>,
	enabled: boolean,
	setPosition: Dispatch<SetStateAction<[number, number]>>,
	zoom: number,
) {
	useEffect(() => {
		const element = ref.current;
		if (!element || !enabled) return;

		let last: { x: number; y: number } | null = null;

		const onTouchStart = (e: TouchEvent) => {
			// Let multi-touch (pinch) bubble up to the canvas.
			if (e.touches.length !== 1) return;
			e.stopPropagation();
			const touch = e.touches[0];
			last = { x: touch.clientX, y: touch.clientY };
		};

		const onTouchMove = (e: TouchEvent) => {
			if (!last || e.touches.length !== 1) return;
			e.preventDefault();
			e.stopPropagation();
			const touch = e.touches[0];
			// Movement is in viewport pixels; divide by zoom for canvas units.
			const dx = (touch.clientX - last.x) / zoom;
			const dy = (touch.clientY - last.y) / zoom;
			setPosition((position) => [position[0] + dx, position[1] + dy]);
			last = { x: touch.clientX, y: touch.clientY };
		};

		const onTouchEnd = (e: TouchEvent) => {
			// Re-baseline to the finger that remains after a pinch ends so the
			// drag continues smoothly; clear once nothing is touching.
			const touch = e.touches.length === 1 ? e.touches[0] : null;
			last = touch ? { x: touch.clientX, y: touch.clientY } : null;
		};

		element.addEventListener('touchstart', onTouchStart, {
			passive: false,
		});
		element.addEventListener('touchmove', onTouchMove, { passive: false });
		element.addEventListener('touchend', onTouchEnd);
		element.addEventListener('touchcancel', onTouchEnd);

		return () => {
			element.removeEventListener('touchstart', onTouchStart);
			element.removeEventListener('touchmove', onTouchMove);
			element.removeEventListener('touchend', onTouchEnd);
			element.removeEventListener('touchcancel', onTouchEnd);
		};
	}, [ref, enabled, setPosition, zoom]);
}

type Point = { x: number; y: number };
type ZoomAtPoint = (factor: number, anchor: Point) => void;
type PanBy = (dx: number, dy: number) => void;

// Exponential sensitivities so a given gesture feels proportional at any zoom
// level. Pinch deltas are much smaller than mouse-wheel notches, hence two
// constants.
const WHEEL_ZOOM_SENSITIVITY = 0.0015;
const PINCH_ZOOM_SENSITIVITY = 0.01;

// Classic mouse wheels deliver large, stepped, vertical-only deltas; trackpads
// deliver small/fractional deltas and often a horizontal component. This is a
// best-effort guess (the two are not reliably distinguishable).
function isTrackpadPan(e: WheelEvent) {
	if (e.deltaMode !== 0) return false; // line/page deltas => mouse wheel
	if (e.deltaX !== 0) return true; // horizontal scroll => trackpad
	if (!Number.isInteger(e.deltaY)) return true; // fractional => trackpad
	return Math.abs(e.deltaY) < 40; // small steps => trackpad inertia
}

type Gesture = { x: number; y: number; distance: number };

// Midpoint and finger spread of the active touches. Distance is 0 for a single
// touch (pan only).
function readTouches(touches: TouchList): Gesture {
	const a = touches[0];
	const b = touches[1];
	if (!b) return { x: a.clientX, y: a.clientY, distance: 0 };
	return {
		x: (a.clientX + b.clientX) / 2,
		y: (a.clientY + b.clientY) / 2,
		distance: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
	};
}

// Wire up wheel, trackpad and touch gestures on the canvas element:
//   - mouse wheel               -> zoom around the cursor
//   - trackpad pinch            -> zoom around the cursor
//   - trackpad two-finger swipe -> pan
//   - touch one finger          -> pan
//   - touch two fingers         -> pinch zoom (and drag to pan)
// Listeners are attached natively and non-passively so we can take over the
// gesture from the browser's own page/pinch zoom and scrolling.
export function useCanvasGestures(
	ref: RefObject<HTMLElement | null>,
	zoomAtPoint: ZoomAtPoint,
	panBy: PanBy,
) {
	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const toLocal = (clientX: number, clientY: number): Point => {
			const rect = element.getBoundingClientRect();
			return { x: clientX - rect.left, y: clientY - rect.top };
		};

		const onWheel = (e: WheelEvent) => {
			e.preventDefault();

			// Trackpad pinch and ctrl/⌘ + scroll arrive with ctrlKey set.
			if (e.ctrlKey) {
				zoomAtPoint(
					Math.exp(-e.deltaY * PINCH_ZOOM_SENSITIVITY),
					toLocal(e.clientX, e.clientY),
				);
				return;
			}

			// Two-finger swipe on a trackpad pans the canvas.
			if (isTrackpadPan(e)) {
				panBy(-e.deltaX, -e.deltaY);
				return;
			}

			// Classic mouse wheel zooms around the cursor.
			const delta = e.deltaY * (e.deltaMode === 1 ? 16 : 1);
			zoomAtPoint(
				Math.exp(-delta * WHEEL_ZOOM_SENSITIVITY),
				toLocal(e.clientX, e.clientY),
			);
		};

		let previous: Gesture | null = null;

		const onTouchStart = (e: TouchEvent) => {
			previous = readTouches(e.touches);
		};

		const onTouchMove = (e: TouchEvent) => {
			if (!previous) return;
			e.preventDefault();
			const current = readTouches(e.touches);

			if (e.touches.length >= 2 && previous.distance > 0) {
				zoomAtPoint(
					current.distance / previous.distance,
					toLocal(current.x, current.y),
				);
			}
			// One finger drags, two fingers move the pinch midpoint: both pan.
			panBy(current.x - previous.x, current.y - previous.y);
			previous = current;
		};

		const onTouchEnd = (e: TouchEvent) => {
			// Re-baseline when the finger count changes (so lifting one finger of
			// a pinch doesn't jump), and clear once everything is lifted.
			previous = e.touches.length > 0 ? readTouches(e.touches) : null;
		};

		element.addEventListener('wheel', onWheel, { passive: false });
		element.addEventListener('touchstart', onTouchStart, {
			passive: false,
		});
		element.addEventListener('touchmove', onTouchMove, { passive: false });
		element.addEventListener('touchend', onTouchEnd);
		element.addEventListener('touchcancel', onTouchEnd);

		return () => {
			element.removeEventListener('wheel', onWheel);
			element.removeEventListener('touchstart', onTouchStart);
			element.removeEventListener('touchmove', onTouchMove);
			element.removeEventListener('touchend', onTouchEnd);
			element.removeEventListener('touchcancel', onTouchEnd);
		};
	}, [ref, zoomAtPoint, panBy]);
}
