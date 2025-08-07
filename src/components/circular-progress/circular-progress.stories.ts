import type { Meta, StoryObj } from '@storybook/react-vite';
// import { fn } from 'storybook/test';
import Component from './index';

const meta = {
	title: 'Components/circular-progress',
	component: Component,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		// backgroundColor: { control: 'color' },
		progress: { control: 'range', min: 0, max: 100 },
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
