
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { mockColleges } from '@/data/mock-data';
import { Link } from 'expo-router';

const categories = ['Engineering', 'Medical', 'MBA', 'Arts', 'Commerce'];
const filters = ['All Courses', 'Location', 'Fees', 'Ranking'];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Engineering');
  const [selectedFilter, setSelectedFilter] = useState('All Courses');
  const [compareList, setCompareList] = useState<any[]>([]);

  const styles = createStyles(colors);

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

  const handleAddToCompare = (college: any) => {
    if (compareList.length < 4) {
      setCompareList([...compareList, college]);
      Alert.alert('Added to Compare', `${college.name} added to comparison list`);
    } else {
      Alert.alert('Limit Reached', 'You can compare maximum 4 colleges');
    }
  };

  const formatFees = (fees: string, period: string) => {
    const amount = parseFloat(fees);
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L${period === "total" ? " total" : "/year"}`;
    }
    return `₹${amount.toLocaleString()}${period === "total" ? " total" : "/year"}`;
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

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <IconSymbol name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search colleges, courses, exams..."
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          
          {/* Quick Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Link href="/(tabs)/compare" asChild>
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#3B82F6' }]}>
                <IconSymbol name="bar-chart" size={24} color="white" />
              </View>
              <View>
                <Text style={styles.quickActionTitle}>Compare</Text>
                <Text style={styles.quickActionSubtitle}>Colleges</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#FB923C' }]}>
              <IconSymbol name="lightbulb" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.quickActionTitle}>Predictor</Text>
              <Text style={styles.quickActionSubtitle}>Find colleges</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Filter Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Find Colleges</Text>
            <TouchableOpacity style={styles.filtersButton}>
              <IconSymbol name="sliders-horizontal" size={16} color="#4A90E2" />
              <Text style={styles.filtersText}>Filters</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.selectedFilterButton
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.selectedFilterText
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* College List */}
        <View style={styles.sectionContainer}>
          {mockColleges.map((college) => (
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
                  
                  <TouchableOpacity
                    style={styles.compareButton}
                    onPress={() => handleAddToCompare(college)}
                    disabled={compareList.some(c => c.id === college.id)}
                  >
                    <IconSymbol 
                      name="plus" 
                      size={16} 
                      color={compareList.some(c => c.id === college.id) ? "#ccc" : "#4A90E2"} 
                    />
                    <Text style={[
                      styles.compareText,
                      compareList.some(c => c.id === college.id) && styles.compareTextDisabled
                    ]}>
                      Compare
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Recommendations */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          
          <View style={styles.recommendationCard}>
            <View style={[styles.recommendationIcon, { backgroundColor: '#3B82F6' }]}>
              <IconSymbol name="lightbulb" size={20} color="white" />
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>College Predictor</Text>
              <Text style={styles.recommendationSubtitle}>Find colleges based on your JEE Main score</Text>
            </View>
            <TouchableOpacity style={styles.recommendationButton}>
              <Text style={styles.recommendationButtonText}>Try Now</Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.recommendationCard, { backgroundColor: '#FFF7ED' }]}>
            <View style={[styles.recommendationIcon, { backgroundColor: '#FB923C' }]}>
              <IconSymbol name="calendar" size={20} color="white" />
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>Exam Calendar</Text>
              <Text style={styles.recommendationSubtitle}>JEE Advanced registration starts in 2 days</Text>
            </View>
            <TouchableOpacity style={styles.recommendationButton}>
              <Text style={styles.recommendationButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    padding: 4,
  },
  searchSection: {
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
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
  categoriesContainer: {
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
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
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
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
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
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
    color: colors.text,
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
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
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
  compareTextDisabled: {
    color: '#ccc',
  },
  recommendationCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  recommendationSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  recommendationButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  recommendationButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
});
