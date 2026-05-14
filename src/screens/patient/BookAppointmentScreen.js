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
import Card from '../../components/Card';
import { sampleDoctorProfiles, sampleUsers } from '../../data/sampleData';

export default function BookAppointmentScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState('');
  const [step, setStep] = useState(1);

  const availableDoctors = sampleDoctorProfiles.filter((d) => d.is_available);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = generateDates();

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '14:00', '14:30', '15:00', '15:30', '16:00',
  ];

  const getDoctorName = (doctorId) => {
    const doctor = sampleUsers.find((u) => u.id === doctorId);
    return doctor ? `${doctor.first_name} ${doctor.last_name}` : 'Unknown Doctor';
  };

  const handleNext = () => {
    if (step === 1 && !selectedDoctor) {
      Toast.show({ type: 'error', text1: 'Select Doctor', text2: 'Please select a doctor' });
      return;
    }
    if (step === 2 && !selectedDate) {
      Toast.show({ type: 'error', text1: 'Select Date', text2: 'Please select an appointment date' });
      return;
    }
    if (step === 3 && !selectedTime) {
      Toast.show({ type: 'error', text1: 'Select Time', text2: 'Please select a time slot' });
      return;
    }
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigation.goBack();
  };

  const handleSubmit = async () => {
    if (!reason.trim()) {
      Toast.show({ type: 'error', text1: 'Required', text2: 'Please describe your reason for visit' });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Appointment Booked',
        text2: 'Your appointment request has been submitted successfully.',
      });
      navigation.goBack();
    }, 1500);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Book Appointment"
        subtitle={`Step ${step} of 4`}
        onBack={handleBack}
        showBack
      />

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        {[1, 2, 3, 4].map((s) => (
          <View
            key={s}
            style={[
              styles.progressStep,
              step >= s && styles.progressStepActive,
            ]}
          />
        ))}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select a Doctor</Text>
            <Text style={styles.stepSubtitle}>Choose your preferred healthcare provider</Text>
            {availableDoctors.map((doctor) => {
              const doctorUser = sampleUsers.find((u) => u.id === doctor.user);
              const isSelected = selectedDoctor?.id === doctor.id;
              return (
                <TouchableOpacity
                  key={doctor.id}
                  style={[styles.doctorCard, isSelected && styles.doctorCardSelected]}
                  onPress={() => setSelectedDoctor(doctor)}
                >
                  <View style={styles.doctorAvatar}>
                    <Ionicons name="person" size={32} color="#0066CC" />
                  </View>
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{getDoctorName(doctor.user)}</Text>
                    <Text style={styles.doctorSpecialty}>{doctor.specialisation}</Text>
                    <Text style={styles.doctorQualification}>{doctor.qualification}</Text>
                    <View style={styles.doctorMeta}>
                      <Ionicons name="time-outline" size={12} color="#6B7280" />
                      <Text style={styles.doctorMetaText}>{doctor.consultation_hours}</Text>
                    </View>
                    <View style={styles.doctorMeta}>
                      <Ionicons name="location-outline" size={12} color="#6B7280" />
                      <Text style={styles.doctorMetaText}>{doctor.room_number}</Text>
                    </View>
                  </View>
                  {isSelected && (
                    <View style={styles.checkIcon}>
                      <Ionicons name="checkmark-circle" size={24} color="#0066CC" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select Date</Text>
            <Text style={styles.stepSubtitle}>Choose your preferred appointment date</Text>
            <View style={styles.datesGrid}>
              {availableDates.map((date, index) => {
                const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                    onPress={() => setSelectedDate(date)}
                  >
                    <Text style={[styles.dateDayName, isSelected && styles.dateTextSelected]}>
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </Text>
                    <Text style={[styles.dateDayNum, isSelected && styles.dateTextSelected]}>
                      {date.getDate()}
                    </Text>
                    <Text style={[styles.dateMonth, isSelected && styles.dateTextSelected]}>
                      {date.toLocaleDateString('en-US', { month: 'short' })}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select Time</Text>
            <Text style={styles.stepSubtitle}>Choose your preferred time slot</Text>
            <View style={styles.timesGrid}>
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={time}
                    style={[styles.timeCard, isSelected && styles.timeCardSelected]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {step === 4 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Reason for Visit</Text>
            <Text style={styles.stepSubtitle}>Briefly describe your symptoms or reason</Text>

            {/* Summary Card */}
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Appointment Summary</Text>
              <View style={styles.summaryRow}>
                <Ionicons name="person-outline" size={16} color="#6B7280" />
                <Text style={styles.summaryLabel}>Doctor:</Text>
                <Text style={styles.summaryValue}>{getDoctorName(selectedDoctor?.user)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                <Text style={styles.summaryLabel}>Date:</Text>
                <Text style={styles.summaryValue}>{formatDate(selectedDate)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text style={styles.summaryLabel}>Time:</Text>
                <Text style={styles.summaryValue}>{selectedTime}</Text>
              </View>
            </Card>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.reasonInput}
                placeholder="Describe your symptoms or reason for visit..."
                placeholderTextColor="#9CA3AF"
                value={reason}
                onChangeText={setReason}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={step < 4 ? handleNext : handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.actionButtonText}>
              {step < 4 ? 'Continue' : 'Confirm Booking'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  progressBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
  },
  progressStepActive: {
    backgroundColor: '#0066CC',
  },
  scrollView: {
    flex: 1,
  },
  stepContent: {
    padding: 16,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 20,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  doctorCardSelected: {
    borderColor: '#0066CC',
    backgroundColor: '#F0F7FF',
  },
  doctorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  doctorSpecialty: {
    fontSize: 13,
    color: '#0066CC',
    fontWeight: '600',
    marginTop: 2,
  },
  doctorQualification: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  doctorMetaText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  checkIcon: {
    justifyContent: 'center',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  dateCard: {
    width: '22%',
    aspectRatio: 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateCardSelected: {
    borderColor: '#0066CC',
    backgroundColor: '#F0F7FF',
  },
  dateDayName: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  dateDayNum: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A2E',
    marginVertical: 4,
  },
  dateMonth: {
    fontSize: 11,
    color: '#6B7280',
  },
  dateTextSelected: {
    color: '#0066CC',
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeCard: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeCardSelected: {
    borderColor: '#0066CC',
    backgroundColor: '#F0F7FF',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  timeTextSelected: {
    color: '#0066CC',
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
    width: 50,
  },
  summaryValue: {
    fontSize: 13,
    color: '#1A1A2E',
    fontWeight: '600',
    flex: 1,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  reasonInput: {
    fontSize: 14,
    color: '#1A1A2E',
    minHeight: 100,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 80,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    backgroundColor: '#0066CC',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
