"use client";
import store from "@/store";
import { Provider } from "react-redux";
import "aos/dist/aos.css";
import { ThemeContext, useTheme } from "@/contexts/theme";
import "../styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import AppQueryClient from "@/components/AppQueryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CookiesProvider } from "react-cookie";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useTheme();
  return (
    <CookiesProvider>
      <AppQueryClient>
        <Provider store={store}>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <ThemeContext.Provider
              value={{ toggleTheme, mode: theme.palette.mode }}
            >
              <html lang="en">
                <body>
                  <ReactQueryDevtools initialIsOpen={false} />
                  <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
                </body>
              </html>
            </ThemeContext.Provider>
          </ThemeProvider>
        </Provider>
      </AppQueryClient>
    </CookiesProvider>
  );
}
