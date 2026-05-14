export const sampleUsers = [
  {
    id: 1,
    username: 'johndoe',
    email: 'john.doe@plasu.edu.ng',
    first_name: 'John',
    last_name: 'Doe',
    role: 'patient',
    is_active: true,
    date_joined: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    username: 'janedoe',
    email: 'jane.doe@plasu.edu.ng',
    first_name: 'Jane',
    last_name: 'Doe',
    role: 'patient',
    is_active: true,
    date_joined: '2024-02-20T14:15:00Z',
  },
  {
    id: 3,
    username: 'dr.smith',
    email: 'dr.smith@plasu.edu.ng',
    first_name: 'Dr. Michael',
    last_name: 'Smith',
    role: 'doctor',
    is_active: true,
    date_joined: '2023-06-10T09:00:00Z',
  },
  {
    id: 4,
    username: 'dr.johnson',
    email: 'dr.johnson@plasu.edu.ng',
    first_name: 'Dr. Sarah',
    last_name: 'Johnson',
    role: 'doctor',
    is_active: true,
    date_joined: '2023-08-05T11:20:00Z',
  },
  {
    id: 5,
    username: 'admin',
    email: 'admin@plasu.edu.ng',
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin',
    is_active: true,
    date_joined: '2023-01-01T08:00:00Z',
  },
];

export const samplePatientProfiles = [
  {
    id: 1,
    user: 1,
    student_id: 'PLASU/2021/SCI/001',
    date_of_birth: '2000-05-15',
    gender: 'Male',
    blood_group: 'O+',
    phone_number: '+234 803 123 4567',
    address: 'Student Hostel Block A, Plateau State University, Bokkos',
    department: 'Computer Science',
    level: '400',
    emergency_contact_name: 'Mr. Doe',
    emergency_contact_phone: '+234 805 987 6543',
    allergies: 'Penicillin',
    medical_history: 'Asthma (childhood), no chronic conditions',
  },
  {
    id: 2,
    user: 2,
    student_id: 'PLASU/2022/ART/045',
    date_of_birth: '2001-08-22',
    gender: 'Female',
    blood_group: 'A+',
    phone_number: '+234 806 234 5678',
    address: 'Student Hostel Block C, Plateau State University, Bokkos',
    department: 'Mass Communication',
    level: '300',
    emergency_contact_name: 'Mrs. Doe',
    emergency_contact_phone: '+234 807 876 5432',
    allergies: 'None known',
    medical_history: 'No significant medical history',
  },
];

export const sampleDoctorProfiles = [
  {
    id: 1,
    user: 3,
    specialisation: 'General Medicine',
    qualification: 'MBBS, FWACP',
    phone_number: '+234 803 456 7890',
    is_available: true,
    bio: 'Dr. Michael Smith has over 10 years of experience in general medicine. He specializes in preventive care and chronic disease management.',
    consultation_hours: 'Mon-Fri: 9:00 AM - 4:00 PM',
    room_number: 'Room 101',
  },
  {
    id: 2,
    user: 4,
    specialisation: 'Family Medicine',
    qualification: 'MBBS, MPH',
    phone_number: '+234 805 678 9012',
    is_available: true,
    bio: 'Dr. Sarah Johnson is a family medicine specialist with expertise in student health and wellness programs.',
    consultation_hours: 'Mon, Wed, Fri: 10:00 AM - 3:00 PM',
    room_number: 'Room 103',
  },
  {
    id: 3,
    user: 6,
    specialisation: 'Pediatrics',
    qualification: 'MBBS, FWACP (Paed)',
    phone_number: '+234 807 890 1234',
    is_available: false,
    bio: 'Dr. Emily Williams specializes in pediatric care and adolescent health.',
    consultation_hours: 'Tue, Thu: 9:00 AM - 2:00 PM',
    room_number: 'Room 105',
  },
];

export const sampleAppointments = [
  {
    id: 1,
    patient: 1,
    doctor: 1,
    appointment_date: '2024-06-15',
    appointment_time: '10:00:00',
    status: 'confirmed',
    reason: 'General checkup and fever',
    notes: 'Patient reported mild fever and headache for 2 days',
    created_at: '2024-06-10T08:30:00Z',
    patient_name: 'John Doe',
    doctor_name: 'Dr. Michael Smith',
  },
  {
    id: 2,
    patient: 1,
    doctor: 2,
    appointment_date: '2024-05-20',
    appointment_time: '14:00:00',
    status: 'completed',
    reason: 'Follow-up consultation',
    notes: 'Follow-up for malaria treatment. Patient recovering well.',
    created_at: '2024-05-15T09:00:00Z',
    patient_name: 'John Doe',
    doctor_name: 'Dr. Sarah Johnson',
  },
  {
    id: 3,
    patient: 2,
    doctor: 1,
    appointment_date: '2024-06-18',
    appointment_time: '11:30:00',
    status: 'pending',
    reason: 'Stomach pain and nausea',
    notes: '',
    created_at: '2024-06-12T10:15:00Z',
    patient_name: 'Jane Doe',
    doctor_name: 'Dr. Michael Smith',
  },
  {
    id: 4,
    patient: 2,
    doctor: 2,
    appointment_date: '2024-04-10',
    appointment_time: '09:00:00',
    status: 'completed',
    reason: 'Annual health screening',
    notes: 'All vitals normal. Recommended regular exercise.',
    created_at: '2024-04-05T11:00:00Z',
    patient_name: 'Jane Doe',
    doctor_name: 'Dr. Sarah Johnson',
  },
  {
    id: 5,
    patient: 1,
    doctor: 1,
    appointment_date: '2024-06-20',
    appointment_time: '15:00:00',
    status: 'cancelled',
    reason: 'Headache and dizziness',
    notes: 'Cancelled by patient - symptoms resolved',
    created_at: '2024-06-14T07:45:00Z',
    patient_name: 'John Doe',
    doctor_name: 'Dr. Michael Smith',
  },
];

