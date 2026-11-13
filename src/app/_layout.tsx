import { fontFiles } from "@/fonts";
import { useTheme } from "@/theme/useTheme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Sembunyikan splash screen hanya setelah font Barlow siap dimuat,
// agar tidak ada flash teks sebelum font kustom diterapkan.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts(fontFiles);
  const { colors } = useTheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
      }}
    />
  );
}
