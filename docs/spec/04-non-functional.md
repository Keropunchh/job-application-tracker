# Non-functional Requirements

## Security

- Secrets อยู่ใน env / user secrets — ไม่ commit  
- HTTPS ในสภาพแวดล้อมที่ deploy จริง  
- Cookie: `HttpOnly`, `Secure` (เมื่อ HTTPS), `SameSite` ที่อธิบายได้  
- ทุก query ใบสมัครต้องผูก `UserId` จาก identity ของ server ไม่เชื่อ `userId` จาก client  
- Review checklist ต่อ PR ที่แตะ auth/data: AuthN, AuthZ/IDOR, secret leakage

## Data integrity

- Migration เป็นแหล่งความจริงของ schema  
- FK + unique ที่จำเป็น (email, idempotency key)  
- Status change + history = single transaction

## Performance (ระดับเรียนชั้น 2)

- Seed ได้อย่างน้อยหลักพันแถวต่อ user ทดสอบ  
- หน้ารายงานต้องมีสมมติฐานเมื่อช้า (index, N+1, payload, etc.) และวัดได้อย่างน้อย 1 จุด  
- ไม่ต้องออกแบบ scale ระดับใหญ่ — ต้อง **คิดเป็นสมมติฐาน** ได้

## Observability (ขั้นต่ำ)

- Log request ที่ล้มเหลวฝั่ง API (ไม่มี password ใน log)  
- Reminder processing ต้อง log ผลสำเร็จ/ล้มเหลวแบบมี correlation/id

## Deploy / ops

- Backend รันด้วย Docker หรือ host ที่เลือกได้หนึ่งทาง  
- README มี: วิธีรัน local, วิธี migrate, วิธี rollback คร่าวๆ  
- Frontend deploy แยกได้ (เช่น Vercel) แต่ API ต้องชี้ env ถูก

## Quality gates

- มีอย่างน้อย: เทสต์หรือสคริปต์พิสูจน์ IDOR + เทสต์/สคริปต์ status+history transaction  
- Manual explain-back ผ่านก่อนปิดเฟสตาม learning plan

## Accessibility / UI polish

- UI ใช้งานได้ ชัด อ่านง่าย — **ไม่ใช่เป้าหลักของโปรเจกต์เรียน**  
- อย่าใช้เวลาส่วนใหญ่กับ visual polish ก่อนเกณฑ์ชั้น 1 ผ่าน
