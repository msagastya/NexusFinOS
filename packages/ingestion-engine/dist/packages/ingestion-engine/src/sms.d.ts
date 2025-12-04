import { CurrencyCode } from '@nexus/shared-domain';
import { ParsedMessage, ParsedUpiDebit, RawMessageContext } from './types';
export declare function parseUpiDebitSms(body: string, currency: CurrencyCode): ParsedUpiDebit | null;
export declare function parseSmsMessage(context: RawMessageContext, defaultCurrency?: CurrencyCode): ParsedMessage;
