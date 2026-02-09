# SmartCache Integration Guide

## Folder Structure

```
contracts/
├── mycontract/           # Original contract (without is_cacheable / opt_in_to_cache)
│   ├── .cargo/
│   ├── Cargo.toml
│   ├── src/
│   │   ├── lib.rs        # Your selected contract (counter, erc20, vending-machine, etc.)
│   │   └── main.rs
│   └── ...
└── cached-contract/      # Same contract WITH is_cacheable + opt_in_to_cache
    ├── .cargo/
    ├── Cargo.toml        # Includes stylus-cache-sdk
    ├── src/
    │   ├── lib.rs        # Contract + caching functions
    │   └── main.rs
    └── ...
```

## After Adding is_cacheable

Once your contract has `is_cacheable()` and `opt_in_to_cache()` (as in `cached-contract/`):

1. **Deploy** with `cargo stylus deploy`:
   ```bash
   cd contracts/cached-contract
   cargo stylus deploy --private-key "${PRIVATE_KEY}" --endpoint "https://sepolia-rollup.arbitrum.io/rpc"
   ```

2. **Auto-cache**: Running `cargo stylus deploy` will deploy and activate your contract. The contract is then cacheable. Call `opt_in_to_cache()` once after deployment to opt in:
   ```bash
   cast send <CONTRACT_ADDRESS> "opt_in_to_cache()" --private-key $PRIVATE_KEY --rpc-url <RPC_URL>
   ```

## Scripts (Windows CRLF)

If you see `bad interpreter` or line-ending errors on Windows, run:

```bash
pnpm fix-scripts
# or: dos2unix scripts/*.sh
# Install: apt install dos2unix  (Linux) | brew install dos2unix  (macOS)
```

## How SmartCache Works

SmartCache reduces gas costs and latency for Stylus contracts by **warming frequently-accessed storage slots** into a fast-access cache layer. When a contract opts in:

1. Storage reads that normally hit cold EVM slots (~2100 gas) are served from the warm cache (~100 gas)
2. Subsequent calls within the same block benefit from pre-warmed slots
3. Cross-contract calls to cached contracts also benefit from reduced access costs

> **Key insight**: SmartCache is **only applicable to Stylus contracts**. Solidity contracts and pre-deployed ERC20/ERC721 token contracts do not benefit because they lack the Stylus cache SDK hooks.

## Verifying Cache Status

After deploying and calling `opt_in_to_cache()`, verify the cache is active:

### 1. Check if contract is cacheable

```bash
cast call <CONTRACT_ADDRESS> "is_cacheable()" --rpc-url <RPC_URL>
```

Expected output: `0x0000...0001` (true)

### 2. Verify opt-in was recorded

```bash
# Check the opt-in transaction receipt
cast receipt <OPT_IN_TX_HASH> --rpc-url <RPC_URL>
```

Look for `status: 1` (success) in the receipt.

### 3. Compare gas usage (before vs after)

```bash
# Call a read function and check gasUsed
cast call <CONTRACT_ADDRESS> "get_count()" --rpc-url <RPC_URL> --trace

# After cache is warm, the same call should use less gas
```

### 4. Troubleshooting cache issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| `is_cacheable()` returns false | Cache SDK not linked | Ensure `stylus-cache-sdk` is in Cargo.toml dependencies |
| `opt_in_to_cache()` reverts | Already opted in or contract not cacheable | Check `is_cacheable()` first |
| No gas improvement | Cache not yet warm | Caching improves on repeated calls within a block or across consecutive blocks |

## Resources

- [SmartCache Documentation](https://smartcache.gitbook.io/smartcache-docs)
- [stylus-cache-sdk](https://crates.io/crates/stylus-cache-sdk)
- [Stylus Gas & Caching Deep Dive](https://docs.arbitrum.io/stylus/reference/opcode-gas-pricing)
