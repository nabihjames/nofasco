import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_URL, BUSSINESS } from "./constants";

export async function middleware(request: NextRequest) {
  if (BUSSINESS) {
    if (request.url.includes("/cart")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    try {
      const cookie = request.cookies.get("jwt")?.value;

      const response = await fetch(`${API_URL}/user/verify`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `jwt=${cookie}`,
        },
      });

      if (response.status === 200) return NextResponse.next();
      else return NextResponse.redirect(new URL("/login", request.url));
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/orders", "/products", "/cart"],
};
