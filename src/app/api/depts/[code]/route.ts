import { cors, preflight } from "@/lib/cors";
import { electricDepts } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS(req: NextRequest) {
  // Preflight handler
  return preflight(req);
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const headers = cors(req); // add CORS headers
  const { code } = await context.params;

  const deptUser = electricDepts.find(
    (f) => f.electricCode === code || f.id === code
  );

  if (!deptUser) {
    return NextResponse.json(
      { message: "This dept code data not found" },
      { status: 404, headers }
    );
  }

  return NextResponse.json(deptUser, { status: 200, headers });
}
