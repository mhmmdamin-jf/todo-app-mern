"use client";
import { useFindTasks } from "@/hooks/useFindTasks";
import { toggleShowSideBarFeedBack } from "@/slices/sideBarSlice";
import { toggleShowSideBarRight } from "@/slices/sideBarSlice";
import { getTasks, searchTasks } from "@/slices/taskSlice";
import {
  AppsRounded,
  Campaign,
  CircleOutlined,
  PersonOutline,
  QuestionMark,
  SearchRounded,
  SettingsRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useTheme as useAppTheme } from "@/contexts/theme";

export default function MainNav() {
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const dispatcher = useDispatch();
  const theme = useTheme();
  const { setColorTheme } = useAppTheme();
  const isSmUpView = useMediaQuery(theme.breakpoints.up("sm"));
  const isMdUpView = useMediaQuery(theme.breakpoints.up("md"));
  const currentCategory = usePathname().split("/")[2];
  useEffect(
    function () {
      const allTodos = async () => {
        await dispatcher(getTasks({ category: currentCategory }));
      };
      const exitingTodos = async () => {
        await dispatcher(searchTasks({ title: searchValue }));
      };
      if (!searchValue) {
        allTodos();
      }
      exitingTodos();
    },
    [searchValue, dispatcher]
  );
  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        "& .row": {
          alignItems: "center",
        },
      }}
    >
      <Row>
        <Col xs={{ span: "1" }}>
          <Button
            sx={{
              width: 40,
              height: 50,
              borderRadius: 1,
              color: theme.palette.common.white,
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <AppsRounded />
          </Button>
        </Col>
        <Col xs={{ span: "2" }}>
          <Typography
            component={"h6"}
            sx={{
              color: theme.palette.common.white,
              fontSize: 16,
              marginInlineStart: isSmUpView ? 1.5 : isMdUpView ? 0 : 2.5,
            }}
          >
            To Do
          </Typography>
        </Col>
        <Col>
          <Box
            sx={{
              width: isMdUpView ? "400px" : "fit-content",
              bgcolor: theme.palette.common.white,
              borderRadius: 1,
              py: 0.5,
              px: 1,
              ml: 23,
              position: "relative",
              "&:hover": {
                bgcolor: theme.palette.background.paper,
              },
            }}
          >
            <Typography
              sx={{
                bgcolor: "transparent",
                border: 0,
                outline: 0,
                width: "92%",
                ml: 3,
                zIndex: theme.zIndex.fab,
              }}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              component={"input"}
            />
            <SearchRounded
              sx={{
                insetInline: 6,
                insetBlock: 7,
                position: "absolute",
                zIndex: theme.zIndex.drawer,
                color: theme.palette.primary.main,
                fontSize: 23,
              }}
            />
          </Box>
        </Col>
        <Col>
          <Box
            sx={{
              "& *": { color: theme.palette.common.white, fontSize: 16 },
              "& .row": { justifyContent: "end", marginInlineEnd: 6 },
              "& .row div": { mx: 1 },
            }}
          >
            <Row>
              <Col xs={{ span: "1" }}>
                <Button onClick={() => dispatcher(toggleShowSideBarRight())}>
                  <SettingsRounded />
                </Button>
              </Col>
              {isMdUpView && (
                <>
                  <Col xs={{ span: "1" }}>
                    <Button
                      onClick={() => dispatcher(toggleShowSideBarFeedBack())}
                    >
                      <QuestionMark />
                    </Button>
                  </Col>
                  <Col sm={{ span: "1" }}>
                    <Button onClick={() => setColorTheme(() => "greenStone")}>
                      <CircleOutlined />
                    </Button>
                  </Col>
                </>
              )}
              <Col xs={{ span: "1" }}>
                <Button
                  sx={{
                    "& .MuiAvatar-root": { width: 0.8, height: 39 },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.background.paper,
                      borderRadius: "100%",
                    }}
                  >
                    <PersonOutline />
                  </Avatar>
                </Button>
              </Col>
            </Row>
          </Box>
        </Col>
      </Row>
    </Box>
  );
}
