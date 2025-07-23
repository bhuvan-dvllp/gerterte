
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width } = Dimensions.get('window');

const colleges = [
  {
    id: 1,
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, Delhi',
    fees: '₹2.5L/year',
    type: 'Government',
    rating: 4.5,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop',
    rank: 1,
  },
  {
    id: 2,
    name: 'Indian Institute of Technology Bombay',
    location: 'Mumbai, Maharashtra',
    fees: '₹2.8L/year',
    type: 'Government',
    rating: 4.6,
    reviews: 1850,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop',
    rank: 2,
  },
];

const categories = ['Engineering', 'MBA', 'Medical', 'Arts'];
const filters = ['All Courses', 'Location', 'Fees', 'Ranking'];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Engineering');
  const [selectedFilter, setSelectedFilter] = useState('All Courses');

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
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <IconSymbol name="school" size={24} color="white" />
            <Text style={styles.appTitle}>College Duniya</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}>
              <IconSymbol name="notifications" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <IconSymbol name="person" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <IconSymbol name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search colleges, courses, exams..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#666"
          />
        </View>

        {/* Category Buttons */}
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickAction}>
            <IconSymbol name="bar-chart" size={24} color="#4A90E2" />
            <View>
              <Text style={styles.quickActionTitle}>Compare</Text>
              <Text style={styles.quickActionSubtitle}>Colleges</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <IconSymbol name="lightbulb" size={24} color="#FF9500" />
            <View>
              <Text style={styles.quickActionTitle}>Predictor</Text>
              <Text style={styles.quickActionSubtitle}>Find colleges</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Find Colleges Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Find Colleges</Text>
            <TouchableOpacity style={styles.filtersButton}>
              <IconSymbol name="tune" size={16} color="#4A90E2" />
              <Text style={styles.filtersText}>Filters</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Tabs */}
          <View style={styles.filterContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.selectedFilterButton,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.selectedFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* College List */}
          {colleges.map((college) => (
            <View key={college.id} style={styles.collegeCard}>
              <View style={styles.collegeImageContainer}>
                <Image source={{ uri: college.image }} style={styles.collegeImage} />
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>#{college.rank}</Text>
                </View>
              </View>
              
              <View style={styles.collegeInfo}>
                <View style={styles.collegeHeader}>
                  <Text style={styles.collegeName}>{college.name}</Text>
                  <TouchableOpacity style={styles.favoriteButton}>
                    <IconSymbol name="favorite-border" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.locationContainer}>
                  <IconSymbol name="location-on" size={14} color="#666" />
                  <Text style={styles.locationText}>{college.location}</Text>
                </View>

                <View style={styles.collegeDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>FEES</Text>
                    <Text style={styles.detailValue}>{college.fees}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>TYPE</Text>
                    <Text style={styles.detailValue}>{college.type}</Text>
                  </View>
                </View>

                <View style={styles.ratingContainer}>
                  <View style={styles.stars}>
                    {renderStars(college.rating)}
                  </View>
                  <Text style={styles.ratingText}>
                    {college.rating} • {college.reviews.toLocaleString()} reviews
                  </Text>
                  <TouchableOpacity style={styles.viewDetailsButton}>
                    <IconSymbol name="bar-chart" size={16} color="#4A90E2" />
                    <Text style={styles.viewDetailsText}>View Details</Text>
                    <IconSymbol name="arrow-forward" size={16} color="#4A90E2" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedCategoryButton: {
    backgroundColor: 'white',
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#4A90E2',
  },
  content: {
    flex: 1,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  quickAction: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  sectionContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  filtersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filtersText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedFilterButton: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  selectedFilterText: {
    color: 'white',
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
  },
  collegeImageContainer: {
    position: 'relative',
  },
  collegeImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rankBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  rankText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  collegeInfo: {
    padding: 16,
  },
  collegeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  collegeName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  favoriteButton: {
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 4,
  },
  collegeDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
  },
  ratingText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewDetailsText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
});
