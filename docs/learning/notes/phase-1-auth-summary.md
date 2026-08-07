# Phase 1 — Auth สรุปกระชับ

วันที่: 2026-08-06  
อ้างอิงศัพท์: [glossary-auth.md](./glossary-auth.md)  
ทางเลือกที่ ship: [phase-1-auth-choice.md](./phase-1-auth-choice.md)

## สิ่งที่โปรเจกต์นี้ใช้

**JWT ใน HttpOnly cookie** (`access_token`) อายุ **480 นาที (8 ชม.)** นับจาก login — ไม่ใช่ sliding  
`UserId` มาจาก claims ฝั่ง server เท่านั้น · แตะ resource คนอื่น → **404**

## สรุป 5 ข้อ (จำแบบอธิบายปากเปล่าได้)

1. **ยอดฮิตตามบริบท:** Cookie HttpOnly (first-party web), Bearer (API / mobile / SPA), OAuth2/OIDC (login ด้วย Google ฯลฯ / ไม่เก็บรหัสเอง)
2. **Cookie first-party:** `HttpOnly` + `Secure` (prod) + `SameSite=Lax` หรือ `Strict` → ทำ CORS/SameSite ง่าย และลด CSRF ได้ดีกว่า `SameSite=None`
3. **SPA + Bearer ที่ดี (แพทเทิร์นทั่วไป ไม่ใช่ของเราตอนนี้):** access token อายุสั้นอยู่ใน **memory** · refresh token ใน **HttpOnly cookie** · รีเฟรชหน้าแล้วขอ access ใหม่ · logout = ล้างตัวแปร + ลบ/revoke refresh  
   - Bearer เอง = วิธีส่งใน header ไม่ได้แปลว่า “third-party”  
   - Memory ดีกว่า `localStorage` แต่ XSS บนหน้าที่รันอยู่ยังโจมตีได้
4. **OAuth2 + OIDC:** ให้ identity provider จัดการ login · user คุ้น · ต่อยอด SSO ได้
5. **IDOR = AuthZ หลัง AuthN:** login แล้วก็ยังพังได้ถ้าไม่เช็คเจ้าของ resource ฝั่ง server — ไม่เชื่อ `userId` จาก client

## ของเรา vs แพทเทิร์น memory+refresh

| | โปรเจกต์นี้ (Phase 1) | SPA + Bearer แบบยอดนิยม |
|--|----------------------|-------------------------|
| Access | JWT ใน HttpOnly cookie | ตัวแปร memory (สั้น) |
| Refresh | ไม่มีแยก | HttpOnly cookie |
| รีเฟรชหน้า | ยัง login อยู่ (cookie อยู่) | access หาย → เรียก refresh |
| Logout | ลบ cookie | ล้าง memory + revoke refresh |

## Hotspots ในโค้ด

- `Program.cs` — อ่าน JWT จาก cookie (`OnMessageReceived`)
- `CurrentUser.GetUserId` — identity จาก claims
- `ApplicationsController` — filter `UserId`; คนอื่นได้ 404
- `apps/web/src/api.ts` — `credentials: 'include'`
