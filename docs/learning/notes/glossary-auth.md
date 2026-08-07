# Glossary — Auth / HTTP / Web (Phase 1)

ศัพท์จากบทเรียน Auth + คำถามระหว่างเรียน  
ใช้คู่กับ [phase-1-auth-summary.md](./phase-1-auth-summary.md)

---

## แอปและสถาปัตย์

### SPA (Single Page Application)
เว็บที่โหลดหน้าหลักครั้งเดียว แล้วเปลี่ยนหน้า/ข้อมูลด้วย JavaScript โดยไม่โหลด HTML ทั้งหน้าใหม่ทุกคลิก  
ตัวอย่างในโปรเจกต์: **React + Vite** (`apps/web`) คุยกับ API ผ่าน `fetch`

- ข้อดี: UX ลื่น, แยก frontend/backend ชัด  
- ต้องคิดพิเศษ: เก็บ token ยังไง, CORS/cookie, ตอนรีเฟรชหน้า state ใน memory หาย

### MVP (Minimum Viable Product)
ผลิตภัณฑ์เล็กที่สุดที่ยังใช้จบงานหลักได้ — มีของจำเป็น ไม่ใส่ของนอกขอบเขต (เช่น ไม่ทำ scrape LinkedIn ในเฟสนี้)

### First-party
เว็บกับ API เป็นของระบบเดียวกัน (โดเมนเดียวกันหรือสัมพันธ์กันชัด) — จัดการ cookie/`SameSite` ง่ายกว่า

### Third-party (ในบริบท identity)
บริการภายนอกที่ออกตัวตนให้ เช่น Google / Microsoft login — มักผ่าน OAuth2/OIDC  
อย่าสับสนกับ Bearer: Bearer เป็นแค่วิธีส่ง token ไม่ได้แปลว่า third-party โดยตัวมันเอง

---

## Auth พื้นฐาน

### AuthN (Authentication) — *คุณเป็นใคร?*
พิสูจน์ตัวตน (login)  
ล้มเหลว → มักได้ **401**

### AuthZ (Authorization) — *คุณทำอันนี้ได้ไหม?*
ตรวจสิทธิ์บน resource  
ล้มเหลวหลัง login แล้ว → ในโปรเจกต์นี้มัก **404** (ไม่บอกว่ามี id นั้น)

### IDOR (Insecure Direct Object Reference)
ช่องโหว่: ส่ง id ของ resource คนอื่นแล้ว server คืนข้อมูลโดยไม่เช็คเจ้าของ  
กันโดย: `UserId` จาก server identity + filter ใน query

### Session vs JWT (ภาพรวม)
- **Session:** cookie เก็บ id สั้นๆ → server เปิด store ดูว่าเป็นใคร  
- **JWT:** token พก claims มาเอง → server verify ลายเซ็น (โปรเจกต์นี้ใส่ JWT ใน HttpOnly cookie)

---

## Token และ JWT

### JWT (JSON Web Token)
สตริง 3 ท่อนคั่น `.` → `header.payload.signature`  
Payload อ่านได้ (Base64) — **ไม่ใช่การเข้ารหัสลับ**; ความปลอดภัยอยู่ที่ลายเซ็น

### Claims
ข้อความที่ token “อ้าง” ว่าเป็นจริง หลัง verify แล้ว server ค่อยเชื่อ  
เช่น `sub` (user id), `email`, `exp` (หมดอายุ)

### Access token
Token ที่ใช้เรียก API ในช่วงสั้น/กลาง — ของเราอายุ **8 ชม.** (`ExpiryMinutes: 480`)

### Refresh token
Token ยาวกว่า ใช้ขอ access ใหม่เมื่อ access หมดหรือหาย (เช่น หลังรีเฟรช SPA)  
มักเก็บใน HttpOnly cookie — **Phase 1 เรายังไม่แยก refresh**

### Bearer (`Authorization: Bearer <token>`)
ใส่ token ใน request header  
เบราว์เซอร์ไม่ส่งให้อัตโนมัติ — แอปต้องใส่เอง  
ไม่ติดกฎ **SameSite** ของ cookie แต่ยังเจอ CORS และต้องเก็บ token ให้ดี

### Opaque token / Session id
ค่าสุ่มใน cookie ที่ server ไป lookup — ไม่จำเป็นต้องเป็น JWT

---

## Cookie และธงความปลอดภัย

