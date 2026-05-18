# Talento - AI-Powered Skill Exchange Platform

## Overview

Talento is a premium, AI-powered skill exchange platform that connects people through intelligent matching, transparent trust systems, and fair time-based contracts. The platform emphasizes **explainable AI**, **trust transparency**, and **fairness tracking** to create a credible learning ecosystem.

---

## 🎨 Design System

### Design Philosophy

**Premium, Intelligent Product Design** where every UI element communicates:
- Smart AI decisions (visible and explained)
- Trust and credibility (data-driven)
- Fairness in exchange (tracked and balanced)

**Inspired by:** Stripe, Linear, Notion, Apple HIG

---

### Color Palette

#### Primary Colors (From Logo)

```css
/* Talento Gold */
--primary: #D4A574
--primary-dark: #C99659
--primary-light: #E5B680
--primary-foreground: #1A2B3D

/* Navy Blue */
--navy: #1A2B3D
--navy-light: #2A3B4D
--navy-dark: #0F1D2E
```

#### Semantic Colors

```css
/* Trust Score Colors */
--trust-high: #10b981    /* 80-100: Trusted */
--trust-medium: #f59e0b  /* 50-79: Verified */
--trust-low: #ef4444     /* 0-49: New */

/* Status Colors */
--success: #10b981
--success-light: #d1fae5
--warning: #f59e0b
--warning-light: #fef3c7
--error: #ef4444
--error-light: #fee2e2
--info: #3b82f6
--info-light: #dbeafe
```

#### Gradients

```css
--gradient-primary: linear-gradient(135deg, #D4A574 0%, #C99659 100%)
--gradient-navy: linear-gradient(135deg, #1A2B3D 0%, #0F1D2E 100%)
--gradient-success: linear-gradient(135deg, #11998e 0%, #38ef7d 100%)
--gradient-glow: linear-gradient(135deg, #D4A574 0%, #E5B680 100%)
```

#### Backgrounds

```css
/* Light Mode */
--background: #F5F7FA
--background-secondary: #E8ECEF
--foreground: #1A2B3D

/* Dark Mode */
--background: #0F1D2E
--background-secondary: #1A2B3D
--foreground: #F1F5F9
```

---

### Glassmorphism

Premium glass effect for cards and modals:

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}

/* Dark Mode */
.dark .glass {
  background: rgba(26, 43, 61, 0.7);
  border: 1px solid rgba(212, 165, 116, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
}
```

**AI Glow Effect:**
```css
.ai-glow {
  box-shadow: 0 0 20px rgba(212, 165, 116, 0.4);
}

.ai-glow:hover {
  box-shadow: 0 0 30px rgba(212, 165, 116, 0.6);
}
```

---

### Typography

**Font Stack:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
```

**Scale:**
- **H1**: 2.5rem (40px) - Bold, -2% letter-spacing
- **H2**: 2rem (32px) - Semibold, -1% letter-spacing
- **H3**: 1.5rem (24px) - Semibold
- **H4**: 1.25rem (20px) - Medium
- **Body**: 1rem (16px) - Normal, 1.6 line-height
- **Small**: 0.875rem (14px)

**Weights:**
- 400: Normal
- 500: Medium
- 600: Semibold
- 700: Bold

---

### Spacing System (8pt Grid)

```css
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

---

### Border Radius

```css
--radius-sm: 12px   /* Small elements */
--radius: 16px      /* Default cards */
--radius-lg: 20px   /* Large cards */
--radius-xl: 24px   /* Modals */
--radius-full: 9999px /* Circular */
```

---

### Shadows (Soft Elevation)

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.03)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.06)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08)
--shadow-glow: 0 0 20px rgba(212, 165, 116, 0.4)
```

---

### Animations

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1)
```

**Progress Bars:** 1000ms animated transitions  
**Hover States:** Scale 1.02 + shadow elevation  
**AI Glow:** 300ms shadow transitions

---

## 🧩 Core Components

### 1. GlassCard

Semi-transparent card with glassmorphism effect.

**Props:**
- `hover` (boolean): Enable scale effect on hover
- `glow` (boolean): Add AI glow effect
- `className` (string): Additional Tailwind classes

**Usage:**
```tsx
<GlassCard hover glow className="p-6">
  <h3>Card Content</h3>
