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
import { sampleNotifications } from '../../data/sampleData';
import { formatDateTime } from '../../utils/helpers';

const notificationIcons = {
  appointment: 'calendar',
  prescription: 'medical',
  health_info: 'heart',
  general: 'notifications',
};

const notificationColors = {
  appointment: '#0066CC',
  prescription: '#4CAF50',
  health_info: '#FF9800',
  general: '#9C27B0',
};

const notificationBgColors = {
  appointment: '#F0F7FF',
  prescription: '#E8F5E9',
  health_info: '#FFF3E0',
  general: '#F3E5F5',
};

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const userNotifications = sampleNotifications
    .filter((n) => n.recipient === user?.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Notifications"
        subtitle="Stay updated with your health activities"
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {userNotifications.length === 0 ? (
          <EmptyState
            icon="notifications-outline"
            title="No Notifications"
            message="You don't have any notifications yet."
          />
        ) : (
          userNotifications.map((notification) => (
            <Card key={notification.id}>
              <View style={[
                styles.notificationCard,
                !notification.is_read && styles.unreadCard,
              ]}>
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: notificationBgColors[notification.notification_type] || '#F5F7FA' },
                ]}>
                  <Ionicons
                    name={notificationIcons[notification.notification_type] || 'notifications'}
                    size={22}
                    color={notificationColors[notification.notification_type] || '#6B7280'}
                  />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={[
                    styles.notificationMessage,
                    !notification.is_read && styles.unreadMessage,
                  ]}>
                    {notification.message}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {formatDateTime(notification.created_at)}
                  </Text>
                </View>
                {!notification.is_read && (
                  <View style={styles.unreadDot} />
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 4,
  },
  unreadCard: {
    // Slight highlight for unread
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  unreadMessage: {
    color: '#1A1A2E',
    fontWeight: '500',
  },
  notificationTime: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 6,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0066CC',
    marginLeft: 8,
    marginTop: 6,
  },
  bottomPadding: {
    height: 20,
  },
});
