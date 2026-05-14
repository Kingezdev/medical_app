import { format, parseISO } from 'date-fns';

export const formatDate = (dateString, formatStr = 'MMM dd, yyyy') => {
  if (!dateString) return 'N/A';
  try {
    return format(parseISO(dateString), formatStr);
  } catch {
    return dateString;
  }
};

export const formatTime = (timeString, formatStr = 'h:mm a') => {
  if (!timeString) return 'N/A';
  try {
    return format(parseISO(`2000-01-01T${timeString}`), formatStr);
  } catch {
    return timeString;
  }
};

export const formatDateTime = (dateTimeString, formatStr = 'MMM dd, yyyy h:mm a') => {
  if (!dateTimeString) return 'N/A';
  try {
    return format(parseISO(dateTimeString), formatStr);
  } catch {
    return dateTimeString;
  }
};

export const getStatusColor = (status) => {
  const colors = {
    pending: '#FF9800',
    confirmed: '#2196F3',
    completed: '#4CAF50',
    cancelled: '#E53935',
  };
  return colors[status?.toLowerCase()] || '#9E9E9E';
};

export const getStatusBgColor = (status) => {
  const colors = {
    pending: '#FFF3E0',
    confirmed: '#E3F2FD',
    completed: '#E8F5E9',
    cancelled: '#FFEBEE',
  };
  return colors[status?.toLowerCase()] || '#F5F5F5';
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
