import { BorderWidth } from "@/constants/border";
import { areas } from "@/data/area";
import type { TerrorZone } from "@/types/terror-zone";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

const IMMUNITY_COLORS: Record<string, string> = {
  f: "#ef4444", // 빨강
  c: "#3b82f6", // 파랑
  l: "#facc15", // 노랑
  p: "#22c55e", // 초록
  ph: "#9ca3af", // 회색
  m: "#f97316", // 주황
};

function formatUnixTime(unixSeconds: number) {
  return new Date(unixSeconds * 1000).toLocaleString();
}

type TerrorZoneCardProps = {
  label: string;
  zone: TerrorZone;
  isCurrent?: boolean;
};

export function TerrorZoneCard({
  label,
  zone,
  isCurrent,
}: TerrorZoneCardProps) {
  const zoneKey = zone.zone_name[0]; // 예: "Blood_Moor"
  const koName = (areas as any)[zoneKey]?.ko ?? zoneKey.replaceAll("_", " ");

  return (
    <ThemedView style={[styles.card, { borderWidth: BorderWidth.thin }]}>
      <ThemedText type="subtitle" style={styles.cardLabel}>
        {label}
      </ThemedText>

      <ThemedText type="title" style={styles.zoneName}>
        {koName}
      </ThemedText>

      {isCurrent && <ThemedText style={styles.remainingTime}>30:00</ThemedText>}

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
        <View style={styles.immunityRow}>
          {zone.immunities.map((code) => (
            <View
              key={code}
              style={[
                styles.immunityDot,
                { backgroundColor: IMMUNITY_COLORS[code] ?? "#6b7280" },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.row}>
        <ThemedText type="defaultSemiBold">시간</ThemedText>
        <View>
          <ThemedText>{formatUnixTime(zone.time)}</ThemedText>
          <ThemedText>{formatUnixTime(zone.end_time)}</ThemedText>
        </View>
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
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  cardLabel: {
    opacity: 0.8,
    marginBottom: 4,
  },
  zoneName: {
    marginBottom: 8,
  },
  remainingTime: {
    marginBottom: 8,
    fontSize: 80,
    lineHeight: 80,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  immunityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  immunityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
  },
});
