import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { X, Phone, Mail } from "lucide-react-native";
import { Linking } from "react-native";
import Colors from "@/constants/colors";

export default function ModalScreen() {
  console.log("[ModalScreen] Rendering modal");

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <View>
            <Text style={styles.title}>Bayou Properties</Text>
            <Text style={styles.subtitle}>REALTY, LLC</Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.closeIcon, pressed && { opacity: 0.7 }]}
            onPress={() => router.back()}
            hitSlop={12}
            testID="modal-close"
          >
            <X size={20} color={Colors.textSecondary} />
          </Pressable>
        </View>
        <Text style={styles.description}>
          Houston's Choice in Real Estate. Over 21 years of excellence serving the greater Houston and Gulf Coast area.
        </Text>
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.85 }]}
            onPress={() => void Linking.openURL('tel:2812866500')}
            testID="modal-call"
          >
            <Phone size={16} color={Colors.navy} />
            <Text style={styles.actionText}>Call Us</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.actionButtonOutline, pressed && { opacity: 0.7 }]}
            onPress={() => void Linking.openURL('mailto:jsbraun_1@yahoo.com')}
            testID="modal-email"
          >
            <Mail size={16} color={Colors.gold} />
            <Text style={styles.actionOutlineText}>Email</Text>
          </Pressable>
        </View>
        <Pressable
          style={({ pressed }) => [styles.closeButton, pressed && { opacity: 0.85 }]}
          onPress={() => router.back()}
          testID="modal-dismiss"
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10, 22, 40, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.navyLight,
    borderRadius: 20,
    padding: 28,
    margin: 24,
    alignItems: "center",
    minWidth: 300,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.white,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "600" as const,
    color: Colors.gold,
    letterSpacing: 3,
    marginTop: 3,
  },
  closeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.navySurface,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 24,
    color: Colors.textSecondary,
    lineHeight: 22,
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    width: "100%",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gold,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionText: {
    color: Colors.navy,
    fontWeight: "700" as const,
    fontSize: 14,
  },
  actionButtonOutline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.gold,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionOutlineText: {
    color: Colors.gold,
    fontWeight: "700" as const,
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: Colors.navySurface,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 120,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  closeButtonText: {
    color: Colors.textSecondary,
    fontWeight: "600" as const,
    textAlign: "center",
    fontSize: 14,
  },
});
