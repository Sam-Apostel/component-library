import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: 'cool',
			values: [
				{
					name: 'cool',
					value: 'var(--color-slate-200)',
				},
				{
					name: 'white',
					value: '#fff',
				},
				{
					name: 'dark',
					value: 'var(--color-zinc-800)',
				},
			],
		},
	},
};

export default preview;
