# PLASU Medical Mobile App

A React Native (Expo) mobile application for Plateau State University, Bokkos Health Center. This app provides digital healthcare services including appointment scheduling, medical record management, health information dissemination, and role-based access for patients, doctors, and administrators.

## Features

### For Patients
- **Dashboard** - Overview of health stats, upcoming appointments, and recent records
- **Appointment Booking** - Book appointments with available doctors by date and time
- **Medical Records** - View complete medical history, diagnoses, prescriptions, and vital signs
- **Health Information** - Browse verified health articles by category
- **Notifications** - Receive updates on appointments, prescriptions, and health advisories
- **Profile Management** - Update personal and medical information

### For Doctors
- **Dashboard** - View today's schedule, pending appointments, and patient statistics
- **Appointments** - Manage appointments (confirm, reject, complete)
- **Medical Records** - Create and update patient medical records with prescriptions
- **Patient Management** - View patient profiles and visit history
- **Health Information** - Access health content for reference

### For Administrators
- **Dashboard** - System overview with user counts, appointment statistics
- **User Management** - View and manage all users (patients, doctors, admins)
- **Appointment Management** - Monitor all appointments across the system
- **Health Information** - Publish, edit, and manage health articles
- **Role-based Access Control** - Secure access for different user types

## Tech Stack

- **React Native** (Expo SDK 51)
- **React Navigation** (Stack, Bottom Tabs, Drawer)
- **React Native Paper** (UI components)
- **Ionicons** (Icons)
- **Date-fns** (Date formatting)
- **React Native Toast Message** (Notifications)

## Project Structure

```
plasu-medical-app/
├── App.js                          # Main entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── babel.config.js                 # Babel configuration
├── assets/                         # App icons and splash screen
└── src/
    ├── components/                 # Reusable UI components
    │   ├── Card.js
    │   ├── CustomDrawerContent.js
    │   ├── EmptyState.js
    │   ├── InfoRow.js
    │   ├── LoadingSpinner.js
    │   ├── ScreenHeader.js
    │   └── StatusBadge.js
    ├── context/                    # React Context
    │   └── AuthContext.js          # Authentication state management
    ├── data/                       # Sample data (replace with API calls)
    │   └── sampleData.js
    ├── navigation/                 # Navigation configuration
    │   ├── AdminDrawerNavigator.js
    │   ├── AppNavigator.js
    │   ├── DoctorTabNavigator.js
    │   └── PatientTabNavigator.js
    ├── screens/                    # Screen components
    │   ├── auth/
    │   │   ├── LoginScreen.js
    │   │   ├── RegisterScreen.js
    │   │   └── SplashScreen.js
    │   ├── patient/
    │   │   ├── AppointmentsScreen.js
    │   │   ├── BookAppointmentScreen.js
    │   │   ├── EditProfileScreen.js
    │   │   ├── HealthInfoDetailScreen.js
    │   │   ├── HealthInfoScreen.js
    │   │   ├── MedicalRecordDetailScreen.js
    │   │   ├── MedicalRecordsScreen.js
    │   │   ├── NotificationsScreen.js
    │   │   ├── PatientDashboardScreen.js
    │   │   └── ProfileScreen.js
    │   ├── doctor/
    │   │   ├── AppointmentDetailScreen.js
    │   │   ├── CreateMedicalRecordScreen.js
    │   │   ├── DoctorAppointmentsScreen.js
    │   │   ├── DoctorDashboardScreen.js
    │   │   ├── DoctorHealthInfoScreen.js
    │   │   ├── DoctorPatientsScreen.js
    │   │   ├── DoctorProfileScreen.js
    │   │   └── PatientDetailScreen.js
    │   └── admin/
    │       ├── AdminDashboardScreen.js
    │       ├── AdminProfileScreen.js
    │       ├── CreateHealthInfoScreen.js
    │       ├── ManageAppointmentsScreen.js
    │       ├── ManageHealthInfoScreen.js
    │       └── ManageUsersScreen.js
    └── utils/
        ├── constants.js            # App constants
        ├── helpers.js              # Utility functions
        └── theme.js                # App theme and colors
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your Android device

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd plasu-medical-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   # or
   expo start
   ```

4. **Run on Android with Expo Go:**
   - Scan the QR code displayed in the terminal with your phone's camera
   - Or press `a` in the terminal to open on Android emulator
   - Make sure your phone and computer are on the same Wi-Fi network

### Test Accounts

Use these quick-login buttons on the login screen or enter credentials manually:

| Role   | Email                        | Password   |
|--------|------------------------------|------------|
| Patient| john.doe@plasu.edu.ng        | password123|
| Patient| jane.doe@plasu.edu.ng        | password123|
| Doctor | dr.smith@plasu.edu.ng        | password123|
| Doctor | dr.johnson@plasu.edu.ng      | password123|
| Admin  | admin@plasu.edu.ng           | password123|

## Connecting to Django Backend

To connect the app to your Django REST API:

1. **Update the API base URL** in `src/utils/constants.js`:
   ```javascript
   export const API_BASE_URL = 'https://your-django-api.com/api/v1';
   // For local development:
   // export const API_BASE_URL = 'http://YOUR_COMPUTER_IP:8000/api/v1';
   ```

2. **Replace sample data with API calls** in `src/context/AuthContext.js` and screen components. Example pattern:
   ```javascript
   import axios from 'axios';
   import { API_BASE_URL } from '../utils/constants';

   // Example API call
   const login = async (email, password) => {
     try {
       const response = await axios.post(`${API_BASE_URL}/auth/login/`, {
         email,
         password,
       });
       const { token, user } = response.data;
       // Store token and user data
       return { success: true, user };
     } catch (error) {
       return { success: false, message: error.response?.data?.message || 'Login failed' };
     }
   };
   ```

3. **Required Django API Endpoints:**
   - `POST /api/v1/auth/login/` - User login
   - `POST /api/v1/auth/register/` - User registration
   - `POST /api/v1/auth/logout/` - User logout
   - `GET /api/v1/auth/profile/` - Get user profile
   - `PUT /api/v1/auth/profile/` - Update profile
   - `GET /api/v1/doctors/` - List doctors
   - `GET /api/v1/appointments/` - List appointments
   - `POST /api/v1/appointments/` - Create appointment
   - `GET /api/v1/medical-records/` - List medical records
   - `POST /api/v1/medical-records/` - Create medical record
   - `GET /api/v1/health-info/` - List health articles
   - `POST /api/v1/health-info/` - Create health article
   - `GET /api/v1/notifications/` - List notifications
   - `GET /api/v1/admin/stats/` - Admin dashboard stats
   - `GET /api/v1/admin/users/` - List all users

4. **Authentication:** The app uses JWT tokens stored in AsyncStorage. Make sure your Django backend returns tokens in the expected format.

## Customization

- **Colors**: Update `src/utils/theme.js` to change the app color scheme
- **Sample Data**: Modify `src/data/sampleData.js` to add more test data
- **API Integration**: Replace sample data references in screens with actual API calls

## Building for Production

```bash
# Build Android APK
npx expo build:android

# Or use EAS Build (recommended)
npx eas build --platform android
```

## License

This project is developed for Plateau State University, Bokkos as part of the Medical Mobile Application research project.

## Support

For questions or issues, contact the development team at Plateau State University, Bokkos.
