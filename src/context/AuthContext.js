import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  sampleUsers,
  samplePatientProfiles,
  sampleDoctorProfiles,
} from '../data/sampleData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('token');
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
        loadProfile(parsedUser);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = (userData) => {
    if (userData.role === 'patient') {
      const patientProfile = samplePatientProfiles.find(
        (p) => p.user === userData.id
      );
      setProfile(patientProfile || null);
    } else if (userData.role === 'doctor') {
      const doctorProfile = sampleDoctorProfiles.find(
        (d) => d.user === userData.id
      );
      setProfile(doctorProfile || null);
    }
  };

  const login = async (email, password) => {
    // Simulate API call with sample data
    const foundUser = sampleUsers.find(
      (u) => u.email === email.toLowerCase()
    );

    if (!foundUser) {
      return { success: false, message: 'Invalid email or password' };
    }

    // In real app, verify password hash here
    const mockToken = `mock_jwt_token_${foundUser.id}_${Date.now()}`;

    setUser(foundUser);
    setToken(mockToken);
    loadProfile(foundUser);

    await AsyncStorage.setItem('user', JSON.stringify(foundUser));
    await AsyncStorage.setItem('token', mockToken);

    return { success: true, user: foundUser };
  };

  const register = async (userData) => {
    // Simulate registration
    const newUser = {
      id: sampleUsers.length + 1,
      ...userData,
      is_active: true,
      date_joined: new Date().toISOString(),
    };

    const mockToken = `mock_jwt_token_${newUser.id}_${Date.now()}`;

    setUser(newUser);
    setToken(mockToken);

    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    await AsyncStorage.setItem('token', mockToken);

    return { success: true, user: newUser };
  };

  const logout = async () => {
    setUser(null);
    setProfile(null);
    setToken(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
  };

  const updateProfile = async (updatedData) => {
    setProfile((prev) => ({ ...prev, ...updatedData }));
    return { success: true };
  };

  const value = {
    user,
    profile,
    token,
    loading,
    isAuthenticated: !!user,
    isPatient: user?.role === 'patient',
    isDoctor: user?.role === 'doctor',
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