</GlassCard>
```

---

### 2. TrustScore

Circular progress indicator for trust level (0-100).

**Props:**
- `score` (number): Trust score 0-100
- `size` ("sm" | "md" | "lg"): Size variant
- `showLabel` (boolean): Display status label

**Behavior:**
- **80-100**: Green circle, "Trusted" label
- **50-79**: Amber circle, "Verified" label
- **0-49**: Red circle, "New" label

**Animated:** SVG stroke animates on mount (1000ms)

**Usage:**
```tsx
<TrustScore score={92} size="lg" showLabel />
```

---

### 3. AIInsightBadge

Shows AI-generated insights with confidence indicators.

**Types:**
- `match`: Purple - Skill compatibility
- `trending`: Blue - Demand/popularity
- `balance`: Green - Fair exchange
- `fast`: Amber - Quick response

**Confidence Levels:**
- `high`: ●●● (3 filled dots)
- `medium`: ●●○ (2 filled dots)
- `low`: ●○○ (1 filled dot)

**Usage:**
```tsx
<AIInsightBadge 
  type="balance" 
  text="Best Exchange Balance" 
  confidence="high" 
/>
```

---

### 4. MatchCard

Complete match display with expandable AI explanation.

**Features:**
- Avatar with trust score overlay
- Circular match percentage (0-100%)
- AI insight badges
- Skill tags (offered vs wanted)
- **Expandable "Why this match?" section:**
  - Skill Overlap % (with progress bar)
  - Level Similarity % (with progress bar)
  - Mutual Benefit % (with progress bar)
- CTA buttons (Connect, Schedule)

**Interactions:**
- Hover: Scale 1.02 + shadow elevation
- Click "Why this match?": Expands AI explanation
- Smooth 1000ms transitions on progress bars

---

### 5. ModernNav

Top navigation with glassmorphism and dark mode toggle.

**Features:**
- Talento logo (clickable)
- Navigation tabs with badges
- Notification bell (with red dot)
- **Dark Mode Toggle** (Moon/Sun icon)
- Active state: Gold gradient background

**Tabs:**
- AI Matches (badge: 3)
- Profile
- Contracts (badge: 1)
- Chat

---

### 6. EmptyState

Centered placeholder for empty states.

**Props:**
- `icon`: Lucide icon component
- `title`: Heading text
- `description`: Body text
- `action`: Optional CTA object

**Usage:**
```tsx
<EmptyState 
  icon={Users}
  title="No matches yet"
  description="Complete your profile to get AI-powered matches"
  action={{ label: "Complete Profile", onClick: () => {} }}
/>
```

---

### 7. LevelBadge

User level and XP progression display.

**Shows:**
- Current level
- XP points
- Progress to next level (animated bar)

---

### 8. SkeletonCard

Loading placeholder with pulse animation.

**Use for:** Async data loading states

---

## 📱 Screen Specifications

### Screen 1: AI Matching Dashboard

**Purpose:** Intelligent, explainable AI match recommendations

#### Top Section: AI Insights Panel

**3 Stat Cards:**
1. **Top Match Today**
   - Name + match %
   - Target icon
   - Purple gradient background

2. **Trending Skills**
   - Skill name + trend %
   - TrendingUp icon
   - Green gradient background

3. **AI Confidence**
   - High/Medium/Low
   - Data points count
   - Amber gradient background

#### Main Content: Match Cards

**Each card displays:**
- Avatar (navy gradient border)
- Name + title
- **Circular match score** (gold gradient)
- **AI Insight badges** (with confidence dots)
- **Skills Offered** (green badges)
- **Skills Wanted** (blue badges)
- **"Why this match?" button** (expandable)

**Expanded View Shows:**
- Skill Overlap % (gold progress bar)
- Level Similarity % (green progress bar)
- Mutual Benefit % (amber progress bar)

#### Sidebar: Trending Skills

- Live demand indicators
- Progress bars for each skill
- Trend badges (+X%)

**Empty State:**
```
Icon: Users
Title: "No matches yet"
Description: "Complete your profile to get AI-powered matches"
CTA: "Complete Profile"
```

---

### Screen 2: Profile + Trust Score

**Purpose:** Transparent credibility through data

#### Header

- Large avatar (navy gradient border with gold text)
- Name + title
- Member since date
- Average rating (stars + count)
- Achievement badges (top 3)
- Message button (gold gradient)

#### Trust Score Section (Sidebar)

**Large Trust Circle (0-100):**
- Animated SVG stroke
- Color-coded by score
- Status label below

**Breakdown Panel:**
- Completed Sessions: Count
- Avg Rating: Stars + number
- Cancellation Rate: Percentage (green if low)
- Response Time: Duration

**Trust History Chart:**
- Mini bar chart (8 weeks)
- Gold gradient bars
- Hover: Shows exact value

**Verification Badge:**
- Green gradient background
- CheckCircle icon
- "Verified Expert" label
- "Identity & skills verified by Talento AI"

#### Skills Section

**Each skill card shows:**
- Skill name + level badge
- Hours taught
- Star rating
- Progress bar (gold gradient)
- Hover: Full width animation

#### Reviews Section

**Each review card:**
- Avatar (navy + gold)
- Reviewer name + date
- 5-star rating
- Review text
- Sentiment badge (Positive/Neutral)

---

### Screen 3: Contract Dashboard

**Purpose:** Fair time-based exchange tracking

#### Fairness Indicator (Top)

**3 States:**
1. **Balanced** (Green):
   - ✓ Icon
   - "Perfectly Balanced"
   
2. **Slight Imbalance** (Amber):
   - △ Icon
   - "User A ahead by 1h"
   
3. **Unbalanced** (Red):
   - ⚠ Icon
   - "User A ahead by 2h+"

#### Split View Layout

**User A | User B**

Each side shows:
- Avatar (navy/green gradient)
- Name + skill teaching
- Skill badge (purple/green)
- **Progress bar** (X/Y hours)
- **Session list:**
  - ✓ Completed (green icon)
  - ⏰ Upcoming (clock icon)
  - 📅 Scheduled (calendar icon)
  - Date + duration + status badge

#### Timeline Section

**3-Stage Progress:**
```
Started → In Progress → Complete
  ✓         ●●●○○        ○
