import {
  CropSquare,
  LightbulbOutlined,
  SwapVertRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EnhancedStore } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";

function TaskToolbarActions() {
  //@ts-ignore
  const { showRight } = useSelector((store:EnhancedStore) => store.sideBarSlice as any);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box>
      <ButtonGroup
        sx={{
          alignItems: "center",
          " .MuiButtonGroup-grouped": {
            fontSize: 12,
            color: theme.palette.text.primary,
            border: 0,
            zIndex: theme.zIndex.fab,
          },
          " .MuiButtonGroup-grouped:hover": {
            border: 0,
          },
        }}
      >
        <Button startIcon={<SwapVertRounded />}>
          {isMdUp && !showRight && "Sort"}
        </Button>
        <Button startIcon={<CropSquare />}>
          {isMdUp && !showRight && "List"}
        </Button>
        <Button startIcon={<LightbulbOutlined />}>
          {isMdUp && !showRight && "Suggestions"}
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default TaskToolbarActions;
