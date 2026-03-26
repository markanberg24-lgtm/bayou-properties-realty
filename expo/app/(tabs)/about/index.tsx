import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Award,
  Star,
  MapPin,
  Calendar,
  Shield,
  Home,
  Building2,
  Key,
  Settings,
  Users,
  Mail,
  User,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { services } from '@/mocks/services';

const SERVICE_ICONS: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  Home,
  Building2,
  Key,
  Settings,
};

const AREAS_SERVED = [
  'Houston',
  'Beaumont',
  'San Leon',
  'Port Arthur',
  'Galveston',
  'Hitchcock',
  'Webster',
  'Bayou Vista',
];

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    console.log('[AboutScreen] Starting entrance animations');
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.header}>
            <Text style={styles.sectionLabel}>ABOUT US</Text>
            <Text style={styles.title}>Bayou Properties Realty</Text>
            <Text style={styles.headerSubtitle}>Family-owned. Houston-rooted. Results-driven.</Text>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.profileCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80' }}
                style={styles.profileImage}
                contentFit="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(10, 22, 40, 0.85)']}
                style={styles.profileGradient}
              />
              <View style={styles.profileOverlay}>
                <Text style={styles.profileName}>John Braun</Text>
                <Text style={styles.profileTitle}>Broker / Owner</Text>
                <View style={styles.profileBadgeRow}>
                  <View style={styles.profileBadge}>
                    <Star size={10} color={Colors.gold} fill={Colors.gold} />
                    <Text style={styles.profileBadgeText}>Five Star Professional</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.bioText}>
              Bayou Properties is a family-owned and operated real estate agency serving Houston and 
              surrounding areas for over two decades. Broker John Braun brings unmatched 
              expertise and dedication to every transaction — from first-time homebuyers to seasoned investors.
            </Text>
            <Text style={[styles.bioText, { marginTop: 14 }]}>
              We specialize in residential and commercial buying, selling, and property management, 
              delivering personalized service and expert guidance to help you achieve your real estate goals.
              Our portfolio spans from the Houston Heights to Galveston Island.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>CREDENTIALS</Text>
            <Text style={styles.sectionTitle}>Awards & Recognition</Text>
            <View style={styles.awardsGrid}>
              <View style={styles.awardCard}>
                <View style={styles.awardIconWrap}>
                  <Award size={22} color={Colors.gold} />
                </View>
                <Text style={styles.awardTitle}>HAR's 20 Rising Stars Under 40</Text>
                <Text style={styles.awardDesc}>Houston Association of Realtors</Text>
              </View>
              <View style={styles.awardCard}>
                <View style={styles.awardIconWrap}>
                  <Star size={22} color={Colors.gold} fill={Colors.gold} />
                </View>
                <Text style={styles.awardTitle}>Five Star Real Estate Professional</Text>
                <Text style={styles.awardDesc}>Texas Monthly Magazine</Text>
              </View>
              <View style={styles.awardCard}>
                <View style={styles.awardIconWrap}>
                  <Shield size={22} color={Colors.gold} />
                </View>
                <Text style={styles.awardTitle}>HAR Board Member</Text>
                <Text style={styles.awardDesc}>Houston Association of Realtors</Text>
              </View>
              <View style={styles.awardCard}>
                <View style={styles.awardIconWrap}>
                  <Calendar size={22} color={Colors.gold} />
                </View>
                <Text style={styles.awardTitle}>21+ Years of Experience</Text>
                <Text style={styles.awardDesc}>Serving Houston Since 2005</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>WHAT WE DO</Text>
            <Text style={styles.sectionTitle}>Our Services</Text>
            {services.map((service) => {
              const Icon = SERVICE_ICONS[service.icon] ?? Home;
              return (
                <View key={service.id} style={styles.serviceRow}>
                  <View style={styles.serviceIconWrap}>
                    <Icon size={20} color={Colors.gold} />
                  </View>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <Text style={styles.serviceDesc}>{service.description}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>COVERAGE</Text>
            <Text style={styles.sectionTitle}>Areas Served</Text>
            <View style={styles.areasGrid}>
              {AREAS_SERVED.map((area) => (
                <View key={area} style={styles.areaChip}>
                  <MapPin size={12} color={Colors.gold} />
                  <Text style={styles.areaText}>{area}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>OUR TEAM</Text>
            <Text style={styles.sectionTitle}>Meet the Brokers</Text>
            {[
              { name: 'Bob Mattson', email: 'Bob.Mattson@Bayoupropertiesrealty.com' },
              { name: 'Steven Shannon', email: 'Steven.Shannon@Bayoupropertiesrealty.com' },
              { name: 'Nick Anderson', email: 'Nick.Anderson@Bayoupropertiesrealty.com' },
              { name: 'Edward Desanto', email: 'Edward.Desanto@Bayoupropertiesrealty.com' },
            ].map((member) => (
              <View key={member.name} style={styles.teamCard}>
                <View style={styles.teamAvatarWrap}>
                  <User size={24} color={Colors.gold} />
                </View>
                <View style={styles.teamInfo}>
                  <Text style={styles.teamName}>{member.name}</Text>
                  <Text style={styles.teamRole}>Broker</Text>
                  <View style={styles.teamEmailRow}>
                    <Mail size={12} color={Colors.textMuted} />
                    <Text style={styles.teamEmail}>{member.email}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.missionCard}>
              <LinearGradient
                colors={[Colors.navySurface, Colors.navyMedium]}
                style={styles.missionGradient}
              >
                <Users size={28} color={Colors.gold} />
                <Text style={styles.missionTitle}>Our Mission</Text>
                <Text style={styles.missionText}>
                  To provide exceptional, personalized real estate services that exceed expectations. 
                  We are committed to building lasting relationships based on trust, integrity, and results.
                </Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>
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
  title: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: '700' as const,
  },
  headerSubtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 6,
    fontStyle: 'italic' as const,
  },
  sectionLabel: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 2,
    marginBottom: 6,
  },
  profileSection: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  profileCard: {
    height: 290,
    borderRadius: 18,
    overflow: 'hidden' as const,
    position: 'relative' as const,
  },
  profileImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  profileGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  profileOverlay: {
    position: 'absolute' as const,
    bottom: 20,
    left: 20,
  },
  profileName: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: '700' as const,
  },
  profileTitle: {
    color: Colors.gold,
    fontSize: 15,
    fontWeight: '500' as const,
    marginTop: 4,
  },
  profileBadgeRow: {
    flexDirection: 'row' as const,
    marginTop: 8,
  },
  profileBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 5,
    backgroundColor: 'rgba(201, 168, 76, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  profileBadgeText: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '600' as const,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700' as const,
    marginBottom: 16,
  },
  bioText: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  awardsGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 12,
  },
  awardCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.divider,
    flexGrow: 1,
    flexBasis: '45%' as unknown as number,
  },
  awardIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: Colors.goldMuted,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 10,
  },
  awardTitle: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  awardDesc: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  serviceRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.divider,
    gap: 14,
  },
  serviceIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.goldMuted,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600' as const,
  },
  serviceDesc: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 3,
    lineHeight: 18,
  },
  areasGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 10,
  },
  areaChip: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    backgroundColor: Colors.navyLight,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  areaText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '500' as const,
  },
  missionCard: {
    borderRadius: 18,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  missionGradient: {
    padding: 24,
    alignItems: 'center' as const,
  },
  missionTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700' as const,
    marginTop: 12,
    marginBottom: 10,
  },
  missionText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center' as const,
  },
  teamCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.divider,
    gap: 14,
  },
  teamAvatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.goldMuted,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1.5,
    borderColor: Colors.gold,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  teamRole: {
    color: Colors.gold,
    fontSize: 13,
    fontWeight: '500' as const,
    marginTop: 2,
  },
  teamEmailRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    marginTop: 6,
  },
  teamEmail: {
    color: Colors.textMuted,
    fontSize: 12,
  },
});
