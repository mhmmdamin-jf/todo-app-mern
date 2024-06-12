import { SortRounded, Window } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

function TaskToolbarTitleItem() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box>
      <ButtonGroup
        variant="text"
        sx={{
          "& .MuiButtonGroup-grouped": { mx: 1, borderInline: 0 },
          "& .MuiButton-text": {
            color: theme.palette.text.secondary,
            fontSize: 12,
          },
        }}
      >
        <Button startIcon={<Window />}>{isSmUp && "Grid"}</Button>
        <Button startIcon={<SortRounded />}>{isSmUp && "List"}</Button>
      </ButtonGroup>
    </Box>
  );
}

export default TaskToolbarTitleItem;
