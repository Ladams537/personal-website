---
title: "Ledger"
summary: "Turning messy training spreadsheets into usable history, with imports you can inspect and an AI coach that can query the record."
category: "Web application / Training data"
visualLabel: ["MESSY LOGS", "USEFUL", "HISTORY"]
status: "Prototype / Milestone 1"
order: 2
featured: true
technologies: [TypeScript, Next.js, PostgreSQL, Drizzle, AI SDK, Zod]
---

A training spreadsheet develops its own language. A weight carries down from the row above. A week runs across the columns. A note explains why a session stopped early. Turning that into structured data means understanding the layout without erasing what the lifter meant.

Ledger explores how to keep that flexibility while making the history useful to software. Its first milestone focuses on importing free-form spreadsheets, reviewing the interpretation, and querying the resulting training record.

## AI proposes. The user reviews. Code applies.

An import begins with the workbook's cells and an AI-proposed mapping. That mapping describes how the sheet represents exercises, sessions and sets. Deterministic code interprets it, and a review screen places source cells beside parsed results so the user can correct the interpretation before applying it.

Applying an import writes the facts in a transaction. Reapplying the same import replaces its previous facts rather than adding another copy. Exercise names and shorthand have their own resolution and glossary steps, so an unfamiliar label can become a decision the user makes explicitly.

## Keeping uncertainty visible

Planned work and performed work occupy separate fields. Values inferred from a plan are marked as inferred; estimated dates are flagged; unreadable notation remains something to resolve.

Facts retain references to their source import and cells. Loads are normalised into kilograms, while distinctions such as dumbbells measured per hand remain part of the interpretation. Derived views calculate training measures from those facts.

The point is to make the record more useful while preserving a route back to what was actually written.

## A coach with a record to consult

The AI coach can use typed tools and a SQL query path to inspect training history. A precomputed profile supplies lift trends, volume, gaps and data caveats, while a small collection of training principles supplies additional context.

Model-written SQL runs through a read-only transaction with user scoping, a three-second timeout and a 500-row result cap. These boundaries keep the query interface focused on reading the record.

## Where it stands

Ledger is a prototype with a seeded development user. Authentication, the next grid-editing milestone and some context-entry workflows remain unfinished. The repository includes tests for notation, mapping execution, provenance and database behavior; it also includes synthetic fixtures for demonstrations without exposing a personal training log.
