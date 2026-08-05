---
name: explain-back-drill
description: >-
  Runs an explain-back drill so the learner verbalizes auth, SQL, transactions,
  debugging, or idempotency without relying on AI answers. Use at phase end,
  before interviews practice, or when the user asks to quiz or explain-back.
---

# Explain-back drill

## Goal

The learner proves understanding **in their own words**. You facilitate; you do not lecture the answer first.

## Protocol

1. Confirm which phase / topic (`docs/learning/02-phase-plan.md`).
2. Ask the learner to answer **without pasting AI-generated essays** — short spoken/written answers.
3. Score each prompt: **Clear / Partial / Missing**.
4. Only after their attempt: correct misconceptions briefly and point to their code paths.
5. If Partial/Missing on a P0 topic, recommend staying on the phase.

## Prompt banks

### Phase 1 — Auth
- Session vs JWT — what did we choose and why?
- Why is `localStorage` for access tokens a bad default?
- How do we prevent user B from reading user A's application?

### Phase 2 — Transaction / domain
- Walk through status change step by step.
- What goes wrong if history insert and status update are not one transaction?
- Where do transition rules live (and why not only in React)?

### Phase 3 — SQL / debug
- Explain one report query (inputs → grouping → output).
- Recite your personal order for debugging a 500.
- What is N+1 in our list/detail endpoints?

### Phase 4 — Idempotency
- What is our idempotency key for reminders?
- What happens if process-due runs twice?

### Phase 5 — Perf / ops
- Four hypotheses if reports are slow — which did we measure?
- How do we roll back a bad backend deploy?

## Output

```markdown
## Explain-back results
| Prompt | Score | Note |
|--------|-------|------|
| ... | Clear/Partial/Missing | ... |

**Ready for next phase?** Yes / No — reason
```
