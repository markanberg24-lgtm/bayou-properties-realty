import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Platform,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  MessageCircle,
  Globe,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';

interface ContactAction {
  id: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  value: string;
  action: () => void;
}

function ContactButton({ item, index }: { item: ContactAction; index: number }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index]);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.96,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    console.log('[ContactScreen] Contact action pressed:', item.id);
    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    item.action();
  };

  const Icon = item.icon;

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      testID={`contact-${item.id}`}
    >
      <Animated.View
        style={[
          styles.contactCard,
          {
            transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={styles.contactIconWrap}>
          <Icon size={22} color={Colors.gold} />
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>{item.label}</Text>
          <Text style={styles.contactValue}>{item.value}</Text>
        </View>
        <ExternalLink size={16} color={Colors.textMuted} />
      </Animated.View>
    </Pressable>
  );
}

export default function ContactScreen() {
  const insets = useSafeAreaInsets();
  const heroFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('[ContactScreen] Starting entrance animation');
    Animated.timing(heroFade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [heroFade]);

  const contactActions: ContactAction[] = [
    {
      id: 'phone',
      icon: Phone,
      label: 'Call Us',
      value: '(587) 412-5981',
      action: () => void Linking.openURL('tel:5874125981'),
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email Us',
      value: 'John.Braun@Bayoupropertiesrealty.com',
      action: () => void Linking.openURL('mailto:John.Braun@Bayoupropertiesrealty.com'),
    },
    {
      id: 'directions',
      icon: MapPin,
      label: 'Visit Our Office',
      value: '1100 Hercules Suite 150\nHouston, TX 77058',
      action: () =>
        void Linking.openURL(
          Platform.OS === 'web'
            ? 'https://maps.google.com/?q=1100+Hercules+Suite+150+Houston+TX+77058'
            : 'maps:0,0?q=1100+Hercules+Suite+150+Houston+TX+77058'
        ),
    },
    {
      id: 'website',
      icon: Globe,
      label: 'Visit Website',
      value: 'bprhouston.com',
      action: () => void Linking.openURL('https://www.bprhouston.com'),
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
          <Text style={styles.sectionLabel}>GET IN TOUCH</Text>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>
            Ready to find your dream property? We're here to help every step of the way.
          </Text>
        </View>

        <Animated.View style={[styles.heroCard, { opacity: heroFade }]}>
          <LinearGradient
            colors={[Colors.navySurface, Colors.navyMedium]}
            style={styles.heroGradient}
          >
            <View style={styles.heroIconWrap}>
              <MessageCircle size={32} color={Colors.gold} />
            </View>
            <Text style={styles.heroTitle}>Let's Talk Real Estate</Text>
            <Text style={styles.heroDesc}>
              Whether you're buying, selling, or investing, John Braun and the Bayou Properties 
              team are ready to provide expert guidance tailored to your needs.
            </Text>
            <Pressable
              style={({ pressed }) => [styles.heroCTA, pressed && { opacity: 0.85 }]}
              onPress={() => void Linking.openURL('tel:5874125981')}
              testID="call-now-btn"
            >
              <Phone size={16} color={Colors.navy} />
              <Text style={styles.heroCTAText}>Call Now</Text>
            </Pressable>
          </LinearGradient>
        </Animated.View>

        <View style={styles.section}>
          {contactActions.map((item, index) => (
            <ContactButton key={item.id} item={item} index={index} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>OFFICE HOURS</Text>
          <Text style={styles.sectionTitle}>When to Visit</Text>
          <View style={styles.hoursCard}>
            <Clock size={20} color={Colors.gold} />
            <View style={styles.hoursInfo}>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}>Monday – Friday</Text>
                <Text style={styles.hoursTime}>9:00 AM – 6:00 PM</Text>
              </View>
              <View style={styles.hoursDivider} />
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}>Saturday</Text>
                <Text style={styles.hoursTime}>10:00 AM – 4:00 PM</Text>
              </View>
              <View style={styles.hoursDivider} />
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}>Sunday</Text>
                <Text style={styles.hoursTime}>By Appointment</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>READY TO START?</Text>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaCardTitle}>Schedule a Free Consultation</Text>
            <Text style={styles.ctaCardDesc}>
              Let us know what you're looking for and we'll put together a personalized plan.
            </Text>
            <Pressable
              style={({ pressed }) => [styles.ctaCardButton, pressed && { opacity: 0.85 }]}
              onPress={() => void Linking.openURL('mailto:John.Braun@Bayoupropertiesrealty.com?subject=Free%20Consultation%20Request')}
              testID="consultation-btn"
            >
              <Mail size={16} color={Colors.navy} />
              <Text style={styles.ctaCardButtonText}>Email for Consultation</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navy,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionLabel: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 2,
    marginBottom: 6,
  },
  title: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '700' as const,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
    lineHeight: 21,
  },
  heroCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 18,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  heroGradient: {
    padding: 26,
    alignItems: 'center' as const,
  },
  heroIconWrap: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: Colors.goldMuted,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 16,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700' as const,
    marginBottom: 10,
    textAlign: 'center' as const,
  },
  heroDesc: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center' as const,
    marginBottom: 20,
  },
  heroCTA: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.gold,
    paddingHorizontal: 26,
    paddingVertical: 13,
    borderRadius: 12,
    gap: 8,
  },
  heroCTAText: {
    color: Colors.navy,
    fontSize: 15,
    fontWeight: '700' as const,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700' as const,
    marginBottom: 14,
  },
  contactCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.divider,
    gap: 14,
  },
  contactIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.goldMuted,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500' as const,
    marginBottom: 3,
  },
  contactValue: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  hoursCard: {
    flexDirection: 'row' as const,
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.divider,
    gap: 14,
  },
  hoursInfo: {
    flex: 1,
  },
  hoursRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    paddingVertical: 7,
  },
  hoursDay: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500' as const,
  },
  hoursTime: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  hoursDivider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 4,
  },
  ctaCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: Colors.divider,
    alignItems: 'center' as const,
  },
  ctaCardTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700' as const,
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  ctaCardDesc: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center' as const,
    marginBottom: 18,
  },
  ctaCardButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.gold,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  ctaCardButtonText: {
    color: Colors.navy,
    fontSize: 14,
    fontWeight: '700' as const,
  },
});
