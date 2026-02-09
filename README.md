# My Dapp

A Web3 application - composed with [N]skills

## 📁 Project Structure

```
my-dapp/
├── apps/
│   └── web/                    # Next.js frontend
│       ├── src/
│       ├── package.json
│       └── ...
├── contracts/                  # Rust/Stylus smart contracts
│   ├── mycontract/            # Original contract (no caching)
│   │   └── src/lib.rs
│   └── cached-contract/       # Contract with is_cacheable + opt_in_to_cache
│       └── src/lib.rs
├── docs/                       # Documentation
├── scripts/                     # Deploy scripts
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd my-dapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure:
      - `AGENT_NAME`: Name of the AI agent
   - `OPENROUTER_API_KEY`: OpenRouter API key for LLM access
   - `NEXT_PUBLIC_AGENT_NETWORK`: Network for agent operations (arbitrum or arbitrum-sepolia)
   - `PAYMENT_RECEIVER_ADDRESS`: Ethereum address to receive payments
   - `PAYMENT_PRIVATE_KEY`: Private key for signing receipts
   - `STYLUS_RPC_URL`: Arbitrum RPC URL for deployment
   - `DEPLOYER_PRIVATE_KEY`: Private key for deployment
   - `TELEGRAM_BOT_TOKEN`: Bot token from @BotFather
   - `OPENAI_API_KEY`: API key for OpenAI
   - `TELEGRAM_WEBHOOK_SECRET`: Secret for webhook verification
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: WalletConnect Cloud project ID
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`: Your bot username (without @)

4. **Deploy contracts** (from repo root): `pnpm deploy:sepolia` or `pnpm deploy:mainnet`

5. **Scripts (Windows):** Run `pnpm fix-scripts` or `dos2unix scripts/*.sh` if you see line-ending errors.

## 🔗 Smart Contracts

The `contracts/` folder contains Rust/Stylus smart contract source code. See `docs/` for deployment and integration guides.

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm deploy:sepolia` | Deploy to Arbitrum Sepolia |
| `pnpm deploy:mainnet` | Deploy to Arbitrum One |
| `pnpm fix-scripts` | Fix CRLF line endings (Windows) |

## 🌐 Supported Networks

- Arbitrum Sepolia (Testnet)
- Arbitrum One (Mainnet)
- Superposition
- Superposition Testnet

## 📚 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Web3:** wagmi + viem
- **Wallet Connection:** RainbowKit

## 📖 Documentation

See the `docs/` folder for:
- Contract interaction guide
- Deployment instructions
- API reference

## License

MIT

---

Generated with ❤️ by [[N]skills](https://www.nskills.xyz)
