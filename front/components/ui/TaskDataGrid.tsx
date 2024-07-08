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
    //@ts-ignore
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
            <TableCell></TableCell>
            <TableCell colSpan={4}>Title</TableCell>
            <TableCell>Due date</TableCell>
            <TableCell>Importance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks &&
            //@ts-ignore
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
                  <TableCell colSpan={4}>{cell.title}</TableCell>
                  <TableCell
                    sx={{
                      fontSize: 16,
                      color: isOverDueDate
                        ? //@ts-ignore
                          theme.palette.rose.main
                        : theme.palette.text.secondary,
                    }}
                  >
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
