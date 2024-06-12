import { useTheme } from "@/contexts/theme";
import { Box, Button, IconButton, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import {
  KeyboardArrowDown,
  PersonAddOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

export default function StartPageNav() {
  const { theme } = useTheme();
  const isLargeUpView = useMediaQuery(theme.breakpoints.up("lg"));
  const isXLargeUpView = useMediaQuery(theme.breakpoints.up("xl"));
  const isXXLargeDownView = useMediaQuery("(max-width:1920px)");
  const isXLargeDownView = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <Box
      sx={{
        "& .MuiButton-text": {
          color: theme.palette.text.secondary,
          borderRadius: 3,
        },
        "& .row .row": { display: "flex", alignItems: "end" },
        "&:hover .row .row .MuiIconButton-root": { bgcolor: "transparent" },
      }}
    >
      {isLargeUpView ? (
        <Container fluid>
          <Row
            style={{
              whiteSpace: "nowrap",
              alignItems: "start",
            }}
          >
            <Col lg={{ span: "7" }} xxl={{ span: "6", offset: "1" }}>
              <Row>
                <Col style={{ minWidth: "150px", marginInlineEnd: "10px" }}>
                  <IconButton>
                    <Image
                      alt="mc"
                      width={100}
                      height={100}
                      layout="responsive"
                      src="/images/mc-logo.png"
                    />
                  </IconButton>
                </Col>
                <Col style={{ display: "flex" }}>
                  <Link href="/">
                    <Button>Microsoft 365</Button>
                  </Link>
                </Col>
                <Col style={{ display: "flex" }}>
                  <Link href="/">
                    <Button>Teams</Button>
                  </Link>
                </Col>{" "}
                <Col style={{ display: "flex" }}>
                  <Link href="/">
                    <Button>Copilot</Button>
                  </Link>
                </Col>
                <Col style={{ display: "flex" }}>
                  <Link href="/">
                    <Button>Windows</Button>
                  </Link>
                </Col>
                {!isXLargeDownView && (
                  <Col style={{ display: "flex" }}>
                    <Link href="/">
                      <Button>Surface</Button>
                    </Link>
                  </Col>
                )}
                {!isXXLargeDownView && (
                  <>
                    <Col style={{ display: "flex" }}>
                      <Link href="/">
                        <Button>Xbox</Button>
                      </Link>
                    </Col>
                    <Col style={{ display: "flex" }}>
                      <Link href="/">
                        <Button>Deals</Button>
                      </Link>
                    </Col>
                    <Col>
                      <Link style={{ width: "100%" }} href="/">
                        <Button style={{ whiteSpace: "nowrap" }}>
                          Smart Business
                        </Button>
                      </Link>
                    </Col>
                  </>
                )}
                {!isXXLargeDownView && (
                  <Col style={{ display: "flex" }}>
                    <Button>Support</Button>
                  </Col>
                )}
                <Col
                  style={{
                    display: isXXLargeDownView ? "flex" : "none",
                  }}
                >
                  <IconButton>
                    <KeyboardArrowDown />
                  </IconButton>
                </Col>
              </Row>
            </Col>
            <Col
              lg={{ span: "4" }}
              xxl={{ span: "4" }}
              xl={{ span: "4", offset: "1" }}
            >
              <Box
                sx={{
                  "& .row *": {
                    display: "flex",
                    alignItems: "center",
                    minHeight: "32px",
                    marginInline: "auto",
                    borderRadius: 3,
                  },
                }}
              >
                <Row style={{ alignItems: "end" }}>
                  <Col xs={"auto"}>
                    <Box sx={{ " .MuiButton-root": { gap: "4px" } }}></Box>
                    <Button
                      sx={{
                        alignItems: "center",
                      }}
                      endIcon={<KeyboardArrowDown />}
                    >
                      All Microsoft
                    </Button>
                  </Col>
                  <Col lg={"1"} xxl={"2"}>
                    <Button sx={{ gap: "2px" }} endIcon={<SearchOutlined />}>
                      {isLargeUpView && "Search"}
                    </Button>
                  </Col>
                  <Col lg={"1"} xxl={"2"}>
                    <Button
                      sx={{ gap: "2px" }}
                      endIcon={<ShoppingCartOutlined />}
                    >
                      {isLargeUpView && "Cart"}
                    </Button>
                  </Col>
                  <Col lg={"1"} xxl={"2"}>
                    <Button
                      sx={{ gap: "5px" }}
                      endIcon={
                        <PersonAddOutlined sx={{ borderRadius: "100%" }} />
                      }
                    >
                      {isLargeUpView && "Sign in"}
                    </Button>
                  </Col>
                </Row>
              </Box>
            </Col>
          </Row>
        </Container>
      ) : (
        <Row style={{ justifyContent: "space-between" }}>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      )}
    </Box>
  );
}
