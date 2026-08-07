# Job Application Tracker

โปรเจกต์ Full Stack สำหรับติดตามการสมัครงาน — ใช้เป็น **สนามฝึก fundamentals ชั้น 1–2** ควบคู่การ ship จริง

## Stack

- **Frontend:** React + Vite (`apps/web`)
- **Backend:** .NET 10 Web API (`apps/api`)
- **DB:** PostgreSQL (`docker compose`)
- **Auth:** JWT ใน **HttpOnly cookie** — ห้ามเก็บ access token ใน `localStorage`

## รัน local (Phase 1)

### 1) Database

**เป้าหมายหลัก:** PostgreSQL

```bash
docker compose up -d
```

แล้วตั้ง `Database:UseSqlite` เป็น `false` ใน `apps/api/appsettings.Development.json`

**Fallback ตอน Docker Hub ดึง image ไม่ได้:** Development ใช้ SQLite ไฟล์ `jobtracker.dev.db` (ค่าเริ่มต้นตอนนี้) — ใช้เรียน Auth/IDOR ได้ แต่เฟสถัดไปที่เน้น SQL/Postgres ควรกลับไปใช้ PostgreSQL

### 2) API

```bash
cd apps/api
dotnet run --launch-profile http
```

API: `http://localhost:5164`  
- Postgres → `Migrate` อัตโนมัติ  
- SQLite fallback → `EnsureCreated`

### 3) Web

```bash
cd apps/web
npm install
npm run dev
```

Web: `http://localhost:5173`  
Vite proxy `/api` → API เพื่อให้ cookie อยู่ same-origin

### ตรวจ auth เร็วๆ

```bash
# จาก root (PowerShell)
./scripts/verify-auth.ps1
```

## เอกสารสำคัญ

| เอกสาร | ใช้เมื่อ |
|--------|---------|
| [AGENTS.md](AGENTS.md) | Context หลักให้ AI |
| [docs/spec/00-overview.md](docs/spec/00-overview.md) | Spec รวม |
| [docs/learning/02-phase-plan.md](docs/learning/02-phase-plan.md) | แผนเฟส |
| [docs/learning/notes/phase-1-auth-choice.md](docs/learning/notes/phase-1-auth-choice.md) | ทำไมเลือก JWT cookie |

## เฟสงาน

1. Scaffold + Auth + IDOR ← **กำลังทำ**
2. Domain CRUD + Status history (transaction)
3. SQL reports + seed + debug drills
4. Reminders / failure / idempotency
5. Performance drill + deploy + explain-back
