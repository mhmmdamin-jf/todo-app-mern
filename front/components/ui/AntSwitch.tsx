// import { useTheme } from "@emotion/react";
import { useTheme } from "@/contexts/theme";
import { Switch } from "@mui/material";

export const AntSwitch = (props: any) => {
  const { theme } = useTheme();
  return (
    <Switch
      {...props}
      sx={{
        overflow: "visible",
        width: "64px",
        position: "relative",
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
      }}
    />
  );
};
export default AntSwitch;
