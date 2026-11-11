# PRD — Garasiku v1

Aplikasi mobile manajemen kendaraan untuk rumah tangga: daftarkan kendaraan (mobil + motor), pantau riwayat servis + biaya, odometer, dan jatuh tempo dokumen, dengan pengingat notifikasi lokal. Proyek pribadi — tidak dipublikasikan ke App Store / Play Store.

Bagian **Keputusan terkunci** adalah single source of truth untuk semua pilihan desain. Jika implementasi menemukan konflik antara bagian manapun, keputusan di bagian ini menang. Bagian **Rencana implementasi** adalah urutan langkah kerja; setiap langkah punya kriteria selesai yang dapat diperiksa.

> Design visual & interaksi dituangkan di [`DESIGN.md`](DESIGN.md) (konsep Hommie: tokens, komponen, motion, kriteria selesai design). Saat mengimplementasikan layar mana pun, baca dokumen itu.

---

## Keputusan terkunci

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Pengguna | Satu pengguna per perangkat, tanpa akun | Proyek pribadi; sharing keluarga = fase 2 |
| Jenis kendaraan | Mobil + motor saja di v1; `type` disimpan sebagai string agar tipe lain bisa ditambah tanpa migrasi | Dua tipe mencakup kebutuhan nyata rumah |
| Cakupan monitoring | Riwayat servis + biaya, odometer, dokumen jatuh tempo | Nilai inti "monitoring" dengan kompleksitas terendah |
| Notifikasi | Local notification H-7, H-1, hari-H; interval diubah dari satu pengaturan global (bukan per dokumen) | Inti nilai aplikasi; tanpa ini hanya buku catatan |
| Servis berkala | Agenda berikutnya otomatis: mobil +6 bulan, motor +3 bulan dari tanggal servis; tanggal bisa diedit; tanpa perhitungan berbasis km | Estimasi km menuntut pencatatan yang tidak akan konsisten |
| Data | SQLite lokal per perangkat, tanpa cloud | Model data dirancang cloud-ready agar sinkronisasi fase 2 tidak butuh migrasi besar |
| Platform & stack | iOS + Android, satu codebase Expo (React Native) + TypeScript + expo-router | Cross-platform, ecosystem matang |
| Distribusi | EAS preview build (install ke HP sendiri); Expo Go hanya untuk pengembangan harian; tidak masuk store | Notifikasi & data perlu tahan lama untuk pemakaian harian |
| Bahasa UI | Indonesia saja | v1 |
| Tema | Mengikuti pengaturan sistem (light + dark); palet netral, satu warna aksen (lime `#C8F169`) — diubah dari biru saat arah visual ALT B "Bengkel Malam" dipilih (2026-11-11); lime dipakai untuk aksi utama, angka hitung mundur, dan bar countdown; warna status tetap merah/oranye/kuning sesuai tabel Status visual agenda | Karakter garasi/bengkel yang tegas |
| Data awal | Tanpa seed data; empty state dengan satu CTA "Tambah kendaraan pertama" | Pengguna memasukkan data aslinya sendiri |
| Biaya servis | Satu biaya total per catatan; tidak dipecah jasa vs sparepart | Nilai catatan rinci < beban pencatatannya |

---

## Fitur v1

Setiap fitur menyertakan acceptance criteria yang harus terpenuhi semua sebelum fitur dianggap selesai.

### F1 — Daftar kendaraan
Tambah dan edit kendaraan. Field: jenis (mobil/motor), plat, merek, model, tahun, warna, foto (opsional), catatan.
- [ ] Kendaraan baru muncul di dashboard langsung setelah disimpan
- [ ] Semua field kecuali jenis & plat bisa kosong
- [ ] Edit semua field dan hapus kendaraan (dengan konfirmasi; menghapus kendaraan menghapus servis, dokumen, dan agendanya)

