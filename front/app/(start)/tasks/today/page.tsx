import AddTaskTo from "@/components/tasks/AddTaskTo";
import Tasks from "@/components/tasks/Tasks";
import { Box } from "@mui/material";
import { Col, Row } from "react-bootstrap";

export default function page() {
  return (
    <Box
      sx={{
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
