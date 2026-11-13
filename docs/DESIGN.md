# Design System — Garasiku "Bengkel Malam"

Design spec untuk implementasi PRD (`PRD.md`). Dokumen ini menjawab *bagaimana terlihat dan terasa*; PRD menjawab *apa dan mengapa*. Jika keduanya konflik, nilai *keputusan terkunci* PRD menang (termasuk aksen lime, yang menggantikan biru per keputusan 2026-11-11).

**Konsep Bengkel Malam** (commit dari eksplorasi ALT B, 2026-11-11): garasi sebagai bengkel malam hari — charcoal dingin, tipografi industrial (Barlow, dipilih atas Archivo setelah perbandingan di canvas), agenda paling mendesak selalu jadi *hero* dengan angka hitung mundur besar. Satu aksen lime untuk aksi utama, angka, dan bar countdown; warna status (merah/oranye/kuning) tetap sesuai tabel PRD. Berbasis tren UI/UX 2026: **thumb-first**, **dark mode sebagai permukaan utama** (OLED), **glanceable home**, **minimalisme terarah**, **motion lembut + haptic fungsional**.

**Design Read**: mobile app manajemen kendaraan untuk pemilik rumah tangga, bahasa visual Bengkel Malam (charcoal industrial, tegas, thumb-first). **Dial: ENERGY 2 / RHYTHM 2 / MOTION 1** — berenergi tapi terkontrol, satu titik fokus besar per layar, motion hanya micro-feedback (150–250 ms) dan skeleton loading.
**Motif identitas**: voice "garasimu" yang berulang (greeting, empty state, caption Pengaturan) + angka hitung mundur besar (Barlow 800) di agenda terdesak + titik warna status di badge.
**Eksplorasi arsip**: ALT C "Kertas" (editorial serif, Fraunces) ditolak dan dibiarkan di canvas sebagai arsip perbandingan; dashboard ALT B adalah dashboard final.

---

## Design tokens

Single source of truth warna, ukuran, dan bentuk. Diimplementasikan sebagai satu file `theme/tokens.ts` di proyek; layar tidak boleh hardcode nilai di luar token.

### Warna — light

| Token | Nilai | Pemakaian |
|---|---|---|
| `bg` | `#F3F3F1` | Latar layar (cool off-white) |
| `surface` | `#FBFBFA` | Kartu, sheet |
| `surfaceMuted` | `#ECECEA` | Kartu sekunder, chip |
| `text` | `#1B1B1F` | Teks utama |
| `textSecondary` | `#64636A` | Teks sekunder (kontras ≥ 4.5:1 di atas `bg`) |
| `textTertiary` | `#6B6A73` | Caption, timestamp (≥ 4.5:1 di atas `bg` dan `surface`) |
| `outline` | `#E2E2E0` | Border, divider |
| `accent` | `#546D00` | Aksi utama, link, tab aktif (lime tergeduh agar kontras AA di latar terang) |
| `onAccent` | `#FFFFFF` | Teks di atas `accent` |
| `accentSoft` | `#F2F7E2` | Latar chip/tab indikator beraksen |
| `danger` | `#DC2626` | Agenda terlambat, konfirmasi hapus |
| `dangerSoft` | `#FDECEC` | Latar badge terlambat |
| `warning` | `#D97706` | Agenda ≤ 7 hari |
| `warningSoft` | `#FDF2E4` | Latar badge ≤ 7 hari |
| `caution` | `#CA8A04` | Agenda ≤ 30 hari |
| `cautionSoft` | `#FCF6E1` | Latar badge ≤ 30 hari |

### Warna — dark (permukaan utama; OLED-aware: latar nyaris hitam)

| Token | Nilai |
|---|---|
| `bg` | `#131316` (charcoal dingin) |
| `surface` | `#1C1C21` |
| `surfaceMuted` | `#24242B` |
| `text` | `#F2F1EE` (bukan putih murni) |
| `textSecondary` | `#A8A6A3` |
| `textTertiary` | `#95939A` |
| `outline` | `#2E2E36` |
| `accent` | `#C8F169` (lime) |
| `onAccent` | `#16180D` |
| `accentSoft` | `#202812` |
| `danger` | `#F87171` · `dangerSoft` `#3A1F1F` |
| `warning` | `#FBBF24` · `warningSoft` `#3A2D14` |
| `caution` | `#EAB308` · `cautionSoft` `#332B10` |

Catatan aksen: di dark mode lime dipakai untuk aksi utama, angka hitung mundur, dan bar countdown; di light mode aksen jadi lime tergeduh (`#546D00`) karena lime terang gagal kontras di latar terang. Status tetap merah/oranye/kuning di kedua mode.

Semua kombinasi teks/latar wajib lulus WCAG AA (4.5:1 teks kecil, 3:1 UI). Badge warna selalu dipasangkan teks label ("Terlambat", "7 hari lagi") — warna tidak pernah jadi satu-satunya sinyal (colorblind-safe).

