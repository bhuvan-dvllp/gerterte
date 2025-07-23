# College Duniya - College Comparison & Ranking App

## Overview

College Duniya is a mobile-first web application designed to help students search, filter, compare, and explore college data for various education levels including PUC, Degree, Engineering, MBA, and more. The application provides comprehensive college information, comparison tools, and entrance exam details to assist students in making informed decisions about their higher education.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server:

### Frontend Architecture
- **Framework**: React with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized production builds
- **Mobile-First Design**: Responsive design optimized for mobile devices with a maximum width constraint

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the entire stack
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database for serverless PostgreSQL
- **API Design**: RESTful APIs with consistent error handling and logging

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized schema definitions in the shared directory
- **Migrations**: Database migrations managed through Drizzle Kit
- **Validation**: Zod for runtime type validation and schema parsing

## Key Components

### Database Schema
The application uses a comprehensive database schema with the following main entities:

1. **Colleges**: Core college information including name, location, type, fees, rankings, and placement statistics
2. **Courses**: Course offerings for each college with specializations, fees, and eligibility criteria
3. **Exams**: Entrance exam information with dates, eligibility, and college mappings
4. **Reviews**: Student reviews and ratings for colleges
5. **Comparisons**: Saved college comparisons for users
6. **Users**: User management for personalization features

### Frontend Components
- **App Header**: Navigation header with notifications and user profile access
- **Bottom Navigation**: Mobile-optimized bottom navigation for main app sections
- **College Card**: Reusable component for displaying college information in lists
- **Filter Modal**: Advanced filtering interface for college searches
- **UI Components**: Comprehensive set of reusable UI components from shadcn/ui

### API Endpoints
- `/api/colleges` - College listing with filtering and search capabilities
- `/api/colleges/:id` - Individual college details
- `/api/colleges/:id/reviews` - College-specific reviews
- `/api/exams` - Entrance exam information
- `/api/comparisons` - College comparison functionality

## Data Flow

1. **Client Requests**: Users interact with the React frontend, which makes API calls through TanStack Query
2. **API Processing**: Express.js server processes requests, validates data with Zod schemas
3. **Database Operations**: Drizzle ORM handles database queries to PostgreSQL
4. **Response**: Data flows back through the same chain with consistent error handling
5. **State Management**: TanStack Query manages caching, loading states, and data synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing for React
- **zod**: Schema validation library

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives for components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating variant-based component APIs
- **lucide-react**: Icon library for consistent iconography

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **drizzle-kit**: Database migration and schema management tools

## Deployment Strategy

### Development Environment
- **Development Server**: Vite dev server with hot module replacement
- **Database**: Neon Database with development environment
- **Environment Variables**: `DATABASE_URL` for database connection

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild compiles server code to `dist/index.js`
- **Database**: Production Neon Database instance
- **Deployment**: Single build process that creates both client and server bundles

### Architecture Decisions

1. **Mobile-First Approach**: The application is designed primarily for mobile users with a maximum width constraint, making it suitable for the target demographic of students
2. **Type Safety**: TypeScript is used throughout the stack to ensure type safety and better developer experience
3. **Shared Schema**: Database schema and types are shared between client and server to maintain consistency
4. **Component-Based UI**: Uses shadcn/ui for consistent, accessible, and customizable components
5. **Server State Management**: TanStack Query handles all server state, caching, and synchronization
6. **RESTful API**: Simple REST endpoints for predictable data access patterns
7. **Database Choice**: PostgreSQL with Drizzle ORM provides type safety and excellent developer experience
8. **Build Optimization**: Vite and esbuild provide fast development and optimized production builds

The architecture supports the core requirements of college search, filtering, comparison, and detailed information display while maintaining scalability and developer productivity.

## Recent Changes

### College Comparison System Enhancement (January 2025)
- **Enhanced Side-by-Side Comparison Table**: Implemented sticky headers and columns for better navigation, improved visual design with numbered college headers, and added clear visual separation between colleges
- **Compare Button Integration**: Added compare buttons to all college cards across home and search pages with visual feedback for selection limits
- **Comparison Bar Navigation**: Created persistent comparison bars showing selected colleges with quick access to start comparison when 2+ colleges are selected
- **Improved User Experience**: Added helpful instructions for single college selections, quick-start options for comparing top colleges, and clear action buttons for managing comparisons
- **Fixed College Card Spacing**: Replaced inconsistent space-y layouts with proper CSS Grid layouts using gap-4 for consistent spacing between college cards across all pages
- **Enhanced College Card Design**: Improved visual hierarchy with better typography, spacing, and hover effects for better mobile experience