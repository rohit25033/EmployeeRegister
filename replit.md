# QSR Worker Platform

## Overview

A web application connecting Quick Service Restaurant (QSR) workers with verified jobs and payroll systems. The platform provides a complete employee lifecycle management system, from registration through job applications and profile management. It focuses on accessibility and a desktop-optimized design for blue-collar workers in the QSR industry. The platform aims to streamline worker onboarding, job application, and employer management processes, improving efficiency for both QSR owners and workers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite.

**UI Component System**: shadcn/ui with Radix UI primitives and Tailwind CSS for styling. Material Design principles are applied for forms and interactions, using Inter font family.

**State Management**: React Query for server state, React Hook Form with Zod for form validation, and local component state for UI interactions.

**Routing**: wouter for client-side routing.

**Key Design Decisions**:
- Multi-step and tab-based navigation for registration and dashboards to reduce cognitive load.
- Desktop-focused design optimized for blue-collar workers.
- Progressive disclosure and inline validation for user-friendly forms.
- State-based UI updates and color-coded status badges for clear visual feedback.

### Backend Architecture

**Runtime**: Node.js with Express.js framework.

**API Structure**: RESTful API pattern with `/api` prefix, including middleware for JSON parsing, request logging, and duration tracking.

**Database Layer**: Drizzle ORM for type-safe operations with Neon serverless PostgreSQL. WebSocket connection support is included.

**Storage Abstraction**: Interface-based storage (`IStorage`) with an in-memory implementation (`MemStorage`) for development, designed for future migration to PostgreSQL.

**Key Design Decisions**:
- Separation of storage interface for testability.
- UUID-based primary keys for all entities.
- Centralized error handling and logging.
- Environment-based configuration (DATABASE_URL).

### Data Model

**Employee Registration Schema**: Includes personal information, authentication details, work profile (skills, languages, region, past work history), verification documents (Aadhaar, PAN, ID proof uploads), and optional enrichment fields. Status tracking is included.

**Design Decisions**:
- Array fields for multi-select data.
- Optional fields for progressive profile completion.
- Separate verification status from registration completion.
- Terms acceptance tracking.

## External Dependencies

**UI Component Libraries**:
- Radix UI primitives
- shadcn/ui
- Lucide React

**Form Handling**:
- React Hook Form
- Zod
- @hookform/resolvers

**Database & ORM**:
- Drizzle ORM
- Drizzle Zod
- @neondatabase/serverless

**Development Tools**:
- Vite plugins (runtime error overlay, cartographer, dev banner)
- TypeScript
- ESBuild

**Styling**:
- Tailwind CSS
- class-variance-authority
- clsx
- tailwind-merge

**Date Handling**:
- date-fns

**State Management**:
- TanStack React Query

**Key Integration Points**:
- File uploads (client-side with cloud storage integration planned)
- OTP verification (UI prepared, backend integration pending)
- Session management scaffolding.