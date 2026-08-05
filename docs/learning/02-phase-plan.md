# Phase Plan — เรียน ⟷ Implement

แต่ละเฟสมี **งาน ship** + **บทเรียน** + **เกณฑ์ผ่าน**  
ครูต้องไม่เปิดเฟสถัดไปจนกว่าเกณฑ์ผ่าน หรือผู้เรียนยอมรับหนี้อย่างชัดเจน

---

## Phase 0 — Orient (½ วัน)

**Ship:** อ่าน Spec + Learning contract; ตั้งค่า repo/remote ตามที่ผู้เรียนทำเอง  
**เรียน:** เข้าใจว่าโปรเจกต์นี้เป็นแล็บชั้น 1–2 ไม่ใช่ tutorial clone  

**เกณฑ์ผ่าน**

- [ ] ผู้เรียนชี้ได้ว่า MVP รวม/ไม่รวมอะไร  
- [ ] รู้ว่าเฟส 1 โฟกัส Auth/IDOR  

---

## Phase 1 — Scaffold + Auth + IDOR  ← ชั้น 1 หลัก: L1-SEC, L1-HTTP

**Ship**

- [ ] สร้างโครง React + .NET API + DB + migration พื้นฐาน (User)  
- [ ] register / login / logout / me  
- [ ] cookie หรือ JWT ใน HttpOnly cookie — ไม่ใช้ localStorage สำหรับ access token  
- [ ] placeholder Applications CRUD แบบกัน user ได้แล้ว (อย่างน้อย GET/POST เปล่าๆ ก็ได้ถ้าจะต่อเฟส 2)

**เรียน (ก่อน/ระหว่าง)**

- session vs JWT (สั้น)  
- HttpOnly / Secure / SameSite ทำไมสำคัญ  
- ทำไม `UserId` ต้องมาจาก server identity  

**แบบฝึกหัดครู**

1. ถาม: “ถ้าเก็บ access token ใน localStorage โจมตีแบบไหนที่น่ากลัว?”  
2. ให้ผู้เรียนลองยิง API ด้วย id คนอื่น (หลังมี resource) — คาดหวัง 404/403  

**เกณฑ์ผ่าน**

- [ ] Login แล้วเรียก `/api/auth/me` ได้  
- [ ] อธิบายทางเลือก auth ที่เลือกได้โดยไม่เปิด AI (explain-back สั้น)  
- [ ] มีโน้ต 1 หน้า: ทำไมเลือกแบบนี้ / พังตรงไหนถ้าผิด  

**บทเรียนรหัส:** L1-SEC, L1-HTTP  

---

## Phase 2 — Applications + Status History (Transaction)  ← L1-DB, L2-DES

**Ship**

- [ ] CRUD Application ครบ ตาม spec  
- [ ] Status enum + `POST /applications/{id}/status`  
- [ ] เขียน history ใน transaction เดียวกับอัปเดตสถานะ  
- [ ] โครงสร้างโฟลเดอร์แยก API / domain หรือ service / data พอสังเกตได้  

**เรียน**

- transaction คืออะไรในภาษางานนี้  
- invariant: สถานะปัจจุบันสอดคล้อง history ล่าสุด  
- ทำไมไม่ใส่กฎ transition ไว้ใน React อย่างเดียว  

**แบบฝึกหัดครู**

1. “ถ้า insert history สำเร็จแต่อัปเดตสถานะพัง จะเห็นอาการแบบไหน?”  
2. ให้ผู้เรียนวาดลำดับขั้นตอนใน transaction ก่อนให้ AI ลงโค้ด  

**เกณฑ์ผ่าน**

- [ ] เปลี่ยนสถานะแล้วมี history  
- [ ] มีเทสต์หรือสคริปต์พิสูจน์ว่าของคนอื่นแตะไม่ได้ (IDOR บน applications)  
- [ ] Explain-back: เล่า flow status change ได้ ~1 นาที  

**บทเรียนรหัส:** L1-DB, L1-SEC (ซ้ำย้ำ), L2-DES  

---

## Phase 3 — Reports + Seed + Debug drills  ← L1-SQL, L1-DBG

**Ship**

