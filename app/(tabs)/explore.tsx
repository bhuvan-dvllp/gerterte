
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { mockColleges } from '@/data/mock-data';
import { Link } from 'expo-router';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [compareList, setCompareList] = useState<any[]>([]);

  const styles = createStyles(colors);

  const filteredColleges = mockColleges.filter(college =>
    college.name.toLowerCase().includes(searchText.toLowerCase()) ||
    college.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedColleges = [...filteredColleges].sort((a, b) => {
    switch (sortBy) {
      case 'rank':
        return parseInt(a.overallRank) - parseInt(b.overallRank);
      case 'fees':
        return parseFloat(a.fees) - parseFloat(b.fees);
      case 'rating':
        return parseFloat(b.rating) - parseFloat(a.rating);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const formatFees = (fees: string, period: string) => {
    const amount = parseFloat(fees);
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L${period === "total" ? " total" : "/year"}`;
    }
    return `₹${amount.toLocaleString()}${period === "total" ? " total" : "/year"}`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={[styles.star, { color: i <= rating ? '#FFD700' : '#E0E0E0' }]}>
          ★
        </Text>
      );
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Search Colleges</Text>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <IconSymbol name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search colleges, courses, locations..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'rank', label: 'Rank' },
              { key: 'fees', label: 'Fees' },
              { key: 'rating', label: 'Rating' },
              { key: 'name', label: 'Name' }
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.sortButton,
                  sortBy === option.key && styles.selectedSortButton
                ]}
                onPress={() => setSortBy(option.key)}
              >
                <Text
                  style={[
                    styles.sortButtonText,
                    sortBy === option.key && styles.selectedSortButtonText
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <IconSymbol name="sliders-horizontal" size={16} color="#4A90E2" />
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {sortedColleges.length} colleges found
        </Text>
      </View>

      {/* College Results */}
      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        {sortedColleges.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="search" size={48} color="#E0E0E0" />
            <Text style={styles.emptyStateTitle}>No colleges found</Text>
            <Text style={styles.emptyStateSubtitle}>
              Try adjusting your search criteria
            </Text>
          </View>
        ) : (
          sortedColleges.map((college) => (
            <View key={college.id} style={styles.collegeCard}>
              <Image
                source={{ uri: college.imageUrl }}
                style={styles.collegeImage}
                resizeMode="cover"
              />
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>#{college.overallRank}</Text>
              </View>
              
              <View style={styles.collegeInfo}>
                <Text style={styles.collegeName} numberOfLines={2}>
                  {college.name}
                </Text>
                
                <View style={styles.collegeLocation}>
                  <IconSymbol name="location" size={14} color="#666" />
                  <Text style={styles.locationText}>{college.location}</Text>
                </View>
                
                <View style={styles.ratingContainer}>
                  <View style={styles.stars}>
                    {renderStars(parseFloat(college.rating))}
                  </View>
                  <Text style={styles.ratingText}>
                    {college.rating} ({college.reviewCount?.toLocaleString()} reviews)
                  </Text>
                </View>
                
                <View style={styles.collegeDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Fees</Text>
                    <Text style={styles.detailValue}>
                      {formatFees(college.fees, college.feesPeriod)}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Type</Text>
                    <Text style={styles.detailValue}>{college.type}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Placement</Text>
                    <Text style={styles.detailValue}>{college.placementRate}%</Text>
                  </View>
                </View>
                
                <View style={styles.cardActions}>
                  <Link
                    href={{
                      pathname: '/college-details',
                      params: { id: college.id }
                    }}
                    asChild
                  >
                    <TouchableOpacity style={styles.viewDetailsButton}>
                      <Text style={styles.viewDetailsText}>View Details</Text>
                    </TouchableOpacity>
                  </Link>
                  
                  <TouchableOpacity style={styles.compareButton}>
                    <IconSymbol name="plus" size={16} color="#4A90E2" />
                    <Text style={styles.compareText}>Compare</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },
  header: {
    backgroundColor: colors.primary,
    paddingBottom: 16,
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: colors.text,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sortLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'white',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedSortButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#666',
  },
  selectedSortButtonText: {
    color: 'white',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    marginLeft: 4,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  collegeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  collegeImage: {
    width: '100%',
    height: 128,
  },
  rankBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  collegeInfo: {
    padding: 16,
  },
  collegeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  collegeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  collegeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewDetailsButton: {
    flex: 1,
    marginRight: 8,
  },
  viewDetailsText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  compareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  compareText: {
    color: '#4A90E2',
    fontSize: 12,
    marginLeft: 4,
  },
});
