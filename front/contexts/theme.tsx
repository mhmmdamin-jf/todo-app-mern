"use client";
import { createTheme, PaletteMode } from "@mui/material";

import { Roboto } from "next/font/google";
import { createContext, useContext, useMemo, useState } from "react";
const fontName = Roboto({
  weight: ["500", "700", "300"],
  subsets: ["latin"],
});

export const tokens = (mode: string) =>
  mode === "dark"
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
          100: "#e9e9e9",
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
          900: "#e9e9e9",
        },
      };

export const themeSettings = (mode: string) => {
  const colors = tokens(mode);
  return {
    palette: {
      rose: {
        main: "#bf2f4a",
      },
      ...(mode === "dark"
        ? {
            // priamry: {
            //   main: colors.primary[500],
            // },
            // gray: {
            //   main: colors.gray[500],
            // },
            ...colors,
            // background: {
            //   default: "#fcfcfc",
            // },
            background: { paper: "#e2e4d2", default: "#222" },
          }
        : {
            ...colors,
            // background: {
            //   default: "#11100f",
            // },
            background: { paper: "#e2e4d2", default: "#eee" },
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
  mode: PaletteMode;
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
  const [appTheme, setAppTheme] = useState<"dark" | "light">("light");
  const toggleTheme = () => {
    setAppTheme(appTheme === "dark" ? "light" : "dark");
  };
  console.log(appTheme);
  const settings = themeSettings(appTheme);
  const theme = createTheme(settings);
  const values = {
    appTheme,
    toggleTheme,
  };
  return { theme, ...values };
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
