import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from './index'

const meta = {
	title: 'Components/canvas',
	component: Component,
	parameters: {
		layout: 'fullscreen',
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
