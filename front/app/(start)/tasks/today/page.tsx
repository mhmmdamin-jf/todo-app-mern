"use client";
import AddTaskTo from "@/components/tasks/AddTaskTo";
import Tasks from "@/components/tasks/Tasks";
import { useTheme } from "@/contexts/theme";
import { Box } from "@mui/material";
import { Col, Row } from "react-bootstrap";

export default function Today() {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,

        marginBlock: "auto",
        height: "100%",
        width: "80%",
        marginInline: "auto",
        "& .col": {
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        },
      }}
    >
      <Col>
        <Row>
          <AddTaskTo />
        </Row>
        <Row>
          <Tasks />
        </Row>
      </Col>
    </Box>
  );
}
