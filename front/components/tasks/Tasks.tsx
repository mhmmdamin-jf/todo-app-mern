"use client";
import { CircularProgress, Box } from "@mui/material";
import React from "react";
import { EnhancedStore } from "@reduxjs/toolkit";
import TaskDataList from "@/components/ui/TaskDataList";
import { usePathname } from "next/navigation";
import { useTasks } from "@/hooks/useTasks";
import TaskDataGrid from "../ui/TaskDataGrid";
import { useSelector } from "react-redux";
function Tasks() {
  const currentCategory = usePathname().split("/")[-1];
  const { data: tasks, isPending } = useTasks({ category: currentCategory });
  //@ts-ignore
  const { showTasks } = useSelector((store: EnhancedStore) => store.taskSlice);
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
  if (tasks?.payload?.length) {
    if (showTasks === "Grid") return <TaskDataGrid cells={tasks.payload} />;
    else if (showTasks === "List")
      return <TaskDataList cells={tasks.payload} />;
  }
}

export default Tasks;
