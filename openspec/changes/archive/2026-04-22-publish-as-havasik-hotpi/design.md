# Design: Publish as @havasik/hotpi

## Rename strategy

Mechanical find-and-replace across the codebase with manual verification.

### Package names

```
@mariozechner/pi-coding-agent  →  @havasik/hotpi
@mariozechner/pi-ai            →  @havasik/ai
@mariozechner/pi-agent-core    →  @havasik/agent-core
@mariozechner/pi-tui           →  @havasik/tui
@mariozechner/pi-web-ui        →  @havasik/web-ui
@mariozechner/pi-mom           →  @havasik/mom
@mariozechner/pi               →  @havasik/pods
@mariozechner/jiti             →  @mariozechner/jiti  (unchanged, external)
@mariozechner/clipboard        →  @mariozechner/clipboard  (unchanged, external)
```

### Environment variables

```
PI_CODING_AGENT         →  HOTPI_CODING_AGENT
PI_CODING_AGENT_DIR     →  HOTPI_CODING_AGENT_DIR  (auto-derived from APP_NAME)
PI_PACKAGE_DIR          →  HOTPI_PACKAGE_DIR
PI_SHARE_VIEWER_URL     →  HOTPI_SHARE_VIEWER_URL
PI_TUI_WRITE_LOG        →  HOTPI_TUI_WRITE_LOG
PI_HARDWARE_CURSOR      →  HOTPI_HARDWARE_CURSOR
PI_CLEAR_ON_SHRINK      →  HOTPI_CLEAR_ON_SHRINK
PI_DEBUG_REDRAW         →  HOTPI_DEBUG_REDRAW
PI_TUI_DEBUG            →  HOTPI_TUI_DEBUG
PI_CONFIG_DIR           →  HOTPI_CONFIG_DIR
PI_API_KEY              →  HOTPI_API_KEY
PI_NO_LOCAL_LLM         →  HOTPI_NO_LOCAL_LLM
PI_CACHE_RETENTION      →  HOTPI_CACHE_RETENTION
```

### Branding touchpoints

- `piConfig` in coding-agent/package.json: `{ name: "hotpi", configDir: ".hotpi" }`
- `process.title` in cli.ts and bun/cli.ts: `"hotpi"`
- bin entry in coding-agent/package.json: `"hotpi": "dist/cli.js"`
- jiti virtualModules in loader.ts: keys renamed to `@havasik/*`
- jiti aliases in loader.ts: specifiers renamed to `@havasik/*`
- Repository URLs in all package.json files: `git+https://github.com/havasik/hotpi.git`
- `scripts/sync-versions.js`: filter changed from `@mariozechner` to `@havasik`

## Publish configuration

### Published packages

`@havasik/hotpi`, `@havasik/ai`, `@havasik/agent-core`, `@havasik/tui` — with `"access": "public"` in publishConfig.

### Private packages

`@havasik/web-ui`, `@havasik/mom`, `@havasik/pods` — `"private": true` in package.json.

### Root package.json

- Rename to `hotpi-monorepo`, keep `private: true`
- Update the `publish` script to only publish the 4 public packages, or rely on `private: true` to skip the rest

### Release script (scripts/release.mjs)

- Currently runs `npm run publish` which does `npm publish -ws --access public`
- With `private: true` on web-ui/mom/pods, `npm publish -ws` will automatically skip them
- No other changes needed beyond the `@mariozechner` → `@havasik` filter in sync-versions.js

## CI/CD

### Workflows to remove

- `approve-contributor.yml` — upstream contributor gating
- `issue-gate.yml` — auto-close issues from non-approved users
- `openclaw-gate.yml` — openclaw contributor detection
- `pr-gate.yml` — auto-close PRs from non-approved users
- `build-binaries.yml` — Bun binary builds (not shipping these)

### Scripts to remove

- `scripts/build-binaries.sh` — Bun binary build script

### Workflow to keep

- `ci.yml` — build + check + test (no changes needed, it uses `npm run build/check/test`)

### New: publish-npm.yml

Triggered on `v*` tag push. Steps:
1. Checkout at tag ref
2. Setup Node.js with npm registry
3. `npm ci`
4. `npm run build`
5. `npm publish -ws --access public` (private packages auto-skipped)

Requires: `NPM_TOKEN` stored as GitHub repository secret.

### New: publish-docker.yml

Triggered on `v*` tag push. Steps:
1. Checkout
2. Log in to ghcr.io with `GITHUB_TOKEN`
3. Build Docker image
4. Tag as `ghcr.io/havasik/hotpi:<version>` and `ghcr.io/havasik/hotpi:latest`
5. Push

Uses the built-in `GITHUB_TOKEN` — no additional secrets needed.

## Dockerfile

```dockerfile
FROM node:20-slim
RUN npm install -g @havasik/hotpi
ENTRYPOINT ["hotpi"]
```

Placed at repo root. Simple — installs from npm after the npm publish workflow completes. The Docker workflow should either depend on the npm publish workflow, or the two can be a single workflow with sequential jobs (npm publish first, then Docker build+push).

## Scope boundaries

- CHANGELOGs: Leave existing entries referencing `badlogic/pi-mono` as historical record.
- `@mariozechner/jiti` and `@mariozechner/clipboard`: External packages, not renamed.
- Binary build infrastructure (build:binary script in coding-agent, bun/ directory): Leave in place but don't maintain. Could be removed in a follow-up.
