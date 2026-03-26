import { Stack } from "expo-router";
import React from "react";
import Colors from "@/constants/colors";

export default function HomeLayout() {
  console.log("[HomeLayout] Rendering home stack");
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.navy },
        animation: "fade",
      }}
    />
  );
}
