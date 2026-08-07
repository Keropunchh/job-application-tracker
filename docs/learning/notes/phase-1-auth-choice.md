# Phase 1 — Auth choice note

วันที่: 2026-08-05

## เลือกอะไร

**JWT อยู่ใน HttpOnly cookie** (`access_token`)

- Login/register สำเร็จ → API ออก JWT → ใส่ cookie  
- Browser ส่ง cookie อัตโนมัติทุก request (ผ่าน Vite proxy `/api`)  
- Frontend **ไม่** อ่าน token และ **ไม่** เก็บใน `localStorage`

## ทำไมเลือกแบบนี้ (สำหรับ MVP / แล็บ)

1. กัน XSS ขโมย token ตรงๆ ได้ดีกว่า `localStorage` (JS อ่าน HttpOnly ไม่ได้)  
2. ฝั่ง React ยังฝึก `credentials: 'include'` + 401 → login ได้  
3. อธิบาย claims / `UserId` จาก server identity ได้ชัด (L1-SEC)

## พังตรงไหนถ้าผิด

| ผิด | ผล |
|-----|-----|
| เก็บ JWT ใน `localStorage` | XSS ขโมย session ได้ |
| เชื่อ `userId` จาก body | IDOR / สวม ownership |
| ไม่ filter `UserId` ใน query | คนอื่นอ่านใบสมัครเราได้ |
| ไม่ตั้ง `HttpOnly` | JS บนหน้าเว็บอ่าน cookie ได้ |
| Logout แค่ลบ state ใน React | cookie ยังใช้ได้อยู่จนกว่าจะหมดอายุหรือถูกลบ |

## ข้อแลกเปลี่ยนที่รู้ไว้

JWT ใน cookie **ไม่ได้ revoke ทันทีแบบ session store** — logout ลบ cookie ได้ แต่ถ้ามีคน copy token ไปแล้ว (ช่องทางอื่น) ยังใช้ได้จนหมดอายุ  
สำหรับ MVP นี้ยอมรับได้; ระบบใหญ่ขึ้นอาจเพิ่ม denylist / short expiry / refresh

## เอกสารต่อ

- สรุปกระชับอธิบายปาก: [phase-1-auth-summary.md](./phase-1-auth-summary.md)
- อภิธานศัพท์: [glossary-auth.md](./glossary-auth.md)