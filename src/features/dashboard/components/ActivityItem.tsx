import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { spacing } from "@/theme/tokens";
import { useTheme } from "@/theme/useTheme";
import { Image } from "expo-image";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Activity } from "../types";

const ActivityItem = ({ activity }: { activity: Activity }) => {
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
        <View style={styles.containerItem}>
          <Image
            source={require("@/assets/images/icons/doc.svg")}
            style={styles.icon}
            tintColor={theme.colors.textSecondary}
            contentFit="contain"
          />
          <View>
            <Text style={themeStyles.textBody}>{activity.title}</Text>
            <Text style={themeStyles.textCaption}>
              {activity.vehicle?.no} - {activity.vehicle?.name}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[themeStyles.textCaption, { textAlign: "right" }]}>
            5 Nov
          </Text>
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
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
  containerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
});

export default ActivityItem;
