# API & Auth Spec

## ตัดสินใจ Auth (MVP)

**แนวทางที่แนะนำให้สอนและ implement:**

- Cookie-based session **หรือ** JWT ใน **HttpOnly + Secure + SameSite** cookie  
- **ห้าม** เก็บ access token ใน `localStorage`  
- Password: hash ด้วยอัลกอริทึมมาตรฐาน (.NET Identity hasher / Argon2 / bcrypt ตามที่เลือกและอธิบายได้)

ระหว่างเฟส Auth ผู้เรียนต้องเลือกแนวทางหนึ่ง แล้วเขียนโน้ต “ทำไม / พังตรงไหนถ้าผิด”

## Auth endpoints

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/api/auth/register` | no | email+password → สร้าง user |
| POST | `/api/auth/login` | no | ตั้ง session/cookie |
| POST | `/api/auth/logout` | yes | ทำลาย session / หมดอายุ cookie |
| GET | `/api/auth/me` | yes | โปรไฟล์สั้นๆ |

## Application endpoints

| Method | Path | Auth | AuthZ |
|--------|------|------|-------|
| GET | `/api/applications` | yes | เฉพาะของ current user; filter `status` ได้ |
| POST | `/api/applications` | yes | ผูก `UserId` จาก identity ไม่รับจาก body |
| GET | `/api/applications/{id}` | yes | เจ้าของเท่านั้น |
| PUT | `/api/applications/{id}` | yes | เจ้าของเท่านั้น |
| DELETE | `/api/applications/{id}` | yes | เจ้าของเท่านั้น |
| POST | `/api/applications/{id}/status` | yes | เปลี่ยนสถานะ + history ใน transaction |
| GET | `/api/applications/{id}/history` | yes | เจ้าของเท่านั้น |

## Report endpoints

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| GET | `/api/reports/by-status` | yes | aggregate ของ current user |
| GET | `/api/reports/by-month` | yes | aggregate ของ current user |

## Reminder endpoints

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/api/applications/{id}/reminders` | yes | เจ้าของ application |
| GET | `/api/reminders` | yes | ของ user ปัจจุบัน |
| POST | `/api/internal/reminders/process-due` | protected | job/manual trigger — อย่าเปิดสาธารณะโดยไร้ secret |

> `process-due` ใน MVP อาจเป็น endpoint ที่ป้องกันด้วย API key / รันจาก hosted service — ต้องไม่ให้ anonymous เรียกได้

## HTTP conventions

- JSON request/response  
- 401 เมื่อไม่ได้ login  
- 403 หรือ 404 เมื่อแตะของคนอื่น (เลือกหนึ่งแล้วใช้สม่ำเสมอ — แนะนำ **404** เพื่อไม่ leak การมีอยู่ของ id)  
- 400 validation errors เป็นโครงสร้างอ่านง่าย  
- ไม่ส่ง stack trace ให้ client ใน production

## Frontend responsibilities

- ส่ง cookie credentials (`credentials: 'include'`) ถ้าใช้ cookie session  
- หน้า login/register/list/detail/report/reminders ขั้นต่ำ  
- เมื่อ 401 → พาไป login
