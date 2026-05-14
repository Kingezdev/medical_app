import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import PatientDashboardScreen from '../screens/patient/PatientDashboardScreen';
import AppointmentsScreen from '../screens/patient/AppointmentsScreen';
import BookAppointmentScreen from '../screens/patient/BookAppointmentScreen';
import MedicalRecordsScreen from '../screens/patient/MedicalRecordsScreen';
import MedicalRecordDetailScreen from '../screens/patient/MedicalRecordDetailScreen';
import HealthInfoScreen from '../screens/patient/HealthInfoScreen';
import HealthInfoDetailScreen from '../screens/patient/HealthInfoDetailScreen';
import NotificationsScreen from '../screens/patient/NotificationsScreen';
import ProfileScreen from '../screens/patient/ProfileScreen';
import EditProfileScreen from '../screens/patient/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppointmentsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppointmentsList" component={AppointmentsScreen} />
      <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
    </Stack.Navigator>
  );
}

function RecordsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecordsList" component={MedicalRecordsScreen} />
      <Stack.Screen name="RecordDetail" component={MedicalRecordDetailScreen} />
    </Stack.Navigator>
  );
}

function HealthInfoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HealthInfoList" component={HealthInfoScreen} />
      <Stack.Screen name="HealthInfoDetail" component={HealthInfoDetailScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

export default function PatientTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Records') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Health') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={PatientDashboardScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsStack} />
      <Tab.Screen name="Records" component={RecordsStack} />
      <Tab.Screen name="Health" component={HealthInfoStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
