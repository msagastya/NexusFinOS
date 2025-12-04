import { CurrencyCode } from '@nexus/shared-domain';
import { ParsedMessage, RawMessageContext } from './types';
export declare function parseSmsMessage(context: RawMessageContext, defaultCurrency?: CurrencyCode): ParsedMessage;
