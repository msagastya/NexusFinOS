import { ParsedMessage } from './types';
import { ParsedMessageKind } from './types';

export function classifyParsedMessage(parsed: ParsedMessage): ParsedMessageKind {
  return parsed.payload.kind;
}
