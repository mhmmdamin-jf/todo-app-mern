import type { Meta, StoryObj } from '@storybook/react';

import ToolBarButton from './ToolBarButton';

const meta = {
  component: ToolBarButton,
} satisfies Meta<typeof ToolBarButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};