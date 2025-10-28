# Employee Registration Page - Design Guidelines

## Design Approach
**Selected Approach:** Design System-Based (Material Design principles)
**Justification:** Form-heavy registration flow requires clarity, strong visual hierarchy, and accessibility. Material Design's elevation system and clear form patterns optimize for efficiency while maintaining professional aesthetics suitable for diverse users.

## Core Design Principles
1. **Clarity First:** Every element serves worker comprehension
2. **Progressive Disclosure:** Multi-step reduces cognitive load
3. **Trust Building:** Professional appearance establishes platform credibility
4. **Accessibility:** Large touch targets, clear labels, high contrast

## Typography System

**Primary Font:** Inter (Google Fonts)
**Secondary Font:** Inter (single family for consistency)

**Hierarchy:**
- Page Title: 32px, Bold (Step headings)
- Section Headers: 24px, Semibold
- Form Labels: 16px, Medium
- Input Text: 16px, Regular
- Helper Text: 14px, Regular
- Button Text: 16px, Semibold
- Success Message: 20px, Medium

## Layout & Spacing System

**Spacing Units:** Tailwind scale - primary units are 4, 6, 8, 12, 16, 24
- Form field vertical spacing: 6 (between fields within section)
- Section vertical spacing: 12 (between major sections)
- Container padding: 8
- Button padding: 4 horizontal, 3 vertical
- Card padding: 8

**Layout Structure:**
- Fixed-width container: max-w-2xl centered
- Single column form layout (no multi-column for clarity)
- Progress indicator: fixed at top, spans full container width
- Form sections: stacked vertically with clear separation

## Component Library

### Progress Indicator
- Horizontal stepper showing 3 steps
- Active step: filled circle with step number
- Completed step: checkmark icon in filled circle
- Upcoming step: outlined circle
- Connecting lines between steps
- Step labels below circles: "Basic Info", "Work Details", "Verification"

### Form Inputs
**Text Inputs:**
- Full-width within container
- Border thickness: 2px
- Border radius: md (8px)
- Height: 12 (48px for large touch targets)
- Focused state: border emphasis, subtle shadow
- Error state: red border with error message below

**Dropdowns:**
- Same dimensions as text inputs
- Chevron icon on right
- Multi-select: checkbox interface with tag display
- Skills dropdown: Grid of 4 large selectable cards (Baristas, Helpers, Cleaners, Waiters)

**File Upload Areas:**
- Dashed border rectangle
- Upload icon centered
- Text: "Click to upload or drag and drop"
- File type/size requirements below
- Preview thumbnail after upload with remove button
- Loading spinner during upload

**Password Inputs:**
- Eye icon toggle for visibility
- Confirm password field matches exactly
- Strength indicator below (weak/medium/strong)

### Buttons
**Primary Button (Next, Create Profile):**
- Height: 12
- Padding: px-8
- Border radius: lg
- Full-width on mobile context
- Prominent shadow for depth

**Secondary Button (Back):**
- Height: 12
- Outlined style
- Same dimensions as primary

**Button Placement:**
- Fixed bottom bar spanning container width
- Back button left-aligned
- Next/Submit button right-aligned
- 24px vertical padding for breathing room

### Cards & Containers
**Main Form Container:**
- Background: elevated surface
- Border radius: xl
- Shadow: medium elevation
- Padding: 12 all sides

**Section Cards:**
- Subtle background differentiation
- Border radius: lg
- Padding: 6
- Header with icon and title

### Icons
**Library:** Heroicons (via CDN)
- Form field icons: 20px
- Section header icons: 24px
- Progress step icons: 32px
- Upload area icons: 48px

### Success Confirmation
**Layout:**
- Centered content (max-w-md)
- Large success checkmark icon (96px)
- Bold heading
- Descriptive text paragraph
- Timeline expectation ("24 hours")
- Primary CTA: "Go to Dashboard"

## Form Validation States
**Inline Validation:**
- Real-time for format requirements (Aadhaar, phone)
- On-blur for required fields
- Immediate feedback for password match
- Character counters for text areas

**Error Messages:**
- Below respective field
- Red text with warning icon
- Specific, actionable language

**Success Indicators:**
- Green checkmark icon appears in validated fields
- Subtle green border on valid complex inputs

## Multi-Step Flow Behavior
**Step Navigation:**
- "Next" button disabled until all required fields valid
- Smooth transition between steps (no jarring jumps)
- Back button maintains entered data
- Current step data saved before transition

**Visual Feedback:**
- Completed steps show checkmark in progress bar
- Current step emphasized with stronger visual weight
- Disabled "Next" button has reduced opacity

## Special Components

**Aadhaar Input:**
- Four segments: ####-####-####
- Auto-formatting as user types
- Masked display (••••-••••-1234)
- Clear icon to reveal full number

**Languages Multi-Select:**
- Checkbox dropdown
- Selected items display as removable tags above dropdown
- Common languages pre-populated

**Certification Tags:**
- Editable badge interface
- Add new tag with plus button
- Remove tag with X icon
- Pill-shaped design

**Terms & Conditions Checkbox:**
- Large checkbox (24px)
- Linked text to T&C modal/page
- Required indicator (*)

## Accessibility Standards
- ARIA labels on all form fields
- Keyboard navigation support (tab order logical)
- Focus indicators clearly visible
- Error announcements for screen readers
- Sufficient contrast ratios throughout
- Large minimum touch target: 44px

## Images
No hero image required for this registration form. Focus is entirely on form completion efficiency. Use only functional icons throughout.