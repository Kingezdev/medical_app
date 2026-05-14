import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import ScreenHeader from '../../components/ScreenHeader';
import { useAuth } from '../../context/AuthContext';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user, profile, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone_number: profile?.phone_number || '',
    address: profile?.address || '',
    department: profile?.department || '',
    level: profile?.level || '',
    emergency_contact_name: profile?.emergency_contact_name || '',
    emergency_contact_phone: profile?.emergency_contact_phone || '',
    allergies: profile?.allergies || '',
    medical_history: profile?.medical_history || '',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    const result = await updateProfile(formData);
    setLoading(false);

    if (result.success) {
      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your profile has been updated successfully.',
      });
      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'Something went wrong. Please try again.',
      });
    }
  };

  const renderInput = (label, field, icon, options = {}) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons name={icon} size={18} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={formData[field]}
          onChangeText={(text) => updateField(field, text)}
          placeholderTextColor="#9CA3AF"
          {...options}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader title="Edit Profile" showBack onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          {renderInput('First Name', 'first_name', 'person-outline')}
          {renderInput('Last Name', 'last_name', 'person-outline')}
          {renderInput('Phone Number', 'phone_number', 'call-outline', { keyboardType: 'phone-pad' })}
          {renderInput('Address', 'address', 'location-outline')}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          {renderInput('Department', 'department', 'business-outline')}
          {renderInput('Level', 'level', 'school-outline')}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          {renderInput('Allergies', 'allergies', 'alert-circle-outline')}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Medical History</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.medical_history}
                onChangeText={(text) => updateField('medical_history', text)}
                placeholder="Enter your medical history..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          {renderInput('Contact Name', 'emergency_contact_name', 'person-outline')}
          {renderInput('Contact Phone', 'emergency_contact_phone', 'call-outline', { keyboardType: 'phone-pad' })}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>

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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoButton: {
    marginTop: 10,
  },
  changePhotoText: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '600',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },
  textAreaContainer: {
    height: 'auto',
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A2E',
  },
  textArea: {
    minHeight: 80,
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: '#0066CC',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomPadding: {
    height: 20,
  },
});
