import { Platform } from "react-native";

/*============================================================================
  Design System — Garasiku "Bengkel Malam"
  ----------------------------------------------------------------------------
  Sumber kebenaran tunggal (single source of truth) untuk warna, ukuran,
  bentuk, dan tipografi. Implementasi sesuai `docs/DESIGN.md`.

  Aturan implementasi:
  - Setiap nilai visual di layar harus diambil dari file ini.
  - Tidak ada hardcode warna/ukuran/radius di luar `theme/tokens.ts`.
  - Warna status (danger/warning/caution) selalu dipasangkan teks label;
    warna tidak pernah menjadi satu-satunya sinyal (colorblind-safe).
============================================================================*/

// ============================================================================
// Warna — light mode (latar layar cool off-white)
// Digunakan untuk: aksi utama/link/tab aktif (accent, lime tergeduh agar
// kontras AA di latar terang), badge latar (*Soft), status merah/oranye/kuning.
// ============================================================================
export const lightColors = {
  bg: "#F3F3F1",
  surface: "#FBFBFA",
  surfaceMuted: "#ECECEA",
  text: "#1B1B1F",
  textSecondary: "#64636A",
  textTertiary: "#6B6A73",
  outline: "#E2E2E0",
  accent: "#546D00",
  onAccent: "#FFFFFF",
  accentSoft: "#F2F7E2",
  danger: "#DC2626",
  dangerSoft: "#FDECEC",
  warning: "#D97706",
  warningSoft: "#FDF2E4",
  caution: "#CA8A04",
  cautionSoft: "#FCF6E1",
} as const;

// ============================================================================
// Warna — dark mode (permukaan utama; OLED-aware, latar nyaris hitam)
// Aksen jadi lime terang (#C8F169) untuk aksi utama, angka hitung mundur,
// dan bar countdown. Status tetap merah/oranye/kuning di kedua mode.
// ============================================================================
export const darkColors = {
  bg: "#131316",
  surface: "#1C1C21",
  surfaceMuted: "#24242B",
  text: "#F2F1EE",
  textSecondary: "#A8A6A3",
  textTertiary: "#95939A",
  outline: "#2E2E36",
  accent: "#C8F169",
  onAccent: "#16180D",
  accentSoft: "#202812",
  danger: "#F87171",
  dangerSoft: "#3A1F1F",
  warning: "#FBBF24",
  warningSoft: "#3A2D14",
  caution: "#EAB308",
  cautionSoft: "#332B10",
} as const;

export type ColorScheme = "light" | "dark";

export interface ColorTokens {
  bg: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  outline: string;
  accent: string;
  onAccent: string;
  accentSoft: string;
  danger: string;
  dangerSoft: string;
  warning: string;
  warningSoft: string;
  caution: string;
  cautionSoft: string;
}

export const colors: Record<ColorScheme, ColorTokens> = {
  light: lightColors,
  dark: darkColors,
};

// ============================================================================
// Spacing — grid 8 (4, 8, 12, 16, 24, 32)
// Margin layar 16 (lg) · padding kartu 16 (lg) · jarak antar-kartu 12 (md).
// ============================================================================
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

// ============================================================================
// Radius
// Kartu 16 · sheet 28 (sudut atas) · button 12 · chip 999 · input 12.
// ============================================================================
export const radius = {
  card: 16,
  sheet: 28,
  button: 12,
  input: 12,
  chip: 999,
} as const;

// ============================================================================
// Tipografi
// Display: Barlow (custom font via expo-font; dipilih atas Archivo karena
// inspirasi signage rambu jalan raya — tematik plat nomor/kendaraan).
// Letakkan file font di `assets/fonts/` (Barlow-Regular, Barlow-Bold,
// Barlow-ExtraBold) dan muat di root layout dengan expo-font sebelum
// fontFamily "Barlow" diterapkan.
// Body: font sistem per platform (SF Pro iOS, Roboto Android), ikut
// Dynamic Type / font scale pengguna.
// ============================================================================
export const displayFontFamily = "Barlow";

export const systemFontFamily =
  Platform.OS === "ios" ? undefined : "sans-serif";

export interface FontToken {
  fontSize: number;
  fontWeight: "400" | "500" | "600" | "700" | "800";
  fontFamily: string | undefined;
  lineHeight: number;
}

export interface Typography {
  /** Greeting dashboard, angka hitung mundur hero (Barlow 800) */
  display: FontToken;
  /** Judul layar, plat nomor polisi (Barlow 700) */
  title: FontToken;
  /** Konten utama (sistem 400) */
  body: FontToken;
  /** Label kolom, nilai penting (sistem 600) */
  bodyStrong: FontToken;
  /** Timestamp, helper text (sistem 400) */
  caption: FontToken;
  /** Button, tab, chip (sistem 500) */
  label: FontToken;
}

export const typography: Typography = {
  display: {
    fontSize: 32,
    fontWeight: "800",
    fontFamily: "Barlow",
    lineHeight: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Barlow",
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: systemFontFamily,
    lineHeight: 24,
  },
  bodyStrong: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: systemFontFamily,
    lineHeight: 24,
  },
  caption: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: systemFontFamily,
    lineHeight: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: systemFontFamily,
    lineHeight: 20,
  },
} as const satisfies Typography;

// ============================================================================
// Motion
// Micro-feedback 150–250 ms; transisi layar mengikuti platform.
// Reduce Motion aktif → animasi non-esensial dihilangkan, transisi instan.
// ============================================================================
export const motion = {
  /** ms, di tengah rentang 150–250 ms dari DESIGN.md */
  microFeedback: 200,
} as const;

// ============================================================================
// Touch target (hard bans DESIGN.md)
// Target ≥ 44 pt iOS / ≥ 48 dp Android; jarak antar target ≥ 8 pt.
// FAB 56 (aksi utama, kanan-bawah, zona jempol).
// ============================================================================
export const touch = {
  minHeightIOS: 44,
  minHeightAndroid: 48,
  minGap: 8,
  fabSize: 56,
} as const;

// ============================================================================
// Theme kampuran — satu objek yang dibaca layar via useTheme()
// ============================================================================
export interface Theme {
  scheme: ColorScheme;
  isDark: boolean;
  colors: ColorTokens;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: Typography;
  motion: typeof motion;
  touch: typeof touch;
}
