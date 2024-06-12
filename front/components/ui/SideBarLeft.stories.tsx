import type { Meta, StoryObj } from "@storybook/react";

import SideBarLeft, { SideBarItem, iconButton } from "./SideBarLeft";
import { RoomRounded, RouterRounded } from "@mui/icons-material";

const meta = {
  component: SideBarLeft,
  title: "SideBarLeft",
} satisfies Meta<typeof SideBarLeft>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => (
    <SideBarLeft
      iconButtons={[{ href: "/", icon: <RoomRounded /> }]}
      items={[{ href: "/", icon: <RouterRounded />, title: "item1" }]}
    />
  ),
  argTypes: { items: Array<SideBarItem>, iconButtons: Array<iconButton> },
  parameters: {
    layout: "centered",
  },
};
