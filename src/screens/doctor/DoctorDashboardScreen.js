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
import { useAuth } from '../../context/AuthContext';
import { sampleAppointments, sampleDoctorProfiles } from '../../data/sampleData';
import { formatDate, formatTime } from '../../utils/helpers';

export default function DoctorDashboardScreen() {
  const navigation = useNavigation();
  const { user, profile } = useAuth();

  const doctorProfile = sampleDoctorProfiles.find((d) => d.user === user?.id);

  const todayAppointments = sampleAppointments.filter(
    (a) => a.doctor === user?.id && a.appointment_date === new Date().toISOString().split('T')[0]
  );

  const upcomingAppointments = sampleAppointments.filter(
    (a) => a.doctor === user?.id && ['pending', 'confirmed'].includes(a.status)
  ).slice(0, 3);

  const stats = {
    today: todayAppointments.length,
    pending: sampleAppointments.filter((a) => a.doctor === user?.id && a.status === 'pending').length,
    completed: sampleAppointments.filter((a) => a.doctor === user?.id && a.status === 'completed').length,
    total: sampleAppointments.filter((a) => a.doctor === user?.id).length,
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={`Dr. ${user?.first_name?.replace('Dr. ', '') || 'Doctor'}`}
        subtitle="Doctor Dashboard"
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#F0F7FF' }]}>
            <Ionicons name="calendar" size={24} color="#0066CC" />
            <Text style={styles.statValue}>{stats.today}</Text>
            <Text style={styles.statLabel}>Today's</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
            <Ionicons name="time" size={24} color="#FF9800" />
            <Text style={styles.statValue}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F3E5F5' }]}>
            <Ionicons name="people" size={24} color="#9C27B0" />
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Appointments')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#F0F7FF' }]}>
              <Ionicons name="calendar" size={24} color="#0066CC" />
            </View>
            <Text style={styles.actionText}>View{'
'}Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Patients')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="people" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.actionText}>My{'
'}Patients</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Health')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="heart" size={24} color="#FF9800" />
            </View>
            <Text style={styles.actionText}>Health{'
'}Info</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {todayAppointments.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Ionicons name="sunny-outline" size={40} color="#CBD5E1" />
              <Text style={styles.emptyText}>No appointments scheduled for today</Text>
            </Card>
          ) : (
            todayAppointments.map((appointment) => (
              <Card
                key={appointment.id}
                onPress={() => navigation.navigate('Appointments', {
                  screen: 'AppointmentDetail',
                  params: { appointmentId: appointment.id },
                })}
              >
                <View style={styles.appointmentCard}>
                  <View style={styles.timeColumn}>
                    <Text style={styles.timeText}>{formatTime(appointment.appointment_time)}</Text>
                  </View>
                  <View style={styles.appointmentDivider} />
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.patientName}>{appointment.patient_name}</Text>
                    <Text style={styles.appointmentReason} numberOfLines={1}>
                      {appointment.reason}
                    </Text>
                    <StatusBadge status={appointment.status} size="small" />
                  </View>
                </View>
              </Card>
            ))
          )}
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          </View>
          {upcomingAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              onPress={() => navigation.navigate('Appointments', {
                screen: 'AppointmentDetail',
                params: { appointmentId: appointment.id },
              })}
            >
              <View style={styles.upcomingCard}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateDay}>
                    {new Date(appointment.appointment_date).getDate()}
                  </Text>
                  <Text style={styles.dateMonth}>
                    {new Date(appointment.appointment_date).toLocaleString('default', { month: 'short' })}
                  </Text>
                </View>
                <View style={styles.upcomingInfo}>
                  <Text style={styles.upcomingPatient}>{appointment.patient_name}</Text>
                  <Text style={styles.upcomingTime}>
                    {formatTime(appointment.appointment_time)} · {appointment.reason}
                  </Text>
                </View>
                <StatusBadge status={appointment.status} size="small" />
              </View>
            </Card>
          ))}
        </View>

        {/* Consultation Hours */}
        {doctorProfile && (
          <Card>
            <View style={styles.hoursSection}>
              <Ionicons name="time-outline" size={20} color="#0066CC" />
              <View style={styles.hoursInfo}>
                <Text style={styles.hoursLabel}>Consultation Hours</Text>
                <Text style={styles.hoursValue}>{doctorProfile.consultation_hours}</Text>
              </View>
            </View>
            <View style={[styles.hoursSection, { marginTop: 10 }]}>
              <Ionicons name="location-outline" size={20} color="#0066CC" />
              <View style={styles.hoursInfo}>
                <Text style={styles.hoursLabel}>Room</Text>
                <Text style={styles.hoursValue}>{doctorProfile.room_number}</Text>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '23%',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A2E',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  actionButton: {
    alignItems: 'center',
    width: '30%',
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 11,
    color: '#1A1A2E',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  seeAll: {
    fontSize: 13,
    color: '#0066CC',
    fontWeight: '600',
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 10,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  timeColumn: {
    width: 60,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0066CC',
  },
  appointmentDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  appointmentReason: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 4,
  },
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  dateBox: {
    backgroundColor: '#F0F7FF',
    borderRadius: 10,
    padding: 8,
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
  upcomingInfo: {
    flex: 1,
  },
  upcomingPatient: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  upcomingTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  hoursSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursInfo: {
    marginLeft: 12,
  },
  hoursLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  hoursValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginTop: 1,
  },
  bottomPadding: {
    height: 20,
  },
});
