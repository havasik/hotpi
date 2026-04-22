# Publish hotpi as @havasik/hotpi npm package + Docker image

## Problem

hotpi is a fork of pi-mono with the `reload_extensions` feature baked in. Currently it can only be run from source. There's no way for users to install it via npm or run it in a container.

## Solution

Rebrand the fork under the `@havasik` npm scope, publish to npm, and provide a Docker image on GitHub Container Registry.

### Rename

Full rename across the monorepo:

| Current | New |
|---------|-----|
| `@mariozechner/pi-coding-agent` | `@havasik/hotpi` |
| `@mariozechner/pi-ai` | `@havasik/ai` |
| `@mariozechner/pi-agent-core` | `@havasik/agent-core` |
| `@mariozechner/pi-tui` | `@havasik/tui` |
| `@mariozechner/pi-web-ui` | `@havasik/web-ui` |
| `@mariozechner/pi-mom` | `@havasik/mom` |
| `@mariozechner/pi` (pods) | `@havasik/pods` |
| Root: `pi-monorepo` | `hotpi-monorepo` |
| bin: `pi` | bin: `hotpi` |
| piConfig name: `pi` | piConfig name: `hotpi` |
| config dir: `.pi` | config dir: `.hotpi` |
| `PI_*` env vars | `HOTPI_*` env vars |
| `process.title = "pi"` | `process.title = "hotpi"` |
| Repository URLs | `git+https://github.com/havasik/hotpi.git` |

External deps `@mariozechner/jiti` and `@mariozechner/clipboard` are unchanged (not part of this monorepo).

### npm publish (4 packages)

- `@havasik/hotpi` — the CLI, what users install
- `@havasik/ai` — dependency
- `@havasik/agent-core` — dependency
- `@havasik/tui` — dependency

Not published (marked `private: true`): `@havasik/web-ui`, `@havasik/mom`, `@havasik/pods`.

### CI/CD changes

**Remove** (upstream governance, not needed for this fork):
- `approve-contributor.yml`
- `issue-gate.yml`
- `openclaw-gate.yml`
- `pr-gate.yml`

**Remove** (not shipping Bun binaries):
- `build-binaries.yml`
- `scripts/build-binaries.sh`

**Keep and update**:
- `ci.yml` — build + check + test on push/PR (no changes needed beyond rename)

**Add new workflows**:
- `publish-npm.yml` — on `v*` tag push, publish 4 packages to npm (requires `NPM_TOKEN` secret)
- `publish-docker.yml` — on `v*` tag push, build and push Docker image to `ghcr.io/havasik/hotpi`

### User experience

```bash
# npm
npm install -g @havasik/hotpi
hotpi

# npx
npx @havasik/hotpi

# Docker
docker run ghcr.io/havasik/hotpi
```

## Non-goals

- Staying in sync with upstream pi-mono
- Publishing all 7 packages (web-ui, mom, pods stay private)
- Bundling into a single JS file (not feasible due to jiti/extensions)
- Bun binary distribution
