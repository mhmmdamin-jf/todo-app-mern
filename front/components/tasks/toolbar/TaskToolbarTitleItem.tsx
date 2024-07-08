import { setShowTaskGrid, setShowTaskList } from "@/slices/taskSlice";
import { SortRounded, Window } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  useMediaQuery,
  useTheme,
  Grow,
} from "@mui/material";
import React from "react";
import { EnhancedStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

function TaskToolbarTitleItem() {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatcher = useDispatch<any>();
  //@ts-ignore
  const { showTasks } = useSelector((store: EnhancedStore) => store.taskSlice);
  return (
    <Box>
      <ButtonGroup
        variant="text"
        sx={{
          "& .MuiButtonGroup-grouped": { mx: 1 },
          "& .MuiButton-text": {
            color: theme.palette.text.secondary,
            fontSize: 12,
            border: 0,
          },
        }}
      >
        <Box>
          <Button
            onClick={() => dispatcher(setShowTaskGrid())}
            startIcon={<Window />}
          >
            {isLgUp && "Grid"}
          </Button>
          <Grow in={showTasks === "Grid"}>
            <Box
              sx={{ border: 1.4, borderRadius: 10, width: "70%", mx: "auto" }}
            />
          </Grow>
        </Box>

        <Box>
          <Button
            onClick={() => dispatcher(setShowTaskList())}
            startIcon={<SortRounded />}
          >
            {isLgUp && "List"}
          </Button>
          <Grow in={showTasks === "List"}>
            <Box
              sx={{ border: 1.4, borderRadius: 10, width: "70%", mx: "auto" }}
            />
          </Grow>
        </Box>
      </ButtonGroup>
    </Box>
  );
}

export default TaskToolbarTitleItem;
