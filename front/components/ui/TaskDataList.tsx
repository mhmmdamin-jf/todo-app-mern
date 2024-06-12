"use client";
import { compareWithToday, todayFormatDate } from "@/utils/date";
import {
  Circle,
  CircleOutlined,
  StarOutlineRounded,
  StarOutlined,
  StarRounded,
  StartOutlined,
  TaskAltOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
export type taskType = {
  id: string;
  task: {
    title: string;
    dueDate: string;
    completed: boolean;
    importance: boolean;
    category: string;
  };
};
interface TaskDataListProps {
  cells?: [task: taskType];
}
function TaskDataList({ cells }: TaskDataListProps) {
  const theme = useTheme();
  const cellstemp = [
    {
      id: "1",
      task: {
        title: "task1",
        dueDate: "2024/01/20",
        completed: true,
        importance: true,
        category: "today",
      },
    },
  ];
  return (
    <Col>
      {cellstemp
        ? cellstemp.map((cell) => {
            const isOverDueDate = compareWithToday(cell.task.dueDate);
            return (
              <Box
                key={cell.id}
                sx={{
                  "& .col-1": {
                    textAlign: "end",
                  },
                  "& .row": {
                    m: 0,
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                <Row>
                  <Col xs={{ span: 1 }}>
                    <IconButton
                      sx={{
                        ".MuiSvgIcon-root": {
                          fontSize: 19,
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {cell.task.completed === true ? (
                        <TaskAltOutlined />
                      ) : (
                        <CircleOutlined />
                      )}
                    </IconButton>
                  </Col>
                  <Col>
                    <Box sx={{ "& .col": { gap: 1 } }}>
                      <Row>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: theme.typography.fontWeightMedium,
                          }}
                          component={"p"}
                        >
                          {cell.task.title}
                        </Typography>
                      </Row>
                      <Row>
                        <Typography
                          sx={{
                            gap: 1,
                            display: "flex",
                            alignItems: "center",
                            "& span": {
                              fontWeight: 2,
                              fontSize: 13,
                            },
                          }}
                          component={"div"}
                        >
                          <Typography component={"span"}>
                            {cell.task.category}
                          </Typography>
                          <Circle
                            sx={{
                              fontSize: 6,
                              color: isOverDueDate
                                ? theme.palette.rose.main
                                : theme.palette.text.secondary,
                            }}
                          />
                          <Typography
                            sx={{ color: theme.palette.rose.main }}
                            component={"span"}
                          >
                            {isOverDueDate && "overDueDate"}
                            {todayFormatDate()}
                          </Typography>
                        </Typography>
                      </Row>
                    </Box>
                  </Col>
                  <Col xs={{ span: "1" }}>
                    <IconButton
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    >
                      {cell.task.importance ? (
                        <StarRounded />
                      ) : (
                        <StarOutlineRounded />
                      )}
                    </IconButton>
                  </Col>
                </Row>
              </Box>
            );
          })
        : null}
    </Col>
  );
}

export default TaskDataList;