### Tipografi
**Display: Barlow 700/800** (font custom di-load via `expo-font`; dipilih karena inspirasi signage rambu jalan raya — tematik untuk plat nomor/kendaraan — dan lebih hangat dari Archivo; keduanya bukan pilihan default umum). Body: font sistem per platform (SF Pro di iOS, Roboto di Android). Skala (ukuran pt/sp, fleksibel mengikuti Dynamic Type / font scale):

| Token | iOS | Android | Font | Weight | Pemakaian |
|---|---|---|---|---|---|
| `display` | 32 | 32 | Barlow | 800 | Greeting dashboard, angka hitung mundur hero |
| `title` | 20 | 20 | Barlow | 700 | Judul layar, plat nomor |
| `body` | 16 | 16 | Sistem | 400 | Konten utama |
| `bodyStrong` | 16 | 16 | Sistem | 600 | Label kolom, nilai penting |
| `caption` | 13 | 13 | Sistem | 400 | Timestamp, helper text |
| `label` | 14 | 14 | Sistem | 500 | Button, tab, chip |

### Spacing, radius, elevasi
- Grid 8: `4, 8, 12, 16, 24, 32`. Margin layar 16; padding kartu 16; jarak antar-kartu 12.
- Radius: kartu 16 · sheet 28 (sudut atas) · button 12 · chip 999 · input 12.
- Elevasi rendah: kartu pakai `surface` + border `outline` (bukan shadow berat); shadow lembut hanya di FAB dan sheet terbuka.

---

## Motion & haptic

