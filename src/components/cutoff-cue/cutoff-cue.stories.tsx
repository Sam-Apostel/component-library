import type { Meta, StoryObj } from '@storybook/react-vite';
import Component, {
	CutoffCueAnimationTimeline,
	CutoffCueCoverTrick,
	CutoffCueIntersectionObserver,
	CutoffCueScrollListener,
	CutoffCueScrollState,
} from './index';

const meta = {
	title: 'Components/cutoff cue',
	component: Component,
	parameters: {
		layout: 'centered',
	},
	globals: {
		backgrounds: {
			value: 'dark',
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {};

export const ScrollStateContainerQuery: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Pure CSS: the sticky header is a `container-type: scroll-state` container and the border queries `scroll-state(stuck: top)`. Chrome 133+.',
			},
		},
	},
	render: () => <CutoffCueScrollState />,
};

export const ScrollDrivenAnimation: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Pure CSS: a named `scroll-timeline` on the container scrubs a fade-in keyframe over the first 3rem of scroll. Chrome 115+.',
			},
		},
	},
	render: () => <CutoffCueAnimationTimeline />,
};

export const ScrollListener: Story = {
	parameters: {
		docs: {
			description: {
				story: 'JS: an `onScroll` handler toggles the border once `scrollTop > 0`. Works everywhere.',
			},
		},
	},
	render: () => <CutoffCueScrollListener />,
};

export const IntersectionObserverSentinel: Story = {
	parameters: {
		docs: {
			description: {
				story: 'JS: an IntersectionObserver watches a 1px sentinel at the top of the scroll content — no per-frame work, only transition callbacks.',
			},
		},
	},
	render: () => <CutoffCueIntersectionObserver />,
};

export const BorderCover: Story = {
	parameters: {
		docs: {
			description: {
				story: 'No modern CSS, no JS: a permanently-stuck sticky border is hidden at rest by a background-coloured cover that scrolls away with the content. z-stack: sticky header, scrolling cover, sticky border, scrolling content.',
			},
		},
	},
	render: () => <CutoffCueCoverTrick />,
};
