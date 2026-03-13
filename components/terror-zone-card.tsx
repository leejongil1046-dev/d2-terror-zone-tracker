import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

function formatUnixTime(unixSeconds: number) {
  return new Date(unixSeconds * 1000).toLocaleString();
}

type TerrorZone = {
  time: number;
  zone_name: string[];
  immunities: string[];
  "tier-exp": string;
  "tier-loot": string;
  area_id: number;
  area_ids: number[];
  end_time: number;
};

type TerrorZoneCardProps = {
  label: string;
  zone: TerrorZone;
};

export function TerrorZoneCard({ label, zone }: TerrorZoneCardProps) {
  return (
    <ThemedView style={styles.card}>
      <ThemedText type="subtitle" style={styles.cardLabel}>
        {label}
      </ThemedText>
      <ThemedText type="title" style={styles.zoneName}>
        {zone.zone_name.join(" · ")}
      </ThemedText>

      <View style={styles.row}>
        <ThemedText type="defaultSemiBold">경험치</ThemedText>
        <ThemedText>{zone["tier-exp"]}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText type="defaultSemiBold">드랍</ThemedText>
        <ThemedText>{zone["tier-loot"]}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText type="defaultSemiBold">면역</ThemedText>
        <ThemedText numberOfLines={1} ellipsizeMode="tail">
          {zone.immunities.join(", ")}
        </ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText type="defaultSemiBold">시간</ThemedText>
        <ThemedText>
          {formatUnixTime(zone.time)} ~ {formatUnixTime(zone.end_time)}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    opacity: 0.7,
  },
  card: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "rgba(255,255,255,1)",
    gap: 8,
  },
  cardLabel: {
    opacity: 0.8,
    marginBottom: 4,
  },
  zoneName: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
});
