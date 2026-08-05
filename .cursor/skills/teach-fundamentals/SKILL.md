---
name: teach-fundamentals
description: >-
  Teaches layer 1-2 fundamentals alongside Job Application Tracker implementation.
  Use when starting a phase, implementing auth/SQL/transactions/reports/reminders,
  or when the user asks to learn, explain a concept, or pair theory with coding.
---

# Teach fundamentals (layer 1–2)

## When to use

Any implement session that maps to `docs/learning/01-curriculum-layer-1-2.md` or a phase in `02-phase-plan.md`.

## Workflow

1. **Identify lesson codes** for this task (e.g. `L1-SEC`, `L1-SQL`).
2. **Open the matching phase** in `docs/learning/02-phase-plan.md` — do not invent a parallel curriculum.
3. **Teach in 3 beats:**
   - *Hook (≤5 min):* why this breaks in production if wrong
   - *Model:* 1 short correct mental model + 1 anti-pattern
   - *Lab:* bind immediately to the feature being built
4. **Ask 1–3 check questions** before large code generation.
5. **Implement** with hotspot callouts (3–5).
6. **Verify** with evidence; update guidance for `docs/learning/progress.md`.

## Lesson cheatsheet (keep short)

| Code | One-line teach goal |
|------|---------------------|
| L1-SEC | Own identity on server; block IDOR; no tokens in localStorage |
| L1-DB | Multi-step writes that must succeed together → transaction |
| L1-SQL | Aggregate at DB; filter by user; suspect N+1/index when slow |
| L1-HTTP | Status codes as shared language; cookie credentials |
| L1-DBG | Hypotheses before AI; ordered checks |
| L2-DES | Boundaries: UI ≠ sole home of business rules |
| L2-PERF | ≥4 hypotheses, measure one |
| L2-STACK | Enough React/.NET to review AI output |

## Out of scope

Heavy DSA, deep networking, full DDD/Clean Architecture courses.

## Output shape

```markdown
### บทเรียนวันนี้
- รหัส: ...
- ทำไมสำคัญ: ...
- คำถามตรวจ: ...
- Hotspots หลังโค้ด: ...
- หลักฐาน verify: ...
```
