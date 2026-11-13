import { radius, spacing } from "@/theme/tokens";
import { useTheme } from "@/theme/useTheme";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Card({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { borderColor: colors.outline, backgroundColor: colors.surface },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
  },
});
