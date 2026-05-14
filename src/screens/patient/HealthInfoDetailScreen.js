import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { sampleHealthInfo } from '../../data/sampleData';
import { formatDate } from '../../utils/helpers';

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

export default function HealthInfoDetailScreen({ route }) {
  const { infoId } = route.params;
  const info = sampleHealthInfo.find((i) => i.id === infoId);

  if (!info) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Not Found" showBack />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Health information not found.</Text>
        </View>
      </View>
    );
  }

  const paragraphs = info.content.split('\n').filter((p) => p.trim());

  return (
    <View style={styles.container}>
      <ScreenHeader title="Health Article" showBack />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Card>
          <View style={styles.articleHeader}>
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
            <Text style={styles.articleDate}>{formatDate(info.date_published)}</Text>
          </View>

          <Text style={styles.articleTitle}>{info.title}</Text>

          <View style={styles.authorSection}>
            <Ionicons name="person-circle" size={36} color="#0066CC" />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{info.published_by_name}</Text>
              <Text style={styles.authorRole}>Health Center Administrator</Text>
            </View>
          </View>
        </Card>

        <Card>
          {paragraphs.map((paragraph, index) => {
            const isNumbered = /^\d+\./.test(paragraph.trim());
            const isHeader = paragraph.trim().endsWith(':') && paragraph.length < 50;

            if (isHeader) {
              return (
                <Text key={index} style={styles.sectionHeader}>
                  {paragraph}
                </Text>
              );
            }

            return (
              <Text key={index} style={[
                styles.paragraph,
                isNumbered && styles.numberedParagraph,
              ]}>
                {paragraph}
              </Text>
            );
          })}
        </Card>

        <Card style={styles.disclaimerCard}>
          <View style={styles.disclaimer}>
            <Ionicons name="information-circle" size={20} color="#FF9800" />
            <Text style={styles.disclaimerText}>
              This information is for educational purposes only. Always consult a healthcare professional for medical advice.
            </Text>
          </View>
        </Card>

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
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  articleDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A2E',
    lineHeight: 28,
    marginBottom: 16,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  authorInfo: {
    marginLeft: 10,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  authorRole: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 1,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0066CC',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 12,
  },
  numberedParagraph: {
    paddingLeft: 8,
  },
  disclaimerCard: {
    backgroundColor: '#FFF8E1',
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },
  bottomPadding: {
    height: 20,
  },
});
