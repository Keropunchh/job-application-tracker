# Product Requirements — MVP

## Personas

- **ผู้สมัครงาน (primary):** ใช้ติดตามตำแหน่งที่สมัครและ follow-up  
- **ผู้เรียน/ผู้พัฒนา:** คนเดียวกับผู้สมัคร — ใช้โปรเจกต์เป็นสนามฝึก fundamentals

## User Stories

### Auth

| ID | Story | Priority |
|----|-------|----------|
| US-A1 | สมัครด้วย email + password แล้วได้บัญชีใหม่ | P0 |
| US-A2 | เข้าสู่ระบบแล้วใช้งาน API ที่ต้อง auth ได้ | P0 |
| US-A3 | ออกจากระบบแล้วใช้ session/token เดิมไม่ได้ | P0 |
| US-A4 | ผู้ใช้คนอื่นเดา/ใส่ id ของใบสมัครฉันแล้วอ่าน/แก้ไม่ได้ | P0 |

### Applications

| ID | Story | Priority |
|----|-------|----------|
| US-J1 | สร้างใบสมัคร: บริษัท, ตำแหน่ง, URL, วันสมัคร, โน้ต | P0 |
| US-J2 | แก้ไข / ลบใบสมัครของฉัน | P0 |
| US-J3 | ดูรายการใบสมัคร กรองตามสถานะได้ | P0 |
| US-J4 | เปลี่ยนสถานะ (เช่น Applied → Interview) | P0 |
| US-J5 | เห็นประวัติการเปลี่ยนสถานะของใบสมัคร | P0 |

### Reports

| ID | Story | Priority |
|----|-------|----------|
| US-R1 | ดูจำนวนใบสมัครแยกตามสถานะ | P0 |
| US-R2 | ดูจำนวนที่สมัครแยกตามเดือน | P0 |

### Reminders

| ID | Story | Priority |
|----|-------|----------|
| US-M1 | ตั้ง follow-up วันที่กำหนดบนใบสมัคร | P0 |
| US-M2 | ระบบประมวลผล due reminders (อย่างน้อย log / mock email) | P0 |
| US-M3 | รันซ้ำไม่ส่งซ้ำแบบสร้าง side-effect พัง (idempotent) | P0 |

## Acceptance Criteria ตัวอย่าง (สำคัญ)

### US-A4 (IDOR)

- Given ผู้ใช้ A มี application id=`X` และผู้ใช้ B login แล้ว  
- When B เรียก `GET/PUT/DELETE /api/applications/X`  
- Then ได้ `403` หรือ `404` (เลือกแนวทางเดียวทั้งโปรเจกต์) และข้อมูลของ A ไม่เปลี่ยน

### US-J4 + US-J5 (Transaction)

- Given application สถานะ `Applied`  
- When เปลี่ยนเป็น `Interview` สำเร็จ  
- Then (1) สถานะปัจจุบันเป็น `Interview` และ (2) มีแถว history ใหม่ใน DB  
- When ขั้นใดขั้นหนึ่งใน transaction ล้ม  
- Then ไม่เหลือสถานะใหม่โดยไม่มี history (หรือกลับสู่สถานะเดิมทั้งก้อน)

### US-M3 (Idempotency)

- Given reminder ที่ประมวลผลแล้ว  
- When worker/job รันซ้ำด้วย key เดิม  
- Then ไม่สร้าง “ส่งสำเร็จ” ซ้ำแบบนับสองครั้ง — สถานะคงที่ อธิบายได้

## Failure / Edge ที่ต้องคิดตั้งแต่ต้น

| เคส | พฤติกรรมที่คาด |
|------|----------------|
| Password อ่อน / email ซ้ำ | ปฏิเสธพร้อมข้อความชัด ไม่รั่วว่ามีบัญชีหรือไม่เกินจำเป็น |
| ใส่ application id ของคนอื่น | 403/404 ไม่รั่วข้อมูล |
| เปลี่ยนสถานะเป็นค่าที่ไม่อนุญาต | 400 + ไม่เขียน history |
| รายงานตอนยังไม่มีข้อมูล | ว่าง/ศูนย์ ไม่ 500 |
| Reminder due ตอน DB ช้า/พลาดชั่วคราว | retry ได้โดยไม่ double-send |
| Token/session หมดอายุ | 401 แล้ว client พาไป login |

## Out of scope ราย story (MVP)

- OAuth / magic link  
- แนบไฟล์ resume บน storage (เก็บ URL ข้อความได้)  
- แชร์ใบสมัครสาธารณะ  
- Dashboard analytics ซับซ้อน (funnel เต็มรูปแบบ)
