# QSR Worker Platform

## Overview

A web application connecting Quick Service Restaurant (QSR) workers with verified jobs and payroll systems. The platform provides a complete employee lifecycle management system, from registration through job applications and profile management. Built with a focus on accessibility and desktop-optimized design for blue-collar workers in the QSR industry.

## Recent Changes (October 28, 2025)

### Landing Page (Entry Point)
- **Clean, Responsive Design**: First interaction point for both workers and employers
- **Dual User Pathways**: 
  - "I Want to Work" → Routes to `/employee-register` (worker registration flow)
  - "I Want to Hire" → Routes to `/qsr-register` (employer registration placeholder)
- **Professional Layout**: Header with QSRConnect branding, hero section with value proposition, visual illustration showing worker-restaurant connection
- **Trust Indicators**: Featured brands (McDonald's, Starbucks, KFC, Domino's) for credibility
- **Mobile-First Responsive**: Side-by-side CTAs on desktop, stacked on mobile
- **Comprehensive Test Coverage**: All meaningful elements instrumented with data-testid attributes following project conventions
- **Route Updates**: 
  - Landing page now at root `/`
  - Employee registration moved to `/employee-register`
  - QSR placeholder at `/qsr-register` (coming soon)

### Employee Dashboard Feature (Tab 4)
- **Conditional Dashboard Tab**: Appears automatically when a worker is selected for a job (status = "selected")
- **Four Sub-tabs**: Calendar, Attendance, Documents, and Monthly Payslips for complete employee management
- **Calendar & Attendance Overview**: 
  - Displays days worked (24) with 92.3% attendance rate
  - Visual 7-day grid showing present (✅) and absent (❌ marks
  - Motivational messaging for consistent attendance
- **Milestones Tracker**: 
  - Four career milestones: Onboarding (✅ completed), 6 Months, 1 Year, 2 Years
  - Special reward cue card for 6-month milestone (₹1,000 Amazon voucher)
  - Timeline visualization with status-based styling
- **Attendance Section**: Summary cards showing days worked (24), days absent (2), and attendance percentage with progress bar
- **Documents Section**: Upload/view system for Aadhaar, PAN, ID Proof, Offer Letter, and Employment Contract
- **Payslips Section**: Monthly payslip history with download capability (October-July 2025)
- **Job Summary Sidebar**: Quick snapshot of current role, employer, pay rate, shift timing, and joining date

### Applied Jobs Feature (Tab 3)
- Added third tab "Applied Jobs" to track application statuses with color-coded badges
- **Two-column grid layout** for applied jobs display (improved visual organization)
- Implemented state management for applied jobs tracking
- Button state changes: "Apply Now" → "Applied" (disabled) after submission
- **Sequential status assignment**: Guarantees all 4 statuses appear (under_review → rejected → interview_scheduled → selected)
- Four application statuses supported: Under Review (yellow), Rejected (red), Interview Scheduled (blue with date), Selected (green)
- Empty state UI when no applications exist
- Jobs automatically added to Applied Jobs list upon modal confirmation

### Job Application Flow Enhancement
- Updated JobCard component to support applied state with `isApplied` prop
- Modal confirmation triggers job addition to applied list
- Sequential status assignment ensures first 4 applications show all statuses
- Visual feedback with greyed-out secondary variant for applied jobs

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: 
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Material Design principles for forms and interactions
- Inter font family for consistent typography

**State Management**:
- React Query (TanStack Query) for server state and API data fetching
- React Hook Form with Zod for form validation and state
- Local component state with React hooks for UI interactions

**Routing**: wouter for lightweight client-side routing

**Key Design Decisions**:
- Multi-step form pattern for registration to reduce cognitive load
- Tab-based navigation for post-registration dashboard (Home, Profile, Applied Jobs)
- Desktop-focused design optimized for workers using larger screens
- Progressive disclosure pattern to minimize user overwhelm
- Inline validation with clear error messaging for form accessibility
- State-based UI updates (Apply Now → Applied) for clear visual feedback
- Color-coded status badges for application tracking (yellow=under review, red=rejected, blue=interview scheduled, green=selected)

### Backend Architecture

**Runtime**: Node.js with Express.js framework

**API Structure**:
- RESTful API pattern with `/api` prefix for all routes
- Middleware for JSON parsing and request logging
- Duration tracking and response logging for API endpoints

**Database Layer**:
- Drizzle ORM for type-safe database operations
- Neon serverless PostgreSQL as the database provider
- WebSocket connection support via `ws` library for serverless environments

**Storage Abstraction**:
- Interface-based storage pattern (`IStorage`) for future flexibility
- In-memory storage implementation (`MemStorage`) for development
- Designed to support migration to PostgreSQL-backed storage

**Key Design Decisions**:
- Separation of storage interface from implementation for testability
- UUID-based primary keys for all entities
- Centralized error handling and logging middleware
- Environment-based configuration (DATABASE_URL required)

### Data Model

**Employee Registration Schema**:
- Personal information (name, age, gender, contact details)
- Authentication (password, phone verification)
- Work profile (skills, languages, region, past work history)
- Verification documents (Aadhaar, PAN, ID proof uploads)
- Optional enrichment (video intro, certifications, work proof)
- Status tracking (pending, approved, rejected)

**Design Decisions**:
- Array fields for multi-select data (languages, skills, certifications)
- Optional fields for progressive profile completion
- Separate verification status from registration completion
- Terms acceptance tracking via integer field

### External Dependencies

**UI Component Libraries**:
- Radix UI primitives for accessible, unstyled components
- shadcn/ui for pre-styled component patterns
- Lucide React for consistent iconography

**Form Handling**:
- React Hook Form for performant form state management
- Zod for runtime type validation and schema definition
- @hookform/resolvers for Zod integration

**Database & ORM**:
- Drizzle ORM for type-safe queries and migrations
- Drizzle Zod for automatic schema-to-validation conversion
- @neondatabase/serverless for serverless PostgreSQL connections

**Development Tools**:
- Vite plugins: runtime error overlay, cartographer (Replit integration), dev banner
- TypeScript for type safety across full stack
- ESBuild for production server bundling

**Styling**:
- Tailwind CSS with custom configuration
- class-variance-authority for component variant management
- clsx and tailwind-merge for conditional class composition

**Date Handling**:
- date-fns for date formatting and manipulation

**State Management**:
- TanStack React Query for server state, caching, and data synchronization

**Key Integration Points**:
- File uploads currently handled client-side (ready for cloud storage integration)
- OTP verification UI prepared (backend integration pending)
- Session management scaffolding in place (connect-pg-simple available)