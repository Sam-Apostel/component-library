import type { Meta, StoryObj } from '@storybook/react-vite';
import Component from './index';

const meta = {
	// title: 'Components/Table Action Bar',
	component: Component,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark-gray',
		},
	},
	tags: ['autodocs'],
	argTypes: {
		// backgroundColor: { control: 'color' },
	},
	args: {},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
