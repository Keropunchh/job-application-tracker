# Job Application Tracker

โปรเจกต์ Full Stack สำหรับติดตามการสมัครงาน — ใช้เป็น **สนามฝึก fundamentals ชั้น 1–2** ควบคู่การ ship จริง

## เป้าหมายสองชั้น

| ชั้น | ความหมาย |
|------|----------|
| **Product** | ระบบที่คุณใช้สมัครงานจริงได้: login → บันทึกตำแหน่ง → สถานะ → รายงาน → แจ้งเตือน follow-up |
| **Learning** | ปิดรู Auth / SQL / Transaction / HTTP / Debug / Design boundaries / Performance intuition โดย AI เป็นผู้สอนระหว่าง implement |

## Stack ที่กำหนด

- **Frontend:** React (Vite หรือเทียบเท่า)
- **Backend:** .NET Web API
- **DB:** PostgreSQL (หรือ SQL Server ถ้าจำเป็น)
- **Auth:** เขียนเองในโปรเจกต์นี้ — ห้าม copy util จากที่ทำงาน

## เอกสารสำคัญ

| เอกสาร | ใช้เมื่อ |
|--------|---------|
| [AGENTS.md](AGENTS.md) | Context หลักให้ AI — อ่านก่อนทำงานทุกครั้ง |
| [docs/spec/00-overview.md](docs/spec/00-overview.md) | Spec รวม + ขอบเขต |
| [docs/learning/00-learning-contract.md](docs/learning/00-learning-contract.md) | กติกาเรียนกับ AI-as-teacher |
| [docs/learning/02-phase-plan.md](docs/learning/02-phase-plan.md) | แผนเรียน ⟷ แผน implement |

## เฟสงาน (สรุป)

1. Scaffold + Auth + IDOR  
2. Domain CRUD + Status history (transaction)  
3. SQL reports + seed + debug drills  
4. Reminders / failure / idempotency  
5. Performance drill + deploy + explain-back  

รายละเอียดและเกณฑ์ผ่าน → `docs/learning/02-phase-plan.md`

## สถานะ

Repo เริ่มจากเอกสาร + Cursor rules/skills — ยังไม่มีโค้ดแอป  
เชื่อม remote git เองได้ตามสะดวก
