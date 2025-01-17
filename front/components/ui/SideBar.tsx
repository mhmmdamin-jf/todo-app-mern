"use client";
import { Box, SxProps, Theme, useTheme } from "@mui/material";
import React, { ReactNode, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { createPortal } from "react-dom";

interface SideBarProps {
  width: string;
  direction?: string;
  sideBarBody?: ReactNode;
  sideBarFooter?: ReactNode;
  sx?: SxProps<Theme> | undefined;
  id?: string;
}

function SideBar({
  width,
  sideBarBody,
  sideBarFooter,
  direction = "rtl",
  id,
  sx,
}: SideBarProps) {
  const theme = useTheme();
  return (
    <Box
      sx={Object.assign(
        {
          overflowY: "scroll",
          direction: direction,
          height: "93%",
          width: width,
          zIndex: 200,

          " .col": {
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          },
          " .row": { mr: 0 },
        },
        sx
      )}
    >
      <Col id={id}>
        <Row>{sideBarBody}</Row>
        <Row>{sideBarFooter}</Row>
      </Col>
    </Box>
  );
  // }
}

export default SideBar;
