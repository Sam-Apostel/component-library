import {
	Dispatch,
	MouseEventHandler,
	SetStateAction,
	useCallback,
} from 'react';

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
							position[0] + e.movementX / (zoom / 100),
							position[1] + e.movementY / (zoom / 100),
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
