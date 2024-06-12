import { Box, SxProps, Theme, useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";

interface SideBarProps {
  width: string;
  direction?: string;
  show: any;
  sideBarBody?: ReactNode;
  sideBarFooter?: ReactNode;
  sx?: SxProps<Theme> | undefined;
}

function SideBar({
  width,
  sideBarBody,
  sideBarFooter,
  direction = "rtl",
  show,
  sx,
}: SideBarProps) {
  const theme = useTheme();
  if (show) {
    return (
      <Box
        sx={Object.assign(
          {
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
        <Col>
          <Row>{sideBarBody}</Row>
          <Row>{sideBarFooter}</Row>
        </Col>
      </Box>
    );
  }
}

export default SideBar;
