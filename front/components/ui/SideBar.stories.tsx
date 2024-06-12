import { Meta, StoryObj } from "@storybook/react";

import {} from "@storybook/test";
import SideBar from "./SideBar";
import { Box, Link, TextField, Typography } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import AntSwitch from "./AntSwitch";

type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
  render: (props) => (
    <SideBar
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        width: 200,
        padding: 2,
        height: 450,
      }}
      show={true}
      direction="ltr"
      width="200px"
      sideBarFooter={<Typography component={"p"}>side bar footer</Typography>}
      sideBarBody={
        <Box
          sx={{
            "& .col": {},
          }}
        >
          <Col>
            <Row>
              <Typography sx={{}} component={"h2"}>
                Menu header
              </Typography>
            </Row>
            <Box
              sx={{
                ml: 1,
                my: 2,
              }}
            >
              <Row>
                <Col>
                  <Link
                    sx={{
                      textDecoration: "none",
                      fontSize: "20px",
                    }}
                  >
                    Home
                  </Link>
                </Col>
              </Row>
            </Box>
          </Col>
        </Box>
      }
    />
  ),
  parameters: {
    docs: {
      //input doc here
    },
  },
  argTypes: {
    width: { control: "text" },
    direction: { control: "text" },
    show: { control: "boolean" },
  },
};

const meta = {
  title: "SideBar",
  component: SideBar,
  //   tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      // description: {},
    },
  },
} satisfies Meta<typeof SideBar>;

export default meta;
