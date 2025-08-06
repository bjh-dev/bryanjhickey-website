# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 personal website for Bryan Hickey (bryanjhickey.com) that uses:

- **Next.js 15** with App Router
- **Sanity CMS** for content management with live preview
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Bun** as the package manager and runtime

## Development Commands

```bash
# Development (runs Next.js dev + Sanity type generation watcher)
bun dev

# Build for production
bun run built

# Start production server
bun start

# Linting and type checking
bun run lint
bun run typecheck

# Sanity type generation
bun run sanity:typegen

# Debug build with cache inspection
bun run next:debug
```

## Architecture Overview

### Dual App Structure

The app uses Next.js App Router with two distinct sections:

- `src/app/(frontend)/` - Public website pages
- `src/app/(backend)/` - Sanity Studio CMS at `/studio`

### Content Management

- **Sanity Studio** embedded at `/studio` route for content editing
- **Live Preview** with `next-sanity` for real-time content updates
- **Draft Mode** for previewing unpublished content
- **Auto-generated types** from Sanity schema in `src/types/sanity.types.ts`

### Key Directories

- `src/components/` - React components organized by purpose:
  - `layout/` - Header, Footer, etc.
  - `modules/` - Reusable UI modules
  - `sections/` - Page section components
  - `templates/` - Page templates
  - `ui/` - Base UI components
- `src/lib/sanity/` - Sanity client configuration and queries
- `src/studio/` - Sanity schema definitions and configuration
- `src/app/api/` - API routes for draft mode

### Sanity Schema Structure

Content types are organized as:

- **Documents**: `post`, `page`, `person`, `category`
- **Singletons**: `home`, `settings`
- **Sections**: `hero`, `postList` (for page builder)
- **Objects**: `blockContent`, `button`, `link`, `menu`, etc.
- **SEO**: Comprehensive SEO schema with OpenGraph and Twitter cards

## Development Guidelines

### Styling Conventions

- Use **Tailwind CSS v4** for all styling
- Standard container pattern: `mx-auto max-w-7xl` with `my-16 px-4`
- Prefer CSS Grid over Flexbox except for simple two-element layouts
- Use semantic HTML elements
- Follow ltr/rtl agnostic classes (ms/me instead of ml/mr)

### Sanity Schema Development

- Always use `defineField`, `defineType`, and `defineArrayMember` from Sanity
- Include descriptive `description` fields for non-technical users
- Use appropriate Sanity icons for schema types
- Follow the patterns in `.cursor/rules/sanity.mdc` for consistent schema structure

### Component Patterns

- Functional React components only
- Use TypeScript with proper Sanity-generated types
- Components should handle both draft and published content states
- Implement proper SEO metadata using the SEO schema

### Code Quality

- ESLint config includes Next.js, TypeScript, Prettier, and accessibility rules
- Prettier configuration enforces consistent code style
- Type checking with `tsc --noEmit`
- Husky pre-commit hooks with lint-staged

## Environment Configuration

- Sanity project configuration in `src/studio/env.ts`
- Next.js config includes Sanity image optimization and CORS headers
- Draft mode API routes at `/api/draft-mode/enable` and `/api/draft-mode/disable`

## Testing and Deployment

- Run `bun run typecheck` before commits to ensure type safety
- Build process includes Sanity type generation
- Production analytics with Fathom (when NODE_ENV=production)
