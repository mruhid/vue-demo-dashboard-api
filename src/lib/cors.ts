// lib/cors.ts
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["http://localhost:8080"]; // Vue client origin

export function cors(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";

  const headers = new Headers();

  if (allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, role"
    );
  }

  return headers;
}

// Special helper for OPTIONS preflight
export function preflight(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: cors(req),
  });
}
