import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { properties } from '@/mocks/properties';
import { Property } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';

type FilterType = 'all' | 'residential' | 'commercial' | 'land';

export default function PropertiesScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('[PropertiesScreen] Mounting, starting fade animation');
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const filtered = useMemo(() => {
    let result = properties;
    if (filter !== 'all') {
      result = result.filter((p) => p.type === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.address.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.zip.includes(q) ||
          p.neighborhood.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, filter]);

  const activeCount = useMemo(() => filtered.filter(p => p.status === 'active').length, [filtered]);
  const pendingCount = useMemo(() => filtered.filter(p => p.status === 'pending').length, [filtered]);
  const soldCount = useMemo(() => filtered.filter(p => p.status === 'sold').length, [filtered]);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Land', value: 'land' },
  ];

  const renderItem = useCallback(({ item }: { item: Property }) => {
    return <PropertyCard property={item} />;
  }, []);

  const keyExtractor = useCallback((item: Property) => item.id, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.sectionLabel}>BROWSE</Text>
            <Text style={styles.title}>Properties</Text>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.headerStatChip}>
              <View style={[styles.statusDot, { backgroundColor: Colors.success }]} />
              <Text style={styles.headerStatText}>{activeCount} active</Text>
            </View>
            {pendingCount > 0 && (
              <View style={styles.headerStatChip}>
                <View style={[styles.statusDot, { backgroundColor: Colors.gold }]} />
                <Text style={styles.headerStatText}>{pendingCount} pending</Text>
              </View>
            )}
            {soldCount > 0 && (
              <View style={styles.headerStatChip}>
                <View style={[styles.statusDot, { backgroundColor: Colors.textMuted }]} />
                <Text style={styles.headerStatText}>{soldCount} sold</Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.subtitle}>{filtered.length} listings in Houston & Gulf Coast</Text>
      </Animated.View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search address, city, zip, neighborhood..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
            testID="search-input"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')} hitSlop={8} testID="clear-search">
              <X size={16} color={Colors.textMuted} />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.filterRow}>
        {filters.map((f) => (
          <Pressable
            key={f.value}
            style={[styles.filterChip, filter === f.value && styles.filterChipActive]}
            onPress={() => setFilter(f.value)}
            testID={`filter-${f.value}`}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === f.value && styles.filterChipTextActive,
              ]}
            >
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        testID="properties-list"
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIconWrap}>
              <SlidersHorizontal size={36} color={Colors.textMuted} />
            </View>
            <Text style={styles.emptyText}>No properties found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
            {search.length > 0 && (
              <Pressable
                style={styles.clearButton}
                onPress={() => { setSearch(''); setFilter('all'); }}
              >
                <Text style={styles.clearButtonText}>Clear Filters</Text>
              </Pressable>
            )}
          </View>
        }
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
    paddingBottom: 4,
  },
  headerRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
  },
  headerStats: {
    flexDirection: 'row' as const,
    gap: 8,
    flexWrap: 'wrap' as const,
    justifyContent: 'flex-end' as const,
    maxWidth: 180,
    marginTop: 8,
  },
  headerStatChip: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  headerStatText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '500' as const,
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
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 6,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  searchBox: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.navyLight,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.divider,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: Colors.white,
    fontSize: 15,
    padding: 0,
  },
  filterRow: {
    flexDirection: 'row' as const,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.navyLight,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  filterChipActive: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  filterChipText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600' as const,
  },
  filterChipTextActive: {
    color: Colors.navy,
  },
  list: {
    padding: 20,
    paddingTop: 12,
  },
  empty: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingTop: 60,
    gap: 10,
  },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.navyLight,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  emptyText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600' as const,
  },
  emptySubtext: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  clearButton: {
    marginTop: 12,
    backgroundColor: Colors.goldMuted,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  clearButtonText: {
    color: Colors.gold,
    fontSize: 14,
    fontWeight: '600' as const,
  },
});