export const sampleMedicalRecords = [
  {
    id: 1,
    appointment: 2,
    patient: 1,
    doctor: 2,
    diagnosis: 'Uncomplicated Malaria (Plasmodium falciparum)',
    treatment_notes: 'Patient presented with fever, chills, and headache. Rapid diagnostic test positive for P. falciparum. Started on Artemether-Lumefantrine combination therapy.',
    follow_up_date: '2024-05-27',
    vital_signs: {
      temperature: '38.5°C',
      blood_pressure: '120/80 mmHg',
      pulse_rate: '88 bpm',
      respiratory_rate: '18/min',
      weight: '72 kg',
      height: '175 cm',
    },
    created_at: '2024-05-20T14:45:00Z',
    created_by_name: 'Dr. Sarah Johnson',
    patient_name: 'John Doe',
  },
  {
    id: 2,
    appointment: 4,
    patient: 2,
    doctor: 2,
    diagnosis: 'Healthy - No significant findings',
    treatment_notes: 'Annual health screening completed. All laboratory results within normal limits. Patient advised on balanced diet and regular physical activity.',
    follow_up_date: '2025-04-10',
    vital_signs: {
      temperature: '36.8°C',
      blood_pressure: '110/70 mmHg',
      pulse_rate: '72 bpm',
      respiratory_rate: '16/min',
      weight: '58 kg',
      height: '162 cm',
    },
    created_at: '2024-04-10T10:30:00Z',
    created_by_name: 'Dr. Sarah Johnson',
    patient_name: 'Jane Doe',
  },
  {
    id: 3,
    appointment: 1,
    patient: 1,
    doctor: 1,
    diagnosis: 'Upper Respiratory Tract Infection',
    treatment_notes: 'Patient with fever (38.2°C), sore throat, and mild cough. Prescribed symptomatic treatment. Advised to rest and maintain hydration.',
    follow_up_date: '2024-06-22',
    vital_signs: {
      temperature: '38.2°C',
      blood_pressure: '118/76 mmHg',
      pulse_rate: '92 bpm',
      respiratory_rate: '20/min',
      weight: '72 kg',
      height: '175 cm',
    },
    created_at: '2024-06-15T10:45:00Z',
    created_by_name: 'Dr. Michael Smith',
    patient_name: 'John Doe',
  },
];

export const samplePrescriptions = [
  {
    id: 1,
    medical_record: 1,
    drug_name: 'Artemether-Lumefantrine',
    dosage: '80/480 mg',
    frequency: 'Twice daily',
    duration: '3 days',
    instructions: 'Take with fatty meal. Complete full course even if symptoms improve.',
    created_at: '2024-05-20T14:50:00Z',
  },
  {
    id: 2,
    medical_record: 1,
    drug_name: 'Paracetamol',
    dosage: '500 mg',
    frequency: 'Every 6 hours as needed',
    duration: '3 days',
    instructions: 'Take for fever and body aches. Do not exceed 4g per day.',
    created_at: '2024-05-20T14:52:00Z',
  },
  {
    id: 3,
    medical_record: 3,
    drug_name: 'Amoxicillin',
    dosage: '500 mg',
    frequency: 'Three times daily',
    duration: '5 days',
    instructions: 'Take after meals. Complete full course.',
    created_at: '2024-06-15T10:50:00Z',
  },
  {
    id: 4,
    medical_record: 3,
    drug_name: 'Vitamin C',
    dosage: '1000 mg',
    frequency: 'Once daily',
    duration: '7 days',
    instructions: 'Take with breakfast. Helps boost immune system.',
    created_at: '2024-06-15T10:52:00Z',
  },
];

