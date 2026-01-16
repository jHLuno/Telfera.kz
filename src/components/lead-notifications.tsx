"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TIMING_CONFIG } from "@/lib/constants";

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
    // Initial check - must complete before polling starts
    const initialize = async () => {
      const latestLead = await getLatestLead();
      if (latestLead) {
        lastLeadIdRef.current = latestLead.id;
      }
      isInitializedRef.current = true;
    };

    // Start initialization immediately
    initialize();

    // Poll for new leads at configured interval
    const pollInterval = setInterval(async () => {
      // Skip if not initialized yet
      if (!isInitializedRef.current) {
        return;
      }

      const latestLead = await getLatestLead();
      
      if (latestLead) {
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
    }, TIMING_CONFIG.leadPollingInterval);

    return () => {
      clearInterval(pollInterval);
    };
  }, [toast]);

  return null; // This component doesn't render anything
}
