import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { sampleUsers, samplePatientProfiles, sampleDoctorProfiles } from '../../data/sampleData';

export default function ManageUsersScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'patient', label: 'Patients' },
    { key: 'doctor', label: 'Doctors' },
    { key: 'admin', label: 'Admins' },
  ];

  const filteredUsers = sampleUsers.filter((user) => {
    const matchesTab = activeTab === 'all' || user.role === activeTab;
    const matchesSearch =
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getUserExtra = (user) => {
    if (user.role === 'patient') {
      const profile = samplePatientProfiles.find((p) => p.user === user.id);
      return profile?.student_id || 'N/A';
    }
    if (user.role === 'doctor') {
      const profile = sampleDoctorProfiles.find((d) => d.user === user.id);
      return profile?.specialisation || 'N/A';
    }
    return 'Administrator';
  };

  const roleColors = {
    patient: '#4CAF50',
    doctor: '#9C27B0',
    admin: '#FF9800',
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Manage Users"
        subtitle={`${sampleUsers.length} total users`}
      />

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchText}
            placeholder="Search users..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <View style={styles.userCard}>
              <View style={styles.userHeader}>
                <View style={styles.userAvatar}>
                  <Ionicons
                    name={user.role === 'doctor' ? 'medical' : user.role === 'admin' ? 'shield' : 'person'}
                    size={20}
                    color="#0066CC"
                  />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.first_name} {user.last_name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
                <View style={[styles.roleBadge, { backgroundColor: roleColors[user.role] + '20' }]}>
                  <Text style={[styles.roleText, { color: roleColors[user.role] }]}>
                    {user.role.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.userFooter}>
                <Ionicons name="id-card-outline" size={14} color="#9CA3AF" />
                <Text style={styles.footerText}>{getUserExtra(user)}</Text>
                <View style={styles.statusDot}>
                  <View style={[styles.dot, { backgroundColor: user.is_active ? '#4CAF50' : '#E53935' }]} />
                  <Text style={styles.statusText}>{user.is_active ? 'Active' : 'Inactive'}</Text>
                </View>
              </View>
            </View>
          </Card>
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchText: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A2E',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  tabActive: {
    backgroundColor: '#F0F7FF',
  },
  tabText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#0066CC',
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  userCard: {
    padding: 4,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  userEmail: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '700',
  },
  userFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 5,
    flex: 1,
  },
  statusDot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    color: '#6B7280',
  },
  bottomPadding: {
    height: 20,
  },
});
