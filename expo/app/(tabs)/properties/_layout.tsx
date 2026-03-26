import { Stack } from "expo-router";
import React from "react";
import Colors from "@/constants/colors";

export default function PropertiesLayout() {
  console.log("[PropertiesLayout] Rendering properties stack");
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.navy },
        animation: "slide_from_right",
      }}
    />
  );
}
