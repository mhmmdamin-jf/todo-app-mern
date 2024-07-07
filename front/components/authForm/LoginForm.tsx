"use client";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  TextField,
  useTheme,
} from "@mui/material";
import React, { SyntheticEvent, useEffect } from "react";
import BackButton from "../ui/BackButton";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import Cookie from "js-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/index";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {
  setFormType,
  setShowSnackbar,
  setSnackbarText,
  signInUser,
} from "@/slices/authSlice";
import { fetcher } from "@/utils/axios";
import axios from "axios";
import store from "@/store";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { EnhancedStore } from "@reduxjs/toolkit";
export type resolverErrorPathTypes =
  | "userName"
  | "password"
  | "root"
  | `root.${string}`;
export default function LoginForm() {
  const [cookie, setCookie] = useCookies(["jwt"]);
  const theme = useTheme();
  const { isLoggedIn, userData } = useSelector(
    //@ts-ignore
    (store: EnhancedStore) => store.authSlice as any
  );
  const form = useForm<zod.infer<typeof loginSchema>>({
    defaultValues: { password: "", userName: "" },
    resolver: zodResolver(loginSchema),
  });
  const dispatcher = useDispatch<any>();
  const [lableNumber, setLableNumber] = useState<number>(1);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const submitHandler = () => {
    const formData = form.getValues();

    startTransition(async () => {
      const resolveResault = await loginSchema.safeParse(formData);
      if (resolveResault.error?.errors.length) {
        resolveResault.error.errors.forEach((error) => {
          form.setError(error.path[0] as resolverErrorPathTypes, {
            message: error.message,
          });
        });
      }
      const loginResault = await dispatcher(signInUser(formData));
      if (isLoggedIn) {
        dispatcher(setShowSnackbar("Logged in successfully"));
        // Cookie.set("jwt", userData.token);
        setCookie("jwt", userData.token, {
          secure: false,
          expires: new Date(Date.now() + 1000 * 3600 * 24 * 90),
        });
        router.push("/tasks/today");
      }
      // if(isLoggedIn){

      // }
    });
  };
  const handleBlur = (e: SyntheticEvent) => {
    //@ts-ignore
    if (!e.target.value) {
      //@ts-ignore
      form.setError(e.target?.name, {
        //@ts-ignore
        message: `${e.target?.name} is required.`,
      });
    }
  };
  const handleNextField = () => {
    form.setValue("password", "");
    if (form.getValues("userName").length === 0) {
      form.setError("userName", { message: "user name is required." });
      return;
    }

    if (lableNumber !== 2) {
      setLableNumber(() => 2);
    }
  };
  return (
    <FormControl
      data-aos="fade-right"
      sx={{
        " .MuiFormLabel-asterisk": { display: "none" },
        " .MuiFormLabel-root": { marginInlineStart: 0.7 },
        width: "100%",
        height: "100%",
      }}
      disabled={isPending}
      component="fieldset"
      required
      onSubmit={form.handleSubmit(submitHandler)}
    >
      <FormLabel
        sx={{
          fontSize: theme.typography.h5,
          marginY: 3,
        }}
      >
        Signin
      </FormLabel>
      <FormGroup
        sx={{
          " .MuiFormControlLabel-root": { width: "320px", mx: "auto" },
          " .MuiInput-root": { width: "320px" },
        }}
      >
        <FormControlLabel
          label=""
          hidden={lableNumber === 2}
          sx={{ display: lableNumber === 2 ? "none" : "block" }}
          id="input-userName"
          control={
            <TextField
              {...form.register("userName")}
              name="userName"
              onChange={(e) => form.setValue("userName", e.target.value)}
              error={!!form.formState.errors.userName}
              helperText={form.formState.errors.userName?.message}
              variant="standard"
              onTouchEnd={handleBlur}
              placeholder="userName ..."
            />
          }
        />
        <FormControlLabel
          label=""
          name="password"
          id="input-password"
          hidden={lableNumber === 1}
          sx={{ display: lableNumber === 1 ? "none" : "block" }}
          control={
            <TextField
              aria-description="password"
              {...form.register("password")}
              name="password"
              type="password"
              onChange={(e) => form.setValue("password", e.target.value)}
              error={!!form.formState.errors.password}
              helperText={form.formState.errors.password?.message}
              variant="standard"
              onBlur={handleBlur}
              placeholder="password ..."
            />
          }
        />
      </FormGroup>
      <BackButton
        id="button-link-signin"
        variant="text"
        lable="New User?"
        text={"Create one"}
        sxParent={{ marginInlineStart: 1 }}
        sx={{
          fontWeight: theme.typography.fontWeightLight,
          display: "inline",
          fontSize: 11,
          textTransform: "initial",
        }}
        cb={() => dispatcher(setFormType("register"))}
      />
      <ButtonGroup
        variant="contained"
        sx={{
          gap: 0.7,
          marginInlineEnd: 0,
          bgcolor: "transparent",
          "& .MuiButton-root": {
            borderRadius: 0.3,
            paddingInline: 5,
            display: "flex",
            alignItems: "center",
            fontSize: 10,
            fontWeight: 3,
            textTransform: "capitalize",
          },
        }}
        disableElevation
      >
        {lableNumber !== 1 && (
          <Button onClick={() => setLableNumber(1)}>Back</Button>
        )}
        {lableNumber !== 2 && (
          <Button id="button-next" onClick={handleNextField}>
            Next
          </Button>
        )}
        {lableNumber === 2 && (
          <Button type="submit" id="button-done" onClick={submitHandler}>
            Done
          </Button>
        )}
      </ButtonGroup>
    </FormControl>
  );
}
