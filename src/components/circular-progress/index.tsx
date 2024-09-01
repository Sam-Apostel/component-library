import { ReactNode } from 'react';

function getColor(progress: number) {
	if (progress >= 75) {
		return '--color-green-600';
	}
	if (progress >= 50) {
		return '--color-yellow-600';
	}
	if (progress >= 25) {
		return '--color-orange-600';
	}
	return '--color-red-600';
}

export default function CircularProgress({
	progress = 0,
	size = 64,
	stroke = 10,
	gutter = 14,
	label = progress,
}: {
	progress?: number;
	size?: number;
	stroke?: number;
	gutter?: number;
	label?: ReactNode;
}) {
	const radius = (size - Math.max(gutter, stroke)) / 2;
	const circumference = 2 * Math.PI * radius;
	const clampedProgress = Math.min(Math.max(progress, 0), 100);

	return (
		<div
			className="relative grid place-items-center font-mono text-xs font-bold tabular-nums"
			style={{
				width: `${size}px`,
				height: `${size}px`,
				'--progress': clampedProgress,
			}}
		>
			<svg className="h-full w-full rotate-270">
				<circle
					cx="50%"
					cy="50%"
					r={radius}
					stroke="var(--color-slate-400)"
					fill="none"
					strokeWidth={gutter}
					opacity={0.2}
				/>
				{clampedProgress > 0 && (
					<circle
						cx="50%"
						cy="50%"
						r={radius}
						stroke={`var(${getColor(clampedProgress)})`}
						fill="none"
						strokeWidth={stroke}
						strokeDasharray={
							clampedProgress === 100
								? `${circumference}, ${circumference}`
								: `calc(var(--progress) * ${(circumference - stroke) / 100}), ${circumference}`
						}
						strokeLinecap="round"
						className="transition-all duration-200"
					/>
				)}
			</svg>
			<span className="absolute">{label}</span>
		</div>
	);
}
