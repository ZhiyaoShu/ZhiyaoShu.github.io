# design-sync notes — Upsilon UI (Zoey Portfolio)

- **This is a Next.js app, not a published component package.** It's synced in **synth-entry mode** (no `dist/`). `PKG_DIR` resolves via the `node_modules/my-portfolio -> ..` self-symlink (created by the `"my-portfolio": "file:"` self-dependency in package.json). If that symlink is gone after a clean install, re-run `npm install` (the self-dep recreates it).
- **Node is not on PATH.** Use the conda env: `export PATH="/home/tmp_s/miniconda3/envs/slides-mcp/bin:$PATH"` (Node v20).
- **Scope:** `cfg.srcDir = app/components/ui`. 56 components = the 13 shadcn primitives expanded into their sub-parts (Card→CardHeader…, Dialog→DialogTrigger…, etc.), all in group `general`. `icons.tsx` (ArrowIcon/DownloadIcon/Star) and `error.tsx` (Error) are excluded via `componentSrcMap: null`.
- **Stylesheet (`cssEntry`) is generated, not committed** (`.design-sync/compiled.css`, gitignored). Regenerate before each build:
  `./node_modules/.bin/tailwindcss -i app/global.css -o .design-sync/compiled.css --minify`
  It carries the Tailwind utilities used by the scanned components **plus** the `:root`/`.dark` CSS-variable tokens.
- **Render check skipped** (`--no-render-check`) at the user's request on the first sync — previews are NOT machine-verified. A future sync can install playwright+chromium and verify.

## Known render warns (triaged, non-blocking)
- `[TOKENS_MISSING]`: `--font-geist-sans`, `--font-geist-mono`, `--font-jetbrains`, `--font-spectral` (defined at runtime by `next/font` in the app, never in a static stylesheet) and `--tw-shadow-color`, `--radix-toast-swipe-*` (set at runtime). Expected absent.
- `[FONT_MISSING]`: "JetBrains Mono", "Spectral" — the portfolio's brand fonts, loaded at runtime via `next/font`. The shadcn primitives don't depend on them; they fall back to system fonts (accepted substitute).

## Re-sync risks
- **Tailwind closure:** the shipped `styles.css` only contains utility classes present in the scanned component source. Components themselves render fully styled, but a design the claude.ai agent builds with *new* utility classes relies on the design tool's own Tailwind at render time. If designs come out unstyled, ship a broader Tailwind build (add a safelist of semantic-token utilities to the `tailwindcss` CLI run).
- **synth-entry** → `.d.ts` props are extracted from source, not shipped types; weaker than a real build. Adding a component under `app/components/ui` auto-includes it next sync.
- `compiled.css` is gitignored — never assume it's present; regenerate it.
