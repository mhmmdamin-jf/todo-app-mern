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
  const SideBarRef = useRef<HTMLDivElement>();
  const theme = useTheme();
  // document.addEventListener(
  //   "click",
  //   (e) => {
  //     // e.preventDefault();
  //     // e.stopPropagation();
  //     // console.log(e);
  //     // console.log(
  //     //   SideBarRef.current && SideBarRef.current.contains(e.target as any)
  //     // );
  //   },
  //   { capture: true }
  // );

  // const portalContain = document.getElementById("portal-contain");
  // if (portalContain) {
  return (
    <Box
      ref={SideBarRef}
      sx={Object.assign(
        {
          overflowY: "scroll",
          direction: direction,
          height: "100%",
          width: width,
          zIndex: theme.zIndex.drawer,
          " .col": {
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          },
        },
        sx
      )}
    >
      <Box sx={{ position: "fixed" }}></Box>
      <Col id={id}>
        <Row>{sideBarBody}</Row>
        <Row>{sideBarFooter}</Row>
      </Col>
    </Box>
  );
  // }
}

export default SideBar;
