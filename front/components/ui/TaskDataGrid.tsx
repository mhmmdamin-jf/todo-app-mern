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
import React from "react";
import { taskType } from "./TaskDataList";
interface TasksDataGridProps {
  size?: "small" | "medium";
  cells: [taskType];
}
function TaskDataGrid({ size = "small", cells }: TasksDataGridProps) {
  const theme = useTheme();
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
          {cells.map((cell) => (
            <TableRow key={cell.id}>
              <TableCell>
                <IconButton>
                  {cell.task.completed === true ? (
                    <TaskAltOutlined />
                  ) : (
                    <CircleOutlined />
                  )}
                </IconButton>
              </TableCell>
              <TableCell>{cell.task.title}</TableCell>
              <TableCell>{cell.task.dueDate}</TableCell>
              <TableCell>
                <IconButton>
                  {cell.task.importance ? (
                    <StarRounded />
                  ) : (
                    <StarOutlineRounded />
                  )}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
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
