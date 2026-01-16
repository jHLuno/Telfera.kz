"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LeadsPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function LeadsPagination({ 
  currentPage, 
  totalPages, 
  basePath 
}: LeadsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const showPages = 5; // Show 5 page numbers max
    
    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust to show enough pages
      if (currentPage <= 3) {
        end = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
      }
      
      if (start > 2) {
        pages.push("...");
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push("...");
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Страница {currentPage} из {totalPages}
      </p>
      
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          asChild={hasPrev}
          disabled={!hasPrev}
        >
          {hasPrev ? (
            <Link href={`${basePath}?page=${currentPage - 1}`}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          ) : (
            <span><ChevronLeft className="h-4 w-4" /></span>
          )}
        </Button>

        {getPageNumbers().map((page, idx) => (
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              asChild={page !== currentPage}
            >
              {page === currentPage ? (
                <span>{page}</span>
              ) : (
                <Link href={`${basePath}?page=${page}`}>{page}</Link>
              )}
            </Button>
          )
        ))}

        <Button
          variant="outline"
          size="icon"
          asChild={hasNext}
          disabled={!hasNext}
        >
          {hasNext ? (
            <Link href={`${basePath}?page=${currentPage + 1}`}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span><ChevronRight className="h-4 w-4" /></span>
          )}
        </Button>
      </div>
    </div>
  );
}
