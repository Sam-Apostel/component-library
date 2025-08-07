import type { Meta, StoryObj } from '@storybook/react-vite';
import Component from './index';

const meta = {
	title: 'Components/magic padding',
	component: Component,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark'
		}
	},
	tags: ['autodocs'],
	argTypes: {
		// backgroundColor: { control: 'color' },
	},
	args: {
		// onClick: fn()
	},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
