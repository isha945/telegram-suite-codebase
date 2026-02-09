# x402 Payment Integration

# x402 Payment Integration

This document describes how to use the x402 payment protocol with your API.

## Overview

The x402 protocol enables HTTP-native payments using the `402 Payment Required` status code.

## Endpoint

- **Path**: `/api/premium/resource`
- **Price**: 1000000000000000 wei (ETH)
- **Timeout**: 300 seconds

## Payment Flow

1. **Request Resource**: Client sends a request to the protected endpoint
2. **402 Response**: Server responds with payment requirements in headers
3. **Payment**: Client submits payment transaction on-chain
4. **Receipt**: Client sends receipt in `X-Payment-Receipt` header
5. **Verification**: Server verifies receipt and grants access

## Headers

### Request Headers

```
X-Payment-Receipt: <base64-encoded-receipt>
```

### Response Headers (402)

```
X-Payment-Address: <receiver-address>
X-Payment-Amount: 1000000000000000
X-Payment-Currency: ETH
X-Payment-Chain-ID: <chain-id>
X-Payment-Timeout: 300
```

## Example Usage

```typescript
import { createX402Client } from './sdk/x402-client';

const client = createX402Client({
  baseUrl: 'https://api.example.com',
  wallet: yourWallet,
});

// Automatically handles 402 responses
const response = await client.get('/api/premium/resource');
```

## Receipt Format

```json
{
  "txHash": "0x...",
  "blockNumber": 12345678,
  "from": "0x...",
  "to": "0x...",
  "amount": "1000000000000000",
  "timestamp": 1234567890
}
```


## Receipt Validation

Receipts are validated on-chain to ensure:
- Transaction exists and is confirmed
- Payment amount matches required amount
- Payment was sent to the correct address
- Transaction is within the timeout window



