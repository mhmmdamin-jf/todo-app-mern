"use client";
import { Box } from "@mui/material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useTheme } from "@mui/material";

export default function AuthForm() {
  const formType = useSelector((store) => store.authSlice.formType);
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        "& > *": {
          bgcolor: theme.palette.background.default,
          border: 1,
          borderColor: "transparent",
          boxShadow: 4,
          width: "400px",
          height: "400px",
        },
      }}
    >
      <Box
        sx={{
          padding: "30px",
          "& img": { height: "22px", marginInlineStart: 0.6 },
        }}
      >
        <Image
          id="mclogo"
          alt="mc-logo"
          width={110}
          height={110}
          src="/images/mc-logo.png"
        />
        {formType === "login" && <LoginForm />}
        {formType === "register" && <RegisterForm />}
      </Box>
    </Box>
  );
}
