
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

export default function CompareScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedColleges, setSelectedColleges] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const styles = createStyles(colors);

  const availableColleges = mockColleges.filter(college =>
    !selectedColleges.find(c => c.id === college.id) &&
    (searchQuery === '' || college.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addCollege = (college: any) => {
    if (selectedColleges.length < 4) {
      setSelectedColleges([...selectedColleges, college]);
    } else {
      Alert.alert('Limit Reached', 'You can compare maximum 4 colleges');
    }
  };

  const removeCollege = (collegeId: number) => {
    setSelectedColleges(selectedColleges.filter(c => c.id !== collegeId));
  };

  const formatFees = (fees: string, period: string) => {
    const amount = parseFloat(fees);
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L${period === "total" ? " total" : "/year"}`;
    }
    return `₹${amount.toLocaleString()}${period === "total" ? " total" : "/year"}`;
  };

  const comparisonFields = [
    { key: 'overallRank', label: 'Overall Rank', format: (value: any) => `#${value}` },
    { key: 'type', label: 'Type', format: (value: any) => value },
    { key: 'establishedYear', label: 'Established', format: (value: any) => value },
    { key: 'fees', label: 'Fees', format: (value: any, college: any) => formatFees(value, college.feesPeriod) },
    { key: 'rating', label: 'Rating', format: (value: any) => `${value}/5` },
    { key: 'placementRate', label: 'Placement Rate', format: (value: any) => `${value}%` },
    { key: 'averagePackage', label: 'Avg Package', format: (value: any) => `₹${(parseFloat(value) / 100000).toFixed(1)}L` },
    { key: 'hasHostel', label: 'Hostel', format: (value: any) => value ? 'Available' : 'Not Available' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Compare Colleges</Text>
        <TouchableOpacity style={styles.addButton}>
          <IconSymbol name="plus" size={20} color="#4ECDC4" />
          <Text style={styles.addButtonText}>Add College</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Selected Colleges Header */}
        {selectedColleges.length > 0 && (
          <View style={styles.selectedHeader}>
            <View style={styles.selectedHeaderTop}>
              <IconSymbol name="bar-chart" size={20} color={colors.primary} />
              <Text style={styles.selectedHeaderText}>
                Comparing {selectedColleges.length} college{selectedColleges.length > 1 ? 's' : ''}
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectedCollegesContainer}>
              {selectedColleges.map((college) => (
                <View key={college.id} style={styles.selectedCollegeTag}>
                  <Text style={styles.selectedCollegeTagText}>{college.shortName}</Text>
                  <TouchableOpacity onPress={() => removeCollege(college.id)}>
                    <IconSymbol name="x" size={14} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Comparison Table */}
        {selectedColleges.length >= 2 && (
          <View style={styles.comparisonSection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="bar-chart" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>College Comparison</Text>
            </View>

            {/* College Headers */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                  <View style={styles.fieldColumn}>
                    <Text style={styles.fieldHeaderText}>Criteria</Text>
                  </View>
                  {selectedColleges.map((college, index) => (
                    <View key={college.id} style={styles.collegeColumn}>
                      <View style={styles.collegeHeaderCard}>
                        <View style={styles.collegeLogo}>
                          <Text style={styles.collegeLogoText}>{index + 1}</Text>
                        </View>
                        <Text style={styles.collegeHeaderName} numberOfLines={2}>
                          {college.shortName}
                        </Text>
                        <Text style={styles.collegeHeaderLocation}>
                          {college.location}
                        </Text>
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => removeCollege(college.id)}
                        >
                          <IconSymbol name="x" size={16} color="#666" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Comparison Data */}
                {comparisonFields.map((field) => (
                  <View key={field.key} style={styles.tableRow}>
                    <View style={styles.fieldHeader}>
                      <Text style={styles.fieldLabel}>{field.label}</Text>
                    </View>
                    {selectedColleges.map((college) => (
                      <View key={college.id} style={styles.valueCell}>
                        <Text style={styles.valueText}>
                          {field.format((college as any)[field.key], college)}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <IconSymbol name="printer" size={16} color="white" />
                <Text style={styles.actionButtonText}>Print</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#FF6B6B' }]}
                onPress={() => setSelectedColleges([])}
              >
                <IconSymbol name="trash" size={16} color="white" />
                <Text style={styles.actionButtonText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Instructions */}
        {selectedColleges.length === 1 && (
          <View style={styles.instructionCard}>
            <IconSymbol name="info" size={24} color={colors.primary} />
            <View style={styles.instructionContent}>
              <Text style={styles.instructionTitle}>Add one more college to compare</Text>
              <Text style={styles.instructionSubtitle}>
                Select another college from the list below to see a detailed comparison.
              </Text>
            </View>
          </View>
        )}

        {/* Search and Add Colleges */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <IconSymbol name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search colleges to compare..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {selectedColleges.length === 0 && (
            <View style={styles.emptyState}>
              <IconSymbol name="bar-chart" size={48} color="#E0E0E0" />
              <Text style={styles.emptyStateTitle}>Start Comparing</Text>
              <Text style={styles.emptyStateSubtitle}>
                Search and select colleges to compare side by side
              </Text>

              <View style={styles.quickActions}>
                <TouchableOpacity
                  style={styles.quickActionButton}
                  onPress={() => {
                    const topColleges = mockColleges.slice(0, 2);
                    setSelectedColleges(topColleges);
                  }}
                >
                  <Text style={styles.quickActionButtonText}>Compare Top 2 Colleges</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.quickActionButton}
                  onPress={() => {
                    const topColleges = mockColleges.slice(0, 3);
                    setSelectedColleges(topColleges);
                  }}
                >
                  <Text style={styles.quickActionButtonText}>Compare Top 3 Colleges</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {availableColleges.length > 0 && (
            <View style={styles.collegesList}>
              <Text style={styles.collegesListTitle}>
                {searchQuery ? 'Search Results' : 'Popular Colleges'}
              </Text>
              {availableColleges.slice(0, 10).map((college) => (
                <View key={college.id} style={styles.collegeItem}>
                  <View style={styles.collegeItemInfo}>
                    <Text style={styles.collegeItemName} numberOfLines={1}>
                      {college.name}
                    </Text>
                    <View style={styles.collegeItemDetails}>
                      <Text style={styles.collegeItemLocation}>{college.location}</Text>
                      <View style={styles.collegeItemRank}>
                        <Text style={styles.collegeItemRankText}>#{college.overallRank}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.addCollegeButton,
                      selectedColleges.length >= 4 && styles.addCollegeButtonDisabled
                    ]}
                    onPress={() => addCollege(college)}
                    disabled={selectedColleges.length >= 4}
                  >
                    <IconSymbol name="plus" size={16} color="white" />
                    <Text style={styles.addCollegeButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {selectedColleges.length >= 4 && (
            <View style={styles.limitWarning}>
              <Text style={styles.limitWarningText}>
                Maximum 4 colleges can be compared at once. Remove some colleges to add more.
              </Text>
            </View>
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  selectedHeader: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  selectedHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  selectedCollegesContainer: {
    flexDirection: 'row',
  },
  selectedCollegeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  selectedCollegeTagText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 6,
  },
  comparisonSection: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  tableContainer: {
    minWidth: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  fieldColumn: {
    width: 120,
    padding: 12,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
  },
  fieldHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  collegeColumn: {
    width: 150,
    padding: 8,
  },
  collegeHeaderCard: {
    alignItems: 'center',
    position: 'relative',
  },
  collegeLogo: {
    width: 40,
    height: 40,
    backgroundColor: '#4ECDC4',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  collegeLogoText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  collegeHeaderName: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '600',
  },
  collegeHeaderLocation: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  fieldHeader: {
    width: 120,
    padding: 12,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  valueCell: {
    width: 150,
    padding: 12,
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ECDC4',
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  instructionCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  instructionContent: {
    flex: 1,
    marginLeft: 12,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  instructionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  searchSection: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
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
    marginBottom: 24,
  },
  quickActions: {
    alignItems: 'center',
    gap: 8,
  },
  quickActionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  quickActionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  collegesList: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  collegesListTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  collegeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  collegeItemInfo: {
    flex: 1,
  },
  collegeItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  collegeItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  collegeItemLocation: {
    fontSize: 14,
    color: '#666',
  },
  collegeItemRank: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  collegeItemRankText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  addCollegeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 12,
  },
  addCollegeButtonDisabled: {
    backgroundColor: '#CCC',
  },
  addCollegeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  limitWarning: {
    backgroundColor: '#FEF3CD',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FBBF24',
  },
  limitWarningText: {
    fontSize: 14,
    color: '#92400E',
    textAlign: 'center',
  },
});
