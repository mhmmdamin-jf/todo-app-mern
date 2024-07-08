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
  Button,
  alpha,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import * as zod from "zod";
import { usePathname } from "next/navigation";
import { ButtonGroup } from "react-bootstrap";

function AddTaskTo() {
  const theme = useTheme();
  const dispatcher = useDispatch<any>();
  const form = useForm<zod.infer<typeof taskSchema>>({
    defaultValues: { dueDate: "", title: "", category: "" },
    resolver: zodResolver(taskSchema),
  });
  const current = usePathname();
  useKey({
    key: "enter",
    action: async () => {
      form.setValue("category", current.split("/")[2]);
      const values = taskSchema.safeParse(form.getValues());

      await dispatcher(addTask({ values: values.data }));
    },
    usingCtrl: false,
  });
  return (
    <Box
      sx={{
        boxShadow: 2,
        borderRadius: 1,
        mx: "auto",
        "& div": { paddingInline: 0.6, paddingBlock: 0.4 },
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
            <CircleOutlined
              sx={{ fontSize: 21, color: theme.palette.primary.main }}
            />
          </IconButton>
          <FormControlLabel
            label=""
            sx={{ width: "100%", ml: 0.3 }}
            control={
              <Input
                name="title"
                id="task-title-input"
                disableUnderline
                onChange={(e) => form.setValue("title", e.target.value)}
                placeholder="Add a task"
                sx={{ width: "95%" }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ButtonGroup size="sm">
            <IconButton
              sx={{
                p: 0,
                m: 0,
                " .MuiFormControlLabel-labelPlacementEnd": {
                  m: 0,
                },
                " *": {
                  fontSize: 20,
                },
              }}
              disableRipple
            >
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
                          left: -4,
                          top: -6,
                        },
                        "& :hover": { bgcolor: "transparent" },
                        "& .MuiOutlinedInput-input": { display: "none" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          display: "none",
                        },
                      }}
                      views={["day", "hours", "minutes"]}
                      showDaysOutsideCurrentMonth
                    />
                  </LocalizationProvider>
                }
              />
            </IconButton>
            <IconButton>
              <NotificationsOutlined
                sx={{
                  fontSize: 22,
                }}
              />
            </IconButton>
            <IconButton>
              <LoopRounded
                sx={{
                  fontSize: 22,
                }}
              />
            </IconButton>
          </ButtonGroup>
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "capitalize",
              borderRadius: 0,
              fontSize: 11,
              borderColor: alpha(theme.palette.text.secondary, 0.1),
              minWidth: "3px",
              "&:hover": {
                borderColor: alpha(theme.palette.text.secondary, 0.1),
                backgroundColor: "transparent",
              },
            }}
          >
            add
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
}

export default AddTaskTo;
