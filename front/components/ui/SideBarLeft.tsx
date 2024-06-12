import { MenuRounded } from "@mui/icons-material";
import { Box, Button, ButtonGroup, IconButton, useTheme } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import { toggleShowSideBarLeft } from "@/slices/sideBarSlice";
export type SideBarItem = {
  title: string;
  href: string;
  icon: ReactNode;
};
export type iconButton = {
  href: string;
  icon: ReactNode;
};
interface SideBarLeftProps {
  items: [SideBarItem];
  iconButtons: [iconButton];
}
function SideBarLeft({ items, iconButtons }: SideBarLeftProps) {
  const { showLeft } = useSelector((store) => store.sideBarSlice);
  const dispatcher = useDispatch();
  const theme = useTheme();
  const currentPage = usePathname();
  const sideBarBody = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
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
            {items.map((item) => (
              <Link href={item.href} key={item.title}>
                <Button
                  sx={{
                    border: currentPage.startsWith(item.href) ? 2.5 : 0,
                  }}
                  // startIcon={item.icon}
                >
                  {item.title}
                </Button>
              </Link>
            ))}
            <Box
              sx={{
                width: "80%",
                mx: "auto",
                my: 2,
                borderBottom: 0.1,
                borderColor: theme.palette.grey["400"],
              }}
            ></Box>
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
        mb: 7,
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {iconButtons.map((item) => (
        <Link key={item.href} href={item.href}>
          <IconButton disableRipple>{item.icon}</IconButton>
        </Link>
      ))}
    </Box>
  );
  return (
    <SideBar
      show={showLeft}
      width="300px"
      direction="ltr"
      sideBarBody={sideBarBody}
      sideBarFooter={sideBarFooter}
    />
  );
}

export default SideBarLeft;
