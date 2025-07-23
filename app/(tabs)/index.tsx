
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    course: '',
    location: '',
    fees: '',
    exam: ''
  });

  const popularCourses = [
    { id: 1, name: 'Engineering', icon: 'code', color: '#FF6B6B' },
    { id: 2, name: 'MBA', icon: 'briefcase', color: '#4ECDC4' },
    { id: 3, name: 'Medical', icon: 'heart', color: '#45B7D1' },
    { id: 4, name: 'Arts & Science', icon: 'book', color: '#96CEB4' },
  ];

  const quickFilters = ['Top Ranked', 'Low Fees', 'High Placement', 'Scholarship'];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Find Your Perfect College</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Compare, explore and choose the best college for your future</ThemedText>
      </ThemedView>

      {/* Search Bar */}
      <ThemedView style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <IconSymbol name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search colleges, courses, locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>
      </ThemedView>

      {/* Quick Filters */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Filters</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {quickFilters.map((filter, index) => (
            <TouchableOpacity key={index} style={styles.filterChip}>
              <ThemedText style={styles.filterText}>{filter}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Popular Courses */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Popular Courses</ThemedText>
        <View style={styles.coursesGrid}>
          {popularCourses.map((course) => (
            <TouchableOpacity key={course.id} style={[styles.courseCard, { backgroundColor: course.color }]}>
              <IconSymbol name={course.icon as any} size={24} color="white" />
              <ThemedText style={styles.courseText}>{course.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      {/* Featured Colleges */}
      <ThemedView style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Featured Colleges</ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.viewAllText}>View All</ThemedText>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.collegeCard}>
              <View style={styles.collegeLogo}>
                <ThemedText style={styles.collegeLogoText}>IIT</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.collegeName}>IIT Delhi</ThemedText>
              <ThemedText style={styles.collegeLocation}>Delhi, India</ThemedText>
              <View style={styles.collegeStats}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statLabel}>Rank</ThemedText>
                  <ThemedText style={styles.statValue}>#1</ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statLabel}>Fees</ThemedText>
                  <ThemedText style={styles.statValue}>₹2.5L</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Tools Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Helpful Tools</ThemedText>
        <View style={styles.toolsGrid}>
          <TouchableOpacity style={styles.toolCard}>
            <IconSymbol name="compare" size={24} color="#4ECDC4" />
            <ThemedText style={styles.toolTitle}>Compare Colleges</ThemedText>
            <ThemedText style={styles.toolSubtitle}>Side by side comparison</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolCard}>
            <IconSymbol name="calculator" size={24} color="#FF6B6B" />
            <ThemedText style={styles.toolTitle}>College Predictor</ThemedText>
            <ThemedText style={styles.toolSubtitle}>Get personalized suggestions</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#4ECDC4',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
  },
  searchContainer: {
    padding: 20,
    paddingTop: 0,
    marginTop: -15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  viewAllText: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: '500',
  },
  filtersScroll: {
    marginBottom: 10,
  },
  filterChip: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterText: {
    fontSize: 14,
    color: '#555',
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  courseCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  courseText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  collegeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  collegeLogo: {
    width: 50,
    height: 50,
    backgroundColor: '#4ECDC4',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  collegeLogoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  collegeName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  collegeLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  collegeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  toolsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  toolSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
});
