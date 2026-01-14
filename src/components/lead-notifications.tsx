"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Lead {
  id: string;
  name: string;
  phone: string;
  product?: string | null;
  createdAt: Date;
}

async function getLatestLead(): Promise<Lead | null> {
  try {
    const response = await fetch("/api/leads/latest", {
      cache: "no-store",
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
}

export function LeadNotifications() {
  const { toast } = useToast();
  const lastLeadIdRef = useRef<string | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Poll for new leads every 10 seconds
    const pollInterval = setInterval(async () => {
      const latestLead = await getLatestLead();
      
      if (latestLead) {
        // On first load, just store the ID without showing notification
        if (!isInitializedRef.current) {
          lastLeadIdRef.current = latestLead.id;
          isInitializedRef.current = true;
          return;
        }

        // If this is a new lead (different ID), show notification
        if (lastLeadIdRef.current !== latestLead.id) {
          lastLeadIdRef.current = latestLead.id;
          
          toast({
            variant: "success",
            title: "Новая заявка!",
            description: `${latestLead.name} (${latestLead.phone})${latestLead.product ? ` - ${latestLead.product}` : ""}`,
          });
        }
      }
      // Initialize even if no leads exist yet
      if (!isInitializedRef.current) {
        isInitializedRef.current = true;
      }
    }, 10000); // Poll every 10 seconds

    // Initial check after 2 seconds
    const initialTimeout = setTimeout(async () => {
      const latestLead = await getLatestLead();
      if (latestLead) {
        lastLeadIdRef.current = latestLead.id;
      }
      isInitializedRef.current = true;
    }, 2000);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(initialTimeout);
    };
  }, [toast]);

  return null; // This component doesn't render anything
}
