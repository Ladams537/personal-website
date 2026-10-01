---
title: "Poetry Events Platform"
summary: "A project to make London's poetry scene easier to discover, with event listings, RSVPs, and recommendations through shared attendance."
technologies:
  - TypeScript
  - SvelteKit
  - Hono
  - SQLite
  - Zod
  - TanStack Query
---

As I got involved in London's poetry scene, I was writing and sharing more poetry myself. I wanted to create a place where people could more easily see what was happening across the city and find events to attend.

The Poetry Events Platform grew out of that idea. It lets people browse upcoming readings, create events, RSVP, and discover other events through shared attendance.

## From browsing to attending

The application includes event listings and detail pages, account registration and login, event creation, an attendance dashboard, and personalised recommendations. Event pages show the venue, date, and number of attendees.

## Recommendations through shared attendance

The recommendation system uses overlapping RSVPs to find events that may interest someone. It finds people who have signed up for the same events, then looks at the other upcoming events those people plan to attend. More shared RSVPs give a person's suggestions greater weight. Events the user has already signed up for are excluded.

For example, if two people RSVP to the same open mic, and one also signs up for a forthcoming reading, that reading becomes a recommendation for the other person.

The ranking runs in SQL against the attendance records. Database indexes support the lookups without loading the entire attendance graph into application memory.

## Architecture

The project is organised as a TypeScript workspace with three packages:

- A SvelteKit frontend, using TanStack Query to fetch and refresh server data.
- A Hono API, with SQLite storage for accounts, events, RSVPs, and refresh tokens.
- Shared Zod schemas and inferred types for the frontend and backend.

Authentication uses JWT access tokens and refresh-token cookies. Refresh tokens rotate when used, and the previous token is revoked.

## Verification in the repository

The repository contains API end-to-end tests for registration, login, event creation, RSVPs, and recommendations. A second test covers refresh-cookie settings, token rotation, and rejection of a previously used refresh token.

The README includes local setup instructions and deployment instructions for a Fly backend and Vercel frontend.
