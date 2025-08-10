import { useEffect } from 'react';

export default function useAbortable(fn: (signal: AbortSignal) => void) {
	useEffect(() => {
		const abortController = new AbortController();

		fn(abortController.signal);

		return () => abortController.abort();
	}, [fn]);
}
