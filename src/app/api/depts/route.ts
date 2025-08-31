import { cors, preflight } from "@/lib/cors";
import { electricDepts } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS(req: NextRequest) {
  // Handle preflight request
  return preflight(req);
}

export async function GET(req: NextRequest) {
  const headers = cors(req); // add CORS headers
  return NextResponse.json(electricDepts, { status: 200, headers });
}
