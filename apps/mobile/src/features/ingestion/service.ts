import { parseSmsMessage } from '@ingestion/sms';
import { buildIngestionIntentFromParsed } from '@ingestion/pipeline';
import { RawMessageContext } from '@ingestion/types';

export function ingestRawSms(context: RawMessageContext) {
  const parsed = parseSmsMessage(context);
  const intent = buildIngestionIntentFromParsed(parsed);
  console.log('Ingested SMS intent:', intent);
  return intent;
}
