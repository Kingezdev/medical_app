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
import { useAuth } from '../../context/AuthContext';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { sampleAppointments, sampleMedicalRecords, sampleNotifications } from '../../data/sampleData';
import { formatDate, formatTime } from '../../utils/helpers';

export default function PatientDashboardScreen() {
  const navigation = useNavigation();
  const { user, profile } = useAuth();

  const upcomingAppointments = sampleAppointments.filter(
    (a) => a.patient === user?.id && ['pending', 'confirmed'].includes(a.status)
  ).slice(0, 2);

  const recentRecords = sampleMedicalRecords
    .filter((r) => r.patient === user?.id)
    .slice(0, 2);

  const unreadNotifications = sampleNotifications.filter(
    (n) => n.recipient === user?.id && !n.is_read
  ).length;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={`Hello, ${user?.first_name || 'Patient'}`}
        subtitle="Welcome to PLASU Medical"
        rightComponent={
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color="#1A1A2E" />
            {unreadNotifications > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{unreadNotifications}</Text>
              </View>
            )}
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Appointments', { screen: 'BookAppointment' })}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="calendar" size={24} color="#0066CC" />
            </View>
            <Text style={styles.actionText}>Book{'\n'}Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Records')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="document-text" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.actionText}>Medical{'\n'}Records</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Health')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="heart" size={24} color="#FF9800" />
            </View>
            <Text style={styles.actionText}>Health{'\n'}Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="person" size={24} color="#9C27B0" />
            </View>
            <Text style={styles.actionText}>My{'\n'}Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Health Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="fitness" size={24} color="#0066CC" />
            <Text style={styles.statValue}>{profile?.blood_group || 'N/A'}</Text>
            <Text style={styles.statLabel}>Blood Group</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="calendar-number" size={24} color="#00A86B" />
            <Text style={styles.statValue}>{upcomingAppointments.length}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="document-text" size={24} color="#FF9800" />
            <Text style={styles.statValue}>{recentRecords.length}</Text>
            <Text style={styles.statLabel}>Records</Text>
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingAppointments.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Ionicons name="calendar-outline" size={40} color="#CBD5E1" />
              <Text style={styles.emptyText}>No upcoming appointments</Text>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => navigation.navigate('Appointments', { screen: 'BookAppointment' })}
              >
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </Card>
          ) : (
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} onPress={() => navigation.navigate('Appointments')}>
                <View style={styles.appointmentCard}>
                  <View style={styles.appointmentLeft}>
                    <View style={styles.dateBox}>
                      <Text style={styles.dateDay}>
                        {new Date(appointment.appointment_date).getDate()}
                      </Text>
                      <Text style={styles.dateMonth}>
                        {new Date(appointment.appointment_date).toLocaleString('default', { month: 'short' })}
                      </Text>
                    </View>
                    <View style={styles.appointmentInfo}>
                      <Text style={styles.appointmentDoctor}>{appointment.doctor_name}</Text>
                      <Text style={styles.appointmentTime}>
                        <Ionicons name="time-outline" size={12} color="#6B7280" /> {formatTime(appointment.appointment_time)}
                      </Text>
                      <Text style={styles.appointmentReason} numberOfLines={1}>
                        {appointment.reason}
                      </Text>
                    </View>
                  </View>
                  <StatusBadge status={appointment.status} size="small" />
                </View>
              </Card>
            ))
          )}
        </View>

        {/* Recent Medical Records */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Medical Records</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Records')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentRecords.map((record) => (
            <Card key={record.id} onPress={() => navigation.navigate('Records', { screen: 'RecordDetail', params: { recordId: record.id } })}>
              <View style={styles.recordCard}>
                <View style={styles.recordIcon}>
                  <Ionicons name="document-text" size={24} color="#0066CC" />
                </View>
                <View style={styles.recordInfo}>
                  <Text style={styles.recordDiagnosis} numberOfLines={1}>
                    {record.diagnosis}
                  </Text>
                  <Text style={styles.recordDoctor}>{record.created_by_name}</Text>
                  <Text style={styles.recordDate}>{formatDate(record.created_at)}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
              </View>
            </Card>
          ))}
        </View>

        {/* Health Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Health Tips</Text>
          <Card style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Ionicons name="water" size={28} color="#0066CC" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Stay Hydrated</Text>
              <Text style={styles.tipText}>
                Drink at least 8 glasses of water daily to maintain good health and energy levels.
              </Text>
            </View>
          </Card>
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
  scrollView: {
    flex: 1,
  },
  notificationButton: {
    padding: 4,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E53935',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  actionButton: {
    alignItems: 'center',
    width: '22%',
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    width: '30%',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A2E',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 16,
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
    marginBottom: 14,
  },
  bookButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appointmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateBox: {
    backgroundColor: '#F0F7FF',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginRight: 14,
    minWidth: 50,
  },
  dateDay: {
    fontSize: 18,
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
  appointmentDoctor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  appointmentTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  appointmentReason: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
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
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  tipText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    lineHeight: 18,
  },
  bottomPadding: {
    height: 20,
  },
});
