import { QueryClient } from "@tanstack/react-query";

declare global {
  var queryClient: QueryClient | undefined;
}

export const appQueryClient =
  process.env.NODE_ENV !== "production"
    ? globalThis.queryClient ||
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: Number(process.env.StaleTime) },
        },
      })
    : new QueryClient();
globalThis.queryClient = appQueryClient;
