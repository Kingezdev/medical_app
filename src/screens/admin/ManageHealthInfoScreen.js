import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { sampleHealthInfo } from '../../data/sampleData';
import { formatDate, truncateText } from '../../utils/helpers';

const categoryColors = {
  'Disease Prevention': '#E3F2FD',
  'Nutrition': '#E8F5E9',
  'Mental Health': '#F3E5F5',
  'Infectious Diseases': '#FFF3E0',
  'Reproductive Health': '#FFEBEE',
};

const categoryTextColors = {
  'Disease Prevention': '#0066CC',
  'Nutrition': '#4CAF50',
  'Mental Health': '#9C27B0',
  'Infectious Diseases': '#FF9800',
  'Reproductive Health': '#E53935',
};

export default function ManageHealthInfoScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Health Information"
        subtitle={`${sampleHealthInfo.length} articles published`}
        rightComponent={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateHealthInfo')}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {sampleHealthInfo.map((info) => (
          <Card key={info.id}>
            <View style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <View style={[
                  styles.categoryBadge,
                  { backgroundColor: categoryColors[info.category] || '#F5F7FA' },
                ]}>
                  <Text style={[
                    styles.categoryText,
                    { color: categoryTextColors[info.category] || '#6B7280' },
                  ]}>
                    {info.category}
                  </Text>
                </View>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusDot, { backgroundColor: info.is_active ? '#4CAF50' : '#E53935' }]} />
                  <Text style={styles.statusText}>{info.is_active ? 'Active' : 'Inactive'}</Text>
                </View>
              </View>

              <Text style={styles.infoTitle}>{info.title}</Text>
              <Text style={styles.infoPreview} numberOfLines={2}>
                {truncateText(info.content.replace(/\n/g, ' '), 120)}
              </Text>

              <View style={styles.infoFooter}>
                <View style={styles.authorRow}>
                  <Ionicons name="person-outline" size={12} color="#9CA3AF" />
                  <Text style={styles.authorText}>{info.published_by_name}</Text>
                  <Text style={styles.dateText}> · {formatDate(info.date_published)}</Text>
                </View>
                <View style={styles.actionsRow}>
                  <TouchableOpacity style={styles.actionIcon}>
                    <Ionicons name="create-outline" size={18} color="#0066CC" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionIcon}>
                    <Ionicons name="trash-outline" size={18} color="#E53935" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card>
        ))}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  infoCard: {
    padding: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    color: '#6B7280',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 8,
    lineHeight: 22,
  },
  infoPreview: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  infoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 10,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  dateText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIcon: {
    padding: 4,
  },
  bottomPadding: {
    height: 20,
  },
});
