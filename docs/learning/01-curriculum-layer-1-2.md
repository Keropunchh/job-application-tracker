# Curriculum — Fundamentals ชั้น 1–2

อ้างอิงลำดับความสำคัญจากบริบทอาชีพ: แน่นชั้น 1 ก่อน, ชั้น 2 คือ intuition ที่ตัดสินใจ/review ได้

## ชั้น 1 — Must solidify

| รหัส | หัวข้อ | สิ่งที่ต้องทำได้เมื่อจบ | สัญญาณอันตราย |
|------|--------|-------------------------|----------------|
| L1-SEC | AuthN / AuthZ / IDOR | อธิบาย session vs JWT, cookie flags, กัน IDOR ด้วยการทดสอบ | token ใน localStorage; เชื่อ userId จาก client |
| L1-DB | Integrity & transactions | อธิบายว่าทำไม status+history ต้องก้อนเดียว; เห็น rollback | อัปเดตสถานะสำเร็จแต่ history ไม่มี |
| L1-SQL | SQL ใช้งานจริง | เขียน/อ่าน JOIN, GROUP BY, WHERE ช่วงวันที่; นึก index พื้นฐาน | N+1; aggregate ใน memory ทั้งก้อน |
| L1-HTTP | HTTP/API | อ่าน 401/403/404/400/500 เป็นภาษา; อธิบาย cookie credentials | ส่ง secret ใน query string |
| L1-DBG | Debug model | มีลำดับไล่ของตัวเองก่อนถาม AI | เปิด AI ทันทีทุก 500 |

## ชั้น 2 — Intuition enough

| รหัส | หัวข้อ | สิ่งที่ต้องทำได้เมื่อจบ | ไม่ต้องถึง |
|------|--------|-------------------------|------------|
| L2-DES | Design boundaries | แยก API / domain rules / data access ได้คร่าวๆ; อธิบายทำไม | ท่อง Clean Architecture ทั้งเล่ม |
| L2-PERF | Performance intuition | สมมติฐาน ≥ 4 เมื่อช้า แล้ววัด 1 จุด | ออกแบบระบบ Netflix |
| L2-STACK | React / .NET fluency | review diff ของ stack ได้; รู้ convention พื้นฐาน | Fiber / runtime internals ลึก |

## นอกหลักสูตร (เลื่อน)

- DSA หนัก, TCP/OSI ลึก, DDD สำนักเต็ม, distributed systems ระดับ Senior

## การผูกบทเรียนกับโดเมนโปรเจกต์

| หัวข้อ | จุดใน Job Application Tracker |
|--------|-------------------------------|
| L1-SEC | register/login/cookie + ทุก `/api/applications*` |
| L1-DB | `POST .../status` + `ApplicationStatusHistory` |
| L1-SQL | `/api/reports/*` + seed ข้อมูล |
| L1-HTTP | สัญญา error ของ API + frontend credentials |
| L1-DBG | จงใจทำบัคในแล็บแล้วไล่ |
| L2-DES | โครงสร้างโฟลเดอร์ + ไม่ใส่ business rule ใน UI อย่างเดียว |
| L2-PERF | หน้ารายงานหลัง seed |
| L2-STACK | React forms/list + .NET endpoints/EF |

แผนเฟส → `02-phase-plan.md`
