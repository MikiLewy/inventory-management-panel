# Stoqio - Inventory Management Panel

## Project Overview

Stoqio is an inventory management dashboard built with Next.js 15, React 19, and TypeScript. It provides features for managing products, sales, warehouses, and viewing statistics. The application supports internationalization (English and Polish) and includes authentication via Supabase Auth.

## Technology Stack

### Core Framework & Runtime
- **Next.js 15.5.7** - React framework with App Router
- **React 19.1.1** - UI library
- **TypeScript 5.9.2** - Type safety
- **Node.js 18** - Runtime (Docker base image)

### Database & ORM
- **PostgreSQL** - Database (hosted on Supabase)
- **Drizzle ORM 0.44.5** - Type-safe SQL-like ORM
- **postgres.js** - PostgreSQL client

### Authentication
- **Supabase Auth** - Authentication and user management
- **@supabase/ssr** - Server-side rendering utilities

### State Management & Data Fetching
- **TanStack Query (React Query) 5.85.6** - Server state management
- **Zustand 5.0.8** - Client state management
- **XState 5.21.0** - State machines for complex workflows

### UI & Styling
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **shadcn/ui** - Component library (New York style)
- **Radix UI** - Headless UI primitives
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Recharts** - Data visualization

### Forms & Validation
- **React Hook Form 7.62.0** - Form management
- **Zod 3.25.76** - Schema validation

### Internationalization
- **next-international 1.3.1** - i18n for Next.js App Router

### Testing
- **Vitest 3.2.4** - Unit testing framework
- **@testing-library/react** - React testing utilities
- **Playwright** - Browser testing for Storybook
- **Storybook 9.1.3** - Component documentation and testing

