import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from './index'

const meta = {
	title: 'Components/empty state',
	component: Component,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'light',
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {},
}
