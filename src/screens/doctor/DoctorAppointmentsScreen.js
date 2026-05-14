import React, { useState } from 'react';
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
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { sampleAppointments } from '../../data/sampleData';
import { formatDate, formatTime } from '../../utils/helpers';

export default function DoctorAppointmentsScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');

  const doctorAppointments = sampleAppointments.filter((a) => a.doctor === user?.id);

  const tabs = {
    pending: doctorAppointments.filter((a) => a.status === 'pending'),
    confirmed: doctorAppointments.filter((a) => a.status === 'confirmed'),
    completed: doctorAppointments.filter((a) => a.status === 'completed'),
    cancelled: doctorAppointments.filter((a) => a.status === 'cancelled'),
  };

  const displayedAppointments = tabs[activeTab] || [];

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Appointments"
        subtitle="Manage your patient appointments"
      />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {Object.keys(tabs).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tabs[tab].length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {displayedAppointments.length === 0 ? (
          <EmptyState
            icon="calendar-outline"
            title={`No ${activeTab} appointments`}
            message="No appointments in this category."
          />
        ) : (
          displayedAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              onPress={() => navigation.navigate('AppointmentDetail', { appointmentId: appointment.id })}
            >
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
                    <View style={styles.infoRow}>
                      <Ionicons name="time-outline" size={14} color="#6B7280" />
                      <Text style={styles.infoText}>{formatTime(appointment.appointment_time)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Ionicons name="medical-outline" size={14} color="#6B7280" />
                      <Text style={styles.infoText}>{appointment.reason}</Text>
                    </View>
                  </View>
                  <StatusBadge status={appointment.status} size="small" />
                </View>

                {appointment.status === 'pending' && (
                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.confirmButton}>
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                      <Text style={styles.confirmText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectButton}>
                      <Ionicons name="close" size={14} color="#E53935" />
                      <Text style={styles.rejectText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {appointment.status === 'confirmed' && (
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => navigation.navigate('CreateMedicalRecord', { appointmentId: appointment.id })}
                  >
                    <Ionicons name="create-outline" size={14} color="#FFFFFF" />
                    <Text style={styles.completeText}>Create Medical Record</Text>
                  </TouchableOpacity>
                )}
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
    minWidth: 50,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0066CC',
  },
  dateMonth: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  appointmentInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 5,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  confirmButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 8,
    gap: 4,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    paddingVertical: 8,
    gap: 4,
  },
  rejectText: {
    color: '#E53935',
    fontSize: 13,
    fontWeight: '600',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 6,
  },
  completeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
});
