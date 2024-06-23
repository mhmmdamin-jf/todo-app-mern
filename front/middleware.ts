import { NextRequest } from "next/server";
import { allowedRoutes, defaultRedirectRoute } from "./routes";
import { verifyToken } from "./action/jwtToken";

export async function middleware(request: NextRequest) {
  const jwtCookie = request.cookies.get("jwt")?.value;
  const isApiRoute = request.nextUrl.pathname.startsWith("/api");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");
  const { nextUrl } = request;
  if (isApiRoute) {
    return;
  }
  if (isAuthRoute && jwtCookie) {
    const verifyResault = await verifyToken(jwtCookie);
    if (verifyResault) {
      return Response.redirect(new URL(defaultRedirectRoute, nextUrl));
    }
  }
  if (!allowedRoutes.includes(request.nextUrl.pathname)) {
    console.log(jwtCookie);
    if (!jwtCookie) {
      return Response.redirect(new URL(defaultRedirectRoute, nextUrl));
    }
  }
  return;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
