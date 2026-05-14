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
import { sampleAppointments, sampleUsers, samplePatientProfiles } from '../../data/sampleData';

export default function CreateMedicalRecordScreen({ route }) {
  const navigation = useNavigation();
  const { appointmentId } = route.params;
  const appointment = sampleAppointments.find((a) => a.id === appointmentId);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    diagnosis: '',
    treatment_notes: '',
    follow_up_date: '',
    temperature: '',
    blood_pressure: '',
    pulse_rate: '',
    respiratory_rate: '',
    weight: '',
    height: '',
    prescriptions: [
      { drug_name: '', dosage: '', frequency: '', duration: '', instructions: '' },
    ],
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updatePrescription = (index, field, value) => {
    const newPrescriptions = [...formData.prescriptions];
    newPrescriptions[index][field] = value;
    setFormData((prev) => ({ ...prev, prescriptions: newPrescriptions }));
  };

  const addPrescription = () => {
    setFormData((prev) => ({
      ...prev,
      prescriptions: [
        ...prev.prescriptions,
        { drug_name: '', dosage: '', frequency: '', duration: '', instructions: '' },
      ],
    }));
  };

  const removePrescription = (index) => {
    setFormData((prev) => ({
      ...prev,
      prescriptions: prev.prescriptions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.diagnosis.trim()) {
      Toast.show({ type: 'error', text1: 'Required', text2: 'Please enter a diagnosis' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Record Created',
        text2: 'Medical record has been saved successfully.',
      });
      navigation.goBack();
    }, 1500);
  };

  const patientUser = sampleUsers.find((u) => u.id === appointment?.patient);
  const patientProfile = samplePatientProfiles.find((p) => p.user === appointment?.patient);

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
      <ScreenHeader
        title="Create Medical Record"
        subtitle={`Patient: ${appointment?.patient_name || 'Unknown'}`}
        showBack
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Patient Summary */}
        {appointment && (
          <Card>
            <View style={styles.patientSummary}>
              <Ionicons name="person" size={24} color="#0066CC" />
              <View style={styles.patientSummaryInfo}>
                <Text style={styles.patientSummaryName}>{appointment.patient_name}</Text>
                <Text style={styles.patientSummaryId}>{patientProfile?.student_id}</Text>
                <Text style={styles.patientSummaryDetail}>
                  {patientProfile?.gender} · {patientProfile?.blood_group} · {patientProfile?.phone_number}
                </Text>
              </View>
            </View>
          </Card>
        )}

        {/* Diagnosis */}
        <Card>
          <Text style={styles.sectionTitle}>Diagnosis</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Enter diagnosis..."
              placeholderTextColor="#9CA3AF"
              value={formData.diagnosis}
              onChangeText={(text) => updateField('diagnosis', text)}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        </Card>

        {/* Treatment Notes */}
        <Card>
          <Text style={styles.sectionTitle}>Treatment Notes</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Enter treatment notes and observations..."
              placeholderTextColor="#9CA3AF"
              value={formData.treatment_notes}
              onChangeText={(text) => updateField('treatment_notes', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </Card>

        {/* Vital Signs */}
        <Card>
          <Text style={styles.sectionTitle}>Vital Signs</Text>
          <View style={styles.vitalsGrid}>
            {renderInput('Temperature', 'temperature', 'thermometer-outline')}
            {renderInput('Blood Pressure', 'blood_pressure', 'fitness-outline')}
            {renderInput('Pulse Rate', 'pulse_rate', 'heart-outline')}
            {renderInput('Respiratory Rate', 'respiratory_rate', 'airplane-outline')}
            {renderInput('Weight (kg)', 'weight', 'scale-outline')}
            {renderInput('Height (cm)', 'height', 'resize-outline')}
          </View>
        </Card>

        {/* Follow-up */}
        <Card>
          <Text style={styles.sectionTitle}>Follow-up</Text>
          {renderInput('Follow-up Date (YYYY-MM-DD)', 'follow_up_date', 'calendar-outline')}
        </Card>

        {/* Prescriptions */}
        <Card>
          <View style={styles.prescriptionsHeader}>
            <Text style={styles.sectionTitle}>Prescriptions</Text>
            <TouchableOpacity style={styles.addPrescriptionButton} onPress={addPrescription}>
              <Ionicons name="add" size={16} color="#0066CC" />
              <Text style={styles.addPrescriptionText}>Add Drug</Text>
            </TouchableOpacity>
          </View>

          {formData.prescriptions.map((prescription, index) => (
            <View key={index} style={styles.prescriptionCard}>
              <View style={styles.prescriptionHeader}>
                <Text style={styles.prescriptionNumber}>Drug #{index + 1}</Text>
                {formData.prescriptions.length > 1 && (
                  <TouchableOpacity onPress={() => removePrescription(index)}>
                    <Ionicons name="trash-outline" size={18} color="#E53935" />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.prescriptionInput}>
                <TextInput
                  style={styles.prescriptionField}
                  placeholder="Drug Name"
                  placeholderTextColor="#9CA3AF"
                  value={prescription.drug_name}
                  onChangeText={(text) => updatePrescription(index, 'drug_name', text)}
                />
              </View>
              <View style={styles.prescriptionRow}>
                <TextInput
                  style={[styles.prescriptionField, styles.halfField]}
                  placeholder="Dosage"
                  placeholderTextColor="#9CA3AF"
                  value={prescription.dosage}
                  onChangeText={(text) => updatePrescription(index, 'dosage', text)}
                />
                <TextInput
                  style={[styles.prescriptionField, styles.halfField]}
                  placeholder="Frequency"
                  placeholderTextColor="#9CA3AF"
                  value={prescription.frequency}
                  onChangeText={(text) => updatePrescription(index, 'frequency', text)}
                />
              </View>
              <View style={styles.prescriptionRow}>
                <TextInput
                  style={[styles.prescriptionField, styles.halfField]}
                  placeholder="Duration"
                  placeholderTextColor="#9CA3AF"
                  value={prescription.duration}
                  onChangeText={(text) => updatePrescription(index, 'duration', text)}
                />
              </View>
              <TextInput
                style={[styles.prescriptionField, styles.instructionsField]}
                placeholder="Instructions"
                placeholderTextColor="#9CA3AF"
                value={prescription.instructions}
                onChangeText={(text) => updatePrescription(index, 'instructions', text)}
                multiline
                numberOfLines={2}
                textAlignVertical="top"
              />
            </View>
          ))}
        </Card>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="save-outline" size={18} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Save Medical Record</Text>
            </>
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
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  patientSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientSummaryInfo: {
    marginLeft: 12,
  },
  patientSummaryName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  patientSummaryId: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  patientSummaryDetail: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  textAreaContainer: {
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    padding: 12,
  },
  textArea: {
    fontSize: 14,
    color: '#1A1A2E',
    minHeight: 80,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 12,
    width: '48%',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 44,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#1A1A2E',
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  prescriptionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addPrescriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addPrescriptionText: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '600',
    marginLeft: 4,
  },
  prescriptionCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  prescriptionNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0066CC',
  },
  prescriptionInput: {
    marginBottom: 8,
  },
  prescriptionField: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  prescriptionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  halfField: {
    flex: 1,
  },
  instructionsField: {
    minHeight: 50,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066CC',
    borderRadius: 12,
    height: 52,
    marginVertical: 16,
    gap: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomPadding: {
    height: 20,
  },
});
