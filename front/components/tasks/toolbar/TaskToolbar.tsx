"use client";
import { Box } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import TaskToolbarHeadLine from "@/components/tasks/toolbar/TaskToolbarHeadLine";
import TaskToolbarActions from "@/components/tasks/toolbar/TaskToolbarActions";
import { useTheme } from "@/contexts/theme";
function TaskToolbar() {
  const { theme } = useTheme();
  return (
    <Box
      bgcolor={theme.palette.background.default}
      sx={{
        maxHeight: "fit-content",
        display: "flex",
        "& *": { color: theme.palette.text.secondary },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <TaskToolbarHeadLine />
      </Box>
      <Box>
        <TaskToolbarActions />
      </Box>
    </Box>
  );
}

export default TaskToolbar;
