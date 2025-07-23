
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface College {
  id: number;
  name: string;
  location: string;
  course: string;
  fees: string;
  rank: string;
  rating: number;
  placement: string;
  logo: string;
}

export default function ExploreScreen() {
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('rank');

  const courses = ['All', 'Engineering', 'MBA', 'Medical', 'Arts & Science'];
  const locations = ['All', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Pune'];

  const colleges: College[] = [
    {
      id: 1,
      name: 'IIT Delhi',
      location: 'Delhi',
      course: 'Engineering',
      fees: '₹2.5L/year',
      rank: '#1',
      rating: 4.8,
      placement: '₹25L avg',
      logo: 'IIT'
    },
    {
      id: 2,
      name: 'IIM Bangalore',
      location: 'Bangalore',
      course: 'MBA',
      fees: '₹24L total',
      rank: '#2',
      rating: 4.9,
      placement: '₹35L avg',
      logo: 'IIM'
    },
    {
      id: 3,
      name: 'AIIMS Delhi',
      location: 'Delhi',
      course: 'Medical',
      fees: '₹1.2L/year',
      rank: '#1',
      rating: 4.9,
      placement: 'N/A',
      logo: 'AII'
    },
    {
      id: 4,
      name: 'BITS Pilani',
      location: 'Pilani',
      course: 'Engineering',
      fees: '₹4.5L/year',
      rank: '#8',
      rating: 4.6,
      placement: '₹18L avg',
      logo: 'BIT'
    },
  ];

  const renderCollegeCard = ({ item }: { item: College }) => (
    <TouchableOpacity style={styles.collegeCard}>
      <View style={styles.cardHeader}>
        <View style={styles.logoContainer}>
          <ThemedText style={styles.logoText}>{item.logo}</ThemedText>
        </View>
        <View style={styles.rankBadge}>
          <ThemedText style={styles.rankText}>{item.rank}</ThemedText>
        </View>
      </View>
      
      <ThemedText type="defaultSemiBold" style={styles.collegeName}>
        {item.name}
      </ThemedText>
      
      <View style={styles.locationRow}>
        <IconSymbol name="location" size={14} color="#666" />
        <ThemedText style={styles.locationText}>{item.location}</ThemedText>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <ThemedText style={styles.statLabel}>Course</ThemedText>
          <ThemedText style={styles.statValue}>{item.course}</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statLabel}>Fees</ThemedText>
          <ThemedText style={styles.statValue}>{item.fees}</ThemedText>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.ratingContainer}>
          <IconSymbol name="star" size={14} color="#FFD700" />
          <ThemedText style={styles.ratingText}>{item.rating}</ThemedText>
        </View>
        <ThemedText style={styles.placementText}>{item.placement}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Explore Colleges</ThemedText>
        <TouchableOpacity style={styles.filterButton}>
          <IconSymbol name="filter" size={20} color="#4ECDC4" />
        </TouchableOpacity>
      </ThemedView>

      {/* Course Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.filterTab,
              selectedCourse === course && styles.filterTabActive
            ]}
            onPress={() => setSelectedCourse(course)}
          >
            <ThemedText style={[
              styles.filterTabText,
              selectedCourse === course && styles.filterTabTextActive
            ]}>
              {course}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Location Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {locations.map((location) => (
          <TouchableOpacity
            key={location}
            style={[
              styles.locationTab,
              selectedLocation === location && styles.locationTabActive
            ]}
            onPress={() => setSelectedLocation(location)}
          >
            <ThemedText style={[
              styles.locationTabText,
              selectedLocation === location && styles.locationTabTextActive
            ]}>
              {location}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sort Options */}
      <ThemedView style={styles.sortContainer}>
        <ThemedText style={styles.sortLabel}>Sort by:</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['rank', 'fees', 'rating', 'placement'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.sortOption,
                sortBy === option && styles.sortOptionActive
              ]}
              onPress={() => setSortBy(option)}
            >
              <ThemedText style={[
                styles.sortOptionText,
                sortBy === option && styles.sortOptionTextActive
              ]}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Results */}
      <ThemedView style={styles.resultsHeader}>
        <ThemedText style={styles.resultsCount}>{colleges.length} colleges found</ThemedText>
        <TouchableOpacity>
          <IconSymbol name="compare" size={20} color="#4ECDC4" />
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={colleges}
        renderItem={renderCollegeCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  filterScroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterTabActive: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  filterTabText: {
    fontSize: 14,
    color: '#666',
  },
  filterTabTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  locationTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  locationTabActive: {
    backgroundColor: '#FF6B6B',
  },
  locationTabText: {
    fontSize: 12,
    color: '#666',
  },
  locationTabTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  sortLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  sortOptionActive: {
    backgroundColor: '#4ECDC4',
  },
  sortOptionText: {
    fontSize: 12,
    color: '#666',
  },
  sortOptionTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  collegeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#4ECDC4',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rankBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rankText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  collegeName: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  placementText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
  },
});
