import type { Meta, StoryObj } from '@storybook/react-vite';
// import { fn } from 'storybook/test';
import Component from './index';

const meta = {
	title: 'Components/Event',
	component: Component,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		datetime: { control: 'date' },
		// backgroundColor: { control: 'color' },
	},
	args: {
		// onClick: fn()
	},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		datetime: new Date('2024-06-01T18:00:00'),
		title: 'Bergen International Film Festival',
		description:
			'Films from all over the world gather all film enthusiasts for unique moments at the Bergen International Film Festival.',
		id: '1',
	},
};
