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
			options: {
				cool: {
					name: 'cool',
					value: 'var(--color-slate-200)',
				},
				white: {
					name: 'white',
					value: '#fff',
				},
				dark: {
					name: 'dark',
					value: '#121213',
				},
				'dark-gray': {
					name: 'dark-gray',
					value: '#1c1f24',
				},
			},
		},
	},
	initialGlobals: {
		backgrounds: { value: 'cool' },
	},
};

export default preview;