### Code Quality
- **ESLint 8.57.1** - Linting
- **Prettier 3.6.2** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # Internationalized routes
│   │   │   ├── (auth)/         # Auth routes group (login, signup, etc.)
│   │   │   ├── (dashboard)/    # Dashboard routes group
│   │   │   │   ├── inventory/
│   │   │   │   ├── sales/
│   │   │   │   ├── statistics/
│   │   │   │   └── settings/
│   │   │   └── (legal)/        # Legal pages (privacy, terms)
│   │   ├── api/                # API routes
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/             # Shared UI components
│   │   ├── atoms/              # Small, reusable components
│   │   ├── molecules/          # Composed atoms
│   │   ├── organisms/          # Complex components
│   │   ├── templates/          # Page-level layouts
│   │   └── ui/                 # shadcn/ui components
│   ├── features/               # Feature-based modules
│   │   ├── auth/               # Authentication feature
│   │   ├── home/               # Landing page
│   │   ├── inventory/          # Product management
│   │   ├── sales/              # Sales management
│   │   ├── statistics/         # Analytics & charts
│   │   └── warehouse/          # Warehouse management
│   ├── hooks/                  # Shared custom hooks
│   ├── lib/                    # Utility functions
│   ├── locales/                # Translation files
│   ├── providers/              # React context providers
│   ├── server/                 # Server-only code
│   │   ├── db/                 # Database schema & migrations
│   │   └── utils/              # Server utilities
│   ├── shared/                 # Shared API logic
│   ├── store/                  # Zustand stores
│   └── types/                  # Global TypeScript types
├── middlewares/                # Next.js middleware chain
├── .storybook/                 # Storybook configuration
└── types/                      # Global type declarations
```

## Path Aliases

The project uses TypeScript path aliases defined in `tsconfig.json`:

- `@/*` → `./src/*`
- `@app/*` → `./src/app/*`
- `@components/*` → `./src/components/*`
- `@features/*` → `./src/features/*`
- `@hooks/*` → `./src/hooks/*`
- `@lib/*` → `./src/lib/*`
- `@server/*` → `./src/server/*`
- `@types/*` → `./src/types/*`
- `@constants/*` → `./src/constants/*`
- `@utils/*` → `./src/utils/*`
- `@assets/*` → `./public/assets/*`

## Build and Development Commands

```bash
# Development server with Turbopack
yarn dev

# Production build
yarn build

# Start production server
yarn start

# Linting
yarn lint
```

## Testing Commands

```bash
# Run all tests (watch mode)
yarn test

# Run unit tests only
yarn test:unit

# Run unit tests once
yarn test:unit:run

# Run unit tests with coverage
yarn test:unit:coverage

# Run Storybook tests
yarn test-storybook

# Start Storybook dev server
yarn storybook

# Build Storybook
yarn build-storybook
```

## Code Style Guidelines

### ESLint Configuration

The project uses a comprehensive ESLint setup (`.eslintrc.json`):

- **Base**: Next.js core web vitals, ESLint recommended, TypeScript recommended
- **Plugins**: import, unused-imports, @tanstack/query, storybook
- **Key Rules**:
  - Unused imports are errors
  - Import order enforced (builtin → external → internal → parent → sibling → index)
  - Console warnings (avoid in production)
  - Newline after imports required
  - Padding lines between statements (const/let → return, export → export)
  - Complexity warnings

### Prettier Configuration

```json
{
  "bracketSpacing": true,
  "jsxBracketSameLine": true,
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "avoid",
  "printWidth": 120
}
```

### Git Hooks

- **pre-commit**: Runs `lint-staged` which lints all staged `.js`, `.jsx`, `.ts`, `.tsx` files

## Feature-Based Architecture

Each feature in `src/features/` follows a consistent structure:

```
feature-name/
├── api/                    # API clients, types, query keys
│   ├── lib/               # Prefetch and query functions
│   ├── query-keys/        # TanStack Query keys
│   └── types/             # API types
├── components/            # Feature-specific components
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── hooks/                 # Feature-specific hooks
│   ├── mutation/          # Mutations (create, update, delete)
│   └── query/             # Queries (read)
├── locales/               # Feature translations (en, pl)
├── server/                # Server actions
│   └── actions/
├── types/                 # Feature-specific types
├── utils/                 # Feature utilities
├── index.client.ts        # Client-side exports
└── index.server.ts        # Server-side exports
```

## Database Schema

The database uses Drizzle ORM with the following tables:

- **categories** - Product categories
- **products** - Inventory items
- **sales** - Sales records
- **product-suggestions** - Product suggestions for autocomplete
- **warehouse** - Warehouse locations

Migrations are stored in `src/server/db/migrations/`.

## Middleware Chain

The application uses a custom middleware chain pattern (`middlewares/`):

1. **withAuth** - Authentication checks
2. **withInternationalization** - Locale handling

Middleware is applied to all routes except: `api`, `static`, `_next`, files with extensions, `favicon.ico`, `robots.txt`.

## Testing Strategy

### Unit Tests
- Located alongside source files with `.test.ts` or `.test.tsx` suffix
- Uses Vitest with jsdom environment
- Testing Library for React component testing
- Mocks for `next/navigation`, `react-hot-toast`, `server-only`, and i18n

### Storybook Tests
- Browser-based testing with Playwright
- Tests components in isolation
- Accessibility addon included

### Test Setup
- Global mocks in `vitest.setup.ts`
- Storybook-specific setup in `.storybook/vitest.setup.ts`

## Environment Variables

Required environment variables (defined in `.env.local`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_KEY=

# App
NEXT_PUBLIC_APP_URL=

# Database
DATABASE_URL=postgresql://...
```

## Docker Deployment

The project includes a multi-stage Dockerfile:

1. **deps** - Install dependencies
2. **builder** - Build the Next.js application
3. **runner** - Production image with standalone output

The app runs on port 3000 with a non-root user (`nextjs`).

## Security Considerations

- Authentication via Supabase Auth with middleware protection
- Environment variables for sensitive data
- Standalone Next.js output for minimal attack surface
- Non-root user in Docker container
- Type-safe database queries with Drizzle ORM

## Common Patterns

### Server Actions
Server actions are organized by feature in `src/features/{feature}/server/actions/` and handle:
- Database mutations
- External API calls
- Form submissions with validation

### Data Fetching
- Use TanStack Query for client-side data fetching
- Prefetch data in server components using `lib/prefetch.ts` files
- Query keys are centralized in `api/query-keys/`

### Forms
- Use React Hook Form with Zod validation
- Schema files located in `components/organisms/{form-name}/schema/`
- Server actions handle form submissions

### State Machines
Complex workflows (like product creation) use XState state machines located in `utils/{feature}-machine.ts`.
