import { NextRequest, NextResponse } from "next/server";
import { users } from "@/lib/data";
import { cors, preflight } from "@/lib/cors";

export async function OPTIONS(req: NextRequest) {
  // Preflight request handler
  return preflight(req);
}

export async function POST(req: NextRequest) {
  const headers = cors(req); // get proper CORS headers
  const { username, password } = await req.json();

  const isUserExist = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!isUserExist) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401, headers }
    );
  }

  return NextResponse.json(
    { username: isUserExist.username, role: isUserExist.role },
    { status: 200, headers }
  );
}
