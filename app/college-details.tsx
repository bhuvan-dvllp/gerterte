
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { mockColleges } from '@/data/mock-data';

export default function CollegeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = createStyles(colors);

  const college = mockColleges.find(c => c.id === parseInt(id as string));

  if (!college) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>College not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formatFees = (fees: string, period: string) => {
    const amount = parseFloat(fees);
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L${period === "total" ? " total" : "/year"}`;
    }
    return `₹${amount.toLocaleString()}${period === "total" ? " total" : "/year"}`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={[
            styles.star,
            {
              color: i <= fullStars
                ? '#FFD700'
                : i === fullStars + 1 && hasHalfStar
                ? '#FFD700'
                : '#E0E0E0'
            }
          ]}
        >
          ★
        </Text>
      );
    }
    return stars;
  };

  const handleFavorite = () => {
    Alert.alert('Added to Favorites', `${college.name} has been added to your favorites.`);
  };

  const handleShare = () => {
    Alert.alert('Share College', 'Sharing functionality will be implemented soon.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <IconSymbol name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleFavorite}>
            <IconSymbol name="heart" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <IconSymbol name="share" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: college.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.rankBadge}>
            <Text style={styles.rankText}>#{college.overallRank} Rank</Text>
          </View>
        </View>

        {/* College Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.collegeName}>{college.name}</Text>
          
          <View style={styles.locationContainer}>
            <IconSymbol name="location" size={16} color="#666" />
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
          
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{college.type}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Est. {college.establishedYear}</Text>
            </View>
          </View>
          
          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {formatFees(college.fees, college.feesPeriod)}
              </Text>
              <Text style={styles.statLabel}>Fees</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{college.placementRate}%</Text>
              <Text style={styles.statLabel}>Placement Rate</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="building" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>About College</Text>
          </View>
          <Text style={styles.sectionContent}>
            {college.description || "No description available."}
          </Text>
          
          <View style={styles.detailsList}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Affiliation:</Text>
              <Text style={styles.detailValue}>{college.affiliation || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Admission Process:</Text>
              <Text style={styles.detailValue}>{college.admissionProcess || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Hostel Available:</Text>
              <Text style={styles.detailValue}>{college.hasHostel ? "Yes" : "No"}</Text>
            </View>
          </View>
        </View>

        {/* Facilities Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="wifi" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Facilities</Text>
          </View>
          <View style={styles.facilitiesContainer}>
            {['Library', 'Wi-Fi', 'Sports Complex', 'Cafeteria', 'Labs'].map((facility) => (
              <View key={facility} style={styles.facilityBadge}>
                <Text style={styles.facilityText}>{facility}</Text>
              </View>
            ))}
            {college.hasHostel && (
              <View style={styles.facilityBadge}>
                <Text style={styles.facilityText}>Hostel</Text>
              </View>
            )}
          </View>
        </View>

        {/* Placement Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="trending-up" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Placement Statistics</Text>
          </View>
          
          <View style={styles.placementStats}>
            <View style={styles.placementStatItem}>
              <Text style={styles.placementStatValue}>
                {college.averagePackage ? `₹${(parseFloat(college.averagePackage) / 100000).toFixed(1)}L` : "N/A"}
              </Text>
              <Text style={styles.placementStatLabel}>Average Package</Text>
            </View>
            <View style={styles.placementStatItem}>
              <Text style={styles.placementStatValue}>
                {college.highestPackage ? `₹${(parseFloat(college.highestPackage) / 100000).toFixed(1)}L` : "N/A"}
              </Text>
              <Text style={styles.placementStatLabel}>Highest Package</Text>
            </View>
          </View>
          
          <Text style={styles.sectionContent}>
            Detailed placement statistics and top recruiting companies information would be displayed here.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Apply Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Download Brochure</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    padding: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  content: {
    flex: 1,
  },
  heroContainer: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  rankBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  },
  collegeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  locationContainer: {
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
    fontSize: 16,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  badgesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  badge: {
    backgroundColor: colors.backgroundGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.backgroundGray,
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsList: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  facilityBadge: {
    backgroundColor: colors.backgroundGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  facilityText: {
    fontSize: 12,
    color: colors.text,
  },
  placementStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.backgroundGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  placementStatItem: {
    alignItems: 'center',
  },
  placementStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  placementStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: 'white',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
