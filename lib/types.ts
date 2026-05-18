import { z } from "zod";
import {
  supportRequestSchema,
  analyzeSupportRequestsBodySchema,
  revenueRiskAnalysisSchema,
} from "./ai/schema";

export type SupportRequest = z.infer<typeof supportRequestSchema>;
export type AnalyzeSupportRequestsBody = z.infer<typeof analyzeSupportRequestsBodySchema>;
export type RevenueRiskAnalysis = z.infer<typeof revenueRiskAnalysisSchema>;
