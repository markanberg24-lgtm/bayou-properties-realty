import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { Heart, Bed, Bath, Maximize, Layers } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { Property } from '@/types/property';
import { useFavorites } from '@/providers/FavoritesProvider';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

function PropertyCard({ property, compact = false }: PropertyCardProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const heartScale = useRef(new Animated.Value(1)).current;
  const favorite = isFavorite(property.id);

  const formatPrice = (price: number) => {
    return '$' + price.toLocaleString();
  };

  const handlePress = useCallback(() => {
    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.97,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
    router.push(`/property/${property.id}`);
  }, [property.id, router, scaleAnim]);

  const handleFavorite = useCallback(() => {
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
  }, [property.id, toggleFavorite, heartScale]);

  const statusLabel = property.status === 'pending' ? 'PENDING' : property.status === 'sold' ? 'SOLD' : null;
  const statusColor = property.status === 'pending' ? Colors.gold : Colors.textMuted;
  const isLand = property.type === 'land';

  if (compact) {
    return (
      <Pressable onPress={handlePress} testID={`property-card-${property.id}`}>
        <Animated.View style={[styles.compactCard, { transform: [{ scale: scaleAnim }] }]}>
          <Image
            source={{ uri: property.images[0] }}
            style={styles.compactImage}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.compactOverlay}>
            <Text style={styles.compactPrice}>{formatPrice(property.price)}</Text>
          </View>
          <Pressable onPress={handleFavorite} style={styles.compactHeart} hitSlop={12}>
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Heart
                size={18}
                color={favorite ? Colors.error : Colors.white}
                fill={favorite ? Colors.error : 'transparent'}
              />
            </Animated.View>
          </Pressable>
          {statusLabel && (
            <View style={[styles.compactStatusBadge, { backgroundColor: statusColor }]}>
              <Text style={styles.compactStatusText}>{statusLabel}</Text>
            </View>
          )}
          <View style={styles.compactInfo}>
            <Text style={styles.compactAddress} numberOfLines={1}>
              {property.address}
            </Text>
            <Text style={styles.compactCity} numberOfLines={1}>
              {property.city}, {property.state}
            </Text>
            {property.beds !== null ? (
              <View style={styles.compactStats}>
                <Text style={styles.compactStat}>{property.beds} bd</Text>
                <View style={styles.statDot} />
                <Text style={styles.compactStat}>{property.baths} ba</Text>
                {property.sqft && (
                  <>
                    <View style={styles.statDot} />
                    <Text style={styles.compactStat}>{property.sqft?.toLocaleString()} sqft</Text>
                  </>
                )}
              </View>
            ) : isLand && property.lotSqft ? (
              <View style={styles.compactStats}>
                <Layers size={10} color={Colors.textMuted} />
                <Text style={styles.compactStat}> {property.lotSqft.toLocaleString()} sqft lot</Text>
              </View>
            ) : null}
          </View>
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={handlePress} testID={`property-card-${property.id}`}>
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: property.images[0] }}
            style={styles.image}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{formatPrice(property.price)}</Text>
          </View>
          <Pressable onPress={handleFavorite} style={styles.heartButton} hitSlop={12}>
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Heart
                size={22}
                color={favorite ? Colors.error : Colors.white}
                fill={favorite ? Colors.error : 'transparent'}
              />
            </Animated.View>
          </Pressable>
          {statusLabel && (
            <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
              <Text style={styles.statusBadgeText}>{statusLabel}</Text>
            </View>
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.address}>{property.address}</Text>
          <Text style={styles.city}>
            {property.city}, {property.state} {property.zip}
          </Text>
          <View style={styles.stats}>
            {property.beds !== null && (
              <View style={styles.statItem}>
                <Bed size={14} color={Colors.gold} />
                <Text style={styles.statText}>{property.beds} Beds</Text>
              </View>
            )}
            {property.baths !== null && (
              <View style={styles.statItem}>
                <Bath size={14} color={Colors.gold} />
                <Text style={styles.statText}>{property.baths} Baths</Text>
              </View>
            )}
            {property.sqft !== null && (
              <View style={styles.statItem}>
                <Maximize size={14} color={Colors.gold} />
                <Text style={styles.statText}>{property.sqft?.toLocaleString()} sqft</Text>
              </View>
            )}
            {isLand && property.lotSqft !== null && (
              <View style={styles.statItem}>
                <Layers size={14} color={Colors.gold} />
                <Text style={styles.statText}>{property.lotSqft?.toLocaleString()} sqft lot</Text>
              </View>
            )}
          </View>
          {property.neighborhood && (
            <Text style={styles.neighborhood}>{property.neighborhood}</Text>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default React.memo(PropertyCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    overflow: 'hidden' as const,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  imageContainer: {
    position: 'relative' as const,
  },
  image: {
    width: '100%',
    height: 220,
  },
  priceTag: {
    position: 'absolute' as const,
    bottom: 12,
    left: 12,
    backgroundColor: Colors.overlay,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  priceText: {
    color: Colors.gold,
    fontSize: 18,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
  heartButton: {
    position: 'absolute' as const,
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  statusBadge: {
    position: 'absolute' as const,
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    color: Colors.navy,
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
  info: {
    padding: 16,
  },
  address: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  city: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  stats: {
    flexDirection: 'row' as const,
    gap: 16,
    flexWrap: 'wrap' as const,
  },
  statItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 5,
  },
  statText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  neighborhood: {
    color: Colors.textMuted,
    fontSize: 12,
    fontStyle: 'italic' as const,
    marginTop: 8,
  },
  compactCard: {
    width: 264,
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    overflow: 'hidden' as const,
    marginRight: 16,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  compactImage: {
    width: '100%',
    height: 164,
  },
  compactOverlay: {
    position: 'absolute' as const,
    bottom: 72,
    left: 10,
    backgroundColor: Colors.overlay,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  compactPrice: {
    color: Colors.gold,
    fontSize: 15,
    fontWeight: '700' as const,
  },
  compactHeart: {
    position: 'absolute' as const,
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  compactStatusBadge: {
    position: 'absolute' as const,
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  compactStatusText: {
    color: Colors.navy,
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
  compactInfo: {
    padding: 12,
  },
  compactAddress: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600' as const,
  },
  compactCity: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  compactStats: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginTop: 6,
  },
  compactStat: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  statDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.textMuted,
    marginHorizontal: 6,
  },
});
