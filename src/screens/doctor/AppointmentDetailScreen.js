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
import StatusBadge from '../../components/StatusBadge';
import InfoRow from '../../components/InfoRow';
import { sampleAppointments, sampleUsers, samplePatientProfiles } from '../../data/sampleData';
import { formatDate, formatTime } from '../../utils/helpers';

export default function AppointmentDetailScreen({ route }) {
  const navigation = useNavigation();
  const { appointmentId } = route.params;
  const appointment = sampleAppointments.find((a) => a.id === appointmentId);

  if (!appointment) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Not Found" showBack />
        <View style={styles.notFound}>
          <Text>Appointment not found.</Text>
        </View>
      </View>
    );
  }

  const patientUser = sampleUsers.find((u) => u.id === appointment.patient);
  const patientProfile = samplePatientProfiles.find((p) => p.user === appointment.patient);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Appointment Details"
        subtitle={`ID: #${appointment.id.toString().padStart(4, '0')}`}
        showBack
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <Card>
          <View style={styles.statusRow}>
            <StatusBadge status={appointment.status} />
            <Text style={styles.appointmentDate}>
              {formatDate(appointment.appointment_date)} at {formatTime(appointment.appointment_time)}
            </Text>
          </View>
        </Card>

        {/* Patient Info */}
        <Card>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.patientHeader}>
            <View style={styles.patientAvatar}>
              <Ionicons name="person" size={28} color="#0066CC" />
            </View>
            <View>
              <Text style={styles.patientName}>{appointment.patient_name}</Text>
              <Text style={styles.patientId}>{patientProfile?.student_id || 'N/A'}</Text>
            </View>
          </View>
          <InfoRow icon="call-outline" label="Phone" value={patientProfile?.phone_number} />
          <InfoRow icon="mail-outline" label="Email" value={patientUser?.email} />
          <InfoRow icon="male-female-outline" label="Gender" value={patientProfile?.gender} />
          <InfoRow icon="water-outline" label="Blood Group" value={patientProfile?.blood_group} last />
        </Card>

        {/* Appointment Details */}
        <Card>
          <Text style={styles.sectionTitle}>Appointment Details</Text>
          <InfoRow icon="medical-outline" label="Reason" value={appointment.reason} />
          <InfoRow icon="document-text-outline" label="Notes" value={appointment.notes || 'No notes added'} last />
        </Card>

        {/* Actions */}
        {appointment.status === 'confirmed' && (
          <TouchableOpacity
            style={styles.createRecordButton}
            onPress={() => navigation.navigate('CreateMedicalRecord', { appointmentId: appointment.id })}
          >
            <Ionicons name="create-outline" size={20} color="#FFFFFF" />
            <Text style={styles.createRecordText}>Create Medical Record</Text>
          </TouchableOpacity>
        )}

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
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentDate: {
    fontSize: 13,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  patientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  patientId: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  createRecordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066CC',
    borderRadius: 12,
    height: 52,
    marginTop: 8,
    gap: 8,
  },
  createRecordText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomPadding: {
    height: 20,
  },
});
