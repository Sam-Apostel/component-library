export function ActivityIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			className={className}
		>
			<circle cx="12" cy="12" r="11" style={{ opacity: 0.125 }} />
			<circle cx="12" cy="12" r="7" style={{ opacity: 0.25 }} />
			<circle cx="12" cy="12" r="3" />
		</svg>
	);
}

export function CheckIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M20,6.5l-11,11l-5,-5" />
		</svg>
	);
}

export function ChevronDownIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M6,9l6,6l6,-6" />
		</svg>
	);
}

export function ChevronLeftIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M15,6l-6,6l6,6" />
		</svg>
	);
}

export function ChevronRightIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M9,18l6,-6l-6,-6" />
		</svg>
	);
}

export function ChevronUpIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M18,15l-6,-6l-6,6" />
		</svg>
	);
}

export function CrossIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M18,6l-12,12" />
			<path d="M6,6l12,12" />
		</svg>
	);
}

export function DeleteIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M3,6l18,0" />
			<path d="M19,6l0,14c0,1 -1,2 -2,2l-10,0c-1,0 -2,-1 -2,-2l0,-14" />
			<path d="M8,6l0,-2c0,-1 1,-2 2,-2l4,0c1,0 2,1 2,2l0,2" />
		</svg>
	);
}

export function DuplicateIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M22,10l0,10c0,1.104 -0.896,2 -2,2l-10,0c-1.104,0 -2,-0.896 -2,-2l0,-10c0,-1.104 0.896,-2 2,-2l10,0c1.104,0 2,0.896 2,2Z" />
			<path d="M4,16c-1.1,0 -2,-0.9 -2,-2l0,-10c0,-1.1 0.9,-2 2,-2l10,0c1.1,0 2,0.9 2,2" />
		</svg>
	);
}

export function EditStatusIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M21.417,5.397c0.373,-0.373 0.583,-0.88 0.583,-1.407c-0,-1.092 -0.898,-1.99 -1.99,-1.99c-0.527,0 -1.034,0.21 -1.407,0.583l-9.42,9.423c-0.164,0.163 -0.286,0.364 -0.353,0.585l-0.933,3.072c-0.01,0.033 -0.015,0.067 -0.015,0.102c0,0.193 0.16,0.352 0.353,0.352c0.035,0 0.069,-0.005 0.102,-0.014l3.073,-0.932c0.221,-0.067 0.422,-0.188 0.586,-0.351l9.421,-9.423Z" />
			<path d="M20.824,12.588c-0,5.198 -4.214,9.412 -9.412,9.412c-5.195,-0 -9.412,-4.217 -9.412,-9.412c0,-5.198 4.214,-9.412 9.412,-9.412" />
		</svg>
	);
}

export function ExportIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M21,15l0,4c0,1.097 -0.903,2 -2,2l-14,0c-1.097,0 -2,-0.903 -2,-2l0,-4" />
			<path d="M7,10l5,5l5,-5" />
			<path d="M12,15l0,-12" />
		</svg>
	);
}

export function OptionsIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			className={className}
		>
			<circle cx="12" cy="12" r="1" />
			<circle cx="8" cy="12" r="1" />
			<circle cx="16" cy="12" r="1" />
		</svg>
	);
}

export function Progress0Icon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path
				d="M19.727,14.071c0.413,-1.54 0.356,-3.168 -0.163,-4.676c0.519,1.508 0.576,3.136 0.163,4.676Z"
				opacity=".25"
			/>
			<path
				d="M17.657,6.343c-1.127,-1.127 -2.566,-1.892 -4.131,-2.196c1.565,0.304 3.004,1.069 4.131,2.196Z"
				opacity=".25"
			/>
			<path
				d="M9.929,4.273c-1.539,0.412 -2.921,1.275 -3.967,2.479c1.046,-1.204 2.428,-2.067 3.967,-2.479Z"
				opacity=".25"
			/>
			<path
				d="M4.273,9.929c-0.413,1.54 -0.356,3.168 0.163,4.676c-0.519,-1.508 -0.576,-3.136 -0.163,-4.676Z"
				opacity=".25"
			/>
			<path
				d="M6.343,17.657c1.127,1.127 2.566,1.892 4.131,2.196c-1.565,-0.304 -3.004,-1.069 -4.131,-2.196Z"
				opacity=".25"
			/>
			<path
				d="M14.071,19.727c1.539,-0.412 2.921,-1.275 3.967,-2.479c-1.046,1.204 -2.428,2.067 -3.967,2.479Z"
				opacity=".25"
			/>
		</svg>
	);
}

export function Progress1Icon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M17.657,6.343c-1.127,-1.127 -2.566,-1.892 -4.131,-2.196c1.565,0.304 3.004,1.069 4.131,2.196Z" />
			<path
				d="M19.727,14.071c0.413,-1.54 0.356,-3.168 -0.163,-4.676c0.519,1.508 0.576,3.136 0.163,4.676Z"
				opacity={0.25}
			/>
			<path
				d="M9.929,4.273c-1.539,0.412 -2.921,1.275 -3.967,2.479c1.046,-1.204 2.428,-2.067 3.967,-2.479Z"
				opacity={0.25}
			/>
			<path
				d="M4.273,9.929c-0.413,1.54 -0.356,3.168 0.163,4.676c-0.519,-1.508 -0.576,-3.136 -0.163,-4.676Z"
				opacity={0.25}
			/>
			<path
				d="M6.343,17.657c1.127,1.127 2.566,1.892 4.131,2.196c-1.565,-0.304 -3.004,-1.069 -4.131,-2.196Z"
				opacity={0.25}
			/>
			<path
				d="M14.071,19.727c1.539,-0.412 2.921,-1.275 3.967,-2.479c-1.046,1.204 -2.428,2.067 -3.967,2.479Z"
				opacity={0.25}
			/>
		</svg>
	);
}

