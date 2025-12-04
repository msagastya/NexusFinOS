import { ParsedUpiDebit } from '@nexus/ingestion-engine/types';
import { UpiPaymentIntent } from './types';
export interface ReconciliationCandidate {
    intent: UpiPaymentIntent;
    matchScore: number;
}
export declare function scoreUpiMatch(intent: UpiPaymentIntent, parsed: ParsedUpiDebit): number;
export declare function findBestReconciliation(intents: UpiPaymentIntent[], parsed: ParsedUpiDebit, threshold?: number): ReconciliationCandidate | null;
export declare function resolveAndCleanPendingIntent(pendingId: string, resolvedIntent: UpiPaymentIntent): Promise<void>;
