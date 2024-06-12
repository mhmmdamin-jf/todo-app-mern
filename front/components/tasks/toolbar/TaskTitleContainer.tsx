import ToolBarButton from "@/components/ui/ToolBarButton";
import { Menu } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import TaskToolbarTitleItem from "./TaskToolbarTitleItem";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowSideBarLeft } from "@/slices/sideBarSlice";

function TaskTitleContainer() {
  const dispatcher = useDispatch();
  const { showLeft } = useSelector((store) => store.sideBarSlice);
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        "& .row": { alignItems: "center" },
        "& .row *": { color: theme.palette.text.primary },
      }}
    >
      <Row>
        {!showLeft && (
          <Col xs={{ span: "1" }}>
            <Button onClick={() => dispatcher(toggleShowSideBarLeft())}>
              <Menu sx={{ fontSize: 20 }} />
            </Button>
          </Col>
        )}
        <Col xs={{ span: "3" }} sm={{ span: "2" }}>
          <Typography
            component={"h6"}
            sx={{
              fontSize: 15,
              textAlign: "center",
              width: "100%",
              whiteSpace: "none",
            }}
          >
            My Day
          </Typography>
        </Col>
        <Col xs={{ span: "1" }}>
          <ToolBarButton />
        </Col>
        {!isSmDown && (
          <Col>
            <TaskToolbarTitleItem />
          </Col>
        )}
      </Row>
    </Box>
  );
}

export default TaskTitleContainer;
