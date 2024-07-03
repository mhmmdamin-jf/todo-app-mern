import { Meta, StoryObj } from "@storybook/react";
import DateString from "./DateString";
type Story = StoryObj<typeof DateString>;

export const Default: Story = {
  render: (props) => <DateString id="someId" />,
  parameters: {},
  argTypes: {
    id: { control: "text" },
  },
};

const meta = {
  title: "DateString",
  component: () => <DateString id="someId" />,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {},
    },
  },
} satisfies Meta<typeof Default>;

export default meta;
