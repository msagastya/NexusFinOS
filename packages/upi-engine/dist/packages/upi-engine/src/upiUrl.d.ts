import { UpiUrlPayload, UpiPaymentIntent } from './types';
import { CurrencyCode } from '@nexus/shared-domain';
export declare function parseUpiUrl(rawUrl: string, defaultCurrency?: CurrencyCode): UpiUrlPayload;
export declare function buildUpiUrl(intent: UpiPaymentIntent): string;
