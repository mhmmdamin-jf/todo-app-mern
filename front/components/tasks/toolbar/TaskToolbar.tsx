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
        mt: 1,
      }}
    >
      <Row>
        <Col xs={{ span: "7" }}>
          <TaskToolbarHeadLine />
        </Col>
        <Col
          md={{ span: "4" }}
          lg={{ offset: "2", span: "3" }}
          xs={{ span: "3", offset: "1" }}
        >
          <TaskToolbarActions />
        </Col>
      </Row>
    </Box>
  );
}

export default TaskToolbar;
