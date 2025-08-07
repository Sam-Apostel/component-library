import type { Preview } from '@storybook/react-vite';
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
					value: '#121213',
				},
				{
					name: 'dark-gray',
					value: '#1c1f24',
				},
			],
		},
	},
};

export default preview;
