import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, Bookmark } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { properties } from '@/mocks/properties';
import { Property } from '@/types/property';
import { useFavorites } from '@/providers/FavoritesProvider';
import PropertyCard from '@/components/PropertyCard';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const { favoriteIds } = useFavorites();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('[FavoritesScreen] Rendering with', favoriteIds.length, 'favorites');
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, favoriteIds.length]);

  const favoriteProperties = useMemo(() => {
    return properties.filter((p) => favoriteIds.includes(p.id));
  }, [favoriteIds]);

  const renderItem = useCallback(({ item }: { item: Property }) => {
    return <PropertyCard property={item} />;
  }, []);

  const keyExtractor = useCallback((item: Property) => item.id, []);

  const totalValue = useMemo(() => {
    return favoriteProperties.reduce((sum, p) => sum + p.price, 0);
  }, [favoriteProperties]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.sectionLabel}>YOUR COLLECTION</Text>
            <Text style={styles.title}>Saved Properties</Text>
          </View>
          {favoriteProperties.length > 0 && (
            <View style={styles.countBadge}>
              <Heart size={14} color={Colors.gold} fill={Colors.gold} />
              <Text style={styles.countText}>{favoriteProperties.length}</Text>
            </View>
          )}
        </View>
        {favoriteProperties.length > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>
              {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved
            </Text>
            <Text style={styles.summaryDot}>•</Text>
            <Text style={styles.summaryText}>
              Total value: ${totalValue.toLocaleString()}
            </Text>
          </View>
        )}
      </Animated.View>

      <FlatList
        data={favoriteProperties}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Animated.View style={[styles.empty, { opacity: fadeAnim }]}>
            <View style={styles.emptyIconWrap}>
              <Bookmark size={44} color={Colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>No saved properties yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the heart icon on any property to save it here for quick access later
            </Text>
            <View style={styles.emptyHint}>
              <Heart size={14} color={Colors.gold} />
              <Text style={styles.emptyHintText}>Browse Properties to get started</Text>
            </View>
          </Animated.View>
        }
        testID="favorites-list"
      />
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
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
  },
  sectionLabel: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '700' as const,
  },
  countBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    backgroundColor: Colors.goldMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 6,
  },
  countText: {
    color: Colors.gold,
    fontSize: 15,
    fontWeight: '700' as const,
  },
  summaryRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginTop: 8,
  },
  summaryText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  summaryDot: {
    color: Colors.textMuted,
    fontSize: 13,
    marginHorizontal: 8,
  },
  list: {
    padding: 20,
    paddingTop: 8,
  },
  empty: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingTop: 70,
    paddingHorizontal: 40,
  },
  emptyIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.navyLight,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  emptyTitle: {
    color: Colors.white,
    fontSize: 21,
    fontWeight: '700' as const,
    marginBottom: 10,
  },
  emptySubtext: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center' as const,
    lineHeight: 22,
    marginBottom: 20,
  },
  emptyHint: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    backgroundColor: Colors.goldMuted,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  emptyHintText: {
    color: Colors.gold,
    fontSize: 13,
    fontWeight: '600' as const,
  },
});
