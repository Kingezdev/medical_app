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
import { sampleDoctorProfiles } from '../../data/sampleData';

export default function DoctorProfileScreen() {
  const { user, logout } = useAuth();
  const profile = sampleDoctorProfiles.find((d) => d.user === user?.id);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="My Profile"
        subtitle="Your professional information"
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="medical" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.userName}>{user?.first_name} {user?.last_name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>DOCTOR</Text>
          </View>
        </View>

        {/* Professional Info */}
        <Card>
          <Text style={styles.sectionTitle}>Professional Information</Text>
          <InfoRow icon="medical-outline" label="Specialisation" value={profile?.specialisation} />
          <InfoRow icon="school-outline" label="Qualification" value={profile?.qualification} />
          <InfoRow icon="call-outline" label="Phone" value={profile?.phone_number} />
          <InfoRow icon="time-outline" label="Consultation Hours" value={profile?.consultation_hours} />
          <InfoRow icon="location-outline" label="Room" value={profile?.room_number} last />
        </Card>

        {/* Bio */}
        {profile?.bio && (
          <Card>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bioText}>{profile.bio}</Text>
          </Card>
        )}

        {/* Availability */}
        <Card>
          <View style={styles.availabilityRow}>
            <Ionicons
              name={profile?.is_available ? "checkmark-circle" : "close-circle"}
              size={24}
              color={profile?.is_available ? '#4CAF50' : '#E53935'}
            />
            <View style={styles.availabilityInfo}>
              <Text style={styles.availabilityLabel}>Availability Status</Text>
              <Text style={[
                styles.availabilityValue,
                { color: profile?.is_available ? '#4CAF50' : '#E53935' },
              ]}>
                {profile?.is_available ? 'Available for Appointments' : 'Currently Unavailable'}
              </Text>
            </View>
          </View>
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
    backgroundColor: '#0066CC',
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
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0066CC',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityInfo: {
    marginLeft: 12,
  },
  availabilityLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  availabilityValue: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
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
