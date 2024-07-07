"use client";
import {
  FormatListBulletedRounded,
  HomeRounded,
  MenuRounded,
  WbSunnyRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  emphasize,
  IconButton,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import { toggleShowSideBarLeft } from "@/slices/sideBarSlice";
import { EnhancedStore } from "@reduxjs/toolkit";
export type SideBarItem = {
  title: string;
  href: string;
  icon: ReactNode;
};
export type iconButton = {
  href: string;
  icon: ReactNode;
  sx?: {};
};
interface SideBarLeftProps {
  items?: [SideBarItem];
  iconButtons: [iconButton];
}
function SideBarLeft({ items, iconButtons }: SideBarLeftProps) {
  const { showLeft } = useSelector(
    //@ts-ignore
    (store: EnhancedStore) => store.sideBarSlice as any
  );
  const dispatcher = useDispatch();
  const theme = useTheme();
  const currentPage = usePathname();
  const sideBarBody = (
    <Box
      bgcolor={theme.palette.background.default}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
      }}
    >
      <Row>
        <Row>
          <IconButton
            disableRipple
            onClick={() => dispatcher(toggleShowSideBarLeft())}
            sx={{ my: 2, ml: 2, width: "40px" }}
          >
            <MenuRounded />
          </IconButton>
        </Row>
        <Row>
          <ButtonGroup
            variant="text"
            orientation="vertical"
            sx={{
              py: 3,
              width: "100%",
              mx: "auto",
              "& .MuiButton-root": {
                columnGap: 1,
                alignItems: "center",
              },
              "& .MuiSvgIcon-root": {
                fontSize: 17,
                mb: 0.2,
              },
              " .MuiButtonGroup-grouped": {
                borderInlineStartColor: theme.palette.primary.main,
                borderInlineEnd: 0,
                borderBlock: 0,
                justifyContent: "start",
                borderRadius: 0,
                mt: 1,
                color: theme.palette.text.primary,
                fontWeight: 1,
                fontSize: 14,
                px: 3,
                width: "100%",
              },
            }}
          >
            <Link href={"/tasks/today"}>
              <Button
                sx={{
                  border: currentPage.startsWith("/tasks/today") ? 2.5 : 0,
                  backgroundColor: currentPage.startsWith("/tasks/today")
                    ? emphasize(theme.palette.primary.main, 0.8)
                    : theme.palette.background.default,
                }}
                // startIcon={item.icon}
              >
                {<WbSunnyRounded />}
                Today
              </Button>
            </Link>
            <Link href={"/tasks/importance"}>
              <Button
                sx={{
                  border: currentPage.startsWith("/tasks/importance") ? 2.5 : 0,
                  backgroundColor: currentPage.startsWith("/tasks/importance")
                    ? emphasize(theme.palette.primary.main, 0.8)
                    : theme.palette.background.default,
                }}
                // startIcon={item.icon}
              >
                {<HomeRounded />}
                Tasks
              </Button>
            </Link>
            <Box
              sx={{
                width: "80%",
                mx: "auto",
                my: 2,
                borderBottom: 0.1,
                borderColor: theme.palette.grey["400"],
              }}
            ></Box>
            {items &&
              items.map((item) => (
                <Link href={item.href} key={item.title}>
                  <Button
                    sx={{
                      border: currentPage.startsWith(item.href) ? 2.5 : 0,
                      backgroundColor: currentPage.startsWith(item.href)
                        ? emphasize(theme.palette.primary.main, 0.8)
                        : theme.palette.background.default,
                    }}
                  >
                    {item.icon || <FormatListBulletedRounded />}
                    {item.title}
                  </Button>
                </Link>
              ))}
          </ButtonGroup>
        </Row>
      </Row>
    </Box>
  );

  const sideBarFooter = (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        // mb: 10,
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {iconButtons.map((item) => (
        <Link key={item.href} href={item.href}>
          <IconButton
            sx={{ "& *": { fontSize: 19 }, ...item.sx }}
            disableRipple
          >
            {item.icon}
          </IconButton>
        </Link>
      ))}
    </Box>
  );
  return (
    <SideBar
      sx={{ boxShadow: 3, ml: -1.5 }}
      width="300px"
      direction="ltr"
      sideBarBody={sideBarBody}
      sideBarFooter={sideBarFooter}
    />
  );
}

export default SideBarLeft;
