# Revenue Risk Inbox

An AI-assisted support triage inbox for identifying revenue-risk signals in customer messages.

The app analyzes support requests and turns unstructured customer messages into structured review data: urgency, revenue risk, category, confidence, evidence, recommended next step and whether human review is required.

## Why this exists

This project focuses on a support-ops problem: commercially important customer messages can sit next to routine product feedback and teams need a way to prioritize the requests most likely to affect revenue, access or retention.

Examples in this demo include failed payments, paid users locked out, invoice disputes, refund requests, cancellation threats, enterprise pricing questions, product bugs, account login issues, low-risk product feedback and mixed payment/access cases.

## Demo workflow

1. Load sample support requests.
2. Analyze messages in batches.
3. Display urgency, revenue risk and triage status in the inbox.
4. Open a support request to compare the original message with the AI review
5. You will see:
  - Evidence and a recommended next step.
  - High-risk or ambiguous cases marked ad needing human review.

## Features

- Batch AI analysis of support messages
- Structured AI output with Zod validation
- Revenue-risk and urgency classification
- Triage states:
  - Not analyzed
  - Auto-triaged
  - Needs review
- Evidence snippets from the customer message
- Recommended next operational action
- Message detail drawer with original request and AI review
- Order-independent AI result mapping by `messageId`
- Contract tests for matching AI analyses to the correct support request

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel AI SDK
- Zod
- Vitest

## AI flow

The app sends a batch of support requests to the server-side API route `POST /api/analyze-support-requests`.

The route validates the request payload, calls the AI analysis function and returns structured analyses.

The AI output includes a `messageId` for every analysis item. The app does not rely on array order alone. After generation, the analyses are matched back to the original support requests by `messageId`.

This prevents a subtle but serious bug: valid-looking AI output being attached to the wrong customer message.

## Why `messageId` validation matters

Structured output validates shape but it does not automatically validate relationships.

For example, an AI response can contain two analyses with the same `messageId`. The JSON shape may still be valid but the relationship is wrong because one message is duplicated and another message is missing.

This project includes a helper that:

- rejects duplicate `messageId` values
- rejects missing analyses
- rejects count mismatches
- returns analyses in the same order as the original support requests

## Local setup

Install dependencies with `npm install`.

Create a local environment file named `.env.local`.

Add your AI Gateway key:

`AI_GATEWAY_API_KEY=your_key_here`

Run the development server with `npm run dev`.

Open `http://localhost:3000`.

## Available scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run test`
- `npm run test:watch`
- `npm run format`
- `npm run format:check`

## Testing

The current tests focus on the most important contract risk: ensuring AI analyses are matched to the correct support request.

Run tests with `npm run test`.

## Known limitations

- Sample data is static and served through an API route.
- Review actions are presentational and do not persist state yet.
- The app analyzes messages in small batches to keep latency manageable.
- There is no authentication, database, or production queue integration.
- AI output quality depends on the model response and prompt constraints.

## Project status

This is a v0 focused on AI product UX, structured output and revenue-risk support workflows.
