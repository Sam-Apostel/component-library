import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import Component, { TimelineProvider } from './index';

const meta = {
	title: 'Components/timeline',
	component: Component,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		dayProgress: {
			control: 'range',
			min: 0,
			max: 100,
			step: 1,
		},
		columns: { control: 'number' },
		rows: { control: 'number' },
	},
	args: {
		dayProgress: 38,
		// onClick: fn()
	},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
	render: (props) => (
		<TimelineProvider
			initialState={[
				{
					id: '1',
					row: 1,
					column: 2,
					span: 3,
					color: '#ffb3ba',
					label: 'Beta',
				},
				{
					id: '2',
					row: 2,
					column: 4,
					span: 6,
					color: '#8ac6ff',
					label: 'Launch Week',
				},
				{
					id: '3',
					row: 3,
					column: 9,
					span: 2,
					color: '#85c994',
					label: 'Party',
				},
			]}
		>
			<Component {...props} />
		</TimelineProvider>
	),
};
