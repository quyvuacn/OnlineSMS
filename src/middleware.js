import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export default async function middleware(req) {
	const { pathname } = req.nextUrl
	if (pathname.startsWith("/chat")) {
		return NextResponse.redirect(new URL("/login", req.url))
	}
}

export const config = {
	matcher: ["/chat", "/login", "/register"],
}
