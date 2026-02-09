# Stylus Rust Contract Setup Guide

## Prerequisites

1. **Install Rust** (if not already installed):
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Add WASM target**:
   ```bash
   rustup target add wasm32-unknown-unknown
   ```

3. **Install Cargo Stylus CLI**:
   ```bash
   cargo install cargo-stylus
   ```

## Project Structure

```
contracts/
└── mycontract/
    ├── Cargo.toml
    └── src/
        └── lib.rs
```

## Building Your Contract

```bash
pnpm stylus:build
```

## Checking Deployment Readiness

```bash
pnpm stylus:check
```

## Deploying to Arbitrum Sepolia

1. Set your environment variables in `.env`:
   ```
   STYLUS_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
   DEPLOYER_PRIVATE_KEY=your_private_key_here
   ```

2. Deploy:
   ```bash
   pnpm stylus:deploy
   ```

---

## Stylus SDK Patterns

### Storage with \`sol_storage!\`

\`\`\`rust
sol_storage! {
    #[entrypoint]
    pub struct MyContract {
        uint256 count;
        bool paused;
        address owner;
        mapping(address => uint256) balances;
    }
}
\`\`\`

Access: \`self.count.get()\` / \`self.count.set(value)\`.

### Public & Payable Methods

\`\`\`rust
#[public]
impl MyContract {
    pub fn read_value(&self) -> U256 { self.count.get() }
    pub fn write_value(&mut self, val: U256) { self.count.set(val); }

    #[payable]
    pub fn deposit(&mut self) {
        let value = msg::value();
        // ...
    }
}
\`\`\`

### Events

\`\`\`rust
sol! {
    event Transfer(address indexed from, address indexed to, uint256 value);
}

evm::log(Transfer { from: caller, to: recipient, value: amount });
\`\`\`

### Error Handling

\`\`\`rust
sol! {
    error InsufficientBalance(uint256 available, uint256 required);
    error Unauthorized(address caller);
}

#[derive(SolidityError)]
pub enum MyError {
    InsufficientBalance(InsufficientBalance),
    Unauthorized(Unauthorized),
}
\`\`\`

### Cross-Contract Calls

\`\`\`rust
sol_interface! {
    interface IERC20 {
        function balanceOf(address owner) external view returns (uint256);
        function transfer(address to, uint256 amount) external returns (bool);
    }
}

let token = IERC20::new(token_address);
let balance = token.balance_of(self, owner)?;
\`\`\`

### Testing

\`\`\`toml
[dev-dependencies]
stylus-sdk = { version = "0.10.0", features = ["stylus-test"] }
\`\`\`

\`\`\`rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_counter() {
        let mut contract = Counter::default();
        contract.increment();
        assert_eq!(contract.get_count(), U256::from(1));
    }
}
\`\`\`

Run with \`cargo test\`. The \`stylus-test\` feature simulates tx context without deployment.

---

## Post-Deployment Verification

1. **Export ABI** for frontend consumption:
   \`\`\`bash
   cargo stylus export-abi --output=./abi.json --json
   \`\`\`

2. **Verify on Arbiscan**:
   - Navigate to your contract on [Arbiscan](https://arbiscan.io) or [Sepolia Arbiscan](https://sepolia.arbiscan.io)
   - Go to **Contract** tab → **Verify & Publish** → select **Stylus**
   - Upload source and verify against the deployment hash

3. **Test with cast**:
   \`\`\`bash
   cast call <ADDR> "get_count()" --rpc-url <RPC_URL>
   cast send <ADDR> "increment()" --private-key $PK --rpc-url <RPC_URL>
   \`\`\`

4. **Estimate gas** before mainnet:
   \`\`\`bash
   cargo stylus deploy --estimate-gas --endpoint="<RPC_URL>"
   \`\`\`

---

## Resources

- [Arbitrum Stylus Quickstart](https://docs.arbitrum.io/stylus/quickstart)
- [Stylus SDK Documentation](https://docs.rs/stylus-sdk)
- [Stylus by Example](https://stylus-by-example.org/)
- [Stylus Examples](https://github.com/OffchainLabs/stylus-hello-world)
- [Cargo Stylus CLI](https://github.com/OffchainLabs/stylus-sdk-rs/blob/main/cargo-stylus/README.md)
- [Arbiscan Contract Verification](https://docs.arbitrum.io/stylus/how-tos/verifying-contracts-arbiscan)
