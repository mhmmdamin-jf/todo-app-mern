export const authRoutes = {
  signInRoute: "/auth/signin",
  RegisterRoute: "/auth/register",
  defaultAuthRoute: "/auth",
};
export const allowedRoutes = ["/", ...Object.values(authRoutes)];
export const defaultRedirectRoute = "/tasks/today";