- [ ] `GET /reports/by-status`, `GET /reports/by-month` จาก aggregate ที่ DB  
- [ ] หน้า UI รายงาน  
- [ ] Seed ข้อมูลจำนวนพอสมควร  
- [ ] จงใจทำบัค 2–3 เคส (null→500, query ช้า, auth หลุดขอบ) แล้วไล่  

**เรียน**

- GROUP BY / WHERE ช่วงวันที่  
- index พื้นฐานเมื่อไหร่ควรคิด  
- N+1 คืออะไรในบริบท list+details  
- ลำดับไล่ 500 ของผู้เรียนเอง  

**แบบฝึกหัดครู**

1. ให้ผู้เรียนเขียน SQL/แนว query รายงานเองก่อน แล้วค่อยเทียบของ AI  
2. Debug: สมมติฐาน 3 ข้อก่อนถาม AI — เก็บเคส “AI ชี้ผิดทาง” ถ้ามี  

**เกณฑ์ผ่าน**

- [ ] รายงานถูกต้องกับ seed  
- [ ] มีบัตร “ลำดับไล่ 500 ของฉัน” จากของจริงในโปรเจกต์  
- [ ] Explain-back: อธิบาย query รายงานหนึ่งตัวได้  

**บทเรียนรหัส:** L1-SQL, L1-DBG  

---

## Phase 4 — Reminders + Failure / Idempotency  ← L1-DB (ซ้ำ), ชั้น 2 soft

**Ship**

- [ ] สร้าง reminder บน application  
- [ ] process-due (mock/log) พร้อม `IdempotencyKey`  
- [ ] เคสรันซ้ำไม่ double-send  
- [ ] AC ครอบคลุม failure: พลาดชั่วคราว, ส่งซ้ำ, due แล้ว  

**เรียน**

- idempotency ในภาษางานจริง  
- ทำไม endpoint process ต้องไม่เปิดสาธารณะ  

**แบบฝึกหัดครู**

1. “รัน process สองครั้งติดกัน ออกแบบยังไงไม่ให้ส่งสองที?”  
2. ให้ผู้เรียนเขียนตารางสถานะ Reminder ก่อนโค้ด  

**เกณฑ์ผ่าน**

- [ ] Demo: due → processed; รันซ้ำแล้วสถานะคงที่  
- [ ] Explain-back: อธิบาย idempotency ของระบบนี้ได้  

**บทเรียนรหัส:** L1-DB, L2-DES  

---

## Phase 5 — Performance + Deploy + Portfolio stories  ← L2-PERF, L2-STACK

**Ship**

- [ ] Performance drill: หน้ารายงานช้า → สมมติฐาน ≥ 4 → วัดพิสูจน์ 1 ข้อ  
- [ ] Deploy backend + โน้ต rollback ใน README  
- [ ] เช็คลิสต์ security รอบสุดท้าย  

**เรียน**

- สมมติฐาน performance นอกจาก “traffic เยอะ”  
- อ่านผลวัดคร่าวๆ (เวลา query / จำนวน round-trip)  

**แบบฝึกหัดครู**

1. “API ช้าตอนกลางวัน — สมมติฐานสี่ข้อของคุณคืออะไร?” (ปิดคำใบ้)  
2. ซ้อมเล่า 3 เรื่องสัมภาษณ์: auth/IDOR, SQL/debug, deploy/failure  

**เกณฑ์ผ่าน**

- [ ] มีหลักฐานการวัด 1 จุด  
- [ ] มี URL หรือ demo script ที่คนอื่นลองได้  
- [ ] Explain-back สามเรื่องผ่าน  

**บทเรียนรหัส:** L2-PERF, L2-STACK  

---

## สรุปแมปเฟส ↔ บทเรียน

| Phase | บทเรียนหลัก | Ship หลัก |
|-------|-------------|-----------|
| 0 | orient | อ่าน docs |
| 1 | L1-SEC, L1-HTTP | Auth + scaffold |
| 2 | L1-DB, L2-DES | Applications + history tx |
| 3 | L1-SQL, L1-DBG | Reports + debug lab |
| 4 | idempotency / failure | Reminders |
| 5 | L2-PERF, L2-STACK | Deploy + drill + stories |

อัปเดตสถานะจริงใน `progress.md`