- Durasi: transisi layar mengikuti platform; micro-feedback 150–250 ms, easing spring ringan.
- Haptic ringan (impact light) pada: simpan berhasil, agenda berubah status, FAB membuka bottom sheet. Haptic mengikuti *Reduce Motion*/*pengaturan getar* pengguna.
- Reduce Motion aktif → semua animasi non-esensial hilang; transisi jadi instan.
- Tidak ada animasi dekoratif berkelanjutan (shimmer boleh hanya sebagai skeleton loading).

---

## Copy (suara)

Prinsip copy anti-AI: copy yang menjelaskan berlebihan ("untuk mulai memantau…", "dijadwalkan", "dari catatan servis") terasa buatan. Aturannya:

- State fakta, bukan pitch. Empty state: "Mobil dan motormu akan tampil di sini." — bukan daftar fitur.
- Label tidak diulang di placeholder/helper; placeholder memberi contoh nyata ("Mis. bensin pertamax, jadwal tune-up pribadi").
- Kata proses dilepas kalau sudah tersirat: "Notifikasi H-7, H-1, dan hari jatuh tempo" (bukan "dijadwalkan…"), "Servis berkala dibuat otomatis: 10 Mei 2027" (bukan "berikutnya dibuat otomatis: …").
- Data memimpin, penjelasan maksimal satu baris — dan hanya jika mengubah tindakan pengguna. Kepadatan informasi di baris data (plat · merek, tanggal · odometer) adalah nilai, bukan kekacauan: ini aplikasi monitoring.
- Voice "garasimu" tetap motif yang menembus beberapa layar, bukan slogan di setiap kalimat.

---

## Komponen inti

### VehicleCard (dashboard)
Kartu `surface`, radius 16, padding 16: foto kendaraan (thumbnail 64, placeholder ikon mobil/motor pada `surfaceMuted`), plat no. pol dalam `bodyStrong`, merek + model di `caption`, badge kanan-atas jumlah agenda (chip `accentSoft` + angka; jika ada agenda terlambat/≤7 hari, chip memakai warna status terburuk). Seluruh kartu target tap ≥ 44pt, membuka `vehicle/[id]`. Daftar pakai `FlatList`/`FlashList` + memo (bukan ScrollView).

### AgendaRow (dashboard & detail)
Baris agenda: ikon jenis (dokumen/servis) + judul ("Pajak tahunan", "Servis berkala") + plat kendaraan, kanan: tanggal jatuh tempo + badge status sesuai tabel PRD (`danger`/`warning`/`caution`/`outline` + latar `*Soft`). Tap membuka kendaraan terkait. Agenda terlambat tampil paling atas.

### FAB + QuickActionSheet (aksi utama = thumb-first)
FAB `accent` 56, kanan-bawah, ikon `+`. Membuka bottom sheet (detent medium): tiga aksi besar ≥ 56pt tinggi — "Catat servis", "Update dokumen", "Update odometer" — masing-masing ikon + label, tertata di zona jempol. Sheet pakai komponen native platform (iOS sheet detents, Material modal bottom sheet).

### Badge
Pill radius 999, tinggi 24, teks `label` + titik warna: Terlambat (`danger`), "≤ 7 hari" (`warning`), "≤ 30 hari" (`caution`), "> 30 hari" (`surfaceMuted` + `textSecondary`). Selalu teks + titik warna, tanpa warna-saja.

### Form field
Input `surface` + border `outline`, radius 12, tinggi ≥ 48; label di atas input (bukan floating), error muncul di bawah field dengan `danger` + ikon. Field "Jenis servis" = chip pilihan (scroll horizontal) + chip "Lainnya" yang membuka input teks. Date pakai picker native. Keyboard avoidance wajib.

### EmptyState (dashboard kosong)
Ilustrasi sederhana garasi (outline, `outline` color), teks `body` "Belum ada kendaraan", CTA penuh lebar "Tambah kendaraan pertama" (`accent`, tinggi 48, di zona jempol).

---

## Layar (memetakan navigasi PRD)

| Layar PRD | Bentuk Hommie |
|---|---|
| `(tabs)/home` | Section 1: greeting `display` ("Garasimu", Archivo 800) + tanggal caption. Section 2: **hero agenda** — agenda terdesak sebagai kartu utama dengan angka hitung mundur besar (`display`, warna status) + bar countdown, link agenda lainnya di bawahnya. Section 3: kartu kendaraan (VehicleCard). Glanceable: yang paling mendesak terlihat tanpa scroll. FAB `accent` di kanan-bawah. |
| `vehicle/[id]` | Header: back + plat (`title`, Barlow) + merek + edit. **Hero agenda terdekat** kendaraan ("Terlambat 5 hari" / "7" + "hari lagi", warna status) selalu tampil di atas tab. Segmented tab (Info & dokumen / Riwayat servis): tab Info = kartu odometer (`display` + tombol Update) + daftar dokumen dengan badge status; tab Riwayat = daftar servis kronologis (jenis + tanggal + biaya). Mock punya dua state tab; implementasi = satu layar dengan tab state. |
| `vehicle/form` | Satu layar scroll, field mengikuti urutan PRD; foto kendaraan di atas (tappable, placeholder kamera). Simpan = button `accent` full-width, sticky di bawah (safe area). |
| `service/form` | Field urut: tanggal → odometer → jenis (chip) → biaya → bengkel → catatan → foto bukti. Setelah simpan dengan jenis "servis berkala", tampilkan sheet konfirmasi agenda berikutnya (tanggal default +6/+3 bulan) yang bisa diedit langsung. |
| `document/form` | Pilih jenis dokumen (3 pilihan segmented), nomor (opsional), jatuh tempo (picker). |
| `settings` | Grup ber-GROUP: Notifikasi (interval H-7/H-1, toggle per grup), Backup & restore (ekspor / import), Tentang. |

Layar state tambahan (pelengkap R-27): **skeleton loading dashboard** (blok `surfaceMuted` radius mengikuti kartu asli) dan **layar error generik** (ikon dalam lingkaran `dangerSoft`, pesan, CTA "Coba lagi") — dipakai ulang untuk gagal muat data maupun gagal import backup (F9).

---

## Adaptasi platform (unify vs diverge)

| Aspek | Aturan |
|---|---|
| Bisnis logika, token, layout data | Sama di kedua platform |
| Font & ikon | SF Pro + SF Symbols (iOS) · Roboto + Material Symbols (Android), display Archivo di keduanya. Mock di canvas memakai **Material Symbols Rounded** untuk kedua platform: satu set netral platform yang paling dekat dengan target produksi, dipilih karena relevansi konten kendaraan (bukan karena bentuk default set-nya) |
| Bottom sheet FAB | iOS native sheet (detents) · Material modal bottom sheet |
| Date picker | Native masing-masing |
| Back | iOS edge-swipe · Android system back + predictive back |
| Ripple | Wajib di semua touchable Android |
| Dynamic color (Material You) | **Tidak diaktifkan v1** — aksen lime terkunci di PRD; token statis dua mode |

---

## Hard bans (dari skill mobile-design, berlaku untuk semua layar)

- Target tap < 44pt (iOS) / < 48dp (Android); jarak antar target < 8pt.
- Aksi gestur-saja tanpa tombol pengganti; swipe-to-delete tanpa undo.
- Daftar panjang di ScrollView; `index` sebagai key; inline `renderItem` tanpa memo.
- Teks di bawah kontras AA; warna sebagai satu-satunya indikator status.
- Loading/error tanpa state eksplisit; aksi destruktif tanpa konfirmasi.
- Purple default AI, gradien dekoratif, shadow berat di light mode, `#FFF` murni sebagai teks dark mode.
- `accessibilityLabel` hilang pada elemen interaktif; font tak ikut Dynamic Type/font scale.
- Ikon baris dibungkus kotak/chip dekoratif; ikon di-tint warna status padahal badge status ikut tampil di baris yang sama. Ikon telanjang di baris list; wadah hanya untuk kontrol tap 44pt (header), FAB, dropzone foto, dan ilustrasi state (empty/error).

---

## Kriteria selesai design

- [ ] Semua layar hanya memakai token dari `theme/tokens.ts`; satu `hardcode` pun tidak lolos review
- [ ] Light dan dark mode memakai pasangan token di atas, lulus kontras AA (dicek dengan inspector)
- [ ] Setiap layar: aksi utama dan FAB berada di sepertiga bawah layar
- [ ] Dashboard glanceable: agenda terdesak + badge kendaraan terlihat tanpa scroll
- [ ] Reduce Motion dihormati; haptic pada 3 momen yang ditentukan
- [ ] VoiceOver/TalkBack: semua elemen interaktif punya label; urutan fokus logis
- [ ] Dites di font scale 200% (Android) dan Dynamic Type terbesar (iOS) tanpa layout rusak
