"use client";
import AddTaskTo from "@/components/tasks/AddTaskTo";
import Tasks from "@/components/tasks/Tasks";
import { useTheme } from "@/contexts/theme";
import { Box, useMediaQuery } from "@mui/material";
import { Col, Row } from "react-bootstrap";

export default function Today() {
  const { theme } = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        marginBlock: "auto",
        height: "100%",
        width: isSmUp ? "95%" : "80%",
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
          <Box sx={{ mt: 5 }}>
            <AddTaskTo />
          </Box>
        </Row>
        <Row>
          <Tasks />
        </Row>
      </Col>
    </Box>
  );
}
