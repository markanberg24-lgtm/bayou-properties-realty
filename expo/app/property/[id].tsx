import React, { useRef, useCallback, useState } from 'react';
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Heart,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Phone,
  Mail,
  Home as HomeIcon,
  Building2,
  Layers,
  Calendar,
  Ruler,
  Share2,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { properties } from '@/mocks/properties';
import { useFavorites } from '@/providers/FavoritesProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TYPE_ICONS: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  residential: HomeIcon,
  commercial: Building2,
  land: Layers,
};

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useFavorites();
  const heartScale = useRef(new Animated.Value(1)).current;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    console.log('[PropertyDetail] Rendering property:', id);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, id]);

  const property = properties.find((p) => p.id === id);

  const handleFavorite = useCallback(() => {
    if (!property) return;
    console.log('[PropertyDetail] Toggling favorite for:', property.id);
    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    toggleFavorite(property.id);
  }, [property, toggleFavorite, heartScale]);

  const handleCall = useCallback(() => {
    console.log('[PropertyDetail] Call agent pressed');
    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    void Linking.openURL('tel:5874125981');
  }, []);

  const handleEmail = useCallback(() => {
    console.log('[PropertyDetail] Email agent pressed');
    void Linking.openURL(`mailto:John.Braun@Bayoupropertiesrealty.com?subject=Inquiry about ${property?.address ?? 'property'}`);
  }, [property?.address]);

  const handleShare = useCallback(() => {
    console.log('[PropertyDetail] Share pressed');
    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const text = `Check out ${property?.address}, ${property?.city}, ${property?.state} ${property?.zip} - $${property?.price.toLocaleString()} on Bayou Properties Realty`;
    if (Platform.OS === 'web') {
      void navigator.clipboard?.writeText(text);
    }
  }, [property]);

  const handleScroll = useCallback((event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentImageIndex(index);
  }, []);

  if (!property) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.notFound}>
          <View style={styles.notFoundIcon}>
            <HomeIcon size={40} color={Colors.textMuted} />
          </View>
          <Text style={styles.notFoundText}>Property not found</Text>
          <Text style={styles.notFoundSubtext}>This listing may have been removed or is no longer available.</Text>
          <Pressable style={styles.backButtonLg} onPress={() => router.back()} testID="go-back-btn">
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const favorite = isFavorite(property.id);
  const formatPrice = (price: number) => '$' + price.toLocaleString();
  const TypeIcon = TYPE_ICONS[property.type] ?? HomeIcon;
  const statusLabel = property.status === 'pending' ? 'Under Contract' : property.status === 'sold' ? 'Sold' : 'Active';
  const statusColor = property.status === 'active' ? Colors.success : property.status === 'pending' ? Colors.gold : Colors.textMuted;

  return (
    <View style={styles.container}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.imageSection}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {property.images.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={styles.heroImage}
                  contentFit="cover"
                  transition={300}
                />
              ))}
            </ScrollView>
            <LinearGradient
              colors={['rgba(10,22,40,0.7)', 'transparent', 'transparent', 'rgba(10,22,40,0.8)']}
              style={styles.imageGradient}
              pointerEvents="none"
            />
            <View style={[styles.topBar, { top: insets.top + 8 }]}>
              <Pressable
                style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.7 }]}
                onPress={() => router.back()}
                testID="back-button"
              >
                <ArrowLeft size={22} color={Colors.white} />
              </Pressable>
              <View style={styles.topBarRight}>
                <Pressable
                  style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.7 }]}
                  onPress={handleShare}
                  testID="share-button"
                >
                  <Share2 size={20} color={Colors.white} />
                </Pressable>
                <Pressable
                  style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.7 }]}
                  onPress={handleFavorite}
                  testID="favorite-button"
                >
                  <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                    <Heart
                      size={22}
                      color={favorite ? Colors.error : Colors.white}
                      fill={favorite ? Colors.error : 'transparent'}
                    />
                  </Animated.View>
                </Pressable>
              </View>
            </View>
            {property.images.length > 1 && (
              <View style={styles.pagination}>
                {property.images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === currentImageIndex && styles.paginationDotActive,
                    ]}
                  />
                ))}
                <Text style={styles.imageCounter}>
                  {currentImageIndex + 1}/{property.images.length}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.content}>
            <View style={styles.priceRow}>
              <View>
                <Text style={styles.price}>{formatPrice(property.price)}</Text>
                {property.sqft && (
                  <Text style={styles.pricePerSqft}>
                    ${Math.round(property.price / property.sqft).toLocaleString()}/sqft
                  </Text>
                )}
              </View>
              <View style={styles.badgesCol}>
                <View style={styles.typeBadge}>
                  <TypeIcon size={12} color={Colors.gold} />
                  <Text style={styles.typeText}>
                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { borderColor: statusColor }]}>
                  <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                  <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.address}>{property.address}</Text>
            <View style={styles.locationRow}>
              <MapPin size={14} color={Colors.gold} />
              <Text style={styles.city}>
                {property.city}, {property.state} {property.zip}
              </Text>
              {property.neighborhood && (
                <>
                  <Text style={styles.neighborhoodDot}>•</Text>
                  <Text style={styles.neighborhoodText}>{property.neighborhood}</Text>
                </>
              )}
            </View>

            {(property.beds !== null || property.baths !== null || property.sqft !== null) && (
              <View style={styles.statsRow}>
                {property.beds !== null && (
                  <View style={styles.statCard}>
                    <Bed size={18} color={Colors.gold} />
                    <Text style={styles.statValue}>{property.beds}</Text>
                    <Text style={styles.statLabel}>Beds</Text>
                  </View>
                )}
                {property.baths !== null && (
                  <View style={styles.statCard}>
                    <Bath size={18} color={Colors.gold} />
                    <Text style={styles.statValue}>{property.baths}</Text>
                    <Text style={styles.statLabel}>Baths</Text>
                  </View>
                )}
                {property.sqft !== null && (
                  <View style={styles.statCard}>
                    <Maximize size={18} color={Colors.gold} />
                    <Text style={styles.statValue}>{property.sqft?.toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Sq Ft</Text>
                  </View>
                )}
              </View>
            )}

            <View style={styles.detailsRow}>
              {property.yearBuilt !== null && (
                <View style={styles.detailChip}>
                  <Calendar size={13} color={Colors.gold} />
                  <Text style={styles.detailChipText}>Built {property.yearBuilt}</Text>
                </View>
              )}
              {property.lotSqft !== null && (
                <View style={styles.detailChip}>
                  <Ruler size={13} color={Colors.gold} />
                  <Text style={styles.detailChipText}>{property.lotSqft.toLocaleString()} sqft lot</Text>
                </View>
              )}
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>DESCRIPTION</Text>
            <Text style={styles.description}>{property.description}</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>LISTING AGENT</Text>
            <View style={styles.agentCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80' }}
                style={styles.agentPhoto}
                contentFit="cover"
              />
              <View style={styles.agentInfo}>
                <Text style={styles.agentName}>{property.agent}</Text>
                <Text style={styles.agentRole}>Broker / Owner</Text>
                <Text style={styles.agentCompany}>Bayou Properties Realty, LLC</Text>
              </View>
            </View>

            <View style={styles.contactActions}>
              <Pressable
                style={({ pressed }) => [styles.callButton, pressed && { opacity: 0.85 }]}
                onPress={handleCall}
                testID="call-agent-btn"
              >
                <Phone size={18} color={Colors.navy} />
                <Text style={styles.callButtonText}>Call Agent</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.emailButton, pressed && { opacity: 0.7 }]}
                onPress={handleEmail}
                testID="email-agent-btn"
              >
                <Mail size={18} color={Colors.gold} />
                <Text style={styles.emailButtonText}>Email</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navy,
  },
  notFound: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 12,
    paddingHorizontal: 32,
  },
  notFoundIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.navyLight,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  notFoundText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700' as const,
  },
  notFoundSubtext: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center' as const,
    lineHeight: 20,
  },
  backButtonLg: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 8,
  },
  backButtonText: {
    color: Colors.navy,
    fontSize: 15,
    fontWeight: '700' as const,
  },
  imageSection: {
    height: 390,
    position: 'relative' as const,
  },
  heroImage: {
    width: SCREEN_WIDTH,
    height: 390,
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  topBar: {
    position: 'absolute' as const,
    left: 16,
    right: 16,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  topBarRight: {
    flexDirection: 'row' as const,
    gap: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  pagination: {
    position: 'absolute' as const,
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    gap: 6,
  },
  paginationDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  paginationDotActive: {
    backgroundColor: Colors.gold,
    width: 22,
  },
  imageCounter: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '500' as const,
    marginLeft: 10,
  },
  content: {
    padding: 20,
    paddingBottom: 44,
  },
  priceRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 10,
  },
  price: {
    color: Colors.gold,
    fontSize: 30,
    fontWeight: '800' as const,
    letterSpacing: 0.5,
  },
  pricePerSqft: {
    color: Colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  badgesCol: {
    alignItems: 'flex-end' as const,
    gap: 6,
  },
  typeBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 5,
    backgroundColor: Colors.goldMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeText: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: '600' as const,
  },
  statusBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600' as const,
  },
  address: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700' as const,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    marginBottom: 20,
    flexWrap: 'wrap' as const,
  },
  city: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
  neighborhoodDot: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  neighborhoodText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontStyle: 'italic' as const,
  },
  statsRow: {
    flexDirection: 'row' as const,
    gap: 12,
    marginBottom: 6,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: Colors.divider,
    gap: 6,
  },
  statValue: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700' as const,
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '500' as const,
  },
  detailsRow: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 8,
    marginTop: 12,
  },
  detailChip: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    backgroundColor: Colors.navyLight,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  detailChipText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500' as const,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 22,
  },
  sectionLabel: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 2,
    marginBottom: 10,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  agentCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.divider,
    gap: 14,
    marginBottom: 16,
  },
  agentPhoto: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: Colors.goldMuted,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700' as const,
  },
  agentRole: {
    color: Colors.gold,
    fontSize: 13,
    marginTop: 2,
  },
  agentCompany: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  contactActions: {
    flexDirection: 'row' as const,
    gap: 12,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: Colors.gold,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  callButtonText: {
    color: Colors.navy,
    fontSize: 16,
    fontWeight: '700' as const,
  },
  emailButton: {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  emailButtonText: {
    color: Colors.gold,
    fontSize: 16,
    fontWeight: '700' as const,
  },
});
