# Spec Overview — Job Application Tracker

## ปัญหาที่แก้

ตอนหางาน ข้อมูลกระจายอยู่หลายที่ (สเปรดชีต, อีเมล, โน้ต) ทำให้ตามสถานะและ follow-up ไม่ทัน  
ระบบนี้รวมตำแหน่งที่สมัคร สถานะ ประวัติ และ reminder ไว้ที่เดียว ภายใต้บัญชีของผู้ใช้

## เป้าหมายผลิตภัณฑ์ (MVP)

ผู้ใช้หนึ่งคนสามารถ:

1. สมัครสมาชิก / เข้าสู่ระบบ / ออกจากระบบอย่างปลอดภัย  
2. สร้าง แก้ไข ดู ลบใบสมัครงานของตัวเองเท่านั้น  
3. เปลี่ยนสถานะพร้อมบันทึกประวัติ  
4. ดูหน้ารายงานสรุป (ต่อสถานะ / ต่อเดือน)  
5. ตั้ง reminder follow-up และระบบประมวลผลแบบทนต่อส่งซ้ำ  
6. ใช้งานผ่าน web ที่คุยกับ API จริง และ deploy backend ได้

## นอกขอบเขต MVP (Explicit non-goals)

- Job board / scrape จาก LinkedIn หรือเว็บหางาน  
- Multi-tenant องค์กร / แชร์ใบสมัครในทีม HR  
- ระบบ resume builder หรือ AI สร้าง cover letter ทั้งก้อน (optional ทีหลัง)  
- Realtime chat / social  
- Mobile native app

## เอกสาร Spec ในโฟลเดอร์นี้

| ไฟล์ | เนื้อหา |
|------|---------|
| [01-product-requirements.md](01-product-requirements.md) | User stories, DoD, failure cases |
| [02-domain-model.md](02-domain-model.md) | Entities, relationships, status rules |
| [03-api-auth.md](03-api-auth.md) | Auth model, API surface, authz rules |
| [04-non-functional.md](04-non-functional.md) | Security, performance, deploy, quality |

## ความสำเร็จของโปรเจกต์ (Definition of Done ระดับ repo)

- [ ] ผู้ใช้คน A เห็น/แก้ได้เฉพาะของ A — ทดสอบ IDOR แล้วพลาดไม่ได้  
- [ ] เปลี่ยนสถานะแล้วมี history ใน transaction เดียวกัน  
- [ ] มีหน้ารายงานจาก aggregate query (ไม่ใช่วน loop นับใน memory เป็นหลัก)  
- [ ] Reminder ทำงานซ้ำแล้วไม่สร้างผลซ้ำแบบพัง (idempotent พอใช้)  
- [ ] Deploy backend ได้ + มีวิธี rollback สั้นๆ ใน README  
- [ ] ผู้เรียนอธิบาย auth + หนึ่ง query รายงาน + ลำดับไล่ 500 ได้โดยไม่เปิด AI  

แผนเฟสที่ผูกกับของเหล่านี้ → `docs/learning/02-phase-plan.md`
