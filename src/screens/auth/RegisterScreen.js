import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/AuthContext';
import { GENDERS, BLOOD_GROUPS } from '../../utils/constants';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    role: 'patient',
    student_id: '',
    date_of_birth: '',
    gender: '',
    blood_group: '',
    phone_number: '',
    address: '',
    department: '',
    level: '',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.username || !formData.password) {
      Toast.show({ type: 'error', text1: 'Required Fields', text2: 'Please fill in all required fields' });
      return false;
    }
    if (formData.password !== formData.confirm_password) {
      Toast.show({ type: 'error', text1: 'Password Mismatch', text2: 'Passwords do not match' });
      return false;
    }
    if (formData.password.length < 6) {
      Toast.show({ type: 'error', text1: 'Weak Password', text2: 'Password must be at least 6 characters' });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.student_id || !formData.phone_number || !formData.gender) {
      Toast.show({ type: 'error', text1: 'Required Fields', text2: 'Please fill in all required fields' });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else navigation.goBack();
  };

  const handleRegister = async () => {
    if (!validateStep2()) return;

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      Toast.show({ type: 'success', text1: 'Registration Successful', text2: 'Welcome to PLASU Medical!' });
    } else {
      Toast.show({ type: 'error', text1: 'Registration Failed', text2: result.message });
    }
  };

  const renderInput = (icon, placeholder, field, options = {}) => (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color="#9CA3AF" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={formData[field]}
        onChangeText={(text) => updateField(field, text)}
        {...options}
      />
    </View>
  );

  const renderPasswordInput = (field, placeholder, show, setShow) => (
    <View style={styles.inputContainer}>
      <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={formData[field]}
        onChangeText={(text) => updateField(field, text)}
        secureTextEntry={!show}
      />
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );

  const renderSelect = (icon, label, field, options) => (
    <View style={styles.selectContainer}>
      <Ionicons name={icon} size={20} color="#9CA3AF" style={styles.inputIcon} />
      <Text style={styles.selectLabel}>{label}</Text>
      <View style={styles.optionsRow}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              formData[field] === option && styles.optionButtonActive,
            ]}
            onPress={() => updateField(field, option)}
          >
            <Text style={[
              styles.optionText,
              formData[field] === option && styles.optionTextActive,
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            {step === 1 ? 'Enter your account details' : 'Complete your profile'}
          </Text>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, step >= 1 && styles.progressDotActive]} />
            <View style={[styles.progressLine, step >= 2 && styles.progressLineActive]} />
            <View style={[styles.progressDot, step >= 2 && styles.progressDotActive]} />
          </View>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {step === 1 ? (
            <>
              <View style={styles.nameRow}>
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#9CA3AF"
                    value={formData.first_name}
                    onChangeText={(text) => updateField('first_name', text)}
                  />
                </View>
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#9CA3AF"
                    value={formData.last_name}
                    onChangeText={(text) => updateField('last_name', text)}
                  />
                </View>
              </View>
              {renderInput('mail-outline', 'Email Address', 'email', { autoCapitalize: 'none', keyboardType: 'email-address' })}
              {renderInput('at-outline', 'Username', 'username', { autoCapitalize: 'none' })}
              {renderPasswordInput('password', 'Password', showPassword, setShowPassword)}
              {renderPasswordInput('confirm_password', 'Confirm Password', showConfirmPassword, setShowConfirmPassword)}

              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Continue</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              {renderInput('id-card-outline', 'Student/Staff ID', 'student_id', { autoCapitalize: 'characters' })}
              {renderInput('call-outline', 'Phone Number', 'phone_number', { keyboardType: 'phone-pad' })}
              {renderSelect('male-female-outline', 'Gender', 'gender', GENDERS)}
              {renderSelect('water-outline', 'Blood Group', 'blood_group', BLOOD_GROUPS)}
              {renderInput('calendar-outline', 'Date of Birth (YYYY-MM-DD)', 'date_of_birth')}
              {renderInput('business-outline', 'Department', 'department')}
              {renderInput('school-outline', 'Level', 'level')}
              {renderInput('location-outline', 'Address', 'address')}

              <TouchableOpacity
                style={[styles.registerButton, loading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.registerButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>
            </>
          )}

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066CC',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 6,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressDotActive: {
    backgroundColor: '#FFFFFF',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 8,
  },
  progressLineActive: {
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
    height: 50,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A2E',
  },
  selectContainer: {
    marginBottom: 14,
  },
  selectLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
    marginLeft: 32,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginLeft: 32,
  },
  optionButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionButtonActive: {
    backgroundColor: '#F0F7FF',
    borderColor: '#0066CC',
  },
  optionText: {
    fontSize: 13,
    color: '#6B7280',
  },
  optionTextActive: {
    color: '#0066CC',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#0066CC',
    borderRadius: 12,
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  registerButton: {
    backgroundColor: '#0066CC',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#6B7280',
  },
  loginLink: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '700',
  },
});
