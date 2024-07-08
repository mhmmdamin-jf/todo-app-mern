"use client";
import { createTheme, PaletteMode } from "@mui/material";

import { Roboto } from "next/font/google";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
const fontName = Roboto({
  weight: ["500", "700", "300"],
  subsets: ["latin"],
});

interface colorsThemeProps {
  greenStone: {};
  blcakBerry: {};
  body: {};
  primary: {};
  greenStoneDark: {};
  blcakBerryDark: {};
  bodyDark: {};
  primaryDark: {};
}
const colorsTheme: colorsThemeProps = {
  greenStone: {
    100: "#dafceb",
    200: "#b4f8d6",
    300: "#8ff5c2",
    400: "#69f1ad",
    500: "#44ee99",
    600: "#36be7a",
    700: "#298f5c",
    800: "#1b5f3d",
    900: "#0e301f",
  },
  blcakBerry: {
    100: "#fcd3e0",
    200: "#f8a7c2",
    300: "#f57aa3",
    400: "#f14e85",
    500: "#ee2266",
    600: "#be1b52",
    700: "#8f143d",
    800: "#5f0e29",
    900: "#300714",
  },
  body: {
    100: "#fcfcfc",
    200: "#f8f8f8",
    300: "#f5f5f5",
    400: "#f1f1f1",
    500: "#bebebe",
    600: "#bfbfbf",
    700: "#8f8f8f",
    800: "#5f5f5f",
    900: "#303030",
  },
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
  greenStoneDark: {
    900: "#dafceb",
    800: "#b4f8d6",
    700: "#8ff5c2",
    600: "#69f1ad",
    500: "#44ee99",
    400: "#36be7a",
    300: "#298f5c",
    200: "#1b5f3d",
    100: "#0e301f",
  },
  blcakBerryDark: {
    900: "#fcd3e0",
    800: "#f8a7c2",
    700: "#f57aa3",
    600: "#f14e85",
    500: "#ee2266",
    400: "#be1b52",
    300: "#8f143d",
    200: "#5f0e29",
    100: "#300714",
  },
  bodyDark: {
    900: "#fcfcfc",
    800: "#f8f8f8",
    700: "#f5f5f5",
    600: "#f1f1f1",
    500: "#cccccc",
    400: "#bfbfbf",
    300: "#8f8f8f",
    200: "#5f5f5f",
    100: "#303030",
  },
  primaryDark: {
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
};
export const tokens = (dark: boolean, colorThemeName: colorsThemeProps) => {
  const str = `${colorThemeName}Dark`;
  return dark
    ? {
        primary: {
          //@ts-ignore
          ...colorsTheme[`${colorThemeName}Dark`],
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
          //@ts-ignore
          ...colorsTheme[`${colorThemeName}Dark`],
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
};

export const themeSettings = (dark: boolean, colorThemeName: string) => {
  const colors = tokens(dark, colorThemeName as any as colorsThemeProps);
  const x = dark
    ? {
        mode: "dark" as PaletteMode,
        priamry: {
          main: colors.primary[500],
        },
        ...colors,
        background: { paper: "#e2e4d2", default: "#eee" },
      }
    : {
        mode: "light" as PaletteMode,
        text: { primary: "#fff", secondary: "#fff" },
        priamry: {
          main: colors.primary[500],
        },
        ...colors,
        background: { paper: "#e2e4d2", default: "#111" },
      };
  return {
    palette: {
      rose: {
        main: "#bf2f4a",
      },
      ...x,
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
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [colorTheme, setColorTheme] = useState<
    "primary" | "body" | "blackBerry" | "greenStone"
  >("primary");
  const toggleTheme = () => {
    setDarkTheme((dark) => !dark);
  };

  let settings = themeSettings(darkTheme, colorTheme);
  let theme = createTheme(settings);
  // useEffect(() => {
  //   settings = themeSettings(appTheme, colorTheme);
  //   theme = createTheme(settings);
  // }, [appTheme]);
  console.log(theme.palette.background.default);
  const values = {
    darkTheme,
    setDarkTheme,
    toggleTheme,
    setColorTheme,
    colorTheme,
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