### Cookie
ข้อมูลที่เบราว์เซอร์เก็บและ **แนบให้อัตโนมัติ** ตามโดเมน/path

### HttpOnly
JS อ่าน cookie ไม่ได้ (`document.cookie` ไม่เห็น) → ลดการขโมย token ผ่าน XSS ตรงๆ

### Secure
ส่ง cookie เฉพาะ HTTPS (ควรเปิดใน production)

### SameSite
ควบคุมการส่ง cookie ข้ามไซต์:

| ค่า | ความหมายคร่าวๆ |
|-----|----------------|
| `Strict` | ข้ามไซต์ไม่ส่ง — กัน CSRF ดี |
| `Lax` | บาลานซ์ (ของเราใช้ค่านี้) |
| `None` | ส่งข้ามไซต์ได้ ต้องคู่ `Secure` — เสี่ยง CSRF สูงขึ้น ต้องกันเพิ่ม |

ดูใน DevTools: **Network → Headers → Cookie / Set-Cookie** หรือ **Application → Cookies**

---

## การโจมตีและกลไกที่เกี่ยวข้อง

### XSS (Cross-Site Scripting)
ฉีด JS รันบนหน้าเว็บเหยื่อ  
- อ่าน `localStorage` ได้  
- อ่าน HttpOnly cookie ไม่ได้  
- ยังสั่งให้เบราว์เซอร์ยิง API แทนผู้ใช้ได้ขณะ login อยู่

### CSRF (Cross-Site Request Forgery)
เว็บอื่นหลอกเบราว์เซอร์ยิง request ไปยัง API ของคุณพร้อม cookie  
HttpOnly **ไม่กัน CSRF** — ใช้ SameSite + (ถ้าจำเป็น) CSRF token / ตรวจ Origin

### CORS (Cross-Origin Resource Sharing)
กฎเบราว์เซอร์ตอนหน้าเว็บคนละ origin เรียก API  
มี cookie/credentials ต้องระบุ origin ชัด + `Allow-Credentials` (ห้าม `*` )  
โปรเจกต์นี้ใช้ Vite proxy `/api` ช่วยให้ dev เหมือน same-origin

---

## ที่เก็บ token ฝั่ง client

| ที่เก็บ | หมายเหตุ |
|--------|----------|
| **Memory** (ตัวแปร JS) | รีเฟรชหน้าแล้วหาย — ใช้กับ access สั้นใน SPA ได้ดี |
| **HttpOnly cookie** | JS อ่านไม่ได้ — แบบที่โปรเจกต์นี้ใช้กับ JWT |
| **sessionStorage** | แท็บเดียว; XSS อ่านได้ |
| **localStorage** | ค้างข้ามแท็บ; XSS อ่านง่าย — **ห้ามเก็บ access token ในโปรเจกต์นี้** |
| **Mobile secure storage** | Keychain / Keystore |

---

## มาตรฐาน identity

### OAuth 2.0
โปรโตคอลให้อนุญาตเข้าถึง resource โดยไม่แชร์รหัสผ่านตรงๆ กับทุกแอป

### OIDC (OpenID Connect)
ชั้นบน OAuth 2.0 สำหรับ **login / รู้ว่าเป็นใคร** (identity)  
เช่น “Sign in with Google”

### SSO (Single Sign-On)
ล็อกอินที่หนึ่ง ใช้ข้ามหลายระบบในองค์กร/ecosystem ได้ — มักต่อจาก OIDC

---

## HTTP สถานะที่เกี่ยวกับ Auth (ในแอปนี้)

| รหัส | ความหมายโดยประมาณ |
|------|---------------------|
| **401** | ยังไม่ AuthN / cookie หมดอายุ / logout |
| **404** | ไม่เจอ หรือเป็นของคนอื่น (กัน IDOR โดยไม่ leak) |
| **400** | validation พัง |
| **200/201** | สำเร็จ |

---

## คำสั้นๆ ที่เจอบ่อย

- **Principal / Identity** — ตัวตนบน server หลัง verify แล้ว  
- **Denylist / Revoke** — ทำให้ token ใช้ไม่ได้ก่อน `exp` (MVP เรายังไม่มี store นี้)  
- **Sliding expiration** — ใช้แล้วยืดอายุอัตโนมัติ (เราใช้แบบตายตัวจาก login ไม่ใช่ sliding)
