"use client";
import DateString from "@/components/ui/DateString";
import React from "react";
import { Col, Row } from "react-bootstrap";
import TaskTitleContainer from "./TaskTitleContainer";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { EnhancedStore } from "@reduxjs/toolkit";

function TaskToolbarHeadLine() {
  const { showLeft } = useSelector(
    //@ts-ignore
    (store: EnhancedStore) => store.sideBarSlice as any
  );
  return (
    <Box>
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
        <TaskTitleContainer />
      </Box>
      <Box sx={{ pl: 8 }}>
        <DateString id={"today"} />
      </Box>
    </Box>
  );
}

export default TaskToolbarHeadLine;
