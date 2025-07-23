
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface College {
  id: number;
  name: string;
  location: string;
  rank: string;
  fees: string;
  placement: string;
  rating: number;
  seats: string;
  cutoff: string;
}

export default function CompareScreen() {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([
    {
      id: 1,
      name: 'IIT Delhi',
      location: 'Delhi',
      rank: '#1',
      fees: '₹2.5L/year',
      placement: '₹25L avg',
      rating: 4.8,
      seats: '800',
      cutoff: '150 JEE'
    },
    {
      id: 2,
      name: 'IIT Bombay',
      location: 'Mumbai',
      rank: '#2',
      fees: '₹2.5L/year',
      placement: '₹28L avg',
      rating: 4.9,
      seats: '850',
      cutoff: '140 JEE'
    }
  ]);

  const comparisonFields = [
    { key: 'rank', label: 'Overall Rank', icon: 'trophy' },
    { key: 'fees', label: 'Annual Fees', icon: 'rupee' },
    { key: 'placement', label: 'Avg Placement', icon: 'briefcase' },
    { key: 'rating', label: 'Rating', icon: 'star' },
    { key: 'seats', label: 'Total Seats', icon: 'people' },
    { key: 'cutoff', label: 'Cutoff', icon: 'target' },
  ];

  const removeCollege = (id: number) => {
    setSelectedColleges(selectedColleges.filter(college => college.id !== id));
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Compare Colleges</ThemedText>
        <TouchableOpacity style={styles.addButton}>
          <IconSymbol name="plus" size={20} color="#4ECDC4" />
          <ThemedText style={styles.addButtonText}>Add College</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {selectedColleges.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <IconSymbol name="compare" size={64} color="#ccc" />
          <ThemedText style={styles.emptyTitle}>No colleges selected</ThemedText>
          <ThemedText style={styles.emptySubtitle}>Add colleges to compare their features side by side</ThemedText>
          <TouchableOpacity style={styles.selectButton}>
            <ThemedText style={styles.selectButtonText}>Select Colleges</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ScrollView style={styles.content}>
          {/* College Headers */}
          <View style={styles.collegeHeaders}>
            <View style={styles.fieldColumn} />
            {selectedColleges.map((college) => (
              <View key={college.id} style={styles.collegeColumn}>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeCollege(college.id)}
                >
                  <IconSymbol name="close" size={16} color="#666" />
                </TouchableOpacity>
                <View style={styles.collegeHeaderCard}>
                  <View style={styles.collegeLogo}>
                    <ThemedText style={styles.collegeLogoText}>
                      {college.name.split(' ').map(word => word[0]).join('')}
                    </ThemedText>
                  </View>
                  <ThemedText type="defaultSemiBold" style={styles.collegeHeaderName}>
                    {college.name}
                  </ThemedText>
                  <ThemedText style={styles.collegeHeaderLocation}>
                    {college.location}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>

          {/* Comparison Table */}
          <View style={styles.comparisonTable}>
            {comparisonFields.map((field) => (
              <View key={field.key} style={styles.comparisonRow}>
                <View style={styles.fieldColumn}>
                  <View style={styles.fieldHeader}>
                    <IconSymbol name={field.icon as any} size={16} color="#666" />
                    <ThemedText style={styles.fieldLabel}>{field.label}</ThemedText>
                  </View>
                </View>
                {selectedColleges.map((college) => (
                  <View key={college.id} style={styles.collegeColumn}>
                    <View style={styles.valueCell}>
                      <ThemedText style={styles.valueText}>
                        {college[field.key as keyof College]}
                      </ThemedText>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <ThemedView style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <IconSymbol name="download" size={20} color="white" />
              <ThemedText style={styles.actionButtonText}>Export PDF</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
              <IconSymbol name="share" size={20} color="#4ECDC4" />
              <ThemedText style={[styles.actionButtonText, styles.secondaryButtonText]}>Share</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      )}
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  selectButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  collegeHeaders: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  fieldColumn: {
    width: 120,
    marginRight: 15,
  },
  collegeColumn: {
    flex: 1,
    marginRight: 15,
  },
  removeButton: {
    alignSelf: 'flex-end',
    padding: 4,
    marginBottom: 8,
  },
  collegeHeaderCard: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  collegeLogo: {
    width: 50,
    height: 50,
    backgroundColor: '#4ECDC4',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  collegeLogoText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  collegeHeaderName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  collegeHeaderLocation: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  comparisonTable: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  comparisonRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  valueCell: {
    padding: 15,
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ECDC4',
    paddingVertical: 15,
    borderRadius: 12,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#4ECDC4',
  },
});
