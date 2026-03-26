import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Home } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function NotFoundScreen() {
  console.log("[NotFoundScreen] Page not found rendered");
  return (
    <>
      <Stack.Screen options={{ title: "Not Found", headerStyle: { backgroundColor: Colors.navy }, headerTintColor: Colors.gold }} />
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Home size={40} color={Colors.textMuted} />
        </View>
        <Text style={styles.title}>Page not found</Text>
        <Text style={styles.subtitle}>The page you're looking for doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to Home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: Colors.navy,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.navyLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  title: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
    textAlign: "center",
  },
  link: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  linkText: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: Colors.navy,
  },
});
