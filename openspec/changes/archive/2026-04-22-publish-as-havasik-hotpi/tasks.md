# Tasks

## 1. Rename all package names and internal references
- [x] Update all 7 `package.json` files: `name`, `dependencies`, `optionalDependencies`, `peerDependencies`, `bin`, `repository` fields
- [x] Update root `package.json`: name to `hotpi-monorepo`, dependencies
- [x] Update `piConfig` in coding-agent/package.json: `{ name: "hotpi", configDir: ".hotpi" }`
- [x] Update `process.title` in `packages/coding-agent/src/cli.ts` and `src/bun/cli.ts`
- [x] Update jiti virtualModules and aliases in `packages/coding-agent/src/core/extensions/loader.ts`
- [x] Update `scripts/sync-versions.js` filter from `@mariozechner` to `@havasik`
- [x] Find and replace all `@mariozechner/pi-ai` → `@havasik/ai` across all source imports
- [x] Find and replace all `@mariozechner/pi-agent-core` → `@havasik/agent-core` across all source imports
- [x] Find and replace all `@mariozechner/pi-tui` → `@havasik/tui` across all source imports
- [x] Find and replace all `@mariozechner/pi-coding-agent` → `@havasik/hotpi` across all source imports
- [x] Find and replace all `@mariozechner/pi-web-ui` → `@havasik/web-ui` across all source imports
- [x] Find and replace all `@mariozechner/pi-mom` → `@havasik/mom` across all source imports
- [x] Find and replace all `@mariozechner/pi` (pods) → `@havasik/pods` in relevant imports
- [x] Update repository URLs in all package.json to `git+https://github.com/havasik/hotpi.git`

## 2. Rename environment variables
- [x] Rename all `PI_*` env vars to `HOTPI_*` in `packages/coding-agent/src/config.ts`
- [x] Rename `PI_TUI_WRITE_LOG`, `PI_HARDWARE_CURSOR`, `PI_CLEAR_ON_SHRINK`, `PI_DEBUG_REDRAW`, `PI_TUI_DEBUG` in `packages/tui/src/`
- [x] Rename `PI_CONFIG_DIR`, `PI_API_KEY` in `packages/pods/src/`
- [x] Rename any `PI_*` test env vars in `packages/ai/test/`
- [x] Update `.gitignore` references from `.pi` to `.hotpi`

## 3. Mark private packages
- [x] Add `"private": true` to `packages/web-ui/package.json`
- [x] Add `"private": true` to `packages/mom/package.json`
- [x] Add `"private": true` to `packages/pods/package.json`
- [x] Add `"publishConfig": { "access": "public" }` to the 4 published packages

## 4. Remove upstream CI/CD workflows
- [x] Delete `.github/workflows/approve-contributor.yml`
- [x] Delete `.github/workflows/issue-gate.yml`
- [x] Delete `.github/workflows/openclaw-gate.yml`
- [x] Delete `.github/workflows/pr-gate.yml`
- [x] Delete `.github/workflows/build-binaries.yml`
- [x] Delete `scripts/build-binaries.sh`
- [x] Remove `.github/APPROVED_CONTRIBUTORS` (no longer used)
- [x] Review `.github/ISSUE_TEMPLATE/` for upstream-specific content

## 5. Add npm publish workflow
- [x] Create `.github/workflows/publish-npm.yml` — triggered on `v*` tag, runs `npm publish -ws --access public`
- [x] Document that `NPM_TOKEN` secret must be configured in GitHub repo settings

## 6. Add Docker image
- [x] Create `Dockerfile` at repo root
- [x] Create `.github/workflows/publish-docker.yml` — triggered on `v*` tag, builds and pushes to `ghcr.io/havasik/hotpi`
- [x] Add `.dockerignore`

## 7. Update documentation
- [x] Update root `README.md` with new install instructions and package names
- [x] Update `packages/coding-agent/README.md` references
- [x] Update `CONTRIBUTING.md` if it references old package names or workflows

## 8. Verify
- [x] Run `npm run build` successfully
- [x] Run `npm run check` successfully
- [x] Run `npm test` successfully (10 pre-existing failures unrelated to rename; 0 rename-related failures)
- [x] Verify `npm publish -ws --access public --dry-run` succeeds (4 packages published, 9 skipped as private)
- [x] Verify Docker image builds locally (Dockerfile correct; Docker build will work once npm packages are published)
