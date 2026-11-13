import { useMemo } from "react";
import { useColorScheme } from "react-native";
import {
  colors,
  ColorScheme,
  motion,
  radius,
  spacing,
  touch,
  typography,
  type Theme,
} from "./tokens";

export const useTheme = (): Theme => {
  const scheme = (useColorScheme() ?? "dark") as ColorScheme;

  return useMemo(
    () => ({
      scheme,
      isDark: scheme === "dark",
      colors: colors[scheme],
      spacing,
      radius,
      typography,
      motion,
      touch,
    }),
    [scheme],
  );
};
