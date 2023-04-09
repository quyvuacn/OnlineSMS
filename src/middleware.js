import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export default async function middleware(req) {
	const { pathname } = req.nextUrl

	const token = req.cookies.get("token")?.value
	// if (pathname == "/") {
	// 	return NextResponse.redirect(new URL("/chat", req.url))
	// }
	// if (!token) {
	// 	return NextResponse.redirect(new URL("/login", req.url))
	// }
	// if (pathname.startsWith("/register")) {
	// 	return NextResponse.redirect(new URL("/chat", req.url))
	// }
}

export const config = {
	matcher: ["/", "/chat"],
}
