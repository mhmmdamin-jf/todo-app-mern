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
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useTheme as useAppTheme } from "@/contexts/theme";

export default function MainNav() {
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const dispatcher = useDispatch();
  const theme = useTheme();
  const searchRef = useRef<any | null>(null);
  const { setColorTheme } = useAppTheme();
  const isSmUpView = useMediaQuery(theme.breakpoints.up("sm"));
  const isMdUpView = useMediaQuery(theme.breakpoints.up("md"));
  const isLgUpView = useMediaQuery(theme.breakpoints.up("lg"));
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const currentCategory = usePathname().split("/")[2];
  useEffect(
    function () {
      const allTodos = async () => {
        //@ts-ignore
        await dispatcher(getTasks({ category: currentCategory }));
      };
      const exitingTodos = async () => {
        //@ts-ignore
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
        display: "flex",
        justifyContent: "space-between",
        "& .MuiBox-root": {
          alignItems: "center",
          display: "flex",
          zIndex: 2,
        },
        // "& .MuiBox-root": {
        //   // display: "flex",
        //   // flexGrow: 0,
        //   // alignItems: "end",
        //   // flexBasis: "fit-content",
        //   // bgcolor: "red",
        // },
        "& #nav-middle": {
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-between",
          flexShrink: 1,
          minWidth: 0,
          zIndex: 1,
          // flexBasis: "max-content",
          // flexShrink: 1,
          // width: "100%",
        },
      }}
    >
      <Box>
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
      </Box>
      <Box id="nav-middle">
        <Typography
          component={"h6"}
          sx={{
            color: theme.palette.common.white,
            fontSize: 15,
            minWidth: "20px",
            width: "fit-content",
          }}
        >
          To Do
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            ml: isMdUpView ? 0 : 1,
          }}
        >
          <Box
            sx={{
              width:
                activeSearch && !isMdUpView
                  ? "100%"
                  : isMdUpView
                    ? "400px"
                    : "40px",
              height: "fit-content",
              borderRadius: 1,
              py: 0.6,
              px: isMdUpView ? 2 : 0.5,
              mx: isMdUpView ? "auto" : 0,
              // ml: isLgUpView ? 23 : 0,
              position: "relative",
              bgcolor: theme.palette.common.white,
              transition: "ease-out .2s",
              "&:hover": {
                bgcolor: theme.palette.common.white,
              },
            }}
            onClick={() => {
              searchRef.current?.focus();
            }}
          >
            <Typography
              sx={{
                border: 0,
                outline: 0,
                width: "92%",
                ml: 3,
                zIndex: theme.zIndex.fab,
              }}
              onFocus={() => setActiveSearch(true)}
              onBlur={() => setActiveSearch(false)}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              component={"input"}
              ref={searchRef}
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
        </Box>
        <Box
          sx={{
            "& .MuiSvgIcon-root": {
              color: theme.palette.common.white,
              p: 0.5,
            },
          }}
        >
          <Button onClick={() => dispatcher(toggleShowSideBarRight())}>
            <SettingsRounded />
          </Button>
          <Button onClick={() => dispatcher(toggleShowSideBarFeedBack())}>
            <QuestionMark />
          </Button>
          <Button onClick={() => setColorTheme(() => "greenStone")}>
            <CircleOutlined />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
        }}
      >
        <Button
          sx={{
            "& .MuiAvatar-root": {
              width: 0.8,
              height: 39,
            },
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
      </Box>
    </Box>
  );
}
