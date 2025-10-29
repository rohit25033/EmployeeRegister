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

### QSR/Franchisee Registration Flow (Business Accounts)
- **Two-Step Registration Process**: OTP verification → Comprehensive registration form
- **Step 1 - OTP Verification** (`/qsr-register`):
  - Phone number input with 10-digit validation
  - Mock OTP generation and verification (displays "123456" in console for testing)
  - 6-digit OTP input using InputOTP component
  - Currently accepts any 6-digit code (ready for Twilio integration)
  - Successful verification redirects to registration page with phone number in query params
- **Step 2 - Registration Form** (`/qsr-registration?phone=<number>`):
  - **Tabbed Interface**: Separate forms for QSR Registration and Franchisee Owner Registration
  - **QSR Registration Tab**: 4-section comprehensive form
    - Section 1: Basic Information (restaurant name, POC details, address, city/state/pincode)
    - Section 2: Business Details (FSSAI license, GST number, PAN, registration number)
    - Section 3: Document Uploads (5 business documents - currently optional for testing)
    - Section 4: Agreement & Consent (2 required checkbox confirmations)
  - **Franchisee Owner Tab**: Simplified initial form
    - Basic business information and POC details
    - Address fields (auto-filled contact number from OTP step)
    - Note about additional details requested later
  - **Form Features**:
    - React Hook Form with Zod validation
    - Phone number auto-filled and read-only (carried from OTP verification)
    - File upload inputs (mock implementation - ready for object storage integration)
    - Success toast notification on submission
    - **Business data saved to localStorage** for dashboard access
    - **Auto-redirect to QSR dashboard** (`/qsr-dashboard`) after successful submission
- **Database Schemas**:
  - `qsrRegistrations` table: All business details, documents (nullable), consent fields, status tracking
  - `franchiseeRegistrations` table: Core business info, POC details, address, status tracking
  - Both use UUID primary keys with pending status by default
- **Integration Points**:
  - Twilio OTP integration prepared (currently using mock verification)
  - File upload system ready for object storage backend
  - Backend API routes pending for form submission and data persistence
  - Insert schemas exported from shared/schema.ts for type-safe backend integration
  - **localStorage-based session management**: Registration data stored in `qsrBusinessInfo` key for immediate dashboard access

### QSR Owner Dashboard (Business Account Management)
- **Full-Featured Dashboard** (`/qsr-dashboard`): Complete job management and applicant tracking system
- **Session Management**: Loads business information from localStorage (`qsrBusinessInfo` key) on component mount
- **Header Section**:
  - Dynamic greeting ("Hi, {businessName}!") based on registered business from localStorage
  - Icon-based tab navigation: Listings (default) and Profile
  - Clean, professional layout with active tab highlighting
- **Listings Tab**:
  - **Top Bar**: Post Job CTA button + Applications received counter badge
  - **Recent Updates Section**: Shows 2-3 most recent applicants with skills badges and "View Profile" buttons
  - **Job Listings Grid**: Two-column layout displaying active jobs with:
    - Role, location, salary range, urgency badge (high=red, low=grey)
    - Shift type, number of openings, posted date
    - Applications count and "View Applicants" button
- **Post Job Modal**:
  - Comprehensive form with validation (React Hook Form + Zod)
  - Fields: Role (dropdown), Location, Description (min 10 chars), Salary Min/Max, Urgency (High/Low radio), Shift Type (dropdown), Number of Openings
  - Success toast on submission, new job prepended to listings grid
  - Dynamic job creation adds to local state
- **View Applicants Modal**:
  - Shows all candidates for selected job
  - Each applicant card displays: name, email, phone, location, experience, skills badges
  - Two CTAs per applicant: "View Profile" and "Schedule Call"
- **Schedule Call Modal**:
  - Date picker (min=today) and time picker
  - Validation ensures both fields filled
  - Success toast confirms scheduling with details
- **Profile Tab**:
  - Displays complete registration information from localStorage
  - **Business Information Card**: Brand name, business type (QSR Unit/Franchisee Owner), POC details, contact, full address
  - **Registration Details Card**: FSSAI license, GST number, PAN, registration number (shown for QSR Units; Franchisees see pending message)
  - **Documents Card**: List of uploaded documents with view buttons
  - Verification status badge: "Verification Complete" with checkmark
- **Database Schemas**:
  - `jobPostings` table: qsrId, role, location, description, salary range, urgency, shift type, openings, posted date, status
  - `jobApplications` table: jobId, applicantId, applicant details, experience, skills, applied date, status
  - `scheduledCalls` table: qsrId, applicantId, jobId, scheduled date/time, status, created date
- **Current Implementation**:
  - Mock data for initial jobs and applicants (ready for backend integration)
  - All UI flows fully functional with state management
  - Form validation prevents invalid submissions
  - Toast notifications for all user actions

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