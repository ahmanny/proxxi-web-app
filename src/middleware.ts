import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access-token")?.value;
    const role = req.cookies.get("user-role")?.value;
    const url = req.nextUrl;

    // Protect admin pages - require both token AND admin role
    if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
        if (!token || role !== "admin") {
            const callbackUrl = encodeURIComponent(url.pathname);
            return NextResponse.redirect(new URL(`/admin/login?callbackUrl=${callbackUrl}`, req.url));
        }
    }

    // Profile access
    if (url.pathname.startsWith("/my-account") && !token) {
        const callbackUrl = encodeURIComponent(url.pathname);
        return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${callbackUrl}`, req.url));
    }

    // product review access
    if (url.pathname.startsWith("/products/") && !token && url.searchParams.has("review")) {
        const callbackUrl = encodeURIComponent(url.pathname + url.search);
        return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${callbackUrl}`, req.url));
    }

    // Reset password protection
    if (url.pathname.startsWith("/auth/reset-password")) {
        const resetToken = url.searchParams.get("token");
        if (!resetToken) {
            return NextResponse.redirect(new URL("/auth/forgotten-password", req.url));
        }
    }


    return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/my-account/:path*", "/products/:path", "/auth/reset-password(.*)"] };
