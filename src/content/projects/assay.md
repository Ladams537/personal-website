---
title: "Assay"
summary: "A small rule language for evaluation results that shows why a check failed—and when the check itself is broken."
category: "Developer tool / Language design"
visualLabel: ["RULES", "WITH", "REASONS"]
status: "Local CLI & Rust library"
order: 3
featured: true
date: 2026-09-01
technologies: [Rust, Parsing, Static analysis, JSON]
---

A failed evaluation should tell you something useful. Did the output miss the target, did the input omit a field, or did the rule contain a typo? A single red result can hide three different problems.

Assay is a small rule language for checks over evaluation records. It runs as a command-line tool and a Rust library, with diagnostics that point back to the expression responsible.

## A rule you can read

This illustrative rule checks a score in a JSON record:

```text
rule faithful: scores.faithfulness >= 0.8
```

For a record whose faithfulness score is `0.62`, the check fails and identifies the value that fell below the threshold. If the field is missing, the result is an error with a diagnostic instead. A misspelled field can receive a suggestion based on the available names.

Rules can also check text, list membership, arithmetic and regular expressions. A `when` guard makes a rule conditional: a case outside the guard is skipped, so it doesn't inflate the pass rate.

## Explaining the failure

The evaluator follows the boolean structure to identify the expressions responsible for a failure. For an `and`, that means the first false operand in short-circuit order. For an `or` that should have passed, it means both failed alternatives.

Diagnostics retain source spans, codes, notes and help as structured data. The terminal renderer presents them as annotated snippets; another interface could consume the same diagnostic data.

## Making mistakes easier to fix

The implementation moves through a lexer, parser, static checker and evaluator. Parser recovery allows independent mistakes to be reported in one pass. Static checks catch contradictions such as comparing a known number to a string before any record is evaluated.

The language avoids implicit coercion and truthiness. Missing fields are errors; optional data is handled explicitly with `has` or a guard. These choices keep accidental rule bugs from masquerading as model regressions.

## Where it stands

Assay is implemented as a local tool and library. The repository includes module tests, API tests, expected-output fixtures and robustness tests that exercise input prefixes and seeded mutations. Schema-aware checking, quantifiers and editor integration remain possible extensions.
