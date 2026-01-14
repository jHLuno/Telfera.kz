import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the latest lead
    const latestLead = await prisma.lead.findFirst({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        phone: true,
        product: true,
        createdAt: true,
      },
    });

    if (!latestLead) {
      return NextResponse.json(null);
    }

    return NextResponse.json(latestLead);
  } catch {
    // Error logged server-side via Prisma
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
