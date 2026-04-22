# HotPi - Pi fork with hot-reload support

A fork of the [Pi monorepo](https://github.com/badlogic/pi-mono) that adds **built-in hot-reload for extensions**.

## Install

```bash
# npm
npm install -g @havasik/hotpi
hotpi

# npx
npx @havasik/hotpi

# Docker
docker run ghcr.io/havasik/hotpi
```

## What's different from upstream Pi?

- **`reload_extensions` tool** — a built-in LLM-callable tool that reloads all extensions, skills, prompts, and themes. The LLM can trigger a reload after writing or modifying extensions, without the user needing to manually type `/reload`. The reload is deferred until after the current response completes.
- Active by default alongside `read`, `bash`, `edit`, `write`.

## Packages

| Package | Description |
|---------|-------------|
| **[@havasik/hotpi](packages/coding-agent)** | Interactive coding agent CLI |
| **[@havasik/ai](packages/ai)** | Unified multi-provider LLM API (OpenAI, Anthropic, Google, etc.) |
| **[@havasik/agent-core](packages/agent)** | Agent runtime with tool calling and state management |
| **[@havasik/tui](packages/tui)** | Terminal UI library with differential rendering |

## Development

```bash
npm install          # Install all dependencies
npm run build        # Build all packages
npm run check        # Lint, format, and type check
npm test             # Run tests
```

> **Note:** `npm run check` requires `npm run build` to be run first. The web-ui package uses `tsc` which needs compiled `.d.ts` files from dependencies.

## Publishing

Publishing is automated via GitHub Actions. On tag push (`v*`):

1. **npm**: The `publish-npm` workflow publishes the 4 public packages to npm. Requires `NPM_TOKEN` secret.
2. **Docker**: The `publish-docker` workflow builds and pushes to `ghcr.io/havasik/hotpi`.

To release manually:

```bash
node scripts/release.mjs patch   # or minor, major
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

MIT
