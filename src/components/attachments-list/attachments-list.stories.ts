import type { Meta, StoryObj } from '@storybook/react-vite';
import Component from './index';

const meta = {
	title: 'Components/attachments list',
	component: Component,
	parameters: {
		layout: 'centered',
	},
	globals: { backgrounds: { value: 'white' } },
	tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
