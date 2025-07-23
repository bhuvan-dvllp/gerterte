
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const styles = createStyles(colors);

  const menuItems = [
    { icon: 'heart', label: 'Favorite Colleges', count: 5 },
    { icon: 'history', label: 'Search History', count: null },
    { icon: 'settings', label: 'Settings', count: null },
    { icon: 'notifications', label: 'Notifications', count: null, hasSwitch: true },
    { icon: 'help-circle', label: 'Help & Support', count: null },
  ];

  const handleMenuPress = (item: any) => {
    if (item.label === 'Help & Support') {
      Alert.alert('Help & Support', 'Contact us at support@collegeduniya.com');
    } else {
      Alert.alert('Coming Soon', `${item.label} feature will be available soon.`);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => {
          Alert.alert('Signed Out', 'You have been signed out successfully.');
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>johndoe@example.com</Text>
              <Text style={styles.profileRole}>JEE Aspirant 2024</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Colleges Viewed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.secondary }]}>5</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.accent }]}>3</Text>
            <Text style={styles.statLabel}>Comparisons</Text>
          </View>
        </View>

        {/* Preferences Card */}
        <View style={styles.preferencesCard}>
          <Text style={styles.preferencesTitle}>Your Preferences</Text>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Interested Courses:</Text>
            <Text style={styles.preferenceValue}>Engineering, MBA</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Preferred Locations:</Text>
            <Text style={styles.preferenceValue}>Delhi, Mumbai, Bangalore</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Budget Range:</Text>
            <Text style={styles.preferenceValue}>₹2L - ₹10L per year</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item)}
            >
              <View style={styles.menuItemLeft}>
                <IconSymbol name={item.icon as any} size={20} color="#666" />
                <Text style={styles.menuItemLabel}>{item.label}</Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.count && (
                  <View style={styles.countBadge}>
                    <Text style={styles.countBadgeText}>{item.count}</Text>
                  </View>
                )}
                {item.hasSwitch ? (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: '#E0E0E0', true: colors.primary }}
                    thumbColor={notificationsEnabled ? 'white' : '#f4f3f4'}
                  />
                ) : (
                  <IconSymbol name="chevron-right" size={16} color="#ccc" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <IconSymbol name="log-out" size={20} color="#EF4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>College Duniya v1.0.0</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 14,
    color: '#666',
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editProfileButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  preferencesCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  preferencesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  preferenceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    flex: 1,
    textAlign: 'right',
  },
  menuContainer: {
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 12,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBadge: {
    backgroundColor: colors.backgroundGray,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  countBadgeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
    marginLeft: 12,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
});
