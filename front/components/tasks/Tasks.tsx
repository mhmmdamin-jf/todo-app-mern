"use client";
import { CircularProgress, Box } from "@mui/material";
import React from "react";
import TaskDataList from "@/components/ui/TaskDataList";
import { useParams, usePathname } from "next/navigation";
import { useTasks } from "@/hooks/useTasks";
function Tasks() {
  const currentCategory = usePathname().split("/")[-1];
  const { data: tasks, isPending } = useTasks({ category: currentCategory });
  if (isPending)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          py: 5,
        }}
      >
        <CircularProgress sx={{ mx: "auto" }} />
      </Box>
    );
  return (
    <TaskDataList
      cells={tasks?.payload}
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
