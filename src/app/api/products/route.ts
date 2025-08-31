import { cors, preflight } from "@/lib/cors";
import { products } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS(req: NextRequest) {
  // Preflight request handler
  return preflight(req);
}

export async function GET(req: NextRequest) {
  const headers = cors(req); // add CORS headers
  const role = req.headers.get("role");

  if (!role) {
    return NextResponse.json(
      { message: "No role provided" },
      { status: 401, headers }
    );
  }

  if (role === "mentor") {
    return NextResponse.json(
      {
        products: products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
        })),
        stats: { total: products.length, averagePrice: 866 },
      },
      { headers }
    );
  }

  if (role === "admin" || role === "meneger") {
    return NextResponse.json(
      {
        products,
        stats: { total: products.length, averagePrice: 866 },
      },
      { headers }
    );
  }

  return NextResponse.json(
    { message: "Access denied" },
    { status: 403, headers }
  );
}
