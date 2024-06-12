import type { Meta, StoryObj } from "@storybook/react";

import TaskDataList from "./TaskDataList";
import { taskDummyData } from "./TaskDataGrid";

const meta = {
  component: TaskDataList,
  render: (props) => <TaskDataList cells={taskDummyData} />,
} satisfies Meta<typeof TaskDataList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
