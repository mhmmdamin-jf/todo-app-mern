import {
  Box,
  Button,
  ButtonGroup,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import Link from "next/link";
interface BackButtonProps {
  lable?: string;
  text?: string;
  href?: string;
  id?: string;
  cb?: () => {};
  variant?: "text" | "contained" | "outlined";
  sx?: SxProps<Theme> | undefined;
  sxParent?: SxProps<Theme> | undefined;
  otherProps?: [];
}
export default function BackButton({
  lable,
  text,
  href,
  cb,
  id,
  variant,
  sx,
  sxParent,
  otherProps,
}: BackButtonProps) {
  if (href) {
    return (
      <Box sx={sxParent}>
        <Typography component={"p"} sx={sx}>
          {lable}
        </Typography>
        <Button
          id={id}
          {...otherProps}
          sx={sx}
          variant={variant}
          href={href}
          LinkComponent={Link}
        >
          {text}
        </Button>
      </Box>
    );
  } else {
    return (
      <Box sx={{ display: "flex", alignItems: "center", ...sxParent }}>
        <Typography component={"p"} sx={sx}>
          {lable}
        </Typography>
        <Button {...otherProps} sx={sx} variant={variant} onClick={cb}>
          {text}
        </Button>
      </Box>
    );
  }
}
