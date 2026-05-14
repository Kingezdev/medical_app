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
import { sampleMedicalRecords, samplePrescriptions } from '../../data/sampleData';
import { formatDate } from '../../utils/helpers';

export default function MedicalRecordDetailScreen({ route }) {
  const { recordId } = route.params;
  const record = sampleMedicalRecords.find((r) => r.id === recordId);
  const prescriptions = samplePrescriptions.filter((p) => p.medical_record === recordId);

  if (!record) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Record Not Found" showBack />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Medical record not found.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Medical Record"
        subtitle={`${formatDate(record.created_at)}`}
        showBack
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Doctor Info */}
        <Card>
          <View style={styles.doctorSection}>
            <View style={styles.doctorAvatar}>
              <Ionicons name="medical" size={28} color="#0066CC" />
            </View>
            <View>
              <Text style={styles.doctorName}>{record.created_by_name}</Text>
              <Text style={styles.recordDate}>{formatDate(record.created_at)}</Text>
            </View>
          </View>
        </Card>

        {/* Diagnosis */}
        <Card>
          <Text style={styles.sectionTitle}>Diagnosis</Text>
          <Text style={styles.diagnosisText}>{record.diagnosis}</Text>
        </Card>

        {/* Treatment Notes */}
        <Card>
          <Text style={styles.sectionTitle}>Treatment Notes</Text>
          <Text style={styles.notesText}>{record.treatment_notes}</Text>
        </Card>

        {/* Vital Signs */}
        <Card>
          <Text style={styles.sectionTitle}>Vital Signs</Text>
          <View style={styles.vitalsGrid}>
            <View style={styles.vitalItem}>
              <Ionicons name="thermometer" size={20} color="#E53935" />
              <Text style={styles.vitalValue}>{record.vital_signs.temperature}</Text>
              <Text style={styles.vitalLabel}>Temperature</Text>
            </View>
            <View style={styles.vitalItem}>
              <Ionicons name="heart" size={20} color="#E53935" />
              <Text style={styles.vitalValue}>{record.vital_signs.pulse_rate}</Text>
              <Text style={styles.vitalLabel}>Pulse Rate</Text>
            </View>
            <View style={styles.vitalItem}>
              <Ionicons name="fitness" size={20} color="#0066CC" />
              <Text style={styles.vitalValue}>{record.vital_signs.blood_pressure}</Text>
              <Text style={styles.vitalLabel}>Blood Pressure</Text>
            </View>
            <View style={styles.vitalItem}>
              <Ionicons name="airplane" size={20} color="#00A86B" />
              <Text style={styles.vitalValue}>{record.vital_signs.respiratory_rate}</Text>
              <Text style={styles.vitalLabel}>Respiratory</Text>
            </View>
            <View style={styles.vitalItem}>
              <Ionicons name="scale" size={20} color="#FF9800" />
              <Text style={styles.vitalValue}>{record.vital_signs.weight}</Text>
              <Text style={styles.vitalLabel}>Weight</Text>
            </View>
            <View style={styles.vitalItem}>
              <Ionicons name="resize" size={20} color="#9C27B0" />
              <Text style={styles.vitalValue}>{record.vital_signs.height}</Text>
              <Text style={styles.vitalLabel}>Height</Text>
            </View>
          </View>
        </Card>

        {/* Prescriptions */}
        {prescriptions.length > 0 && (
          <Card>
            <Text style={styles.sectionTitle}>Prescriptions</Text>
            {prescriptions.map((prescription, index) => (
              <View key={prescription.id} style={[
                styles.prescriptionItem,
                index < prescriptions.length - 1 && styles.prescriptionBorder,
              ]}>
                <View style={styles.prescriptionHeader}>
                  <Ionicons name="medical-outline" size={18} color="#0066CC" />
                  <Text style={styles.drugName}>{prescription.drug_name}</Text>
                </View>
                <View style={styles.prescriptionDetails}>
                  <View style={styles.prescriptionDetail}>
                    <Text style={styles.detailLabel}>Dosage</Text>
                    <Text style={styles.detailValue}>{prescription.dosage}</Text>
                  </View>
                  <View style={styles.prescriptionDetail}>
                    <Text style={styles.detailLabel}>Frequency</Text>
                    <Text style={styles.detailValue}>{prescription.frequency}</Text>
                  </View>
                  <View style={styles.prescriptionDetail}>
                    <Text style={styles.detailLabel}>Duration</Text>
                    <Text style={styles.detailValue}>{prescription.duration}</Text>
                  </View>
                </View>
                <View style={styles.instructionsBox}>
                  <Ionicons name="information-circle-outline" size={14} color="#FF9800" />
                  <Text style={styles.instructionsText}>{prescription.instructions}</Text>
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* Follow-up */}
        {record.follow_up_date && (
          <Card style={styles.followUpCard}>
            <View style={styles.followUpContent}>
              <Ionicons name="calendar" size={24} color="#FF9800" />
              <View style={styles.followUpInfo}>
                <Text style={styles.followUpTitle}>Follow-up Appointment</Text>
                <Text style={styles.followUpDate}>{formatDate(record.follow_up_date)}</Text>
              </View>
            </View>
          </Card>
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
  notFoundText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  doctorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  recordDate: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 10,
  },
  diagnosisText: {
    fontSize: 15,
    color: '#1A1A2E',
    fontWeight: '500',
    lineHeight: 22,
  },
  notesText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  vitalItem: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 14,
  },
  vitalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    marginTop: 6,
  },
  vitalLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  prescriptionItem: {
    paddingVertical: 14,
  },
  prescriptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  prescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  drugName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0066CC',
    marginLeft: 8,
  },
  prescriptionDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 10,
  },
  prescriptionDetail: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    color: '#1A1A2E',
    fontWeight: '600',
  },
  instructionsBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 10,
    alignItems: 'flex-start',
  },
  instructionsText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
    flex: 1,
    lineHeight: 18,
  },
  followUpCard: {
    backgroundColor: '#FFF8E1',
  },
  followUpContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followUpInfo: {
    marginLeft: 14,
  },
  followUpTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  followUpDate: {
    fontSize: 13,
    color: '#FF9800',
    fontWeight: '600',
    marginTop: 2,
  },
  bottomPadding: {
    height: 20,
  },
});
