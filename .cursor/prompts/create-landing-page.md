# Stoqio Landing Page Design Prompt

## Context

Build a customer-facing landing page for **Stoqio** - an inventory management and sales tracking application. The landing page should be simple, modern, and encouraging, converting visitors into users.

**Target Audience:**
- Small business owners
- Resellers (sneakers, clothing, collectibles)
- Collectors managing personal inventory
- Anyone tracking inventory and sales

---

## IMPORTANT: Follow Project Rules

Before implementing, review and strictly follow these project rules:

1. **[project-structure.mdc](.cursor/rules/project-structure.mdc)** - Directory structure and path aliases
2. **[component-patterns.mdc](.cursor/rules/component-patterns.mdc)** - Atomic Design, styling with `cn()` and CVA
3. **[internationalization.mdc](.cursor/rules/internationalization.mdc)** - All text must use i18n translations
4. **[data-fetching.mdc](.cursor/rules/data-fetching.mdc)** - If fetching data, follow these patterns
5. **[feature-module.mdc](.cursor/rules/feature-module.mdc)** - Feature module structure

---

## File Structure

**All home/landing page files must be placed in the `features/home` directory:**

```
src/features/home/
├── components/
│   ├── atoms/
│   │   └── animated-element.tsx      # Reusable animation wrapper
│   ├── molecules/
│   │   └── feature-card.tsx          # Individual feature card
│   ├── organisms/
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx
│   │   ├── how-it-works-section.tsx
│   │   ├── screenshots-section.tsx   # App screenshots showcase
│   │   ├── cta-section.tsx
│   │   └── footer.tsx
│   └── templates/
│       └── home/
│           ├── home.server.tsx       # Server component wrapper
│           └── home.client.tsx       # Client component (if needed)
├── locales/
│   ├── en/
│   │   ├── index.ts
│   │   └── home.ts                   # English translations
│   └── pl/
│       ├── index.ts
│       └── home.ts                   # Polish translations
├── index.server.ts                   # Export HomeTemplate
└── index.client.ts                   # Export client hooks/components
```

**Page route should import from the feature:**
```typescript
// src/app/[locale]/page.tsx
import { HomeTemplate } from '@features/home/index.server';

export default function HomePage() {
  return <HomeTemplate />;
}
```

---

## Core Features to Highlight

Emphasize these capabilities that Stoqio provides:

### 1. Inventory Management
- Track products across multiple warehouses
- Organize by categories (sneakers, clothing, collectibles, accessories)
- Monitor stock levels and product status
- Record purchase prices and dates

### 2. Sales Tracking
- Record sales with sold price, date, and platform
- Automatic profit calculation
- Track where items were sold

### 3. Statistics & Analytics
- Visual profit reports and charts
- Sales analytics over time
- Performance insights

### 4. Multi-Warehouse Support
- Create and manage multiple warehouses
- Organize inventory by location
- Transfer products between warehouses

### 5. Easy Organization
- Category-based filtering
- Search and sort functionality
- Bulk actions for efficiency

---

## Landing Page Sections

### 1. Hero Section
**Purpose:** Immediately communicate value and encourage action

**Content:**
- Compelling headline (e.g., "Manage inventory and track every sale effortlessly")
- Brief subheadline explaining the benefit
- Primary CTA button: "Get Started" or "Start Free"
- Optional: Secondary CTA for "Learn More"
- Optional: Hero image/illustration showing the dashboard

**Design:**
- Full viewport height or near-full
- Clean, centered layout
- High contrast for readability
- Animated elements should be subtle (use `framer-motion` if needed)

### 2. Features Section
**Purpose:** Showcase key capabilities

**Layout options:**
- 3-column grid on desktop, stacked on mobile
- Or alternating left/right feature blocks with icons/illustrations

**Each feature card should have:**
- Lucide icon (use existing icon library)
- Feature title
- 1-2 sentence description
- Keep it scannable

**Suggested features to highlight:**
1. Inventory Tracking - "Keep track of every product across all your warehouses"
2. Sales Recording - "Record sales and automatically calculate your profits"
3. Analytics Dashboard - "Visualize your performance with intuitive charts"
4. Multi-Warehouse - "Organize inventory across multiple locations"
5. Category Management - "Sort products by type for easy organization"
6. Quick Actions - "Bulk edit, mark as sold, and more with one click"

### 3. How It Works Section
**Purpose:** Show simplicity of the workflow

**Content:** 3-4 step process
1. **Add Your Warehouses** - Create locations to store inventory
2. **Track Your Products** - Add items with details and purchase info
3. **Record Your Sales** - Mark items as sold and track profits
4. **Analyze Performance** - View statistics and grow your business

**Design:**
- Numbered steps or timeline visual
- Icons for each step
- Keep descriptions brief

### 4. Social Proof Section (Optional/Placeholder)
**Purpose:** Build trust

**Options:**
- Testimonial placeholders (can be filled later)
- Stats: "X products tracked" or "Trusted by Y resellers"
- Or skip for MVP and add later

### 5. Final CTA Section
**Purpose:** Convert hesitant visitors

