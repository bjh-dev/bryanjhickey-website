# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 personal website (bryanjhickey.com) with Sanity CMS, TypeScript, Tailwind CSS v4, and pnpm as the package manager.

## Commands

```bash
pnpm dev                  # Next.js dev server with Turbopack
pnpm run built            # Sanity typegen + Next.js production build
pnpm start                # Start production server
pnpm run lint             # ESLint
pnpm run lint:fix         # ESLint with auto-fix
pnpm run typecheck        # tsc --noEmit
pnpm run sanity:typegen   # Extract schema + generate types

# Testing (Vitest + React Testing Library)
pnpm test                 # Watch mode
pnpm run test:run         # Single pass
pnpm run test:coverage    # With coverage report
pnpm run test:ui          # Vitest UI
```

Run a single test file: `pnpm exec vitest run src/components/modules/__tests__/PostCard.test.tsx`

## Architecture

### Dual App Structure

- `src/app/(frontend)/` — Public website pages
- `src/app/(backend)/` — Sanity Studio CMS at `/studio`

### Data Fetching Pattern

All data fetching uses `sanityFetch` from `src/lib/sanity/client/live.ts` (created via `defineLive` from `next-sanity`). This provides automatic live content updates without page refresh. The standard page pattern:

1. Call `sanityFetch({ query, params })` in a Server Component
2. Destructure `{ data }` from the result
3. Call `notFound()` if no data
4. Pass data to a template or section component

Pages also implement `generateMetadata()` and `generateStaticParams()` for SSG.

### Sanity Query System

Queries use composable GROQ fragments in `src/lib/sanity/queries/fragments/index.ts` that are assembled into full queries in `src/lib/sanity/queries/queries.ts`. All queries are defined with `defineQuery` from `next-sanity` for automatic type inference via Sanity TypeGen.

Key fragments: `imageFragment`, `seoFragment`, `postCardFragment`, `postFragment`, `pageBuilderFragment` (uses GROQ conditional projections per section type).

### Type Flow (Sanity → Components)

Fully automated end-to-end:

1. Schema defined in `src/studio/schema/` using `defineType`/`defineField`
2. `pnpm run sanity:typegen` generates `src/types/sanity.types.ts` with typed query results
3. `src/lib/sanity/queries/fragments/fragment.types.ts` derives narrower types using `Extract`/`NonNullable`
4. `src/components/sections/types.ts` derives section-specific types from query results
5. Components receive strongly typed props — changing a query field propagates type errors everywhere

### Page Builder System

The page builder is a Sanity `array` field (`pageSections`) on `page` and `homePage` documents. `PageSections` (`src/components/sections/PageSections.tsx`) is a client component that maps `_type` to components via the `SECTION_COMPONENTS` registry and supports optimistic updates during visual editing.

**To add a new section:**

1. Define schema in `src/studio/schema/objects/sections/`
2. Register in `src/studio/schema/fields/pageSections.ts` (`pageSectionsObjects` array)
3. Register in `src/studio/schema/index.ts`
4. Add GROQ fragment in `src/lib/sanity/queries/fragments/index.ts` → add to `pageBuilderFragment`
5. Create component in `src/components/sections/`
6. Add type to `src/components/sections/types.ts`
7. Register in `SECTION_COMPONENTS` in `PageSections.tsx`

### Component Hierarchy

- `layout/` — Site chrome (Header, Footer — both Server Components that fetch settings)
- `templates/` — Full-page layouts for content types (Post, PostRiver, Page, PersonArchiveByline)
- `sections/` — Page builder blocks dispatched by `PageSections`
- `modules/` — Reusable pieces (PostCard, Byline, PortableText, CoverImage, Toc, ReadTime)
- `ui/` — Base primitives (shadcn/ui-style: Button, Card, Badge, Pagination)
- `animations/` — Framer Motion wrappers (FadeAnimation, FadeXAnimation, FadeYAnimation)

### Sanity Schema Structure

- **Singletons**: `home` (homePage), `settings` — pinned in Studio structure
- **Documents**: `post`, `page`, `person`, `category`
- **Sections**: `hero`, `postList` — page builder blocks
- **Objects**: `blockContent`, `button`, `link`, `menu`, `menuItem`, `social`, `seo/*`
- All documents use shared field groups: `content` (default) and `seo` (from `src/studio/config/fieldGroups.ts`)
- The `pageSections` field is shared between page and homePage via `src/studio/schema/fields/pageSections.ts`

### Key Config Files

- `src/studio/env.ts` — Validates env vars, exports `clientEnv` with project ID, dataset, API version
- `sanity.config.ts` — Plugins: unsplash, structureTool, presentationTool (visual editing), media, visionTool (dev only)
- `src/studio/structure.ts` — Custom Studio structure pinning Settings and Home as singletons

