"use client";
import {
  CircleOutlined,
  StarOutlineRounded,
  StarRounded,
  TaskAltOutlined,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { EnhancedStore } from "@reduxjs/toolkit";
import React from "react";
import { taskType } from "./TaskDataList";
import {
  compareWithToday,
  customDateFormat,
  customDueDateFormat,
} from "@/utils/date";
interface TasksDataGridProps {
  size?: "small" | "medium";
  cells: [taskType];
}
function TaskDataGrid({ size = "small", cells }: TasksDataGridProps) {
  const theme = useTheme();
  //@ts-ignore
  const { tasks } = useSelector(
    (store: EnhancedStore) => store.taskSlice as any
  );
  return (
    <Box>
      <Table
        sx={{
          "& .MuiTableCell-root": {
            border: 0,
          },
          "& .MuiIconButton-root": {
            color: theme.palette.primary.main,
          },
          "& .MuiSvgIcon-root ": {
            fontSize: 20,
          },
        }}
        size={size}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 3 }}></TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Due date</TableCell>
            <TableCell>Importance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks &&
            tasks.map((cell) => {
              const isOverDueDate =
                cell.dueDate && compareWithToday(cell.dueDate[0]);

              return (
                <TableRow key={cell.id}>
                  <TableCell>
                    <IconButton>
                      {cell.isCompleted === true ? (
                        <TaskAltOutlined />
                      ) : (
                        <CircleOutlined />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{cell.title}</TableCell>
                  <TableCell
                    sx={{
                      fontSize: 16,
                      color: isOverDueDate
                        ? //@ts-ignore
                          theme.palette.rose.main
                        : theme.palette.text.secondary,
                    }}
                  >
                    {isOverDueDate && "overDueDate"}
                    {cell?.dueDate &&
                      customDueDateFormat(new Date(cell?.dueDate[0]))}
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      {cell.isImportant ? (
                        <StarRounded />
                      ) : (
                        <StarOutlineRounded />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Box>
  );
}

export default TaskDataGrid;

export const taskDummyData: [taskType] = [
  {
    task: {
      title: "title1",
      dueDate: "2000/01/01",
      completed: true,
      importance: true,
      category: "today",
    },
    id: "id1",
  },
];