**Content:**
- Reinforcing headline (e.g., "Ready to take control of your inventory?")
- Repeat primary CTA button
- Optional: Mention it's free to start

### 6. App Screenshots Section
**Purpose:** Show the actual product

**Content:**
- Section title (e.g., "See Stoqio in action")
- Placeholder containers for screenshots/images
- Can showcase: Dashboard, Inventory table, Sales view, Statistics

**Implementation:**
- Use placeholder divs with `bg-muted` and aspect ratio
- Add comments indicating where screenshots will go
- Example placeholder:
```typescript
{/* Placeholder for dashboard screenshot */}
<div className="aspect-video bg-muted rounded-lg border border-border flex items-center justify-center">
  <span className="text-muted-foreground">Dashboard Screenshot</span>
</div>
```

**Design:**
- Use `aspect-video` (16:9) for screenshot containers
- Add subtle border and rounded corners
- Consider a carousel or grid layout for multiple screenshots

### 7. Footer
**Purpose:** Navigation and legal

**Content:**
- Logo
- Navigation links (if applicable)
- **Language switcher** (use existing `LanguageSwitcher` component or create one)
- **Theme toggle** (use existing `ThemeSwitcher` from `@/components/atoms/theme-switcher`)
- Copyright notice
- Links: Privacy Policy, Terms of Service (can be placeholders)

---

## Technical Requirements

### File Location
Edit the existing page: `src/app/[locale]/page.tsx`

### Server Component
The page should remain a **server component** (no `'use client'` at top level). Extract interactive parts into client components if needed.

### Internationalization
**All text content must use i18n:**

1. Add translations to `src/locales/en/common.ts` under a `home` or `landing` key:
```typescript
home: {
  hero: {
    title: 'Manage inventory and track every sale effortlessly',
    subtitle: 'The simple way to organize products, record sales, and grow your business',
    cta: 'Get Started',
    ctaSecondary: 'Learn More',
  },
  features: {
    title: 'Everything you need to manage your inventory',
    inventory: {
      title: 'Inventory Tracking',
      description: 'Keep track of every product across all your warehouses',
    },
    // ... more features
  },
  // ... more sections
}
```

2. Add corresponding Polish translations to `src/locales/pl/common.ts`

3. Use in component:
```typescript
const t = await getI18n();
<h1>{t('common.home.hero.title')}</h1>
```

### Styling Requirements

**Use semantic color tokens:**
```typescript
// Good - adapts to light/dark mode
className="bg-background text-foreground"
className="bg-muted text-muted-foreground"
className="bg-primary text-primary-foreground"
className="border-border"

// Avoid - hardcoded colors
className="bg-white text-black"
```

**Use `cn()` for class merging:**
```typescript
import { cn } from '@/lib/utils';
<div className={cn('base-classes', conditionalClass && 'conditional')} />
```

**Use shadcn/ui components:**
- `Button` for CTAs
- `Card` for feature cards (optional)
- `Separator` for visual breaks

**Responsive design:**
```typescript
// Mobile-first approach
className="px-4 md:px-8 lg:px-16"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
className="text-3xl md:text-4xl lg:text-5xl"
```

### Icons
Use Lucide React icons (already installed):
```typescript
import { Warehouse, ShoppingCart, BarChart3, Package, Tags, Zap } from 'lucide-react';
```

### Component Structure
All landing page components go in the **home feature module**:

```
src/features/home/components/
├── atoms/
│   └── animated-element.tsx
├── molecules/
│   └── feature-card.tsx
├── organisms/
│   ├── hero-section.tsx
│   ├── features-section.tsx
│   ├── how-it-works-section.tsx
│   ├── screenshots-section.tsx
│   ├── cta-section.tsx
│   └── footer.tsx
└── templates/
    └── home/
        ├── home.server.tsx
        └── home.client.tsx
```

**Do NOT put landing page components in `src/components/` - they belong in `src/features/home/`**

---

## Design Guidelines

### Visual Style
- **Clean and minimal** - Don't overcrowd
- **Generous whitespace** - Let content breathe
- **Clear hierarchy** - Headlines > subheadlines > body text
- **Consistent spacing** - Use Tailwind's spacing scale (4, 6, 8, 12, 16, 24)

### Typography
- Use the project's font (Geist Sans)
- Hero title: `text-4xl md:text-5xl lg:text-6xl font-bold`
- Section titles: `text-2xl md:text-3xl font-semibold`
- Body text: `text-base md:text-lg text-muted-foreground`

### Colors
- Primary brand color for CTAs and accents
- Muted backgrounds for alternating sections
- Ensure sufficient contrast for accessibility

### Dark Mode
- All designs must work in both light and dark modes
- Test with theme toggle
- Use semantic tokens, not hardcoded colors

### Language & Theme Selection
**Include on the landing page:**
- Language switcher (EN/PL toggle)
- Theme toggle (Light/Dark/System)

**Placement options:**
- In the header/navbar area
- In the footer
- Or both (header for quick access, footer for completeness)

**Use existing components:**
```typescript
import { ThemeSwitcher } from '@/components/atoms/theme-switcher';
// Create or use a language switcher component using useChangeLocale
```

