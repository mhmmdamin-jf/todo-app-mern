import { CloseRounded, MenuRounded } from "@mui/icons-material";
import {
  Box,
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
import { toggleShowSideBarRight } from "@/slices/sideBarSlice";
import AntSwitch from "./AntSwitch";
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
  const { showRight } = useSelector((store) => store.sideBarSlice);
  const dispatcher = useDispatch();
  const theme = useTheme();
  const sideBarBody = (
    <Box
      sx={{
        "& .row .row .col": { boxShadow: 0, height: "20px" },
        "& .row .row ": { display: "flex", justifyContent: "center", m: 2 },
      }}
    >
      <Row>
        <Row>
          <Col>
            <Typography sx={{ mt: 1 }} component={"h3"}>
              Settings
            </Typography>
          </Col>
          <Col>
            <IconButton
              disableRipple
              onClick={() => dispatcher(toggleShowSideBarRight())}
              sx={{ ml: 2 }}
            >
              <CloseRounded />
            </IconButton>
          </Col>
        </Row>
        <Row>
          <FormControlLabel
            control={<AntSwitch />}
            sx={{
              my: 2,
              ml: -3,
              alignItems: "start",
              " .MuiFormControlLabel-label": {
                ml: 1,
                fontSize: 14,
              },
              width: "100%",
            }}
            labelPlacement="top"
            label="Confirm before deleting"
          />
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
      show={showRight}
      width="300px"
      direction="ltr"
      sideBarBody={sideBarBody}
    />
  );
}

export default SideBarRight;
