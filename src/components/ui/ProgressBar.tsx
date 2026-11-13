import { useTheme } from "@/theme/useTheme";
import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
  progress: number; // Value between 0 and 1
  height?: number;
}

export const ProgressBar = ({ progress, height = 6 }: ProgressBarProps) => {
  // Clamp progress between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.track,
        {
          backgroundColor: colors.surfaceMuted,
          height,
          borderRadius: height / 2,
        },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: colors.accent,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
