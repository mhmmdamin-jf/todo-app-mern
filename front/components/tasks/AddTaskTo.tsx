"use client";
import { useKey } from "@/hooks/useKey";
import { taskSchema } from "@/schemas";
import { addTask } from "@/slices/taskSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarMonthRounded,
  CircleOutlined,
  LoopRounded,
  NotificationsOutlined,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import * as zod from "zod";

function AddTaskTo() {
  const theme = useTheme();
  const dispatcher = useDispatch<any>();
  const form = useForm<zod.infer<typeof taskSchema>>({
    defaultValues: { dueDate: "", title: "" },
    resolver: zodResolver(taskSchema),
  });
  useKey({
    key: "enter",
    action: async () => {
      await dispatcher(addTask({ values: form.getValues() }));
    },
    usingCtrl: false,
  });
  return (
    <Box
      sx={{
        boxShadow: 2,
        borderRadius: 1,
        mx: "auto",
        "& div": { padding: 0.6 },
        "& .MuiFormControl-root": {
          width: "100%",
        },
      }}
    >
      <FormControl>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: 0.6,
            "& .MuiInput-input": {
              fontSize: 15,
              fontWeight: theme.typography.h2.fontWeight,
            },
            borderColor: theme.palette.grey["300"],
            "& .MuiInput-input::placeholder": {
              fontSize: 13,
              color: theme.palette.text.primary,
              fontWeight: theme.typography.fontWeightMedium,
            },
          }}
        >
          <IconButton disableRipple>
            <CircleOutlined />
          </IconButton>
          {/* <Input
            id="task-title-input"
            disableUnderline
            onChange={(e) => form.setValue("title", e.target.value)}
            placeholder="Add a task"
          /> */}
          <FormControlLabel
            label=""
            control={
              <Input
                name="title"
                id="task-title-input"
                disableUnderline
                onChange={(e) => form.setValue("title", e.target.value)}
                placeholder="Add a task"
              />
            }
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <IconButton disableRipple>
            <FormControlLabel
              label=""
              control={
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    name="dueDate"
                    onChange={(e) => {
                      form.setValue("dueDate", e?.toString() as string);
                    }}
                    format="MM/DD/YYYY"
                    sx={{
                      position: "relative",
                      height: "30px",
                      width: "30px",
                      "& .MuiIconButton-root": {
                        position: "absolute",
                        left: -10,
                        top: -10,
                      },
                      "& :hover": { bgcolor: "transparent" },
                      "& .MuiOutlinedInput-input": { display: "none" },
                      "& .MuiOutlinedInput-notchedOutline": { display: "none" },
                    }}
                    views={["day", "hours", "minutes"]}
                    showDaysOutsideCurrentMonth
                  />
                </LocalizationProvider>
              }
            />
          </IconButton>
          <IconButton>
            <NotificationsOutlined />
          </IconButton>
          <IconButton>
            <LoopRounded />
          </IconButton>
        </Box>
      </FormControl>
    </Box>
  );
}

export default AddTaskTo;
