import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import InfoRow from '../../components/InfoRow';
import { useAuth } from '../../context/AuthContext';

export default function AdminProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Admin Profile"
        subtitle="Your account information"
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="shield" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.userName}>{user?.first_name} {user?.last_name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>ADMINISTRATOR</Text>
          </View>
        </View>

        {/* Account Info */}
        <Card>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <InfoRow icon="person-outline" label="Username" value={user?.username} />
          <InfoRow icon="mail-outline" label="Email" value={user?.email} />
          <InfoRow icon="calendar-outline" label="Member Since" value={new Date(user?.date_joined).toLocaleDateString()} last />
        </Card>

        {/* System Info */}
        <Card>
          <Text style={styles.sectionTitle}>System Information</Text>
          <InfoRow icon="medical-outline" label="App Name" value="PLASU Medical" />
          <InfoRow icon="information-circle-outline" label="Version" value="1.0.0" />
          <InfoRow icon="business-outline" label="Institution" value="Plateau State University, Bokkos" last />
        </Card>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="create-outline" size={20} color="#0066CC" />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="lock-closed-outline" size={20} color="#0066CC" />
            <Text style={styles.actionText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color="#E53935" />
            <Text style={[styles.actionText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>

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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  userEmail: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  roleBadge: {
    marginTop: 8,
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FF9800',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  actionsSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#FFEBEE',
  },
  logoutText: {
    color: '#E53935',
  },
  bottomPadding: {
    height: 20,
  },
});
