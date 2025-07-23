
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ProfileScreen() {
  const menuItems = [
    { id: 1, title: 'Saved Colleges', subtitle: '12 colleges saved', icon: 'bookmark', color: '#FF6B6B' },
    { id: 2, title: 'Exam Calendar', subtitle: 'Upcoming exam dates', icon: 'calendar', color: '#4ECDC4' },
    { id: 3, title: 'College Predictor', subtitle: 'Find colleges based on your score', icon: 'target', color: '#45B7D1' },
    { id: 4, title: 'Admission Alerts', subtitle: 'Get notified about deadlines', icon: 'bell', color: '#96CEB4' },
    { id: 5, title: 'Compare History', subtitle: 'View past comparisons', icon: 'history', color: '#FECA57' },
    { id: 6, title: 'Settings', subtitle: 'App preferences', icon: 'settings', color: '#6C5CE7' },
  ];

  const stats = [
    { label: 'Colleges Viewed', value: '45' },
    { label: 'Comparisons Made', value: '8' },
    { label: 'Saved Colleges', value: '12' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <ThemedView style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <ThemedText style={styles.avatarText}>S</ThemedText>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <IconSymbol name="edit" size={14} color="white" />
          </TouchableOpacity>
        </View>
        <ThemedText type="title" style={styles.userName}>Student Name</ThemedText>
        <ThemedText style={styles.userEmail}>student@example.com</ThemedText>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Actions</ThemedText>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionCard}>
            <IconSymbol name="search" size={24} color="#4ECDC4" />
            <ThemedText style={styles.quickActionText}>Find Colleges</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCard}>
            <IconSymbol name="calculator" size={24} color="#FF6B6B" />
            <ThemedText style={styles.quickActionText}>Predict Colleges</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCard}>
            <IconSymbol name="compare" size={24} color="#45B7D1" />
            <ThemedText style={styles.quickActionText}>Compare</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Menu Items */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>My Account</ThemedText>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
              <IconSymbol name={item.icon as any} size={20} color="white" />
            </View>
            <View style={styles.menuContent}>
              <ThemedText style={styles.menuTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.menuSubtitle}>{item.subtitle}</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Support Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Support</ThemedText>
        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: '#95A5A6' }]}>
            <IconSymbol name="help" size={20} color="white" />
          </View>
          <View style={styles.menuContent}>
            <ThemedText style={styles.menuTitle}>Help & FAQ</ThemedText>
            <ThemedText style={styles.menuSubtitle}>Get answers to common questions</ThemedText>
          </View>
          <IconSymbol name="chevron.right" size={16} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: '#E74C3C' }]}>
            <IconSymbol name="mail" size={20} color="white" />
          </View>
          <View style={styles.menuContent}>
            <ThemedText style={styles.menuTitle}>Contact Us</ThemedText>
            <ThemedText style={styles.menuSubtitle}>Send us your feedback</ThemedText>
          </View>
          <IconSymbol name="chevron.right" size={16} color="#ccc" />
        </TouchableOpacity>
      </ThemedView>

      {/* Logout */}
      <ThemedView style={styles.section}>
        <TouchableOpacity style={styles.logoutButton}>
          <IconSymbol name="logout" size={20} color="#E74C3C" />
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 30,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#4ECDC4',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    backgroundColor: '#FF6B6B',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E74C3C',
  },
  logoutText: {
    color: '#E74C3C',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