### Animations with Framer Motion

**Use `framer-motion` for animations, but keep them SUBTLE:**

```typescript
import { motion } from 'framer-motion';

// Fade in on scroll - SUBTLE
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  {/* Content */}
</motion.div>

// Staggered children - SUBTLE
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Keep short
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 }, // Small y offset
  visible: { opacity: 1, y: 0 },
};
```

**Animation Guidelines:**
- **DO:** Fade-in on scroll, subtle hover states, smooth transitions
- **DO:** Use `viewport={{ once: true }}` to animate only once
- **DO:** Keep durations short (0.3s - 0.6s)
- **DO:** Use small movement values (10-20px max)
- **DON'T:** Bouncy/spring animations that distract
- **DON'T:** Animations that delay content visibility
- **DON'T:** Continuous/looping animations
- **DON'T:** Animations on every scroll

**Create a reusable animation wrapper:**
```typescript
// src/features/home/components/atoms/animated-element.tsx
'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedElementProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
}

export const AnimatedElement = ({ 
  children, 
  delay = 0,
  ...props 
}: AnimatedElementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: 'easeOut' 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
```

---

## Example Structure

### Page Route (minimal - imports from feature)
```tsx
// src/app/[locale]/page.tsx
import { HomeTemplate } from '@features/home/index.server';

export default function HomePage() {
  return <HomeTemplate />;
}
```

### Feature Server Template
```tsx
// src/features/home/components/templates/home/home.server.tsx
import { getI18n } from '@/locales/server';

import { HeroSection } from '../../organisms/hero-section';
import { FeaturesSection } from '../../organisms/features-section';
import { ScreenshotsSection } from '../../organisms/screenshots-section';
import { HowItWorksSection } from '../../organisms/how-it-works-section';
import { CtaSection } from '../../organisms/cta-section';
import { Footer } from '../../organisms/footer';

export const HomeTemplate = async () => {
  const t = await getI18n();

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <HowItWorksSection />
      <CtaSection />
      <Footer />
    </div>
  );
};
```

### Example Section with Animations
```tsx
// src/features/home/components/organisms/features-section.tsx
'use client';

import { motion } from 'framer-motion';
import { Warehouse, ShoppingCart, BarChart3 } from 'lucide-react';
import { useI18n } from '@/locales/client';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const FeaturesSection = () => {
  const t = useI18n();

  return (
    <section className="py-24 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl font-semibold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('home.features.title')}
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Feature cards with itemVariants */}
        </motion.div>
      </div>
    </section>
  );
};
```

### Example Screenshot Placeholder
```tsx
// src/features/home/components/organisms/screenshots-section.tsx
'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/locales/client';

export const ScreenshotsSection = () => {
  const t = useI18n();

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl font-semibold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('home.screenshots.title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dashboard Screenshot Placeholder */}
          <motion.div 
            className="aspect-video bg-muted rounded-xl border border-border flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center text-muted-foreground">
              <p className="text-sm">Dashboard Screenshot</p>
              <p className="text-xs mt-1">Replace with actual screenshot</p>
            </div>
          </motion.div>

          {/* Inventory Screenshot Placeholder */}
          <motion.div 
            className="aspect-video bg-muted rounded-xl border border-border flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-center text-muted-foreground">
              <p className="text-sm">Inventory Screenshot</p>
              <p className="text-xs mt-1">Replace with actual screenshot</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
```

### Feature Index Exports
```tsx
// src/features/home/index.server.ts
export { HomeTemplate } from './components/templates/home/home.server';
```

```tsx
// src/features/home/index.client.ts
import en from './locales/en';
import pl from './locales/pl';

export default {
  locales: {
    en,
    pl,
  },
} as const;
```

---

## Checklist Before Implementation

- [ ] Review all project rules in `.cursor/rules/`
- [ ] Plan translation keys structure
- [ ] Sketch rough layout (mental or paper)
- [ ] Identify which shadcn/ui components to use
- [ ] Consider mobile layout first
- [ ] Plan the `src/features/home/` directory structure

## Checklist After Implementation

- [ ] All files are in `src/features/home/` directory
- [ ] All text uses i18n (no hardcoded strings)
- [ ] Both English and Polish translations added in `features/home/locales/`
- [ ] Works in light and dark mode
- [ ] Language switcher included and working
- [ ] Theme toggle included and working
- [ ] Responsive on mobile, tablet, desktop
- [ ] Uses semantic color tokens
- [ ] Follows component patterns from rules
- [ ] Accessible (semantic HTML, proper heading hierarchy)
- [ ] CTA links work correctly
- [ ] Screenshot placeholders clearly marked for future replacement
- [ ] Animations are subtle and don't distract from content
- [ ] Feature translations exported via `index.client.ts` with `locales` property

---

## Inspiration

Keep the design:
- **Simple** - Don't overwhelm with information
- **Focused** - Clear path to conversion (Get Started)
- **Professional** - Build trust with clean design
- **Fast** - Minimal animations, optimized images

Remember: The goal is to convert visitors into users. Every element should serve that purpose.
