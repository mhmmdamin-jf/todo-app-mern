"use client";
import {
  compareWithToday,
  customDueDateFormat,
  todayFormatDate,
} from "@/utils/date";
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
  title: string;
  dueDate: string;
  isCompleted: boolean;
  isImportant: boolean;
  category: string;
};
interface TaskDataListProps {
  cells?: [task: taskType];
}
function TaskDataList({ cells }: TaskDataListProps) {
  const theme = useTheme();
  return (
    <Col>
      {cells
        ? cells?.map((cell) => {
            const isOverDueDate =
              cell.dueDate && compareWithToday(cell.dueDate[0]);
            return (
              <Box
                key={cell.title}
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
                      {cell.isCompleted === true ? (
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
                          {cell.title}
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
                            {/* {cell.category} */}
                          </Typography>
                          {cell.dueDate && (
                            <>
                              <Circle
                                sx={{
                                  fontSize: 6,
                                  color: isOverDueDate
                                    ? //@ts-ignore
                                      theme.palette.rose.main
                                    : theme.palette.text.secondary,
                                }}
                              />

                              <Typography
                                //@ts-ignore
                                sx={{
                                  color: isOverDueDate
                                    ? //@ts-ignore
                                      theme.palette.rose.main
                                    : theme.palette.text.secondary,
                                }}
                                component={"span"}
                              >
                                {customDueDateFormat(
                                  new Date(cell?.dueDate[0])
                                )}
                              </Typography>
                            </>
                          )}
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
                      {cell.isImportant ? (
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
