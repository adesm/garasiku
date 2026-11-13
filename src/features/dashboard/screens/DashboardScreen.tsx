import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import Spacer from "@/components/ui/Spacer";
import VehicleItem from "@/features/vehicle/components/VehicleItem";
import { vehicles } from "@/features/vehicle/data";
import { spacing } from "@/theme/tokens";
import { useTheme } from "@/theme/useTheme";
import { BottomSheet, Column } from "@expo/ui";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ActivityItem from "../components/ActivityItem";
import { activities } from "../data";

const DashboardScreen = () => {
  const theme = useTheme();
  const inset = useSafeAreaInsets();
  const themeStyles = useMemo(
    () =>
      StyleSheet.create({
        textDisplay: {
          ...theme.typography.display,
          color: theme.colors.text,
        },
        textCaption: {
          ...theme.typography.caption,
          color: theme.colors.textSecondary,
        },
        textTitle: {
          ...theme.typography.title,
          color: theme.colors.text,
        },
        textBody: {
          ...theme.typography.body,
          color: theme.colors.text,
        },
      }),
    [theme],
  );
  const [isPresented, setIsPresented] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={themeStyles.textCaption}>Rabu, 11 Nov</Text>
            <Text style={themeStyles.textDisplay}>Garasimu</Text>
          </View>
          <Spacer />
          <Card>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Chip noDot label="Servis berkala" />
              <Chip label="7 hari lagi" />
            </View>
            <Spacer size="xs" />
            <Text style={themeStyles.textCaption}>B 9876 KL - Honda Beat</Text>
            <Spacer size="sm" />
            <View
              style={{
                flexDirection: "row",
                gap: theme.spacing.sm,
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  themeStyles.textDisplay,
                  { color: theme.colors.accent },
                ]}
              >
                7
              </Text>
              <Text style={themeStyles.textBody}>hari lagi</Text>
            </View>
            <Spacer size="sm" />
            <ProgressBar progress={0.7} />
            <Spacer size="sm" />
            <Text style={themeStyles.textCaption}>
              Jatuh tempo 18 Nov - servis terakhr 8 Mei
            </Text>
          </Card>

          <Text
            style={[
              themeStyles.textTitle,
              { marginVertical: theme.spacing.md },
            ]}
          >
            Agenda lainnya
          </Text>

          {activities.map((activity) => (
            <View key={activity.id}>
              <ActivityItem activity={activity} />
              <Spacer size="sm" />
            </View>
          ))}

          <Text
            style={[
              themeStyles.textTitle,
              { marginVertical: theme.spacing.md },
            ]}
          >
            Kendaraanmu
          </Text>

          {vehicles.map((vehicle) => (
            <View key={vehicle.id}>
              <VehicleItem key={vehicle.id} vehicle={vehicle} />
              <Spacer size="sm" />
            </View>
          ))}
        </View>
      </ScrollView>

      <Pressable
        style={{
          position: "absolute",
          right: theme.spacing.lg,
          bottom: inset.bottom + theme.spacing.lg,
          backgroundColor: theme.colors.accent,
          borderRadius: "50%",
          height: 56,
          width: 56,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => setIsPresented(true)}
      >
        <Text>+</Text>
      </Pressable>

      <BottomSheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
      >
        <Column spacing={12}>
          <Text>asd</Text>
          {/* <Button label="Close" onPress={() => setIsPresented(false)} /> */}
        </Column>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
});

export default DashboardScreen;
