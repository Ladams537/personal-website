---
title: "Poetry Events Platform"
summary: "A project to make London's poetry scene easier to discover, with event listings, RSVPs, and recommendations through shared attendance."
category: "Web application / Community"
visualLabel: ["POETRY", "MEETS", "SOFTWARE"]
status: "Learning project"
order: 1
featured: true
date: 2026-05-01
cvLine: "Event listings, RSVPs and recommendations from shared attendance, ranked in SQL; SvelteKit, Hono and shared Zod schemas, with rotating refresh tokens and end-to-end API tests."
repo: https://github.com/Ladams537/poetry-events-platform
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

## Related work: finding the listings

A separate London Poetry Events Scraper explores another part of the same problem: bringing listings from different sources into one place. Its TypeScript CLI fetches public event pages from Eventbrite and the Poetry Society, extracts structured event data, validates each source's records, and normalises and deduplicates the results.

It can generate a static dashboard with search, venue and source filters, and events grouped by date. That makes the collected listings browsable without running an application server.

The scraper and platform are separate projects. Together they explore two sides of discovery: collecting what's happening, and helping someone decide where to go.

## Where it stands

This is a learning project with implemented browsing, attendance and recommendation flows. The repository includes deployment instructions; this case study describes the implementation rather than claiming a public launch or measured adoption.
