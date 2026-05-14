import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import InfoRow from '../../components/InfoRow';
import { sampleUsers, samplePatientProfiles, sampleMedicalRecords } from '../../data/sampleData';
import { formatDate } from '../../utils/helpers';

export default function PatientDetailScreen({ route }) {
  const { patientId } = route.params;
  const user = sampleUsers.find((u) => u.id === patientId);
  const profile = samplePatientProfiles.find((p) => p.user === patientId);
  const records = sampleMedicalRecords.filter((r) => r.patient === patientId);

  if (!user || !profile) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Not Found" showBack />
        <View style={styles.notFound}>
          <Text>Patient not found.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Patient Details"
        subtitle={`${user.first_name} ${user.last_name}`}
        showBack
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Patient Header */}
        <View style={styles.patientHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={36} color="#FFFFFF" />
          </View>
          <Text style={styles.patientName}>{user.first_name} {user.last_name}</Text>
          <Text style={styles.patientId}>{profile.student_id}</Text>
        </View>

        {/* Personal Info */}
        <Card>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <InfoRow icon="mail-outline" label="Email" value={user.email} />
          <InfoRow icon="call-outline" label="Phone" value={profile.phone_number} />
          <InfoRow icon="calendar-outline" label="Date of Birth" value={profile.date_of_birth} />
          <InfoRow icon="male-female-outline" label="Gender" value={profile.gender} />
          <InfoRow icon="water-outline" label="Blood Group" value={profile.blood_group} last />
        </Card>

        {/* Academic Info */}
        <Card>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          <InfoRow icon="business-outline" label="Department" value={profile.department} />
          <InfoRow icon="school-outline" label="Level" value={profile.level} />
          <InfoRow icon="location-outline" label="Address" value={profile.address} last />
        </Card>

        {/* Medical History */}
        <Card>
          <Text style={styles.sectionTitle}>Medical History</Text>
          <InfoRow icon="alert-circle-outline" label="Allergies" value={profile.allergies} />
          <InfoRow icon="document-text-outline" label="History" value={profile.medical_history} last />
        </Card>

        {/* Emergency Contact */}
        <Card>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <InfoRow icon="person-outline" label="Name" value={profile.emergency_contact_name} />
          <InfoRow icon="call-outline" label="Phone" value={profile.emergency_contact_phone} last />
        </Card>

        {/* Visit History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visit History ({records.length})</Text>
          {records.map((record) => (
            <Card key={record.id}>
              <View style={styles.recordItem}>
                <View style={styles.recordIcon}>
                  <Ionicons name="document-text" size={20} color="#0066CC" />
                </View>
                <View style={styles.recordInfo}>
                  <Text style={styles.recordDiagnosis} numberOfLines={1}>{record.diagnosis}</Text>
                  <Text style={styles.recordDoctor}>{record.created_by_name}</Text>
                  <Text style={styles.recordDate}>{formatDate(record.created_at)}</Text>
                </View>
              </View>
            </Card>
          ))}
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
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  patientHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  patientId: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  section: {
    marginBottom: 16,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recordInfo: {
    flex: 1,
  },
  recordDiagnosis: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  recordDoctor: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  recordDate: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  bottomPadding: {
    height: 20,
  },
});
