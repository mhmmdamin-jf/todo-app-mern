"use client";

import { Col, Row } from "react-bootstrap";
import StartPageNav from "../../components/navigation/StartPageNav";
import StartPageContent from "@/components/startPage/StartPageContent";
export default function Home() {
  return (
    <Col>
      <Row xs={"10"}>
        <StartPageNav />
      </Row>
      <Row>
        <StartPageContent />
      </Row>
    </Col>
  );
}
