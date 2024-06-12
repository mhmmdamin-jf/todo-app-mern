"use client";
import { createTheme } from "@mui/material";
import { Roboto } from "next/font/google";
import { createContext, useContext, useMemo, useState } from "react";
const fontName = Roboto({
  weight: ["500", "700", "300"],
  subsets: ["latin"],
});

export const tokens = (mode: string) =>
  mode === "light"
    ? {
        primary: {
          100: "#d3e0f5",
          200: "#a8c1ec",
          300: "#7ca2e2",
          400: "#5183d9",
          500: "#2564cf",
          600: "#1e50a6",
          700: "#163c7c",
          800: "#0f2853",
          900: "#071429",
        },
        gray: {
          100: "#d3d3d3",
          200: "#a8a7a7",
          300: "#7c7c7b",
          400: "#51504f",
          500: "#252423",
          600: "#1e1d1c",
          700: "#161615",
          800: "#0f0e0e",
          900: "#070707",
        },
      }
    : {
        primary: {
          900: "#d3e0f5",
          800: "#a8c1ec",
          700: "#7ca2e2",
          600: "#5183d9",
          500: "#2564cf",
          400: "#1e50a6",
          300: "#163c7c",
          200: "#0f2853",
          100: "#071429",
        },
        gray: {
          100: "#070707",
          200: "#0f0e0e",
          300: "#161615",
          400: "#1e1d1c",
          500: "#252423",
          600: "#51504f",
          700: "#7c7c7b",
          800: "#a8a7a7",
          900: "#d3d3d3",
        },
      };

export const themeSettings = (mode: string) => {
  const colors = tokens(mode);
  return {
    palette: {
      rose: {
        main: "#bf2f4a",
      },
      background: { paper: "#e2e4d2" },
      ...(mode === "dark"
        ? {
            priamry: {
              main: colors.primary[500],
            },
            gray: {
              main: colors.gray[500],
            },

            // background: {
            //   default: "#fcfcfc",
            // },
          }
        : {
            priamry: {
              main: colors.primary[500],
            },
            gray: {
              main: colors.gray[500],
            },

            // background: {
            //   default: "#11100f",
            // },
          }),
    },
    typography: {
      fontFamily: fontName.style.fontFamily,
      fontSize: 15,
      h1: {
        fontSize: 36,
        fontWeight: 200,
      },
    },
  };
};

export type themeContextType = {
  mode: "dark" | "light";
  toggleTheme: Function | void;
};

const themeSwitchInitalVals: themeContextType = {
  mode: "light",
  toggleTheme: () => {},
};

export const ThemeContext = createContext<themeContextType>(
  themeSwitchInitalVals
);

export function useTheme() {
  const { mode } = useContext(ThemeContext);
  const [appTheme, setAppTheme] = useState<"dark" | "light">(mode);
  const toggleTheme = () => {
    appTheme === "dark" ? setAppTheme("light") : setAppTheme("dark");
  };
  const theme = useMemo(() => createTheme(themeSettings(appTheme)), [appTheme]);
  const values = {
    mode: appTheme,
    toggleTheme,
  };

  return { theme, appTheme, toggleTheme };
  // (
  //   <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  // );
}

export const useAppTheme = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    console.log("cant using theme context out of provider.");
    return;
  }
  const { mode, toggleTheme } = themeContext;
  return { mode, toggleTheme };
};
