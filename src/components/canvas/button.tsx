import { ComponentProps } from 'react';
import { cn } from '../../util.ts';

export function Button({
	className,
	variant,
	...props
}: ComponentProps<'button'> & { variant: 'primary' | 'secondary' }) {
	if (variant === 'secondary') {
		return (
			<button
				{...props}
				className={cn(
					'select-none justify-center flex gap-2 bg-blue-900/8 backdrop-blur-sm enabled:hover:bg-blue-900/12 text-blue-900 h-10 rounded-sm items-center px-4 text-sm enabled:cursor-pointer enabled:active:scale-98 transition-all duration-150 disabled:opacity-50 whitespace-nowrap',
					className,
				)}
			/>
		);
	}

	return (
		<button
			{...props}
			className={cn(
				'select-none justify-center m-1 flex gap-2 bg-blue-900 enabled:hover:bg-blue-800 enabled:active:bg-blue-700 text-white h-9 rounded-sm items-center px-4 text-sm enabled:cursor-pointer enabled:active:scale-98 transition-all duration-150 ring-4 ring-blue-900/20 disabled:opacity-50 whitespace-nowrap',
				className,
			)}
		/>
	);
}
