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
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { sampleMedicalRecords } from '../../data/sampleData';
import { formatDate } from '../../utils/helpers';

export default function MedicalRecordsScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const userRecords = sampleMedicalRecords.filter((r) => r.patient === user?.id);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Medical Records"
        subtitle="Your health history and diagnoses"
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {userRecords.length === 0 ? (
          <EmptyState
            icon="document-text-outline"
            title="No Medical Records"
            message="Your medical records will appear here after your first consultation."
          />
        ) : (
          userRecords.map((record) => (
            <Card
              key={record.id}
              onPress={() => navigation.navigate('RecordDetail', { recordId: record.id })}
            >
              <View style={styles.recordCard}>
                <View style={styles.recordHeader}>
                  <View style={styles.recordIcon}>
                    <Ionicons name="document-text" size={24} color="#0066CC" />
                  </View>
                  <View style={styles.recordHeaderInfo}>
                    <Text style={styles.recordDate}>{formatDate(record.created_at)}</Text>
                    <Text style={styles.recordDoctor}>{record.created_by_name}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
                </View>

                <View style={styles.recordBody}>
                  <Text style={styles.diagnosisLabel}>Diagnosis</Text>
                  <Text style={styles.diagnosisText} numberOfLines={2}>
                    {record.diagnosis}
                  </Text>

                  {record.follow_up_date && (
                    <View style={styles.followUpRow}>
                      <Ionicons name="calendar-outline" size={14} color="#FF9800" />
                      <Text style={styles.followUpText}>
                        Follow-up: {formatDate(record.follow_up_date)}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.recordFooter}>
                  <View style={styles.footerItem}>
                    <Ionicons name="thermometer-outline" size={14} color="#6B7280" />
                    <Text style={styles.footerText}>{record.vital_signs.temperature}</Text>
                  </View>
                  <View style={styles.footerItem}>
                    <Ionicons name="heart-outline" size={14} color="#6B7280" />
                    <Text style={styles.footerText}>{record.vital_signs.pulse_rate}</Text>
                  </View>
                  <View style={styles.footerItem}>
                    <Ionicons name="fitness-outline" size={14} color="#6B7280" />
                    <Text style={styles.footerText}>{record.vital_signs.blood_pressure}</Text>
                  </View>
                </View>
              </View>
            </Card>
          ))
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  recordCard: {
    padding: 4,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  recordIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recordHeaderInfo: {
    flex: 1,
  },
  recordDate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  recordDoctor: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  recordBody: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
    marginBottom: 12,
  },
  diagnosisLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  diagnosisText: {
    fontSize: 14,
    color: '#1A1A2E',
    fontWeight: '500',
    lineHeight: 20,
  },
  followUpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  followUpText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
    marginLeft: 6,
  },
  recordFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
    gap: 16,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  bottomPadding: {
    height: 20,
  },
});
