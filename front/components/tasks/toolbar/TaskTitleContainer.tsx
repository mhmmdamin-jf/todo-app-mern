import ToolBarButton from "@/components/ui/ToolBarButton";
import { Menu } from "@mui/icons-material";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import TaskToolbarTitleItem from "./TaskToolbarTitleItem";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowSideBarLeft } from "@/slices/sideBarSlice";
import { EnhancedStore } from "@reduxjs/toolkit";
import { useTheme } from "@/contexts/theme";
import { usePathname } from "next/navigation";

function TaskTitleContainer() {
  const dispatcher = useDispatch();
  const { showLeft } = useSelector(
    //@ts-ignore
    (store: EnhancedStore) => store.sideBarSlice as any
  );
  const { theme } = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const pathName = usePathname();
  return (
    <Box
      sx={{
        "& .row": { alignItems: "center" },
        "& .row *": { color: theme.palette.text.secondary },
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
            component={"span"}
            sx={{
              fontSize: 15,
              textAlign: "center",
              width: "100%",
              whiteSpace: "none",
              textTransform: "capitalize",
            }}
          >
            {pathName.split("/")[2]}
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