### F2 — Riwayat servis
Satu catatan servis: tanggal, odometer saat servis, jenis servis (pilihan datar: oli mesin, oli gardan/transmisi, coolant/radiator, ban, rem, aki/baterai, servis berkala, + "Lainnya" dengan teks bebas), biaya total, bengkel/tempat (opsional), catatan, lampiran foto bukti (opsional).
- [ ] Jenis "Lainnya" menampilkan input teks wajib
- [ ] Riwayat per kendaraan tampil kronologis (terbaru dulu)
- [ ] Foto bukti tersimpan lokal dan ikut dibackup

### F3 — Odometer
- [ ] Saat mencatat servis dengan odometer terisi, odometer kendaraan diperbarui jika lebih besar dari nilai sekarang
- [ ] Odometer bisa di-update manual dari halaman kendaraan kapan saja
- [ ] Tidak ada estimasi jarak tempuh otomatis

### F4 — Dokumen & jatuh tempo
Jenis dokumen: pajak tahunan, perpanjangan STNK 5 tahunan, asuransi (opsional). Tiap dokumen: tanggal jatuh tempo + nomor (opsional).
- [ ] Setiap jenis dokumen punya satu nilai aktif per kendaraan; mengisi ulang memperbarui yang lama (ganti tanggal/nomor), bukan menambah baris duplikat
- [ ] Jatuh tempo dokumen langsung muncul sebagai agenda

### F5 — Agenda servis berkala
- [ ] Mencatat servis berkala otomatis membuat agenda berikutnya: mobil +6 bulan, motor +3 bulan dihitung dari tanggal servis
- [ ] Tanggal agenda bisa diedit user
- [ ] Satu agenda servis berkala aktif per kendaraan

### F6 — Notifikasi
Local notification untuk tiap agenda (dokumen + servis berkala) pada H-7, H-1, dan hari-H.
- [ ] Semua agenda aktif terschedule pada device (bertahan setelah restart app)
- [ ] Perubahan data (tambah/ubah/hapus agenda, selesaikan servis) me-reschedule notifikasi terkait — agenda lama tidak menembak dua kali
- [ ] Interval default (7 hari, 1 hari) bisa diubah di Pengaturan; mengubahnya me-reschedule semua agenda
- [ ] Notifikasi membuka app ke kendaraan terkait

### F7 — Dashboard
Kartu per kendaraan (foto, plat, badge jumlah agenda), daftar agenda terdekat, riwayat terakhir. FAB dengan bottom sheet: catat servis / update dokumen / update odometer.
- [ ] Badge = jumlah agenda yang belum lewat; selesai/terlewat tidak dihitung
- [ ] Agenda terdekat diurutkan dari yang paling dekat/terlambat

### F8 — Detail kendaraan
Tab: Info & dokumen (odometer terakhir, dokumen + jatuh tempo), Riwayat servis.
- [ ] Semua data per kendaraan terlihat dari satu layar tanpa scroll ganda yang menyembunyikan dokumen

### F9 — Backup / restore
- [ ] Ekspor: seluruh data (SQLite + foto) ke satu file JSON via share sheet
- [ ] Import: file hasil ekspor dipulihkan dengan skema validasi; import mengganti data sekarang setelah konfirmasi
- [ ] Restore menyesuaikan notifikasi ulang

### F10 — Onboarding
- [ ] First-run tanpa kendaraan menampilkan empty state dengan satu CTA "Tambah kendaraan pertama"

---

## Status visual agenda
Badge dan baris agenda diberi warna berdasarkan selisih jatuh tempo terhadap hari ini:

| Kondisi | Warna |
|---|---|
| Sudah lewat (terlambat) | Merah |
| ≤ 7 hari | Oranye |
| ≤ 30 hari | Kuning |
| > 30 hari | Netral/abu |

---

## Non-goals (fase 2, eksplisit)

Konsumsi BBM, checklist kondisi fisik (ban/oli/aki/rem), jurnal catatan bebas, sharing keluarga, sinkronisasi cloud + akun, bilingual ID/EN, jadwal berbasis km.

---

## Model data

