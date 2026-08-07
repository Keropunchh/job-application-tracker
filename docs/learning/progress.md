# Learning Progress

อัปเดตเมื่อจบเกณฑ์ย่อยหรือจบเฟส — วันที่ใช้รูปแบบ YYYY-MM-DD

## สถานะปัจจุบัน

- **Phase:** 1 — Scaffold + Auth + IDOR (เกณฑ์หลักผ่าน; พร้อมเข้า Phase 2 เมื่อพร้อม)
- **อัปเดตล่าสุด:** 2026-08-06  
- **บันทึกสั้น:** Explain-back ผ่าน; มีสรุป + glossary — ดู `docs/learning/notes/phase-1-auth-summary.md` และ `glossary-auth.md`  

## Checklist รายเฟส

### Phase 0
- [x] อ่าน Spec overview + PRD  
- [x] อ่าน Learning contract  
- [x] พร้อมเริ่ม Phase 1  

### Phase 1 — Auth + IDOR
- [x] Scaffold React + .NET + DB  
- [x] register/login/logout/me  
- [x] Cookie/HttpOnly (ไม่มี access token ใน localStorage)  
- [x] Explain-back auth  
- [x] โน้ต 1 หน้า trade-off (`docs/learning/notes/phase-1-auth-choice.md`)  
- [x] สรุปกระชับ + glossary (`phase-1-auth-summary.md`, `glossary-auth.md`)  

### Phase 2 — Applications + Transaction
- [ ] CRUD applications  
- [ ] Status + history ใน transaction  
- [ ] IDOR test/script ผ่าน  
- [ ] Explain-back status flow  

### Phase 3 — Reports + Debug
- [ ] Reports by-status / by-month  
- [ ] Seed data  
- [ ] Debug drills + บัตรลำดับไล่ 500  
- [ ] Explain-back query  

### Phase 4 — Reminders
- [ ] Create + process-due  
- [ ] Idempotent บนการรันซ้ำ  
- [ ] Explain-back idempotency  

### Phase 5 — Perf + Deploy
- [ ] Performance drill มีหลักฐาน  
- [ ] Deploy + rollback note  
- [ ] Security checklist  
- [ ] 3 เรื่องสัมภาษณ์  

## บทเรียนที่จับได้ (1 บรรทัดต่อครั้ง)

| วันที่ | เฟส | บทเรียน |
|--------|------|---------|
| 2026-08-05 | 1 | UserId ต้องมาจาก server identity; token ไม่เก็บใน localStorage |
| 2026-08-06 | 1 | IDOR = AuthZ หลัง login; Cookie first-party + Lax ง่ายกว่า Bearer ข้ามโดเมน |
| 2026-08-06 | 1 | Bearer ≠ third-party; SPA รีเฟรชแล้ว memory หาย — ต่างจาก cookie |

## เคส “AI พลาด / ฉันจับได้”

| วันที่ | สรุป | ฉันจับจากสัญญาณอะไร |
|--------|------|----------------------|
| | | |
