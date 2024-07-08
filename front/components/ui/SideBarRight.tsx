"use client";
import { CloseRounded, MenuRounded } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useTheme as useAppTheme } from "@/contexts/theme";
import { DatePicker } from "@mui/lab";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import { toggleShowSideBarRight } from "@/slices/sideBarSlice";
import AntSwitch from "./AntSwitch";
import { EnhancedStore } from "@reduxjs/toolkit";
export type SideBarRightItem = {
  title: string;
  href: string;
  icon: ReactNode;
};
export type iconButton = {
  href: string;
  icon: ReactNode;
};
function SideBarRight() {
  const { toggleBTN } = useSelector(
    //@ts-ignore
    (store: EnhancedStore) => store.sideBarSlice as any
  );
  const dispatcher = useDispatch();
  const theme = useTheme();
  const { toggleTheme, setDarkTheme } = useAppTheme();
  const sideBarBody = (
    <Box
      sx={{
        "& .row .row .col": {
          boxShadow: 0,
          height: "20px",
          width: "100%",
          mx: -1.8,
        },
        "& .row .row .MuiFormControl-root": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ml: 2,
        },
        "& .row .row ": {
          display: "flex",
          justifyContent: "center",
          mx: 2,
          my: 1,
        },
        height: "100%",
        overflowX: "hidden",
      }}
    >
      <Row>
        <Row>
          <Col>
            <Typography sx={{ fontSize: 20 }} component={"h3"}>
              Settings
            </Typography>
          </Col>
          <Col>
            <IconButton
              onClick={() => dispatcher(toggleShowSideBarRight())}
              sx={{ ml: 10, borderRadius: "100%", width: "30%", mt: -0.6 }}
            >
              <CloseRounded />
            </IconButton>
          </Col>
        </Row>
        <Row>
          <FormControl>
            <FormControlLabel
              control={<AntSwitch />}
              sx={{
                my: 0,
                ml: -3,
                alignItems: "start",
                " .MuiFormControlLabel-label": {
                  ml: 1.4,
                  fontSize: 14,
                  mb: -1,
                },
                width: "100%",
              }}
              labelPlacement="top"
              label="Confirm before deleting"
            />
            <FormControlLabel
              control={<AntSwitch />}
              sx={{
                my: 0,
                ml: -3,
                alignItems: "start",
                " .MuiFormControlLabel-label": {
                  ml: 1.4,
                  fontSize: 14,
                  mb: -1,
                },
                width: "100%",
              }}
              labelPlacement="top"
              label="Add new tasks on top"
            />
            <FormControlLabel
              control={<AntSwitch />}
              sx={{
                my: 0,
                ml: -3,
                alignItems: "start",
                " .MuiFormControlLabel-label": {
                  ml: 1.4,
                  fontSize: 14,
                  mb: -1,
                },
                width: "100%",
              }}
              labelPlacement="top"
              label="Move starred tasks to top"
            />
            <FormControlLabel
              control={<AntSwitch />}
              sx={{
                my: 0,
                ml: -3,
                alignItems: "start",
                " .MuiFormControlLabel-label": {
                  ml: 1.4,
                  fontSize: 14,
                  mb: -1,
                },
                width: "100%",
              }}
              labelPlacement="top"
              label="Play completion sound"
            />
            <FormControlLabel
              control={<AntSwitch />}
              sx={{
                my: 0,
                ml: -3,
                alignItems: "start",
                " .MuiFormControlLabel-label": {
                  ml: 1.4,
                  fontSize: 14,
                  mb: -1,
                },
                width: "100%",
              }}
              labelPlacement="top"
              label="Show right-click menus"
            />
            <FormControlLabel
              control={<AntSwitch />}
              sx={{
                my: 0,
                ml: -3,
                alignItems: "start",
                " .MuiFormControlLabel-label": {
                  ml: 1.4,
                  fontSize: 14,
                  mb: -1,
                },
                width: "100%",
              }}
              labelPlacement="top"
              label="Turn on reminder notifications"
            />
            <FormControlLabel
              onClick={() => {}}
              control={
                <AntSwitch
                  onClick={() => {
                    toggleBTN?.current?.click();
                    console.log(12);
                  }}
                />
              }
              sx={{
                my: 0,
                ml: -3,
                alignItems: "start",
                " .MuiFormControlLabel-label": {
                  ml: 1.4,
                  fontSize: 14,
                  mb: -1,
                },
                width: "100%",
              }}
              labelPlacement="top"
              label="Turn on night mode"
            />
          </FormControl>
        </Row>
        <Row>
          <Col>
            <Typography sx={{ fontSize: 20, ml: -2 }} component={"h3"}>
              Smart lists
            </Typography>
          </Col>
        </Row>
        <Row>
          <FormControl>
            <FormControlLabel
              control={<AntSwitch />}
              sx={{
                my: 0,
                ml: -3,
                alignItems: "start",
                " .MuiFormControlLabel-label": {
                  ml: 1.4,
                  fontSize: 14,
                  mb: -1,
                },
                width: "100%",
              }}
              labelPlacement="top"
              label="Importance"
            />
            <FormControlLabel
              control={<AntSwitch />}
              sx={{
                my: 0,
                ml: -3,
                alignItems: "start",
                " .MuiFormControlLabel-label": {
                  ml: 1.4,
                  fontSize: 14,
                  mb: -1,
                },
                width: "100%",
              }}
              labelPlacement="top"
              label="Completed"
            />
            <FormControlLabel
              control={<AntSwitch />}
              sx={{
                my: 0,
                ml: -3,
                alignItems: "start",
                " .MuiFormControlLabel-label": {
                  ml: 1.4,
                  fontSize: 14,
                  mb: -1,
                },
                width: "100%",
              }}
              labelPlacement="top"
              label="Auto-hide empty smart lists"
            />
          </FormControl>
        </Row>
        <Row>
          <Col>
            <Typography sx={{ fontSize: 20, ml: -2 }} component={"h3"}>
              Notifications
            </Typography>
          </Col>
        </Row>
        <Row>
          <FormControl>
            <FormControlLabel
              control={<AntSwitch />}
              sx={{
                my: 0,
                ml: -3,
                alignItems: "start",
                " .MuiFormControlLabel-label": {
                  ml: 1.4,
                  fontSize: 14,
                  mb: -1,
                },
                width: "100%",
              }}
              labelPlacement="top"
              label="Email"
            />
          </FormControl>
        </Row>
      </Row>
      <Row>
        <Box
          sx={{
            height: "100%",
            marginBlockEnd: "70%",
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        ></Box>
      </Row>
    </Box>
  );
  return (
    <SideBar
      id="sideBar-r"
      width="300px"
      direction="ltr"
      sideBarBody={sideBarBody}
      sx={{ boxShadow: 4 }}
    />
  );
}

export default SideBarRight;
