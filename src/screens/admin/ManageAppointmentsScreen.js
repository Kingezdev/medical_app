import React, { useState } from 'react';
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
import StatusBadge from '../../components/StatusBadge';
import { sampleAppointments } from '../../data/sampleData';
import { formatDate, formatTime } from '../../utils/helpers';

export default function ManageAppointmentsScreen() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  const filteredAppointments = activeTab === 'all'
    ? sampleAppointments
    : sampleAppointments.filter((a) => a.status === activeTab);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="All Appointments"
        subtitle={`${sampleAppointments.length} total appointments`}
      />

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabsContent}
      >
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
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <View style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateDay}>
                    {new Date(appointment.appointment_date).getDate()}
                  </Text>
                  <Text style={styles.dateMonth}>
                    {new Date(appointment.appointment_date).toLocaleString('default', { month: 'short' })}
                  </Text>
                </View>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.patientName}>{appointment.patient_name}</Text>
                  <Text style={styles.doctorName}>{appointment.doctor_name}</Text>
                  <View style={styles.infoRow}>
                    <Ionicons name="time-outline" size={12} color="#6B7280" />
                    <Text style={styles.infoText}>{formatTime(appointment.appointment_time)}</Text>
                  </View>
                  <Text style={styles.reasonText} numberOfLines={1}>{appointment.reason}</Text>
                </View>
                <StatusBadge status={appointment.status} size="small" />
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
  tabsScroll: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    maxHeight: 52,
  },
  tabsContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
    marginHorizontal: 2,
  },
  tabActive: {
    backgroundColor: '#F0F7FF',
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  tabText: {
    fontSize: 12,
    color: '#6B7280',
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
  appointmentCard: {
    padding: 4,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBox: {
    backgroundColor: '#F0F7FF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginRight: 12,
    minWidth: 45,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0066CC',
  },
  dateMonth: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  appointmentInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  doctorName: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  infoText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  reasonText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  bottomPadding: {
    height: 20,
  },
});
