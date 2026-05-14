import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import ManageUsersScreen from '../screens/admin/ManageUsersScreen';
import ManageAppointmentsScreen from '../screens/admin/ManageAppointmentsScreen';
import ManageHealthInfoScreen from '../screens/admin/ManageHealthInfoScreen';
import CreateHealthInfoScreen from '../screens/admin/CreateHealthInfoScreen';
import AdminProfileScreen from '../screens/admin/AdminProfileScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HealthInfoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HealthInfoList" component={ManageHealthInfoScreen} />
      <Stack.Screen name="CreateHealthInfo" component={CreateHealthInfoScreen} />
    </Stack.Navigator>
  );
}

export default function AdminDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#0066CC',
        drawerInactiveTintColor: '#6B7280',
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ManageUsers"
        component={ManageUsersScreen}
        options={{
          drawerLabel: 'Manage Users',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ManageAppointments"
        component={ManageAppointmentsScreen}
        options={{
          drawerLabel: 'Appointments',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ManageHealthInfo"
        component={HealthInfoStack}
        options={{
          drawerLabel: 'Health Information',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="AdminProfile"
        component={AdminProfileScreen}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
