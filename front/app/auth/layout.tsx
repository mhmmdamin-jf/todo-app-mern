"use client";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme, Snackbar, IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import Aos from "aos";
import React, { useEffect } from "react";
import store from "@/store";
import { setCloseSnackbar, setShowSnackbar } from "@/slices/authSlice";
import { EnhancedStore } from "@reduxjs/toolkit";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const { snackbarText, showSnakBar } = useSelector(
    //@ts-ignore
    (store: EnhancedStore) => store.authSlice as any
  );
  const dispatcher = useDispatch<any>();
  useEffect(function () {
    Aos.init();
  }, []);
  const handleCloseSnackbar = (e: any) => {
    dispatcher(setCloseSnackbar());
  };
  const closeSnackBarAction = (
    <IconButton onClick={handleCloseSnackbar}>
      <CloseRounded sx={{ color: theme.palette.common.white }} />
    </IconButton>
  );
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
      <Snackbar
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarText}
        open={showSnakBar}
        action={closeSnackBarAction}
      />
      {children}
    </Box>
  );
}
