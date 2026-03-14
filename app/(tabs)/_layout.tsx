import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "공포의 영역",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="battle-net" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="alarm"
        options={{
          title: "알람",
          tabBarIcon: ({ color }) => (
            <Ionicons name="timer-outline" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
