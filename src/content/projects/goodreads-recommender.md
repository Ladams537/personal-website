---
title: "Goodreads Recommender"
summary: "Book recommendations from a taste model you can read, question, and correct—rather than a preference profile hidden inside a prompt."
category: "Personal experiment / Reading"
visualLabel: ["READ", "REFLECT", "RECOMMEND"]
status: "Python CLI experiment"
order: 5
featured: false
date: 2026-09-01
technologies: [Python, Anthropic API, CSV, Markdown]
---

A recommendation becomes more interesting when you can see what it assumes about you. Goodreads Recommender splits the process into two steps: describe the reader's taste, then recommend books from that description.

## A taste model you can edit

The first step reads a Goodreads export and optional reader notes, then writes a Markdown taste model. It separates subject matter from sensibility: what someone reads about, and the forms or voices that make a book land for them.

Unrated books are kept separate from low ratings. Reader corrections take precedence over inferred preferences, and directions record subjects the reader wants to explore.

The resulting document can be edited before the second step runs.

## Recommendations with a trail back

The recommendation step uses the taste model as its evidence of preference. Each suggestion is asked to quote the model sentences behind it and identify where that interpretation might be wrong. The script checks those quoted citations against the document and warns about unmatched text.

An illustrative correction might be changing “prefers short books” to “welcomes long books when the argument is carried by a life.” The next recommendation run then works from the corrected description.

## Where it stands

This is a Python CLI experiment that saves its model and recommendations as Markdown. Citation checks verify correspondence to the taste model; they do not verify book details or prove that a recommendation is good. Its most useful idea is the editable intermediate document: a place to locate and correct the assumptions behind a suggestion.