export const sampleHealthInfo = [
  {
    id: 1,
    title: 'Malaria Prevention Tips for Students',
    content: `Malaria remains one of the most common health issues among students in Nigeria. Here are essential prevention tips:

1. Sleep under insecticide-treated mosquito nets every night
2. Use mosquito repellent creams or sprays, especially during evening hours
3. Wear long-sleeved clothing when going out in the evening
4. Keep your environment clean - eliminate stagnant water where mosquitoes breed
5. Take prophylactic medication if traveling to high-risk areas
6. Seek immediate medical attention if you experience fever, chills, or headache

Remember: Early diagnosis and treatment prevent complications. Visit the university health center promptly if you suspect malaria.`,
    category: 'Disease Prevention',
    published_by: 5,
    published_by_name: 'Admin User',
    date_published: '2024-06-01T08:00:00Z',
    is_active: true,
    image_url: null,
  },
  {
    id: 2,
    title: 'Healthy Eating Habits for University Students',
    content: `Maintaining a balanced diet is crucial for academic performance and overall health:

1. Never skip breakfast - it fuels your brain for morning classes
2. Include fruits and vegetables in every meal
3. Drink at least 8 glasses of water daily
4. Limit consumption of processed and sugary foods
5. Eat protein-rich foods (beans, eggs, fish, meat) for muscle health
6. Practice portion control to avoid weight gain
7. Avoid excessive caffeine and energy drinks

The university cafeteria offers balanced meal options. Make healthy choices!`,
    category: 'Nutrition',
    published_by: 5,
    published_by_name: 'Admin User',
    date_published: '2024-05-15T10:00:00Z',
    is_active: true,
    image_url: null,
  },
  {
    id: 3,
    title: 'Mental Health Awareness: Managing Stress and Anxiety',
    content: `University life can be stressful. Here are strategies to maintain good mental health:

1. Maintain a regular sleep schedule (7-8 hours per night)
2. Practice time management to avoid last-minute cramming
3. Take regular breaks during study sessions
4. Engage in physical exercise at least 3 times a week
5. Connect with friends and family for social support
6. Practice mindfulness and deep breathing exercises
7. Seek counseling services at the university health center when needed

The university provides free counseling services. Don't hesitate to reach out - your mental health matters.`,
    category: 'Mental Health',
    published_by: 5,
    published_by_name: 'Admin User',
    date_published: '2024-05-20T14:00:00Z',
    is_active: true,
    image_url: null,
  },
  {
    id: 4,
    title: 'COVID-19 and Other Respiratory Infections: What You Need to Know',
    content: `Respiratory infections are common in communal living environments. Protect yourself and others:

1. Wash hands frequently with soap and water for at least 20 seconds
2. Use hand sanitizer when soap is unavailable
3. Cover your mouth and nose when coughing or sneezing
4. Stay home when feeling unwell
5. Keep shared spaces well-ventilated
6. Wear a mask if you have respiratory symptoms
7. Get vaccinated against preventable diseases

If you experience persistent cough, fever, or difficulty breathing, visit the health center immediately.`,
    category: 'Infectious Diseases',
    published_by: 5,
    published_by_name: 'Admin User',
    date_published: '2024-06-05T09:30:00Z',
    is_active: true,
    image_url: null,
  },
  {
    id: 5,
    title: 'Sexual and Reproductive Health for Students',
    content: `Understanding sexual and reproductive health is essential for every student:

1. Practice safe sex - condoms prevent STIs and unwanted pregnancies
2. Get regular health screenings
3. Know your HIV status - free testing available at the health center
4. Understand consent and healthy relationships
5. Access family planning information and services
6. Report any cases of sexual harassment or assault

The university health center provides confidential counseling and testing services. Your privacy is protected.`,
    category: 'Reproductive Health',
    published_by: 5,
    published_by_name: 'Admin User',
    date_published: '2024-04-25T11:00:00Z',
    is_active: true,
    image_url: null,
  },
];

export const sampleNotifications = [
  {
    id: 1,
    recipient: 1,
    message: 'Your appointment with Dr. Michael Smith on June 15, 2024 at 10:00 AM has been confirmed.',
    is_read: false,
    notification_type: 'appointment',
    created_at: '2024-06-10T08:35:00Z',
  },
  {
    id: 2,
    recipient: 1,
    message: 'Your medical record has been updated by Dr. Sarah Johnson. View your prescription details.',
    is_read: true,
    notification_type: 'prescription',
    created_at: '2024-05-20T15:00:00Z',
  },
  {
    id: 3,
    recipient: 1,
    message: 'New health advisory: Malaria Prevention Tips for Students. Check the health information portal.',
    is_read: false,
    notification_type: 'health_info',
    created_at: '2024-06-01T08:05:00Z',
  },
  {
    id: 4,
    recipient: 2,
    message: 'Your appointment with Dr. Michael Smith on June 18, 2024 at 11:30 AM is pending confirmation.',
    is_read: false,
    notification_type: 'appointment',
    created_at: '2024-06-12T10:20:00Z',
  },
  {
    id: 5,
    recipient: 2,
    message: 'Reminder: Your annual health screening is due. Book an appointment today.',
    is_read: true,
    notification_type: 'general',
    created_at: '2024-05-01T09:00:00Z',
  },
];

export const sampleAdminStats = {
  total_users: 45,
  total_patients: 38,
  total_doctors: 5,
  total_appointments: 128,
  pending_appointments: 12,
  completed_appointments: 98,
  cancelled_appointments: 18,
  total_health_posts: 5,
  new_users_this_month: 8,
  appointments_today: 5,
};
