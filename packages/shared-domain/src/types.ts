export type AccountType = "BANK" | "WALLET" | "SHADOW";

export type CurrencyCode = "INR";

export type TransactionKind = "DEBIT" | "CREDIT";

export type TransactionStatus = "PENDING" | "CLEARED" | "FAILED";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  currency: CurrencyCode;
  isExcludedFromNetWorth: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  currency: CurrencyCode;
  kind: TransactionKind;
  status: TransactionStatus;
  timestamp: Date;
  description?: string;
  splitGroupId?: string | null;
  geoLocation?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DebtCycle {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  contactName: string;
  totalAmount: number;
  currency: CurrencyCode;
  status: "ACTIVE" | "SETTLED";
  createdAt: Date;
  updatedAt: Date;
}

export interface RecurringRule {
  id: string;
  name: string;
  type: "EMI" | "SIP" | "SUBSCRIPTION" | "OTHER";
  amount: number;
  currency: CurrencyCode;
  dayOfMonth: number | null;
  cronExpression?: string | null;
  linkedAccountId?: string | null;
  categoryId?: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
