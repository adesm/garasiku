import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { spacing } from "@/theme/tokens";
import { useTheme } from "@/theme/useTheme";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Vehicle } from "../types";

const VehicleItem = ({ vehicle }: { vehicle: Vehicle }) => {
  const theme = useTheme();
  const themeStyles = useMemo(
    () =>
      StyleSheet.create({
        textBody: {
          ...theme.typography.body,
          color: theme.colors.text,
        },
        textCaption: {
          ...theme.typography.caption,
          color: theme.colors.textSecondary,
        },
      }),
    [theme],
  );
  return (
    <Card>
      <View style={styles.container}>
        <View>
          <Text style={themeStyles.textBody}>{vehicle.no}</Text>
          <Text style={themeStyles.textCaption}>{vehicle.name}</Text>
        </View>
        <View>
          <Chip type="danger" label="2 agenda" />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  icon: {
    width: 16,
    height: 16,
  },
});

export default VehicleItem;
