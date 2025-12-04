# NexusFinOS

Offline-first, privacy-respecting personal finance OS for mobile, with:

- **Local-first storage** (WatermelonDB + SQLite)
- **Finance engine** for EMI / loans / transfers
- **SMS ingestion engine** to parse bank / loan / UPI messages
- **UPI intent + reconciliation** (pending intents, payee history, matching against debit SMS)
- **Sync engine scaffold** (Yjs + custom discovery/transport/handshake)

---

## Monorepo layout

- `apps/mobile`  
  Expo React Native app.

- `packages/shared-domain`  
  Core domain types (accounts, transactions, debt cycles, recurring rules, currencies, etc).

- `packages/finance-engine`  
  Loan, EMI, transfers, and shadow-proxy logic.

- `packages/sync-engine`  
  Discovery, transport, crypto, and handshake protocol scaffolding for future P2P/Yjs sync.

- `packages/ingestion-engine`  
  SMS parsing, classification, and ingestion pipeline (e.g. LOAN_TRUE_COST, UPI_DEBIT).

- `packages/upi-engine`  
  UPI URL parsing/building, payee history, pending intents, and reconciliation helpers.

---

## Prerequisites

- Node.js 20+
- npm
- Expo tooling for mobile dev (`npx expo` will be used via workspace)
- iOS Simulator / Android emulator (for running the app)

---

## Setup

Install dependencies:

```bash
npm install
```

Build all workspace packages:

```bash
npm run build:all
```

Type-check the entire workspace:

```bash
npx tsc --noEmit
```

---

## Running the mobile app

From the repo root:

```bash
npm run dev:mobile
```

This runs the Expo dev server for `apps/mobile`.  
The app currently includes:

- A sample EMI calculation
- Dev-only SMS ingestion smoke test (guarded by `__DEV__`)
- Dev-only UPI intent smoke test using the UPI engine + payee history

---

## CI

GitHub Actions workflow: `.github/workflows/ci.yml`

On `main` pushes / PRs, CI will:

1. Install dependencies via `npm ci`
2. Run `npm run build:all`
3. Run `npx tsc --noEmit`

If TypeScript screams, CI fails. As it should.

---

## Notes

- This is still early scaffolding; many pieces are stubs or minimal implementations.
- DB schema and TS domain types are aligned around `Date` objects for created/updated/timestamps.
- UPI pending intents are stored locally and reconciled against UPI debit SMS when they arrive.
