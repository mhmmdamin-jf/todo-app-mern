import { Meta, StoryObj } from "@storybook/react";
import TaskDataGrid, { taskDummyData } from "./TaskDataGrid";
import { taskType } from "./TaskDataList";

type Story = StoryObj<typeof TaskDataGrid>;

export const Default: Story = {
  render: (props) => <TaskDataGrid {...props} />,
  parameters: {
    docs: {
      //input doc here
    },
  },
  args: {
    //No interface found in the current file
  },
  argTypes: {
    //No interface found in the current file
  },
};

const meta = {
  title: "TaskDataGrid",
  component: () => <TaskDataGrid cells={taskDummyData} size="small" />,
  //   tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {},
    },
  },
} satisfies Meta<typeof TaskDataGrid>;

export default meta;
