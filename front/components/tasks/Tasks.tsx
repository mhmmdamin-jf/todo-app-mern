"use client";
import { useTheme } from "@mui/material";
import React from "react";
import TaskDataGrid from "../ui/TaskDataGrid";
import TaskDataList, { taskType } from "@/components/ui/TaskDataList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/index";
import { useParams, usePathname } from "next/navigation";
import { getTasks } from "@/slices/taskSlice";
function Tasks() {
  const theme = useTheme();
  const dispatcher = useDispatch<AppDispatch>();
  const currentCategory = usePathname().split("/")[-1];
  const tasks = dispatcher(getTasks({ category: currentCategory }));
  console.log(tasks);
  return (
    <TaskDataList
      cells={tasks}
      // cells={[
      //   {
      //     id: "q2",
      //     task: {
      //       category: "tasks",
      //       completed: true,
      //       dueDate: "06/05/2000",
      //       importance: true,
      //       title: "asdasdasd",
      //     },
      //   },
      //   ,
      //   {
      //     id: "q1",
      //     task: {
      //       category: "tasks",
      //       completed: false,
      //       dueDate: "06/05/2300",
      //       importance: false,
      //       title: "asdasdasd",
      //     },
      //   },
      //   {
      //     id: "q",
      //     task: {
      //       category: "tasks",
      //       completed: true,
      //       dueDate: "06/05/2024",
      //       importance: true,
      //       title: "something ...",
      //     },
      //   },
      //   {
      //     id: "2",
      //     task: {
      //       category: "tasks",
      //       completed: true,
      //       dueDate: "06/05/2000",
      //       importance: true,
      //       title: "asdasdasd",
      //     },
      //   },
      // ]}
    />
  );
}

export default Tasks;
