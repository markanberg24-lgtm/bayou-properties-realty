import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ChevronRight,
  Home,
  Building2,
  Key,
  Settings,
  Phone,
  MapPin,
  Star,
  TrendingUp,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { featuredProperties } from '@/mocks/properties';
import { services } from '@/mocks/services';
import PropertyCard from '@/components/PropertyCard';

const _width = Dimensions.get('window').width;

const SERVICE_ICONS: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  Home,
  Building2,
  Key,
  Settings,
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('[HomeScreen] Starting entrance animations');
    Animated.stagger(200, [
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(statsAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, taglineAnim, statsAnim]);

  const handleCall = () => {
    console.log('[HomeScreen] Call button pressed');
    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    void Linking.openURL('tel:5874125981');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80' }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(10, 22, 40, 0.55)', 'rgba(10, 22, 40, 0.95)']}
            style={styles.heroGradient}
          />
          <View style={[styles.heroContent, { paddingTop: insets.top + 20 }]}>
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              <View style={styles.logoRow}>
                <View style={styles.logoBadge}>
                  <Text style={styles.logoText}>BP</Text>
                </View>
                <View>
                  <Text style={styles.heroTitle}>Bayou Properties</Text>
                  <Text style={styles.heroSubtitle}>REALTY, LLC</Text>
                </View>
              </View>
            </Animated.View>
            <Animated.View style={{ opacity: taglineAnim }}>
              <Text style={styles.tagline}>Houston's Choice in Real Estate</Text>
              <Text style={styles.taglineDesc}>
                Over 21 years of excellence serving Houston and the greater Gulf Coast area
              </Text>
            </Animated.View>
            <Animated.View
              style={[styles.heroCTA, { opacity: taglineAnim }]}
            >
              <Pressable
                style={({ pressed }) => [styles.ctaButton, pressed && styles.ctaButtonPressed]}
                onPress={() => router.push('/properties')}
                testID="browse-properties-btn"
              >
                <Text style={styles.ctaText}>Browse Properties</Text>
                <ChevronRight size={18} color={Colors.navy} />
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.ctaSecondary, pressed && styles.ctaSecondaryPressed]}
                onPress={handleCall}
                testID="call-us-btn"
              >
                <Phone size={16} color={Colors.gold} />
                <Text style={styles.ctaSecondaryText}>Call Us</Text>
              </Pressable>
            </Animated.View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionLabel}>WHAT WE DO</Text>
              <Text style={styles.sectionTitle}>Our Services</Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesRow}
          >
            {services.map((service) => {
              const Icon = SERVICE_ICONS[service.icon] ?? Home;
              return (
                <View key={service.id} style={styles.serviceCard}>
                  <View style={styles.serviceIconWrap}>
                    <Icon size={24} color={Colors.gold} />
                  </View>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDesc} numberOfLines={2}>
                    {service.description}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionLabel}>FEATURED</Text>
              <Text style={styles.sectionTitle}>Top Properties</Text>
            </View>
            <Pressable
              style={styles.seeAllButton}
              onPress={() => router.push('/properties')}
              testID="see-all-btn"
            >
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={16} color={Colors.gold} />
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredRow}
          >
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} compact />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Animated.View style={[styles.trustBanner, { opacity: statsAnim }]}>
            <LinearGradient
              colors={[Colors.navySurface, Colors.navyMedium]}
              style={styles.trustGradient}
            >
              <View style={styles.trustRow}>
                <View style={styles.trustItem}>
                  <Star size={20} color={Colors.gold} fill={Colors.gold} />
                  <Text style={styles.trustNumber}>21+</Text>
                  <Text style={styles.trustLabel}>Years Experience</Text>
                </View>
                <View style={styles.trustDivider} />
                <View style={styles.trustItem}>
                  <TrendingUp size={20} color={Colors.gold} />
                  <Text style={styles.trustNumber}>500+</Text>
                  <Text style={styles.trustLabel}>Properties Sold</Text>
                </View>
                <View style={styles.trustDivider} />
                <View style={styles.trustItem}>
                  <MapPin size={20} color={Colors.gold} />
                  <Text style={styles.trustNumber}>6+</Text>
                  <Text style={styles.trustLabel}>Cities Served</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        </View>

        <View style={styles.section}>
          <View style={styles.agentCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' }}
              style={styles.agentImage}
              contentFit="cover"
            />
            <View style={styles.agentInfo}>
              <Text style={styles.agentName}>John Braun</Text>
              <Text style={styles.agentTitle}>Broker / Owner</Text>
              <View style={styles.agentBadge}>
                <Star size={12} color={Colors.gold} fill={Colors.gold} />
                <Text style={styles.agentBadgeText}>HAR Rising Star</Text>
              </View>
              <Pressable
                style={({ pressed }) => [styles.agentButton, pressed && { opacity: 0.7 }]}
                onPress={() => router.push('/about')}
                testID="learn-more-btn"
              >
                <Text style={styles.agentButtonText}>Learn More</Text>
              </Pressable>
            </View>
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
  hero: {
    height: 490,
    position: 'relative' as const,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end' as const,
    paddingHorizontal: 24,
    paddingBottom: 34,
  },
  logoRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 14,
    marginBottom: 22,
  },
  logoBadge: {
    width: 54,
    height: 54,
    borderRadius: 15,
    backgroundColor: Colors.gold,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    color: Colors.navy,
    fontSize: 22,
    fontWeight: '800' as const,
    letterSpacing: 1,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 4,
    marginTop: 3,
  },
  tagline: {
    color: Colors.offWhite,
    fontSize: 21,
    fontWeight: '600' as const,
    marginBottom: 8,
    lineHeight: 28,
  },
  taglineDesc: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 22,
  },
  heroCTA: {
    flexDirection: 'row' as const,
    gap: 12,
  },
  ctaButton: {
    backgroundColor: Colors.gold,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 6,
  },
  ctaButtonPressed: {
    opacity: 0.85,
  },
  ctaText: {
    color: Colors.navy,
    fontSize: 15,
    fontWeight: '700' as const,
  },
  ctaSecondary: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    gap: 8,
  },
  ctaSecondaryPressed: {
    opacity: 0.7,
  },
  ctaSecondaryText: {
    color: Colors.gold,
    fontSize: 15,
    fontWeight: '600' as const,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-end' as const,
    marginBottom: 16,
  },
  sectionLabel: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 2,
    marginBottom: 4,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700' as const,
  },
  seeAllButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
  },
  seeAllText: {
    color: Colors.gold,
    fontSize: 14,
    fontWeight: '600' as const,
  },
  servicesRow: {
    paddingRight: 20,
    gap: 12,
  },
  serviceCard: {
    width: 164,
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  serviceIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: Colors.goldMuted,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 12,
  },
  serviceTitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 6,
  },
  serviceDesc: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  featuredRow: {
    paddingRight: 20,
  },
  trustBanner: {
    borderRadius: 16,
    overflow: 'hidden' as const,
  },
  trustGradient: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  trustRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    alignItems: 'center' as const,
  },
  trustItem: {
    alignItems: 'center' as const,
    flex: 1,
  },
  trustNumber: {
    color: Colors.gold,
    fontSize: 28,
    fontWeight: '800' as const,
    marginTop: 8,
  },
  trustLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '500' as const,
    marginTop: 4,
    textAlign: 'center' as const,
  },
  trustDivider: {
    width: 1,
    height: 50,
    backgroundColor: Colors.divider,
  },
  agentCard: {
    flexDirection: 'row' as const,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  agentImage: {
    width: 120,
    height: 165,
  },
  agentInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center' as const,
  },
  agentName: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700' as const,
  },
  agentTitle: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 3,
    marginBottom: 10,
  },
  agentBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    backgroundColor: Colors.goldMuted,
    alignSelf: 'flex-start' as const,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 12,
  },
  agentBadgeText: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '600' as const,
  },
  agentButton: {
    backgroundColor: Colors.navySurface,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    alignSelf: 'flex-start' as const,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  agentButtonText: {
    color: Colors.gold,
    fontSize: 13,
    fontWeight: '600' as const,
  },
});
