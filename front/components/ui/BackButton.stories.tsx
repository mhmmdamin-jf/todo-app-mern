import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import BackButton from "./BackButton";
const meta = {
  component: BackButton,
  title: "BackButton",
  parameters: {
    layout: "centered",
    docs: {
      //input doc here
    },
  },
  // tags: ["autodocs"],
  argTypes: {
    sx: { control: "object" },
    lable: { control: "text" },
    text: { control: "text" },
    variant: { options: ["text", "contained", "outlined"] },
    sxParent: { control: "object" },
  },
  args: {
    cb: fn(),
  },
} satisfies Meta<typeof BackButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lable: "BackButton1",
    text: "click",
  },
};

export const Example1: Story = {
  args: {
    sxParent: {
      backgroundColor: "blue",
      borderRadius: "8%",
      marginInline: 3,
    },
    lable: "BackButton1",
    text: "click",
    variant: "text",
    sx: { fontSize: "20px", fontWeight: "800", color: "red" },
  },
};
