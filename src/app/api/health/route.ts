import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface HealthStatus {
  status: "healthy" | "unhealthy";
  timestamp: string;
  checks: {
    database: {
      status: "up" | "down";
      latency?: number;
      error?: string;
    };
  };
  version?: string;
}

/**
 * Health check endpoint for monitoring and load balancers
 * 
 * Usage:
 * - Railway: Set health check path to /api/health
 * - Uptime monitors: Poll this endpoint every 1-5 minutes
 * - Load balancers: Use for backend health verification
 * 
 * Returns 200 if healthy, 503 if unhealthy
 */
export async function GET() {
  const startTime = Date.now();
  
  const health: HealthStatus = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    checks: {
      database: {
        status: "up",
      },
    },
    version: process.env.npm_package_version,
  };

  // Check database connection
  try {
    const dbStart = Date.now();
    // Simple query to verify connection
    await prisma.$queryRaw`SELECT 1`;
    health.checks.database.latency = Date.now() - dbStart;
  } catch (error) {
    health.status = "unhealthy";
    health.checks.database.status = "down";
    health.checks.database.error = 
      error instanceof Error ? error.message : "Unknown database error";
    
    return NextResponse.json(health, { status: 503 });
  }

  return NextResponse.json(health, { status: 200 });
}
