# Domain Model

## Entities (MVP)

### User

| Field | Notes |
|-------|-------|
| Id | UUID/PK |
| Email | unique, normalized |
| PasswordHash | ไม่เก็บ plain text |
| CreatedAt | |

### Application

ใบสมัครหนึ่งตำแหน่งต่อหนึ่งบริษัท (ของผู้ใช้หนึ่งคน)

| Field | Notes |
|-------|-------|
| Id | PK |
| UserId | FK → User (**บังคับกรองทุก query**) |
| Company | required |
| Title | ตำแหน่ง, required |
| JobUrl | optional |
| AppliedAt | วันที่สมัคร |
| Status | enum ปัจจุบัน |
| Notes | optional |
| CreatedAt / UpdatedAt | |

### ApplicationStatusHistory

| Field | Notes |
|-------|-------|
| Id | PK |
| ApplicationId | FK |
| FromStatus | nullable เมื่อสร้างครั้งแรก |
| ToStatus | required |
| ChangedAt | |
| Note | optional |

**กฎ:** การเปลี่ยน `Application.Status` ต้องสร้าง history ใน **transaction เดียวกัน**

### Reminder

| Field | Notes |
|-------|-------|
| Id | PK |
| ApplicationId | FK (ownership ผ่าน Application.UserId) |
| DueAt | |
| Channel | เช่น `Log` / `EmailMock` |
| Status | `Pending` / `Processing` / `Sent` / `Failed` / `Cancelled` |
| IdempotencyKey | unique — ใช้กันประมวลผลซ้ำ |
| LastError | optional |
| ProcessedAt | optional |

## Status enum (เริ่มต้น)

```
Wishlist → Applied → Interview → Offer → Accepted
                ↘ Rejected
                ↘ Withdrawn
```

กฎการเปลี่ยนสถานะ (MVP — เก็บง่ายก่อน):

- อนุญาต transition ที่สมเหตุสมผลตามแผนภาพด้านบน  
- ปฏิเสธค่าที่ไม่รู้จัก  
- (ทางเลือกเฟสหลัง) soft-validate ด้วย allow-list ในโค้ดโดเมน

## Relationships

```
User 1 ── * Application
Application 1 ── * ApplicationStatusHistory
Application 1 ── * Reminder
```

## Invariants (สิ่งที่ต้องจริงเสมอ)

1. `Application.UserId` ตรงกับเจ้าของเท่านั้นที่อ่าน/เขียนได้  
2. `Application.Status` สอดคล้องกับ history ล่าสุดหลัง commit สำเร็จ  
3. `Reminder` ที่ `Sent` แล้วต้องไม่ถูกส่งซ้ำด้วย key เดิม  
4. ห้ามมี Reminder อ้าง Application ของ user อื่นผ่านช่องโหว่ API

## รายงานที่โดเมนรองรับ

- นับ Application ต่อ `Status` ของ user ปัจจุบัน  
- นับ Application ต่อเดือน จาก `AppliedAt` ของ user ปัจจุบัน  

ใช้ aggregate ที่ DB — รายละเอียด API อยู่ที่ `03-api-auth.md`
