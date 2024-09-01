import 'react';

declare module 'react' {
	interface CSSProperties {
		'--progress'?: number;
		'--tw-shadow-color'?: string;
		'--tw-shadow'?: string;
	}
}
