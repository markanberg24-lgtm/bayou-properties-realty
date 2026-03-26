import { Stack } from "expo-router";
import React from "react";
import Colors from "@/constants/colors";

export default function FavoritesLayout() {
  console.log("[FavoritesLayout] Rendering favorites stack");
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
