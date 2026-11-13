import { useMemo } from "react";
import {
  StyleSheet,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import type { Theme } from "./tokens";
import { useTheme } from "./useTheme";

type Style = ViewStyle | TextStyle | ImageStyle;
type Styles = Record<string, Style>;

export function makeStyles<T extends Styles>(factory: (theme: Theme) => T) {
  return function useStyles() {
    const theme = useTheme();
    return useMemo(() => StyleSheet.create(factory(theme)), [theme]);
  };
}
