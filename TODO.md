# Talento Update TODO

## Plan (approved)

### Step 0 — Create design system foundation
- [x] Add/extend Tailwind theme tokens for Talento colors/gradients.
- [x] Add global CSS utilities for glassmorphism + AI glow.


### Step 1 — Add Design System components
- [x] Implement `GlassCard`.
- [x] Implement `TrustScore`.
- [x] Implement `AIInsightBadge`.
- [x] Implement `EmptyState`.
- [x] Implement `SkeletonCard`.
- [x] Implement `ModernNav`.
- [x] Wire ModernNav into app layout.



### Step 2 — Upgrade AI Matching Dashboard screen
- [x] Upgrade `Dashboard` layout with top 3 AI insight stat cards.
- [x] Implement match cards grid/list using upgraded `MatchCard`.
- [x] Add sidebar trending skills widget.
- [x] Add empty state using `EmptyState`.




### Step 3 — Upgrade Profile + Trust Score area
- [ ] Replace `UserProfile` placeholder content with TrustScore circle + breakdown panel.
- [ ] Add trust verification badge and skills/reviews mock sections.

### Step 4 — Upgrade MatchCard
- [x] Rewrite `app/components/Matching/MatchCard.tsx` to include:
  - [x] Avatar + trust overlay
  - [x] Circular match score
  - [x] AIInsight badges with confidence dots
  - [x] Offered vs wanted skill tags
  - [x] Expandable “Why this match?” with progress bars

### Step 5 — Wire navigation/layout
- [ ] Add `ModernNav` to the app-level layout so it appears across routes.

### Step 6 — Validate
- [x] Run `npm run dev` (frontend) and confirm no TS/Tailwind errors.
- [x] Run `npm run build` to ensure production build passes.