```

- Gradient connection lines
- Current stage highlighted
- Session count below

#### CTAs

- "Mark Session Complete" (gold gradient)
- "Request Adjustment" (outline)

#### Smart Alerts

**When Unbalanced:**
```
⚠ Balance Notice
User A is ahead by 2 hours. Consider scheduling 
more sessions to maintain fair exchange.
```

---

### Screen 4: Chat + Live Session

**Purpose:** Real-time collaboration with contract tracking

#### Chat Area

**Header:**
- Avatar + name
- Skill context
- **Live Session Timer** (if active)
  - Red pulse dot
  - "45:32" countdown
  - "End Session" button (red)

**Messages:**
- Glass bubbles (sent/received)
- Sent: Navy gradient background
- Received: Glass effect
- Timestamps

**Input:**
- Textarea (glass effect)
- Send button (gold gradient)

#### Sidebar Widgets

**1. Contract Progress Widget**
```
Your Progress: █████░░░ 3/4h
Their Progress: ████░░░░ 2/4h
Balance: "You are 1 hour ahead"
```

**2. Quick Feedback Buttons**
- 👍 Going Well (green outline)
- 👎 Need Help (red outline)

**3. End Session & Rate**
- 5-star preview (hover to select)
- "Complete & Rate" button (gold gradient)
- Gold/navy gradient background

**Session Active Indicator:**
- Badge: "Session in progress"
- Green background
- Video icon

---

## 🧠 Intelligent Features

### 1. AI Matching System

**Algorithm Factors:**
- **Skill Overlap** (90% weight): Your wants ↔ Their offers
- **Level Similarity** (85% weight): Experience matching
- **Availability Match** (75% weight): Time zone + schedule
- **Rating Score** (95% weight): Teaching quality
- **Response Rate** (80% weight): Communication speed
- **Mutual Benefit** (92% weight): Exchange fairness

**Explainable AI:**
Every match shows "Why this match?" with detailed breakdown.

**Confidence Levels:**
- High (●●●): 90%+ confidence
- Medium (●●○): 60-89% confidence
- Low (●○○): Below 60%

**Smart Badges:**
- "Best Exchange Balance"
- "Level Match"
- "High Demand Skill"
- "Quick Responder"
- "Similar Timezone"

---

### 2. Trust Score System

**Formula:**
```
Trust Score = (
  Completed Sessions * 0.3 +
  Avg Rating * 20 +
  (100 - Cancellation Rate) * 0.4 +
  Response Speed Score * 0.3
)
```

**Status Tiers:**
- **80-100**: Trusted (Green)
- **50-79**: Verified (Amber)
- **0-49**: New (Red)

**Displayed:**
- Large circular progress (animated)
- Breakdown metrics
- 8-week history chart
- Verification badge

**Transparency:**
All factors visible with exact numbers.

---

### 3. Time-Based Contracts

**Contract Structure:**
```
User A teaches Skill X for Y hours
User B teaches Skill Z for Y hours
Duration: Start → End date
```

**Fairness Tracking:**
- Dual progress bars
- Real-time balance calculation
- Session timeline
- Smart alerts when imbalanced

**Session States:**
- ✓ Completed
- ⏰ Upcoming
- 📅 Scheduled

**Balance States:**
- Balanced: 0 hour difference
- Slight: 1 hour difference (amber warning)
- Unbalanced: 2+ hours (red alert + recommendation)

---

## 🎨 Design Patterns

### Hover States

**Cards:**
```css
transform: scale(1.02);
box-shadow: var(--shadow-xl);
transition: 300ms;
```

**Buttons:**
```css
opacity: 0.9;
box-shadow: var(--shadow-glow);
```

### Progress Animations

**All progress bars:**
```css
transition: width 1000ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Trust score circle:**
```css
stroke-dashoffset: animated from 0 to target;
transition: 1000ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Skeleton Loaders

```css
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

