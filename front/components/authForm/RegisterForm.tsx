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
import BackButton from "../ui/BackButton";
import React, { useState, useTransition, SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/schemas/index";
import { useDispatch, useSelector } from "react-redux";
import { setFormType, signUpUser } from "@/slices/authSlice";
import { AppDispatch } from "@/store/index";
import { fetcher, poster } from "@/utils/axios";
import store from "@/store/index";
import { useRouter } from "next/navigation";
export type resolverErrorPathTypes =
  | "userName"
  | "password"
  | "confirmPassword"
  | "root"
  | `root.${string}`;
export default function RegisterForm() {
  const theme = useTheme();
  const { isLoggedIn } = useSelector((store) => store.authSlice);

  const form = useForm<zod.infer<typeof registerSchema>>({
    defaultValues: { password: "", userName: "", confirmPassword: "" },
    resolver: zodResolver(loginSchema),
  });
  const dispatcher = useDispatch<any>();
  const [lableNumber, setLableNumber] = useState<number>(1);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const submitHandler = () => {
    const formData = form.getValues();

    startTransition(async () => {
      const resolveResault = await registerSchema.safeParse(formData);
      if (resolveResault.error?.errors.length) {
        resolveResault.error.errors.forEach((error) => {
          form.setError(error.path[0] as resolverErrorPathTypes, {
            message: error.message,
          });
        });
      }
      await dispatcher(signUpUser(formData));
      if (isLoggedIn) {
        router.push("/tasks/today");
      }
    });
  };
  const handleBlur = (e: SyntheticEvent) => {
    //@ts-ignore
    if (!e.target.value) {
      form.setError(e.target?.name, {
        message: `${e.target?.name} is required.`,
      });
    }
  };
  const handleNextField = () => {
    console.log(form.getValues());
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
        Create Account
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
              name="userName"
              error={!!form.formState.errors.userName}
              helperText={form.formState.errors.userName?.message}
              variant="standard"
              onChange={(e) => form.setValue("userName", e.target.value)}
              onTouchEnd={handleBlur}
              placeholder="userName ..."
            />
          }
        />
        <FormControlLabel
          label=""
          hidden={lableNumber === 1}
          sx={{ display: lableNumber === 1 ? "none" : "block" }}
          id="input-password"
          control={
            <TextField
              name="password"
              error={!!form.formState.errors.password}
              helperText={form.formState.errors.password?.message}
              variant="standard"
              onChange={(e) => form.setValue("password", e.target.value)}
              onTouchEnd={handleBlur}
              placeholder="password ..."
            />
          }
        />
        <FormControlLabel
          label=""
          hidden={lableNumber === 1}
          sx={{ display: lableNumber === 1 ? "none" : "block" }}
          id="input-confirm-password"
          control={
            <TextField
              name="confirmPassword"
              onChange={(e) => form.setValue("confirmPassword", e.target.value)}
              error={!!form.formState.errors.confirmPassword}
              helperText={form.formState.errors.confirmPassword?.message}
              variant="standard"
              onTouchEnd={handleBlur}
              placeholder="ConfirmPassword ..."
            />
          }
        />
      </FormGroup>
      <BackButton
        id="button-link-signin"
        variant="text"
        text={"Already have account?"}
        sxParent={{ marginInlineStart: 1 }}
        sx={{
          fontWeight: theme.typography.fontWeightLight,
          display: "inline",
          fontSize: 11,
          textTransform: "initial",
        }}
        cb={() => dispatcher(setFormType("login"))}
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
          <Button id="button-back" onClick={() => setLableNumber(1)}>
            Back
          </Button>
        )}
        {lableNumber !== 2 && (
          <Button id="button-next" onClick={handleNextField}>
            Next
          </Button>
        )}
        {lableNumber === 2 && (
          <Button id="button-done" onClick={submitHandler}>
            Done
          </Button>
        )}
      </ButtonGroup>
    </FormControl>
  );
}
