import { Switch, styled } from "@mui/material";

export const AntSwitch = styled(Switch)(({ theme }) => ({
  overflow: "visible",
  width: "64px",
  position: "relative",
  border: 10,
  " .MuiSwitch-track": {
    height: "20px",
    border: "1px solid",
    borderRadius: 15,
    opacity: 0.8,
    backgroundColor: theme.palette.grey[200],
    borderColor: theme.palette.primary.dark,
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.grey[100],
    height: 14,
    width: 14,
    inset: 15,
    position: "absolute",
  },
}));

export default AntSwitch;
