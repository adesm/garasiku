import { radius, spacing } from "@/theme/tokens";
import { useTheme } from "@/theme/useTheme";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

const Chip = ({
  label,
  type = "warning",
  noDot = false,
}: {
  label: string;
  type?: "caution" | "warning" | "danger";
  noDot?: boolean;
}) => {
  const theme = useTheme();
  const typeMap: Record<string, any> = {
    caution: {
      bg: theme.colors.cautionSoft,
      dot: theme.colors.caution,
    },
    warning: {
      bg: theme.colors.warningSoft,
      dot: theme.colors.warning,
    },
    danger: {
      bg: theme.colors.dangerSoft,
      dot: theme.colors.danger,
    },
  };
  const themeStyles = useMemo(
    () =>
      StyleSheet.create({
        textBody: {
          ...theme.typography.body,
          color: theme.colors.text,
          fontSize: 13,
        },
      }),
    [theme],
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: typeMap[type].bg,
        },
      ]}
    >
      {!noDot && (
        <View style={[styles.dot, { backgroundColor: typeMap[type].dot }]} />
      )}
      <Text style={themeStyles.textBody}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing.sm,
    alignItems: "center",
    borderRadius: radius.chip,
    gap: spacing.sm,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
});

export default Chip;
