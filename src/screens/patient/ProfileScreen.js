import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import InfoRow from '../../components/InfoRow';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, profile, logout } = useAuth();

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="My Profile"
        subtitle="Your personal and medical information"
        rightComponent={
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Ionicons name="create-outline" size={20} color="#0066CC" />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.userName}>{user?.first_name} {user?.last_name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user?.role?.toUpperCase()}</Text>
          </View>
        </View>

        {/* Personal Information */}
        <Card>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <InfoRow icon="id-card-outline" label="Student/Staff ID" value={profile?.student_id} />
          <InfoRow icon="call-outline" label="Phone Number" value={profile?.phone_number} />
          <InfoRow icon="mail-outline" label="Email" value={user?.email} />
          <InfoRow icon="calendar-outline" label="Date of Birth" value={profile?.date_of_birth} />
          <InfoRow icon="male-female-outline" label="Gender" value={profile?.gender} last />
        </Card>

        {/* Medical Information */}
        <Card>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          <InfoRow icon="water-outline" label="Blood Group" value={profile?.blood_group} />
          <InfoRow icon="alert-circle-outline" label="Allergies" value={profile?.allergies} />
          <InfoRow icon="document-text-outline" label="Medical History" value={profile?.medical_history} last />
        </Card>

        {/* Academic Information */}
        <Card>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          <InfoRow icon="business-outline" label="Department" value={profile?.department} />
          <InfoRow icon="school-outline" label="Level" value={profile?.level} />
          <InfoRow icon="location-outline" label="Address" value={profile?.address} last />
        </Card>

        {/* Emergency Contact */}
        <Card>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <InfoRow icon="person-outline" label="Contact Name" value={profile?.emergency_contact_name} />
          <InfoRow icon="call-outline" label="Contact Phone" value={profile?.emergency_contact_phone} last />
        </Card>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('EditProfile')}>
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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
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
