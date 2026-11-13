import { FontResource } from "expo-font";

/*============================================================================
  Font Barlow — Bengkel Malam
  ----------------------------------------------------------------------------
  File font harus ditempatkan di `assets/fonts/` (lihat README di sana).
  Muat semua di root layout dengan `useFonts` sebelum fontFamily "Barlow"
  diterapkan di layar mana pun.
============================================================================*/

export const fontFiles = {
  Barlow: require("../assets/fonts/Barlow-Regular.ttf") as FontResource,
  "Barlow-Bold": require("../assets/fonts/Barlow-Bold.ttf") as FontResource,
  "Barlow-ExtraBold": require("../assets/fonts/Barlow-ExtraBold.ttf") as FontResource,
} as const;

export type BarlowFontFamily = keyof typeof fontFiles;