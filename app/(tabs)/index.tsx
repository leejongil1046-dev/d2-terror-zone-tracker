import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

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

// TODO: 실제 기기에서 테스트할 때는 localhost 대신 맥의 로컬 IP로 변경하세요.
const BFF_BASE_URL = "http://192.168.0.11:3000";

function formatUnixTime(unixSeconds: number) {
  return new Date(unixSeconds * 1000).toLocaleString();
}

export default function HomeScreen() {
  const [zones, setZones] = useState<TerrorZone[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        setError(null);
        const res = await fetch(`${BFF_BASE_URL}/api/tz/mock`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = (await res.json()) as TerrorZone[];
        console.log(json);
        setZones(json);
      } catch (e) {
        console.error(e);
        setError("공포의 영역 정보를 불러오지 못했습니다.");
      }
    };

    fetchZones();
  }, []);

  const current = zones?.[0];
  const next = zones?.[1];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#0f172a", dark: "#020617" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.screenContainer}>
        <ThemedText type="title">공포의 영역 트래커</ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          Diablo II: Resurrected Terror Zone
        </ThemedText>

        {error && (
          <ThemedText type="default" style={styles.errorText}>
            {error}
          </ThemedText>
        )}

        {!zones && !error && (
          <ThemedText type="default">
            공포의 영역 정보를 불러오는 중...
          </ThemedText>
        )}

        {current && (
          <ThemedView style={styles.card}>
            <ThemedText type="subtitle" style={styles.cardLabel}>
              현재 공포의 영역
            </ThemedText>
            <ThemedText type="title" style={styles.zoneName}>
              {current.zone_name.join(" · ")}
            </ThemedText>

            <View style={styles.row}>
              <ThemedText type="defaultSemiBold">경험치</ThemedText>
              <ThemedText>{current["tier-exp"]}</ThemedText>
            </View>
            <View style={styles.row}>
              <ThemedText type="defaultSemiBold">드랍</ThemedText>
              <ThemedText>{current["tier-loot"]}</ThemedText>
            </View>
            <View style={styles.row}>
              <ThemedText type="defaultSemiBold">면역</ThemedText>
              <ThemedText numberOfLines={1} ellipsizeMode="tail">
                {current.immunities.join(", ")}
              </ThemedText>
            </View>
            <View style={styles.row}>
              <ThemedText type="defaultSemiBold">시간</ThemedText>
              <ThemedText>
                {formatUnixTime(current.time)} ~{" "}
                {formatUnixTime(current.end_time)}
              </ThemedText>
            </View>
          </ThemedView>
        )}

        {next && (
          <ThemedView style={styles.cardSecondary}>
            <ThemedText type="subtitle" style={styles.cardLabel}>
              다음 공포의 영역 (예시)
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.zoneNameSecondary}>
              {next.zone_name.join(" · ")}
            </ThemedText>
            <View style={styles.row}>
              <ThemedText type="defaultSemiBold">경험치 / 드랍</ThemedText>
              <ThemedText>
                {next["tier-exp"]} / {next["tier-loot"]}
              </ThemedText>
            </View>
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    gap: 16,
    paddingBottom: 24,
  },
  subtitle: {
    opacity: 0.7,
  },
  errorText: {
    color: "#f97373",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "rgba(15,23,42,0.9)",
    gap: 8,
  },
  cardSecondary: {
    borderRadius: 16,
    padding: 14,
    backgroundColor: "rgba(15,23,42,0.5)",
    gap: 6,
  },
  cardLabel: {
    opacity: 0.8,
    marginBottom: 4,
  },
  zoneName: {
    marginBottom: 8,
  },
  zoneNameSecondary: {
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
