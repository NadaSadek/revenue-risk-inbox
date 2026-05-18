"use client";

import { useEffect, useState } from "react";
import { supportRequestsResponseSchema } from "@/lib/ai/schema";
import type { SupportRequest } from "@/lib/types";

type UseGetSupportRequestsResult = {
  supportRequests: SupportRequest[];
  isLoading: boolean;
  error: string | null;
};

export function useSupportRequests(): UseGetSupportRequestsResult {
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSupportRequests() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/support-requests", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load support requests.");
        }

        const data: unknown = await response.json();
        const parsed = supportRequestsResponseSchema.parse(data);

        setSupportRequests(parsed.supportRequests);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setError("Could not load support requests.");
      } finally {
        setIsLoading(false);
      }
    }

    loadSupportRequests();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    supportRequests,
    isLoading,
    error,
  };
}