SQLite (expo-sqlite). Kolom `type` / `doc_type` disimpan sebagai string; nilai valid divalidasi di layer aplikasi, bukan constraint database, agar fase 2 tidak butuh migrasi.

- **vehicles**: `id`, `type` ("car" | "motorcycle"), `plate`, `brand`, `model`, `year`, `color`, `photo_path`, `odometer`, `notes`, `created_at`
- **services**: `id`, `vehicle_id`, `date`, `odometer_at`, `type`, `type_custom` (nullable, wajib saat type = "other"), `cost`, `shop`, `notes`, `created_at`
- **documents**: `id`, `vehicle_id`, `doc_type` ("tax" | "stnk" | "insurance"), `number` (nullable), `due_date`, `created_at`; unique per (vehicle_id, doc_type)
- **schedules**: `id`, `vehicle_id`, `kind` ("periodic_service"), `due_date`, `created_at`; satu baris per kendaraan
- **Agenda** (untuk notifikasi & dashboard) = union `documents.due_date` + `schedules.due_date`; tidak ada tabel agenda terpisah

Foto: disimpan di app storage lokal; path direferensikan oleh baris terkait; seluruh foto di-serialisasi ke dalam file backup.

---

## Layar & navigasi (expo-router)

- `(tabs)/home` — Dashboard
- `vehicle/[id]` — Detail kendaraan (Info & dokumen / Riwayat servis)
- `vehicle/form` — Tambah/edit kendaraan
- `service/form` — Catat servis
- `document/form` — Isi/ubah dokumen
- `settings` — Interval notifikasi, backup/restore

FAB di dashboard membuka bottom sheet aksi cepat. Notifikasi dan agenda terdekat menautkan ke `vehicle/[id]`.

---

## Rencana implementasi

Langkah berurutan; satu langkah dianggap selesai hanya jika seluruh kriterianya terpenuhi.

1. **Scaffold proyek** di `/Users/ademugni/dev/my-projects/garasiku`: Expo + TypeScript + expo-router, folder structure sesuai konvensi Expo. *Selesai*: `npx expo start` berjalan dan aplikasi blank tampil di Expo Go.
2. **Skema & repository layer**: buat tabel sesuai Model data, migrasi, dan fungsi repository (CRUD tiap entitas, query agenda terdekat). *Selesai*: semua CRUD repository teruji (unit test) termasuk aturan unique per (vehicle_id, doc_type) dan one-row-per-vehicle di `schedules`.
3. **Layar & navigasi**: dashboard, detail kendaraan, semua form, settings, FAB + bottom sheet, empty state, tema light/dark. *Selesai*: seluruh fitur F1–F5, F7, F8, F10 acceptance criteria terpenuhi dengan data dummy dari repository.
4. **Logika agenda + notifikasi**: schedule H-7/H-1/hari-H, reschedule saat data berubah, interval dari Pengaturan. *Selesai*: F6 acceptance criteria terpenuhi (interval diuji dengan nilai dipercepat agar bisa diverifikasi manual).
5. **Backup/restore**: ekspor JSON + foto via share sheet, import dengan validasi. *Selesai*: F9 acceptance criteria terpenuhi — data di ekspor → import di perangkat bersih → identik.
6. **Polish & hardening**: kosong/error states, konfirmasi hapus, lint + typecheck bersih. *Selesai*: `npm run lint` dan `tsc --noEmit` lulus tanpa error.
7. **Uji kedua platform & build**: uji manual iOS + Android terhadap semua acceptance criteria, lalu EAS preview build. *Selesai*: preview build terinstall dan lulus Kriteria selesai v1 di HP fisik.

## Kriteria selesai v1

Seluruh acceptance criteria F1–F10 terpenuhi, dan pada HP fisik (iOS + Android): mendaftarkan 2+ kendaraan, mencatat servis, mengisi dokumen dengan jatuh tempo, menerima notifikasi H-7/H-1/hari-H, backup + restore JSON — tanpa crash.
