import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusColor, getStatusBgColor } from '../utils/helpers';

export default function StatusBadge({ status, size = 'medium' }) {
  const statusText = status?.charAt(0).toUpperCase() + status?.slice(1);
  const isSmall = size === 'small';

  return (
    <View style={[
      styles.badge,
      { backgroundColor: getStatusBgColor(status) },
      isSmall && styles.smallBadge,
    ]}>
      <View style={[styles.dot, { backgroundColor: getStatusColor(status) }]} />
      <Text style={[
        styles.text,
        { color: getStatusColor(status) },
        isSmall && styles.smallText,
      ]}>
        {statusText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  smallBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  smallText: {
    fontSize: 10,
  },
});
