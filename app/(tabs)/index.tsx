import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TerrorZoneCard } from "@/components/terror-zone-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BorderWidth } from "@/constants/border";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { TerrorZone } from "@/types/terror-zone";

// TODO: 실제 기기에서 테스트할 때는 localhost 대신 맥의 로컬 IP로 변경하세요.
const BFF_BASE_URL = "http://192.168.0.11:3000";

export default function HomeScreen() {
  const [zones, setZones] = useState<TerrorZone[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const headerBorderColor = useThemeColor({}, "border");

  useEffect(() => {
    const fetchZones = async () => {
      try {
        setError(null);
        const res = await fetch(`${BFF_BASE_URL}/api/tz/mock`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = (await res.json()) as TerrorZone[];
        setZones(json);
      } catch (e) {
        console.error(e);
        setError("공포의 영역 정보를 불러오지 못했습니다.");
      }
    };

    fetchZones();
  }, []);

  const current = zones?.[1];
  const next = zones?.[0];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ThemedView style={styles.container}>
        <View
          style={[
            styles.header,
            {
              borderBottomColor: headerBorderColor,
              borderBottomWidth: BorderWidth.thin,
            },
          ]}
        >
          <ThemedText type="title">공포의 영역 트래커</ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Diablo II: Resurrected Terror Zone
          </ThemedText>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
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
            <TerrorZoneCard label="현재 공포의 영역" zone={current} />
          )}
          {next && <TerrorZoneCard label="다음 공포의 영역" zone={next} />}
          {current && (
            <TerrorZoneCard label="현재 공포의 영역" zone={current} />
          )}
          {next && <TerrorZoneCard label="다음 공포의 영역" zone={next} />}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 16,
  },
  errorText: {
    color: "#f97373",
  },
});
