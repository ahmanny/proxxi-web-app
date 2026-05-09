# Proxxi Web

This folder contains the web application for Service Hub / Proxxi. It currently has an older ecommerce-style Next.js foundation, but it is the planned home for future web features and the admin panel.

## Direction

The mobile apps currently carry the main Proxxi consumer and provider experiences. This web app should grow into the browser-based side of the platform, including:

- Public or marketing-facing Proxxi pages.
- Consumer/provider web features where needed.
- Internal admin panel.
- Admin authentication.
- User, provider, booking, payment, dispute, wallet, and reporting management.
- Operational dashboards for platform monitoring and support.

## Current State

The project is a Next.js app with existing auth, account, layout, form, and UI foundations. Some naming and structure still reflects the earlier ecommerce starter direction, so future work should align it with Service Hub / Proxxi as admin and web features are added.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Axios
- Radix UI
- Recharts
- Lucide React

## Folder Structure

- `src/app`: Next.js app routes for shop-facing pages and admin routes.
- `src/components`: Auth forms, homepage sections, account components, reusable UI, layouts, loaders, and states.
- `src/services`: API service and query modules.
- `src/store`: Zustand stores.
- `src/lib`: Axios setup, validators, constants, query client, and utilities.
- `src/types`: Shared TypeScript types.
- `public`: Static web assets.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

Lint:

```bash
npm run lint
```

## Admin Panel Notes

The admin panel should be built here, using the backend API as the source of truth. As admin work begins, this README should be expanded with route maps, permission rules, required environment variables, and deployment details.
