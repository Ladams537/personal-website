---
title: "Cold Case"
summary: "A noir mystery you investigate through conversation: question suspects, present evidence, and decide whose story holds up."
category: "Interactive fiction / AI"
visualLabel: ["FOLLOW", "THE", "CLUES"]
status: "Interactive prototype"
order: 4
featured: true
date: 2026-06-01
technologies: [TypeScript, Next.js, React, AI SDK, Zod]
---

A mystery lives in the distance between what happened and what someone will admit. Cold Case explores that distance through conversation: a generated case, three suspects with distinct voices, and evidence you can bring into an interview.

The setting draws on American noir—hotels, jazz clubs, rain and people with something to hide. The player reads the case file, questions suspects, presents evidence and makes an accusation.

## Giving the story a structure

Case generation produces a structured record containing the victim, suspects, evidence, culprit and underlying truth. Each suspect has an alibi, a secret, a voice and an account of what they actually know.

That structure gives the interview a foundation. A suspect's prompt receives their perspective and the evidence already presented to them. It asks innocent characters to protect unrelated secrets and the culprit to defend an alibi under pressure.

The intended experience is a story that changes through questioning while keeping a fixed account of the crime underneath it.

## Conversation as the interface

Interview responses stream into the game. Conversation history and presented evidence are tracked separately for each suspect, allowing the player to move between interviews and compare accounts.

The accusation step compares the chosen suspect with the generated culprit and reveals the case's truth. It gives the investigation a definite ending rather than asking the model to invent a verdict at the last moment.

## What the experiment asks

How much character can a short reply carry? Can evidence change a conversation without making the character abandon their voice? Can free-form questioning reveal a mystery more naturally than a menu of dialogue options?

These are the design questions the prototype explores. Structured output constrains the shape of a case, but it doesn't guarantee that every generated mystery is consistent or solvable.

## Where it stands

Cold Case is an interactive prototype. The full case, including the solution, is held in client state, and accusations use that supplied case. It is built for exploring the narrative experience; server-owned game state would be a further step for a public game.
