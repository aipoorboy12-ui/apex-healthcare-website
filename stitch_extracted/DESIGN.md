---
name: Apex Clinical Health
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3d4947'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#006948'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855d'
  on-tertiary-container: '#f5fff7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers a clinical, trustworthy, and modern visual framework tailored for healthcare and hospital systems. Inspired by leading digital clinic platforms, the aesthetic balances sterile precision with welcoming empathy. The interface inspires confidence, accessibility, and immediate clarity for patients, clinicians, and administrative staff.

### Aesthetic Movement
- **Corporate & Modern Healthcare:** Clean grid foundations, ample white space, and low-cognitive-load layouts.
- **Atmospheric Vitality:** Harmonized oceanic teals, deep cyans, and restorative emerald tones evoke healing, safety, and modern medical technology.
- **Tactile Softness:** Subtly elevated cards with ambient tinted drop shadows, rounded interaction points, and accessible contrast ratios (WCAG 2.1 AAA for core body text and interactive states).

## Colors

The palette is engineered to support medical authority and clinical precision while maintaining a calming presence:

- **Primary (`#0D9488` - Deep Teal):** The primary brand anchor. Used for primary calls-to-action, active navigation tabs, headline accent words, and key interactive badges.
- **Secondary (`#0284C7` - Medical Cyan / Blue):** Reinforces technology, specialty departments, and secondary interactions such as auxiliary buttons, service icons, and informational status banners.
- **Tertiary (`#059669` - Emerald Vitality):** Represents vitality, verified doctor credentials, success confirmations, emergency support highlights, and positive metrics.
- **Neutral Dark (`#0F172A` - Slate Charcoal):** Primary text and headline color, providing optimal legibility and contrast against light surfaces.
- **Surface Neutrals:**
  - Base Canvas: `#FFFFFF` for pristine clinical cards and primary viewport sections.
  - Sub-Canvas & Section Tint: `#F8FAFC` to `#F0FDFA` (subtle teal-tinted background washes) to visually partition long medical catalogs and hospital service grids.
  - Border & Dividers: `#E2E8F0` with contextual interactive focus borders shifting to `#0D9488`.

## Typography

The design system employs **Plus Jakarta Sans** uniformly across display, body, and label roles. Its geometric geometry, open counters, and humanist proportions evoke both technological precision and bedside manner warmth.

### Type Hierarchy & Scaling
- **Display Hero:** Reserved for landing hero headings (e.g., "Your Health, Our Priority"). High-contrast styling with intentional two-tone accentuation (primary dark neutral paired with brand teal).
- **Headlines:** Section titles and specialty labels require clear, legible weights (SemiBold 600 to Bold 700) to ensure patients can quickly scan medical departments.
- **Body:** Generous line heights (1.5x) prevent visual fatigue when digesting medical instructions, treatment details, and doctor credentials.
- **Labels & Microcopy:** Used for appointment chips, stat counters, and emergency indicators. Rendered in SemiBold with optical character tracking for instant recognition.

## Layout & Spacing

A structured 12-column responsive grid provides rhythm and hierarchy across desktop, tablet, and mobile displays.

### Layout Mechanics
- **Desktop (≥1200px):** 12 columns with a maximum centered container width of `1280px`. Gutter spacing is set to `1.5rem` (`24px`), with outer canvas padding at `2rem` (`32px`).
- **Tablet (768px - 1199px):** 8 columns, `1.25rem` gutters, and `1.5rem` outer margins. Cards dynamically reflow into two-column or four-column paired sets.
- **Mobile (≤767px):** 4 columns with `1rem` (`16px`) gutters and `1rem` outer canvas padding. Specialty cards stack vertically or scroll along a horizontal carousel track with peek indicators.

### Spacing Rhythm
- Section spacing follows macro intervals (`4rem` to `6rem`) between major hospital departments, packages, and emergency callouts.
- Component internal padding strictly uses standard tokens (`space-sm` for badges, `space-md` for form fields, `space-lg` to `space-xl` for medical service cards).

## Elevation & Depth

Visual hierarchy is constructed through soft ambient shadows and clinical surface layer tinting rather than harsh dark drop shadows.

