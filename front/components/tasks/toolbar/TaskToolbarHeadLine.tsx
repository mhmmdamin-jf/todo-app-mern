"use client";
import DateString from "@/components/ui/DateString";
import React from "react";
import { Col, Row } from "react-bootstrap";
import TaskTitleContainer from "./TaskTitleContainer";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { EnhancedStore } from "@reduxjs/toolkit";

function TaskToolbarHeadLine() {
  //@ts-ignore
  const { showLeft } = useSelector((store:EnhancedStore) => store.sideBarSlice as any);
  return (
    <Box>
      <Col>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            ml: showLeft ? 4 : 0,
            " .row": {
              width: "100%",
            },
          }}
        >
          <Row>
            <TaskTitleContainer />
          </Row>
        </Box>
        <Row>
          <DateString id={"today"} />
        </Row>
      </Col>
    </Box>
  );
}

export default TaskToolbarHeadLine;
