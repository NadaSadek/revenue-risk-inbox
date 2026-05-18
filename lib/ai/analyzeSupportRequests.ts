import "server-only";

import type { SupportMessage } from "../sample-data/messages";
import { generateText, Output } from "ai";
import { revenueRiskAnalysisSchema } from "./schema";
import type { RevenueRiskAnalysis } from "./schema";

export async function analyzeSupportRequests(
  supportRequests: SupportMessage[]
): Promise<RevenueRiskAnalysis[]> {
  const { output } = await generateText({
    model: "openai/gpt-5-mini",
    temperature: 0,
    output: Output.array({
      element: revenueRiskAnalysisSchema,
    }),
    prompt: `Classify the following support requests for routing.

Support requests:
${JSON.stringify(supportRequests, null, 2)}

Rules:
- Return exactly one analysis item for each support request.
- Return the analyses in the same order as the input support requests.
- Choose exactly one category.
- Use "other" only if none of the listed categories fit.
- Do not invent missing details.
- If the request is vague or spans categories, lower confidence and set needsHumanReview to true.
`,
  });

  return output;
}
