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
import { sampleAdminStats } from '../../data/sampleData';

export default function AdminDashboardScreen() {
  const navigation = useNavigation();
  const stats = sampleAdminStats;

  const statCards = [
    { label: 'Total Users', value: stats.total_users, icon: 'people', color: '#0066CC', bgColor: '#F0F7FF', screen: 'ManageUsers' },
    { label: 'Patients', value: stats.total_patients, icon: 'person', color: '#4CAF50', bgColor: '#E8F5E9', screen: 'ManageUsers' },
    { label: 'Doctors', value: stats.total_doctors, icon: 'medical', color: '#9C27B0', bgColor: '#F3E5F5', screen: 'ManageUsers' },
    { label: 'Appointments', value: stats.total_appointments, icon: 'calendar', color: '#FF9800', bgColor: '#FFF3E0', screen: 'ManageAppointments' },
  ];

  const quickActions = [
    { label: 'Manage Users', icon: 'people-outline', screen: 'ManageUsers', color: '#0066CC' },
    { label: 'Appointments', icon: 'calendar-outline', screen: 'ManageAppointments', color: '#FF9800' },
    { label: 'Health Info', icon: 'heart-outline', screen: 'ManageHealthInfo', color: '#4CAF50' },
    { label: 'Profile', icon: 'person-outline', screen: 'AdminProfile', color: '#9C27B0' },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Admin Dashboard"
        subtitle="PLASU Medical System Overview"
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {statCards.map((stat, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.statCard, { backgroundColor: stat.bgColor }]}
              onPress={() => navigation.navigate(stat.screen)}
            >
              <Ionicons name={stat.icon} size={24} color={stat.color} />
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => navigation.navigate(action.screen)}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
                <Ionicons name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Appointment Stats */}
        <Text style={styles.sectionTitle}>Appointment Overview</Text>
        <Card>
          <View style={styles.appointmentStats}>
            <View style={styles.appointmentStat}>
              <View style={[styles.statIcon, { backgroundColor: '#FFF3E0' }]}>
                <Ionicons name="time" size={20} color="#FF9800" />
              </View>
              <View>
                <Text style={styles.appointmentStatValue}>{stats.pending_appointments}</Text>
                <Text style={styles.appointmentStatLabel}>Pending</Text>
              </View>
            </View>
            <View style={styles.appointmentStat}>
              <View style={[styles.statIcon, { backgroundColor: '#E8F5E9' }]}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              </View>
              <View>
                <Text style={styles.appointmentStatValue}>{stats.completed_appointments}</Text>
                <Text style={styles.appointmentStatLabel}>Completed</Text>
              </View>
            </View>
            <View style={styles.appointmentStat}>
              <View style={[styles.statIcon, { backgroundColor: '#FFEBEE' }]}>
                <Ionicons name="close-circle" size={20} color="#E53935" />
              </View>
              <View>
                <Text style={styles.appointmentStatValue}>{stats.cancelled_appointments}</Text>
                <Text style={styles.appointmentStatLabel}>Cancelled</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Today's Summary */}
        <Card style={styles.todayCard}>
          <View style={styles.todayHeader}>
            <Ionicons name="today" size={24} color="#0066CC" />
            <View style={styles.todayInfo}>
              <Text style={styles.todayTitle}>Today's Summary</Text>
              <Text style={styles.todaySubtitle}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</Text>
            </View>
          </View>
          <View style={styles.todayStats}>
            <View style={styles.todayStat}>
              <Text style={styles.todayStatValue}>{stats.appointments_today}</Text>
              <Text style={styles.todayStatLabel}>Appointments</Text>
            </View>
            <View style={styles.todayStat}>
              <Text style={styles.todayStatValue}>{stats.new_users_this_month}</Text>
              <Text style={styles.todayStatLabel}>New Users This Month</Text>
            </View>
            <View style={styles.todayStat}>
              <Text style={styles.todayStatValue}>{stats.total_health_posts}</Text>
              <Text style={styles.todayStatLabel}>Health Posts</Text>
            </View>
          </View>
        </Card>

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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    width: '47%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
    marginTop: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  appointmentStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  appointmentStat: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  appointmentStatValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A2E',
    textAlign: 'center',
  },
  appointmentStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  todayCard: {
    marginTop: 16,
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  todayInfo: {
    marginLeft: 12,
  },
  todayTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  todaySubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  todayStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  todayStat: {
    alignItems: 'center',
  },
  todayStatValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0066CC',
  },
  todayStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  bottomPadding: {
    height: 20,
  },
});
