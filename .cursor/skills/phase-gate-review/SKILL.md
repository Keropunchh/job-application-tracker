---
name: phase-gate-review
description: >-
  Reviews whether the current learning/implementation phase meets exit criteria
  before advancing. Use when the user says a phase is done, asks to start the
  next phase, requests a gate check, or wants a progress audit.
---

# Phase gate review

## Steps

1. Read `docs/learning/progress.md` for claimed current phase.
2. Read exit criteria for that phase in `docs/learning/02-phase-plan.md`.
3. Inspect the repo for evidence (code, tests, scripts, README notes) — do not trust claims alone.
4. Produce a gate report (template below).
5. Only recommend advancing if **all P0 criteria** pass, or learner explicitly accepts debt with a dated note in `progress.md`.

## Gate report template

```markdown
## Phase N gate

**Verdict:** PASS | FAIL | PASS WITH DEBT

### Criteria
| Criterion | Status | Evidence |
|-----------|--------|----------|
| ... | pass/fail | path or command |

### Explain-back
- Asked / completed? 
- Gaps:

### Learning codes covered
- ...

### Next action
- If PASS: start Phase N+1 focus ...
- If FAIL: fix ... first
- If DEBT: record waiver line in progress.md
```

## Rules

- Auth/IDOR failures are always **FAIL** — no debt waiver for “IDOR later”.
- Missing polish/UI is not a fail if P0 learning criteria pass.
- On PASS, remind to tick checkboxes in `progress.md`.
