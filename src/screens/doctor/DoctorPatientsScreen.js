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
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import EmptyState from '../../components/EmptyState';
import { sampleUsers, samplePatientProfiles, sampleMedicalRecords } from '../../data/sampleData';

export default function DoctorPatientsScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique patients from medical records (patients this doctor has seen)
  const patientIds = [...new Set(sampleMedicalRecords.map((r) => r.patient))];

  const patients = patientIds.map((id) => {
    const user = sampleUsers.find((u) => u.id === id);
    const profile = samplePatientProfiles.find((p) => p.user === id);
    const records = sampleMedicalRecords.filter((r) => r.patient === id);
    return {
      id,
      name: `${user?.first_name} ${user?.last_name}`,
      email: user?.email,
      student_id: profile?.student_id,
      gender: profile?.gender,
      blood_group: profile?.blood_group,
      phone: profile?.phone_number,
      department: profile?.department,
      totalVisits: records.length,
      lastVisit: records.length > 0 ? records[records.length - 1].created_at : null,
    };
  });

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.student_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="My Patients"
        subtitle="Patients you have consulted"
      />

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchText}
            placeholder="Search patients..."
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredPatients.length === 0 ? (
          <EmptyState
            icon="people-outline"
            title="No Patients Found"
            message={searchQuery ? 'No patients match your search.' : 'You have not consulted any patients yet.'}
          />
        ) : (
          filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              onPress={() => navigation.navigate('PatientDetail', { patientId: patient.id })}
            >
              <View style={styles.patientCard}>
                <View style={styles.patientHeader}>
                  <View style={styles.patientAvatar}>
                    <Ionicons name="person" size={24} color="#0066CC" />
                  </View>
                  <View style={styles.patientInfo}>
                    <Text style={styles.patientName}>{patient.name}</Text>
                    <Text style={styles.patientId}>{patient.student_id}</Text>
                  </View>
                  <View style={styles.visitBadge}>
                    <Text style={styles.visitText}>{patient.totalVisits} visits</Text>
                  </View>
                </View>

                <View style={styles.patientDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="male-female-outline" size={14} color="#6B7280" />
                    <Text style={styles.detailText}>{patient.gender}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="water-outline" size={14} color="#6B7280" />
                    <Text style={styles.detailText}>{patient.blood_group}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="business-outline" size={14} color="#6B7280" />
                    <Text style={styles.detailText}>{patient.department}</Text>
                  </View>
                </View>

                <View style={styles.patientFooter}>
                  <Ionicons name="call-outline" size={12} color="#9CA3AF" />
                  <Text style={styles.footerText}>{patient.phone}</Text>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  patientCard: {
    padding: 4,
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  patientId: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  visitBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  visitText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },
  patientDetails: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  patientFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  bottomPadding: {
    height: 20,
  },
});
