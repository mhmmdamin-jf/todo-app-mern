"use client";

import MainNav from "@/components/navigation/MainNav";
import { Col, Row } from "react-bootstrap";
import TaskToolbar from "@/components/tasks/toolbar/TaskToolbar";
import { ReactNode, useEffect } from "react";
import { Box, Collapse, Stack, TextField, TextFieldProps } from "@mui/material";
import SideBar from "@/components/ui/SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseRounded,
  DoneOutline,
  MenuRounded,
  RoomRounded,
} from "@mui/icons-material";
import {
  getLeftSideBarItems,
  toggleShowSideBarLeft,
  toggleShowSideBarRight,
} from "@/slices/sideBarSlice";
import SideBarLeft from "@/components/ui/SideBarLeft";
import SideBarRight from "@/components/ui/SideBarRight";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import store from "@/store";
export default function Layout({ children }: { children: ReactNode }) {
  const dispatcher = useDispatch<any>();
  useEffect(function () {
    dispatcher(getLeftSideBarItems());
  }, []);
  const { showLeft, showRight, items } = useSelector(
    (store) => store.sideBarSlice
  );
  return (
    <Box
      sx={{
        overflow: "hidden",
        overflowBlock: "scroll",
        height: "100%",
        "& .col": {
          height: "100%",
        },
      }}
    >
      <Col>
        <Row>
          <MainNav />
        </Row>
        <Box
          sx={{
            height: "100%",
            "& > div": {
              // display: "flex",
              // flexDirection: "column",
              height: "100%",
            },
          }}
        >
          <Row>
            <Collapse in={showLeft} orientation="horizontal">
              <Col id="sideBar">
                <SideBarLeft
                  iconButtons={[
                    { href: "/", icon: <DoneOutline /> },
                    { href: "/", icon: <DoneOutline /> },
                    { href: "/", icon: <DoneOutline /> },
                    { href: "/", icon: <DoneOutline /> },
                  ]}
                  items={items}
                />
              </Col>
            </Collapse>
            <Col>
              <TaskToolbar />

              {children}
            </Col>
            <Collapse
              in={showRight}
              orientation="horizontal"
              sx={{ " #sidebarRight": { height: "100%" } }}
            >
              <Col id="sidebarRight" xs={{ span: "12" }}>
                <SideBarRight />
              </Col>
            </Collapse>
          </Row>
        </Box>
      </Col>
    </Box>
  );
}
