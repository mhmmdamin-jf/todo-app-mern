import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function StartPageContent() {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        overflow: "hidden",
        alignItems: "center",
        marginY: "auto",
      }}
    >
      <Container fluid>
        <Row
          style={{
            justifyContent: "center",
            alignItems: "end",
            paddingBlock: "3%",
            gap: "5%",
          }}
        >
          {isMobileView ? null : (
            <Col
              md={{ span: "2" }}
              style={{ scale: "1.3", translate: "0 -20%" }}
            >
              <Image
                alt="welcome-left"
                width={600}
                height={600}
                layout="responsive"
                src={"/images/welcome-left.png"}
              />
            </Col>
          )}
          <Col
            xs={{ span: "3" }}
            style={{
              gap: "20px",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                "& .MuiButton-contained": { boxShadow: theme.shadows[1] },
                "&:hover .MuiButton-contained": {
                  boxShadow: theme.shadows[2],
                },
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <Col
                style={{
                  marginInline: "auto",
                  marginBlock: "10px",
                }}
                xs={"3"}
              >
                <Image
                  alt="welcome-left"
                  width={600}
                  height={600}
                  layout="responsive"
                  src={"/images/logo.png"}
                />
              </Col>
              <Col
                style={{
                  gap: "15px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h1 style={theme.typography.h1}>Microsoft To Do</h1>
                {isMobileView ? (
                  <Image
                    alt="welcome-left"
                    width={600}
                    height={600}
                    layout="responsive"
                    src={"/images/welcome-center.png"}
                  />
                ) : null}
                <h5>To Do gives you focus, from work to play.</h5>
                <Link
                  href={"/auth"}
                  // sx={{
                  //   display: "block",
                  //   mx: "auto",
                  //   borderRadius: 0.5,
                  //   borderColor: theme.palette.grey[700],
                  //   paddingInline: 5,
                  //   paddingBlock: 1.5,
                  // }}
                  // variant="button"
                >
                  <Button
                    data-cy="button-start-page"
                    sx={{
                      display: "block",
                      mx: "auto",
                      borderRadius: 0.5,
                      borderColor: theme.palette.grey[700],
                      paddingInline: 5,
                      paddingBlock: 1.5,
                    }}
                    variant="contained"
                  >
                    Get started
                  </Button>
                </Link>
                <Button sx={{ display: "block", mx: "auto" }} variant="text">
                  Learn more
                </Button>
              </Col>
              <Col
                style={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <p>Download To Do</p>
                <ButtonGroup
                  size="small"
                  sx={{
                    gap: "20px",
                    alignItems: "center",
                    "& *": { paddingInline: 2, scale: 0.6 },
                    "& .MuiButtonBase-root": {
                      borderRadius: 0.3,
                      border: 1,
                      maxWidth: "40px",
                      maxHeight: "30px",
                    },
                  }}
                >
                  <IconButton>
                    <Image
                      alt="icon"
                      width={50}
                      height={50}
                      src={"/images/platforms/svgexport-2.svg"}
                    />
                  </IconButton>
                  <IconButton>
                    <Image
                      alt="icon"
                      width={50}
                      height={50}
                      src={"/images/platforms/svgexport-3.svg"}
                    />
                  </IconButton>
                  <IconButton>
                    <Image
                      alt="icon"
                      width={50}
                      height={50}
                      src={"/images/platforms/svgexport-4.svg"}
                    />
                  </IconButton>
                </ButtonGroup>
                <Button variant="text">Terms of use for To Do</Button>
              </Col>
            </Box>
          </Col>
          {isMobileView ? null : (
            <Col md={{ span: "2" }}>
              <Image
                alt="welcome-left"
                width={600}
                height={600}
                layout="responsive"
                src={"/images/welcome-right.png"}
              />
            </Col>
          )}
        </Row>
      </Container>
    </Box>
  );
}

export default StartPageContent;
