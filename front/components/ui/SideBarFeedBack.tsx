"use client";
import { CloseRounded, MenuRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import { toggleShowSideBarFeedBack } from "@/slices/sideBarSlice";
import AntSwitch from "./AntSwitch";
import { EnhancedStore } from "@reduxjs/toolkit";
import BackButton from "./BackButton";
export type SideBarFeedBackItem = {
  title: string;
  href: string;
  icon: ReactNode;
};
export type iconButton = {
  href: string;
  icon: ReactNode;
};
function SideBarFeedBack() {
  const { showFeedback } = useSelector(
    //@ts-ignore
    (store: EnhancedStore) => store.sideBarSlice as any
  );
  const dispatcher = useDispatch();
  const theme = useTheme();
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
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Row>
        <Row>
          <Col>
            <Typography sx={{ fontSize: 20 }} component={"h3"}>
              Help
            </Typography>
          </Col>
          <Col>
            <IconButton
              onClick={() => dispatcher(toggleShowSideBarFeedBack())}
              sx={{ ml: 10, borderRadius: "100%", width: "30%", mt: -0.6 }}
            >
              <CloseRounded />
            </IconButton>
          </Col>
        </Row>
        <Row>
          <BackButton
            href="/help"
            text="learn more"
            variant="text"
            sx={{
              fontSize: 10,
              ml: -2.6,
              "&:hover": {
                bgcolor: "transparent",
                textDecoration: "underline",
              },
            }}
          />
        </Row>
        <Row>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              ml: -2.6,
            }}
          >
            <Button
              variant="contained"
              disableElevation
              sx={{
                bgcolor: theme.palette.primary.main,
                borderRadius: 1.5,
                width: "fit-content",
                fontSize: 13,
                textTransform: "capitalize",
                minWidth: 0,
              }}
            >
              Sync
            </Button>
            <Typography component={"h5"}>Up to date</Typography>
          </Box>
        </Row>
      </Row>
    </Box>
  );
  return (
    <SideBar
      width="300px"
      direction="ltr"
      sideBarBody={sideBarBody}
      sx={{ boxShadow: 4 }}
    />
  );
}

export default SideBarFeedBack;