### Elevation Levels
- **Level 0 (Flat Canvas):** `#FFFFFF` or `#F8FAFC`. Zero elevation, delineated by soft structural borders (`1px solid #E2E8F0`).
- **Level 1 (Clinical Cards & Feature Containers):** 
  - Shadow: `0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)`.
  - Border: `1px solid rgba(226, 232, 240, 0.8)`.
  - Hover State: Uplifted with `0 12px 30px -4px rgba(13, 148, 136, 0.12)` accompanied by a subtle 2px vertical translation.
- **Level 2 (Floating Floating Alerts & 24/7 Badges):** 
  - Shadow: `0 10px 25px -3px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(13, 148, 136, 0.06)`.
  - Applied to urgent badges such as the floating "24/7 Emergency Support" hero overlay card.
- **Level 3 (Modals & Booking Drawers):** 
  - Shadow: `0 25px 50px -12px rgba(15, 23, 42, 0.20)`.
  - Backdropped by a soft blur (`backdrop-filter: blur(8px)`) over `#0F172A40`.

## Shapes

The design system adopts a balanced **Rounded** (`level 2`) shape geometry, projecting safety, modernity, and medical friendliness without feeling overly cartoonish:

- **Base Radii (`0.5rem` / `8px`):** Input fields, inline selects, table containers, and compact action controls.
- **Card & Surface Radii (`1rem` / `16px`):** Department cards, health checkup package boxes, doctor biography widgets, and emergency alert panels.
- **Modal & Hero Radii (`1.5rem` / `24px`):** Large hero imagery masks, modal appointment dialogs, and medical stat banner containers.
- **Full Pill (`9999px`):** Filter pills, "Trusted Care" status tags, and appointment CTA buttons.

## Components

### Buttons
- **Primary Button ("Book Appointment"):** Solid teal background (`#0D9488`), white text (`#FFFFFF`), `font-weight: 600`, pill-shaped or `rounded-md` (`8px`), padded with `0.75rem 1.75rem`. Hover transitions to `#0F766E` with subtle ambient teal glow.
- **Secondary Button ("Our Services", "Learn More"):** Transparent fill with a `1.5px` border in `#0D9488` or `#E2E8F0`, dark slate text (`#0F172A`), transitioning to `#F0FDFA` background on hover.
- **Text Link Button:** Teal text with trailing chevron arrow (`Learn More →`), animating `4px` to the right on hover.

### Medical Badges & Chips
- **Status Badges ("Trusted Care. Better Health."):** Pill-shaped pill container, background `#CCFBF1` (10% teal wash), text `#0F766E`, featuring a leading icon dot or medical cross emblem.
- **Department Filter Chips:** Outlined pills in `#E2E8F0` with `#475569` text. Active state fills with `#0D9488` and white text.

### Clinical Service & Package Cards
- **Service Cards (Cardiology, General Medicine, Dental, etc.):** 
  - Pure white background (`#FFFFFF`) with `1rem` corner radius and `1.5rem` padding.
  - Centered or left-aligned soft rounded square icon container (`48px x 48px`, background `#CCFBF1`, teal outline/fill icon).
  - Clear structural hierarchy: H4 Title (`#0F172A`), two-line summary (`#64748B`), and a "Learn More →" trigger.
- **Package Cards ("Health Checkup Packages"):**
  - Highlighting price anchors (e.g., energetic amber or tertiary green tags) with bold checkmark value lists.
  - Checkmarks rendered inside emerald circle badges (`#D1FAE5` with `#059669` glyphs).

### Input Fields & Booking Controls
- **Form Text Inputs & Selects:** Height `48px`, `8px` radius, background `#FFFFFF`, border `1.5px solid #CBD5E1`.
- **Focus State:** Border shifts to `#0D9488` with a `0 0 0 3px rgba(13, 148, 136, 0.15)` focus ring.
- **Checkboxes & Radios:** `20px x 20px`, rounded-sm (`4px`), border `#94A3B8`. Checked state fills `#0D9488` with white checkmark.

### Stats Counter Widgets
- Pill or circular icon container in primary teal, accompanied by bold numerical display (e.g., `15+`, `10k+`, `25+`) in `#0F172A` with small muted uppercase labels beneath.