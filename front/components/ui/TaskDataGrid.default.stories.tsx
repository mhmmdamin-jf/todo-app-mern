import type { Meta, StoryObj } from "@storybook/react";

import TaskDataGrid, { taskDummyData } from "./TaskDataGrid";

const meta = {
  component: TaskDataGrid,
  render: (props) => <TaskDataGrid cells={taskDummyData} />,
} satisfies Meta<typeof TaskDataGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
