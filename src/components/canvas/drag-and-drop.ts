import {
	Dispatch,
	MouseEventHandler,
	SetStateAction,
	useCallback,
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
