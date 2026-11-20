# CLAUDE.md

## Project Overview

WalletKit is a React component library for connecting wallets to dApps. Supports EVM, Solana, and Tron chains.

- Monorepo managed by pnpm workspaces
- Main package: `packages/walletkit` (published as `@node-real/walletkit`)
- Package manager: pnpm 9.x (requires Node.js v20+)

## Common Commands

```sh
# Install dependencies
pnpm install

# Development (runs __dev__ example with hot reload)
pnpm dev

# Build the walletkit package
pnpm build

# Lint
pnpm lint

# Create a changeset for versioning
pnpm changeset
```

## Project Structure

- `packages/walletkit/src/core/` - Shared core (UI components, configs, providers, utils)
- `packages/walletkit/src/evm/` - EVM wallet connectors (wagmi-based)
- `packages/walletkit/src/solana/` - Solana wallet adapters
- `packages/walletkit/src/tron/` - Tron wallet adapters
- `packages/walletkit/src/core/configs/` - Per-wallet config (name, logos, download URLs, spinner color)
- `packages/walletkit/src/evm/wallets/` - Per-wallet connector logic with platform behaviors

## Code Standards

- All generated code, comments, and commit messages MUST be in English only.
- Never expose private information (local filesystem paths, usernames, home directories, machine-specific details) in code, comments, commits, or PR descriptions.
- Follow existing code patterns - check sibling wallet implementations for reference (e.g., `trustWallet/`, `okxWallet/`).
- Use `@/` path alias for imports within `packages/walletkit/src/`.
- Use `sleep` from `@/core/utils/common`, not from external packages.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint).
- Release workflow uses changesets: branch off `main` -> PR -> `pnpm changeset` -> merge to `alpha` -> test -> merge to `main`.
