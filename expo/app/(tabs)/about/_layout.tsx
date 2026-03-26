import { Stack } from "expo-router";
import React from "react";
import Colors from "@/constants/colors";

export default function AboutLayout() {
  console.log("[AboutLayout] Rendering about stack");
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
