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

export default function AppointmentsScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');

  const userAppointments = sampleAppointments.filter((a) => a.patient === user?.id);

  const upcoming = userAppointments.filter((a) =>
    ['pending', 'confirmed'].includes(a.status)
  );
  const past = userAppointments.filter((a) =>
    ['completed', 'cancelled'].includes(a.status)
  );

  const displayedAppointments = activeTab === 'upcoming' ? upcoming : past;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="My Appointments"
        subtitle="Manage your medical appointments"
        rightComponent={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('BookAppointment')}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
            Upcoming ({upcoming.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.tabActive]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
            Past ({past.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {displayedAppointments.length === 0 ? (
          <EmptyState
            icon="calendar-outline"
            title={`No ${activeTab} appointments`}
            message={
              activeTab === 'upcoming'
                ? 'Book your first appointment to get started with healthcare services.'
                : 'Your appointment history will appear here.'
            }
          />
        ) : (
          displayedAppointments.map((appointment) => (
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
                    <Text style={styles.dateYear}>
                      {new Date(appointment.appointment_date).getFullYear()}
                    </Text>
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.doctorName}>{appointment.doctor_name}</Text>
                    <View style={styles.infoRow}>
                      <Ionicons name="time-outline" size={14} color="#6B7280" />
                      <Text style={styles.infoText}>{formatTime(appointment.appointment_time)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Ionicons name="medical-outline" size={14} color="#6B7280" />
                      <Text style={styles.infoText}>{appointment.reason}</Text>
                    </View>
                    {appointment.notes && (
                      <View style={styles.infoRow}>
                        <Ionicons name="document-text-outline" size={14} color="#6B7280" />
                        <Text style={styles.infoText} numberOfLines={1}>{appointment.notes}</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.appointmentFooter}>
                  <StatusBadge status={appointment.status} />
                  {appointment.status === 'pending' && (
                    <TouchableOpacity style={styles.cancelButton}>
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                  )}
                  {appointment.status === 'completed' && (
                    <TouchableOpacity style={styles.viewButton}>
                      <Text style={styles.viewText}>View Record</Text>
                    </TouchableOpacity>
                  )}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: '#F0F7FF',
  },
  tabText: {
    fontSize: 14,
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
    marginBottom: 14,
  },
  dateBox: {
    backgroundColor: '#F0F7FF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 14,
    minWidth: 60,
  },
  dateDay: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0066CC',
  },
  dateMonth: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  dateYear: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  appointmentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
    flex: 1,
  },
  appointmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  cancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFEBEE',
  },
  cancelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E53935',
  },
  viewButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E3F2FD',
  },
  viewText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0066CC',
  },
  bottomPadding: {
    height: 20,
  },
});
