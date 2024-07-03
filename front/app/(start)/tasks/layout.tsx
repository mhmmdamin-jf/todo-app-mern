"use client";

import MainNav from "@/components/navigation/MainNav";
import { Col, Row } from "react-bootstrap";
import TaskToolbar from "@/components/tasks/toolbar/TaskToolbar";
import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Collapse,
  PaletteMode,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import SideBar from "@/components/ui/SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  AttachFileOutlined,
  CalendarMonthRounded,
  CloseRounded,
  DoneOutline,
  EmailOutlined,
  MenuRounded,
  PeopleAltOutlined,
  RoomRounded,
} from "@mui/icons-material";
import {
  getLeftSideBarItems,
  toggleShowSideBarLeft,
  toggleShowSideBarRight,
} from "@/slices/sideBarSlice";
import SideBarLeft, { iconButton } from "@/components/ui/SideBarLeft";
import SideBarRight from "@/components/ui/SideBarRight";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import store from "@/store";
import { EnhancedStore, Reducer, ReducerType } from "@reduxjs/toolkit";
import { useTheme } from "@/contexts/theme";
import SideBarFeedBack from "@/components/ui/SideBarFeedBack";
export default function Layout({ children }: { children: ReactNode }) {
  const dispatcher = useDispatch<any>();

  useEffect(function () {
    dispatcher(getLeftSideBarItems());
  }, []);
  const { showLeft, showRight, items, showFeedback } = useSelector(
    //@ts-ignore
    (store: EnhancedStore) => store.sideBarSlice as any
  );
  const { theme, toggleTheme, appTheme } = useTheme();
  return (
    <div id="portal-contain">
      <Box
        bgcolor={theme.palette.background.default}
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
          <Row>
            <button
              style={{
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.common.black
                    : theme.palette.common.white,
              }}
              onClick={() => toggleTheme()}
            >
              {appTheme}
            </button>
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
            <Box>
              <Collapse
                in={showLeft}
                orientation="horizontal"
                sx={{ px: 0, pl: 1.5 }}
                id="sideBar-l"
              >
                <Col id="sideBar">
                  <SideBarLeft
                    //@ts-ignore
                    iconButtons={[
                      { href: "/", icon: <EmailOutlined /> } as iconButton,
                      {
                        href: "/",
                        icon: <CalendarMonthRounded />,
                      } as iconButton,
                      { href: "/", icon: <PeopleAltOutlined /> } as iconButton,
                      { href: "/", icon: <AttachFileOutlined /> } as iconButton,
                      {
                        href: "/",
                        icon: <DoneOutline />,
                        sx: { color: theme.palette.primary.main },
                      } as iconButton,
                    ]}
                    items={items}
                  />
                </Col>
              </Collapse>
              <Col>
                <Box
                  sx={{
                    "& .MuiBox-root": {
                      bgcolor: theme.palette.background.default,
                      mt: 0.8,
                    },
                  }}
                >
                  <TaskToolbar />
                  {children}
                </Box>
              </Col>
              <Collapse
                in={showFeedback}
                orientation="vertical"
                sx={{ " #sidebarRight": { height: "100%" }, height: "100%" }}
              >
                <Col id="sidebarRight" xs={{ span: "12" }}>
                  <SideBarFeedBack />
                </Col>
              </Collapse>
              <Collapse
                in={showRight}
                orientation="horizontal"
                sx={{ " #sidebarFeedBack": { height: "100%" }, height: "100%" }}
              >
                <Col id="sidebarFeed" xs={{ span: "12" }}>
                  <SideBarRight />
                </Col>
              </Collapse>
            </Box>
          </Box>
        </Col>
      </Box>
    </div>
  );
}