## Development Guidelines

### Styling

- Tailwind CSS v4 for all styling
- Container pattern: `<section className="my-16 px-4"><div className="mx-auto max-w-7xl">...</div></section>`
- Background variant: outer `my-8 px-4`, background layer `py-8`, inner `mx-auto max-w-7xl`
- Prefer CSS Grid over Flexbox unless it's just two sibling elements
- Use semantic HTML; use `ms/me/ps/pe` instead of `ml/mr/pl/pr` for RTL compatibility

### Sanity Schemas

- Always use `defineField`, `defineType`, `defineArrayMember` from `sanity`
- Every field must include a `description` explaining functionality in simple terms for non-technical users
- Use appropriate icons from `@sanity/icons`
- Common field patterns with descriptions are in `.cursor/rules/sanity.mdc` (eyebrow, title, richText, buttons, image with alt)

### Testing

- Use `render` from `@/test/utils` (wraps in ThemeProvider) instead of directly from `@testing-library/react`
- `src/test/setup.tsx` mocks `next/navigation`, `next/image`, and `next/link` globally
- Accessibility testing via `jest-axe` — `expect` extended with `toHaveNoViolations`
- Tests live in `__tests__/` directories alongside components or in `src/test/__tests__/`
- Coverage thresholds: 80% branches/functions/lines/statements

### Code Quality

- Husky pre-commit hooks run lint-staged (ESLint + Prettier on staged files)
- Run `pnpm run typecheck` before commits
- Fonts: Noto Sans (`--font-noto-sans`) and Bitter serif (`--font-bitter`, used for post body)

---

## Git & GitHub Workflow

### Core Rules

- **Never commit directly to `main`**. All code changes happen on a feature branch.
- **Every feature branch gets a PR** via `gh pr create` before work is considered done.
- **One branch per session/task**. If you're in a worktree, stay in your lane.

### Starting a new task

```bash
# Make sure you're up to date
git fetch origin

# Create and switch to a new branch from main
git checkout -b feat/your-task-name origin/main

# OR if using a worktree (see below)
git worktree add ../worktree-name -b feat/your-task-name origin/main
```

Branch naming conventions:

- `feat/` — new features
- `fix/` — bug fixes
- `chore/` — tooling, deps, config
- `docs/` — documentation only

### Committing

Write clear, atomic commits. Use conventional commit format:

```
feat(auth): add Google OAuth login
fix(sanity): resolve image URL null error
chore(deps): upgrade Next.js to 15.x
```

### Raising a PR

```bash
gh pr create --title "feat: your task title" --body "## Summary\n\nWhat this PR does and why." --base main
```

- Always set `--base main` explicitly.
- Include a brief summary of what changed and any testing notes in the PR body.
- If the work is incomplete, use draft mode: add `--draft`.

### Checking PR status

```bash
gh pr status          # PRs relevant to you
gh pr list            # All open PRs
gh pr view --web      # Open current branch's PR in browser
```

### Merging (when approved)

```bash
gh pr merge --squash --delete-branch
```

Use `--squash` to keep `main` history clean.

---

## Parallel Sessions with Git Worktrees

Worktrees let multiple Claude Code sessions work on separate branches simultaneously without interfering with each other.

### Setting up a worktree

```bash
# From the main repo root
git worktree add ../my-repo-feat-auth -b feat/auth origin/main
```

Each worktree is an independent working directory with its own branch. Open a separate Claude Code session in each worktree directory.

### Rules for worktree sessions

- Each session owns exactly one branch. Don't touch another session's worktree.
- Install deps independently in each worktree if needed (`pnpm install`).
- When your branch is merged, clean up: `git worktree remove ../my-repo-feat-auth`

### Handling cross-session merges / keeping in sync

If your branch falls behind `main` (e.g. another session's PR merged):

```bash
git fetch origin
git rebase origin/main   # preferred over merge to keep history clean
```

Resolve conflicts, then:

```bash
git rebase --continue
git push --force-with-lease
```

Use `--force-with-lease` (never `--force`) to avoid overwriting remote changes you haven't seen.

---

## Before Marking Work Done

- [ ] All changes are on a feature branch (not `main`)
- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes (no type errors)
- [ ] PR raised with a clear title and summary
- [ ] No secrets or `.env` values committed

---

## What to Do When Unsure

- If a task is ambiguous, **ask before writing code**.
- If a change affects shared config (Tailwind config, Sanity schemas, env vars), **flag it in the PR**.
- If you hit a merge conflict you can't resolve cleanly, **stop and surface it** rather than guessing.
