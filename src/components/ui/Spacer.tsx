import { spacing } from "@/theme/tokens";
import { View } from "react-native";

export default function Spacer({
  size = "md",
}: {
  size?: "xs" | "sm" | "md" | "lg";
}) {
  return (
    <View
      style={{
        marginVertical: spacing[size],
      }}
    ></View>
  );
}
