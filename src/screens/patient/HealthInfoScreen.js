import React, { useState } from 'react';
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

const categories = ['All', 'Disease Prevention', 'Nutrition', 'Mental Health', 'Infectious Diseases', 'Reproductive Health'];

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

export default function HealthInfoScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredInfo = selectedCategory === 'All'
    ? sampleHealthInfo
    : sampleHealthInfo.filter((info) => info.category === selectedCategory);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Health Information"
        subtitle="Stay informed with verified health content"
      />

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive,
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredInfo.map((info) => (
          <Card
            key={info.id}
            onPress={() => navigation.navigate('HealthInfoDetail', { infoId: info.id })}
          >
            <View style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <View style={[
                  styles.categoryBadge,
                  { backgroundColor: categoryColors[info.category] || '#F5F7FA' },
                ]}>
                  <Text style={[
                    styles.categoryBadgeText,
                    { color: categoryTextColors[info.category] || '#6B7280' },
                  ]}>
                    {info.category}
                  </Text>
                </View>
                <Text style={styles.infoDate}>{formatDate(info.date_published)}</Text>
              </View>

              <Text style={styles.infoTitle}>{info.title}</Text>
              <Text style={styles.infoPreview} numberOfLines={3}>
                {truncateText(info.content.replace(/\n/g, ' '), 120)}
              </Text>

              <View style={styles.infoFooter}>
                <View style={styles.authorRow}>
                  <Ionicons name="person-outline" size={12} color="#9CA3AF" />
                  <Text style={styles.authorText}>{info.published_by_name}</Text>
                </View>
                <View style={styles.readMore}>
                  <Text style={styles.readMoreText}>Read More</Text>
                  <Ionicons name="arrow-forward" size={12} color="#0066CC" />
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
  categoriesScroll: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    maxHeight: 56,
  },
  categoriesContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
    marginHorizontal: 4,
  },
  categoryChipActive: {
    backgroundColor: '#F0F7FF',
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  categoryText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#0066CC',
    fontWeight: '700',
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
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  infoDate: {
    fontSize: 11,
    color: '#9CA3AF',
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
    marginLeft: 4,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '600',
    marginRight: 4,
  },
  bottomPadding: {
    height: 20,
  },
});
