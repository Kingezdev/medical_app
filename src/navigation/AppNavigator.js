import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import PatientTabNavigator from './PatientTabNavigator';
import DoctorTabNavigator from './DoctorTabNavigator';
import AdminDrawerNavigator from './AdminDrawerNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated, isPatient, isDoctor, isAdmin, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : isPatient ? (
        <Stack.Screen name="PatientMain" component={PatientTabNavigator} />
      ) : isDoctor ? (
        <Stack.Screen name="DoctorMain" component={DoctorTabNavigator} />
      ) : isAdmin ? (
        <Stack.Screen name="AdminMain" component={AdminDrawerNavigator} />
      ) : null}
    </Stack.Navigator>
  );
}