Use while loading async data.

---

## 🌓 Dark Mode

**Toggle:** Moon/Sun icon in top-right navigation

**Behavior:**
- Persists across sessions
- Smooth transitions
- Maintains gradients (same colors)
- Adjusts backgrounds and borders

**Dark Colors:**
- Background: Navy Dark (#0F1D2E)
- Cards: Navy Light (#1A2B3D) with transparency
- Text: Light gray (#F1F5F9)
- Borders: Navy Light (#2A3B4D)

---

## 📦 Component Library

### Primitives
- `Button` - CTAs with variants
- `Badge` - Status indicators
- `Input` - Form inputs
- `Textarea` - Multi-line text
- `Progress` - Linear progress bars
- `Avatar` - User images
- `Card` - Base card container

### Smart Components
- `GlassCard` - Glassmorphism container
- `TrustScore` - Circular trust indicator
- `AIInsightBadge` - AI confidence badges
- `MatchCard` - Complete match display
- `LevelBadge` - XP/Level display
- `EmptyState` - Placeholder states
- `SkeletonCard` - Loading states

### Layout
- `ModernNav` - Top navigation
- Responsive grid system
- Auto-layout enabled

---

## ♿ Accessibility

- **Contrast Ratios:** AAA compliant
- **Keyboard Navigation:** Full support
- **Focus States:** Visible indicators
- **ARIA Labels:** All interactive elements
- **Screen Readers:** Descriptive labels

---

## 📱 Responsive Design

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Adjustments:**
- Mobile: Stack vertically, hide sidebar
- Tablet: 2-column grids
- Desktop: Full sidebar, 3-4 columns

---

## 🚀 User Flows

### AI Matching Flow
1. View AI-generated matches
2. Click "Why this match?" → See detailed breakdown
3. Review compatibility scores
4. Click "Connect" → Send message
5. Click "Schedule" → Book session

### Trust Building Flow
1. Complete sessions consistently
2. Receive 5-star ratings
3. Maintain low cancellation rate
4. Respond quickly to messages
5. **Result:** Trust score increases (visible in chart)

### Fair Exchange Flow
1. Agree on contract (2h ↔ 2h)
2. Track progress (dual bars)
3. Monitor fairness indicator
4. Receive alerts if imbalanced
5. Schedule sessions to balance
6. **Result:** "Balanced" status

---

## 📐 Best Practices

### DO ✅

1. **Use glassmorphism for premium feel**
2. **Show AI confidence levels** (●●●)
3. **Animate all progress changes** (1000ms)
4. **Explain AI decisions** (expandable sections)
5. **Use gold gradients for CTAs**
6. **Add empty states** with helpful CTAs
7. **Track fairness** in contracts
8. **Display trust transparently**

### DON'T ❌

1. **Hide AI logic** - Always explain
2. **Skip loading states** - Use skeletons
3. **Ignore dark mode** - Essential
4. **Use solid colors** - Prefer gradients
5. **Remove confidence indicators**
6. **Hide trust factors** - Be transparent
7. **Ignore balance warnings**
8. **Skip micro-interactions**

---

## 🎯 Key Principles

### 1. Explainable AI
Every AI decision must be **visible and explained**:
- Match scores show detailed breakdowns
- Confidence levels are displayed (●●●)
- Factors are transparent with percentages

### 2. Trust Transparency
Credibility is **data-driven and visible**:
- Large trust score (0-100)
- Full metric breakdown
- Historical chart (8 weeks)
- Verification badges

### 3. Fairness Tracking
Exchange balance is **monitored and enforced**:
- Real-time dual progress bars
- Automatic imbalance detection
- Smart scheduling recommendations
- Visual indicators (green/amber/red)

---

## 📄 Technical Stack

- **Framework:** React + TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** CSS Transitions + SVG
- **Icons:** Lucide React
- **State:** React useState/useEffect
- **Typography:** Inter, SF Pro Display
- **Theme:** CSS Variables (light/dark)

---

## 🎨 Figma Export

**Component Structure:**
- Auto Layout: ON
- Named variants: Component/Variant/State
- 8pt grid alignment
- Reusable symbols
- Design tokens JSON

---

## 📚 Documentation Files

- `/DESIGN_SYSTEM.md` - Complete design system docs
- `/guidelines/Guidelines.md` - This file
- Component JSX files with inline comments

---

## ✨ Summary

Talento is a **premium AI-powered platform** where:

✅ **AI decisions are visible and explained**  
✅ **Trust is transparent and data-driven**  
✅ **Fairness is tracked and enforced**  
✅ **Interactions feel alive and intelligent**  
✅ **Dark mode is first-class**  
✅ **Glassmorphism creates premium feel**  

**Result:** A complete product experience that users trust. 🚀