export function Progress2Icon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M19.727,14.071c0.74,-2.761 -0.049,-5.707 -2.07,-7.728c-1.127,-1.127 -2.566,-1.892 -4.131,-2.196c1.565,0.304 3.004,1.069 4.131,2.196c2.021,2.021 2.81,4.967 2.07,7.728Z" />
			<path
				d="M9.929,4.273c-1.539,0.412 -2.921,1.275 -3.967,2.479c1.046,-1.204 2.428,-2.067 3.967,-2.479Z"
				opacity={0.25}
			/>
			<path
				d="M4.273,9.929c-0.413,1.54 -0.356,3.168 0.163,4.676c-0.519,-1.508 -0.576,-3.136 -0.163,-4.676Z"
				opacity={0.25}
			/>
			<path
				d="M6.343,17.657c1.127,1.127 2.566,1.892 4.131,2.196c-1.565,-0.304 -3.004,-1.069 -4.131,-2.196Z"
				opacity={0.25}
			/>
			<path
				d="M14.071,19.727c1.539,-0.412 2.921,-1.275 3.967,-2.479c-1.046,1.204 -2.428,2.067 -3.967,2.479Z"
				opacity={0.25}
			/>
		</svg>
	);
}

export function Progress3Icon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M14.071,19.727c1.356,-0.363 2.593,-1.077 3.586,-2.07c3.122,-3.122 3.122,-8.192 -0,-11.314c-1.127,-1.127 -2.566,-1.892 -4.131,-2.196c1.565,0.304 3.004,1.069 4.131,2.196c3.122,3.122 3.122,8.192 -0,11.314c-0.993,0.993 -2.23,1.707 -3.586,2.07Z" />
			<path
				d="M9.929,4.273c-1.539,0.412 -2.921,1.275 -3.967,2.479c1.046,-1.204 2.428,-2.067 3.967,-2.479Z"
				opacity={0.25}
			/>
			<path
				d="M4.273,9.929c-0.413,1.54 -0.356,3.168 0.163,4.676c-0.519,-1.508 -0.576,-3.136 -0.163,-4.676Z"
				opacity={0.25}
			/>
			<path
				d="M6.343,17.657c1.127,1.127 2.566,1.892 4.131,2.196c-1.565,-0.304 -3.004,-1.069 -4.131,-2.196Z"
				opacity={0.25}
			/>
		</svg>
	);
}

export function Progress4Icon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M6.343,17.657c3.124,3.124 8.19,3.124 11.314,-0c3.122,-3.122 3.122,-8.192 -0,-11.314c-1.127,-1.127 -2.566,-1.892 -4.131,-2.196c1.565,0.304 3.004,1.069 4.131,2.196c3.122,3.122 3.122,8.192 -0,11.314c-3.124,3.124 -8.19,3.124 -11.314,-0Z" />
			<path
				d="M9.929,4.273c-1.539,0.412 -2.921,1.275 -3.967,2.479c1.046,-1.204 2.428,-2.067 3.967,-2.479Z"
				opacity={0.25}
			/>
			<path
				d="M4.273,9.929c-0.413,1.54 -0.356,3.168 0.163,4.676c-0.519,-1.508 -0.576,-3.136 -0.163,-4.676Z"
				opacity={0.25}
			/>
		</svg>
	);
}

export function Progress5Icon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M4.273,9.929c-0.74,2.761 0.049,5.707 2.07,7.728c3.122,3.122 8.192,3.122 11.314,-0c3.122,-3.122 3.122,-8.192 -0,-11.314c-1.127,-1.127 -2.566,-1.892 -4.131,-2.196c1.565,0.304 3.004,1.069 4.131,2.196c3.122,3.122 3.122,8.192 -0,11.314c-3.122,3.122 -8.192,3.122 -11.314,-0c-2.021,-2.021 -2.81,-4.967 -2.07,-7.728Z" />
			<path
				d="M9.929,4.273c-1.539,0.412 -2.921,1.275 -3.967,2.479c1.046,-1.204 2.428,-2.067 3.967,-2.479Z"
				opacity={0.25}
			/>
		</svg>
	);
}

export function Progress6Icon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5,
				strokeWidth: '2px',
			}}
			stroke="currentColor"
			fill="none"
			className={className}
		>
			<path d="M9.929,4.273c-1.356,0.363 -2.593,1.077 -3.586,2.07c-3.122,3.122 -3.122,8.192 0,11.314c3.122,3.122 8.192,3.122 11.314,-0c3.122,-3.122 3.122,-8.192 -0,-11.314c-1.127,-1.127 -2.566,-1.892 -4.131,-2.196c1.565,0.304 3.004,1.069 4.131,2.196c3.122,3.122 3.122,8.192 -0,11.314c-3.122,3.122 -8.192,3.122 -11.314,-0c-3.122,-3.122 -3.122,-8.192 0,-11.314c0.993,-0.993 2.23,-1.707 3.586,-2.07Z" />
		</svg>
	);
}

export function ProgressIcon({
	className,
	progress,
}: {
	className?: string;
	progress?: number;
}) {
	switch (progress) {
		case 0:
			return <Progress0Icon className={className} />;
		case 1:
			return <Progress1Icon className={className} />;
		case 2:
			return <Progress2Icon className={className} />;
		case 3:
			return <Progress3Icon className={className} />;
		case 4:
			return <Progress4Icon className={className} />;
		case 5:
			return <Progress5Icon className={className} />;
		case 6:
			return <Progress6Icon className={className} />;
	}

	return <Progress0Icon className={className} />;
}
