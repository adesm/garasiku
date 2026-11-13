# Font Barlow (Bengkel Malam)

Tempatkan file font Barlow di direktori ini, sesuai dengan `docs/DESIGN.md`:

| File | Bobot | Pemakaian |
|------|-------|-----------|
| `Barlow-Regular.ttf` | 400 | Display fallback |
| `Barlow-Bold.ttf` | 700 | Judul layar, plat nomor polisi (`title`) |
| `Barlow-ExtraBold.ttf` | 800 | Greeting dashboard, angka hitung mundur hero (`display`) |

Unduh dari Google Fonts: https://fonts.google.com/specimen/Barlow

Pilih tiga bobot di atas, unduh file `.ttf`, lalu salin ke folder ini.
Setelah file tersedia, font akan otomatis dimuat melalui `expo-font` di `src/app/_layout.tsx` dan siap digunakan via `theme/tokens.ts` (`fontFamily: "Barlow"`).

Jika tidak ingin mengelola file font secara manual, alternatifnya adalah pasang paket `@expo-google-fonts/barlow` yang menyalin file font otomatis ke proyek.