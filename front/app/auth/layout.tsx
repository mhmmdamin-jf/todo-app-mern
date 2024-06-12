"use client";
import { Box, useTheme } from "@mui/material";
import Aos from "aos";
import React, { useEffect } from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  useEffect(function () {
    Aos.init();
  }, []);
  return (
    <Box
      sx={{
        width: "100svm",
        height: "100%",
        bgcolor: theme.palette.background.paper,
        "& *": {
          margin: "auto",
        },
      }}
    >
      {children}
    </Box>
  );
}
