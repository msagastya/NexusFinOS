import { ParsedUpiDebit } from '@nexus/ingestion-engine/types';
import { UpiPaymentIntent } from './types';

export interface ReconciliationCandidate {
  intent: UpiPaymentIntent;
  matchScore: number; // 0.0 - 1.0
}

export function scoreUpiMatch(
  intent: UpiPaymentIntent,
  parsed: ParsedUpiDebit
): number {
  let score = 0;
  if (intent.amount === parsed.amount) {
    score += 0.7;
  }

  if (intent.payeeVpa === parsed.vpa) {
    score += 0.2;
  }

  // Basic name similarity (can be improved)
  if (
    intent.payeeName &&
    parsed.merchantName &&
    intent.payeeName.toLowerCase().includes(parsed.merchantName.toLowerCase())
  ) {
    score += 0.1;
  }

  return Math.min(score, 1.0);
}

export function findBestReconciliation(
  intents: UpiPaymentIntent[],
  parsed: ParsedUpiDebit,
  threshold = 0.7
): ReconciliationCandidate | null {
  const candidates = intents
    .map((intent) => ({
      intent,
      matchScore: scoreUpiMatch(intent, parsed),
    }))
    .filter((candidate) => candidate.matchScore >= threshold);

  if (candidates.length === 0) {
    return null;
  }

  // Return the highest scoring candidate
  return candidates.sort((a, b) => b.matchScore - a.matchScore)[0];
}
