"use client";

import { useEffect, useState } from "react";
import { getLeadLogs, type LeadLogWithUser } from "@/actions/leads";
import { Badge } from "@/components/ui/badge";
import { LEAD_STATUS_LABELS, LEAD_STATUS_VARIANTS, type LeadStatus } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Clock, Loader2, User } from "lucide-react";

interface LeadTimelineProps {
  leadId: string;
}

export function LeadTimeline({ leadId }: LeadTimelineProps) {
  const [logs, setLogs] = useState<LeadLogWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      setIsLoading(true);
      try {
        const data = await getLeadLogs(leadId);
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch lead logs:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLogs();
  }, [leadId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground text-sm">
        <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>История изменений пуста</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium flex items-center gap-2">
        <Clock className="w-4 h-4" />
        История изменений
      </h4>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />
        
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="relative pl-6">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-background border-2 border-primary" />
              
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                {/* Status change */}
                <div className="flex items-center gap-2 flex-wrap">
                  {log.fromStatus && (
                    <>
                      <Badge 
                        variant={LEAD_STATUS_VARIANTS[log.fromStatus as LeadStatus]} 
                        className="text-xs"
                      >
                        {LEAD_STATUS_LABELS[log.fromStatus as LeadStatus]}
                      </Badge>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    </>
                  )}
                  <Badge 
                    variant={LEAD_STATUS_VARIANTS[log.toStatus as LeadStatus]}
                    className="text-xs"
                  >
                    {LEAD_STATUS_LABELS[log.toStatus as LeadStatus]}
                  </Badge>
                </div>
                
                {/* Meta info */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {log.user.name || log.user.email}
                  </span>
                  <span>{formatDate(log.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
