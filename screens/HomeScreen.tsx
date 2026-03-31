// Project: 21 | Author: 9e9db132-363d-4411-9541-8836de8a9da6 | Generated: 2026-03-30T13:54:31.464Z | Build: #1
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { CATEGORIES } from '../src/data';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function HomeScreen({ navigation }: any) {
  const [learnedCount, setLearnedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetch('/api/learned_items')
        .then(r => r.json())
        .then(data => {
            const uniques = new Set(data.map((d: any) => d.item_id));
            setLearnedCount(uniques.size);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, [])
  );

  return (
      <SafeAreaView style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.greeting}>નમસ્તે!</Text>
            <Text style={styles.subtitle}>Namaste! What should we learn today?</Text>
            {loading ? <ActivityIndicator size="small" color="#48BB78" style={{ alignSelf: 'flex-start' }} /> : (
                <View style={styles.progressBadge}>
                  <Ionicons name="star" size={16} color="#D69E2E" />
                  <Text style={styles.progressText}>{learnedCount} Items Mastered</Text>
                </View>
            )}
         </View>

         <FlatList
           data={CATEGORIES}
           keyExtractor={item => item.id}
           numColumns={2}
           contentContainerStyle={styles.listContainer}
           renderItem={({ item }) => (
               <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate('Category', { categoryId: item.id, title: item.title })}
                  activeOpacity={0.8}
               >
                  <Image
                      source={{ uri: `https://loremflickr.com/400/300/fashion,clothing?lock=${item.imageLock}` }}
                      style={styles.cardImage}
                  />
                  <View style={styles.cardContent}>
                     <Text style={styles.cardTitle}>{item.title}</Text>
                     <Text style={styles.cardSubtitle}>{item.englishTitle}</Text>
                  </View>
               </TouchableOpacity>
           )}
         />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { padding: 24, paddingBottom: 16 },
  greeting: { fontSize: 36, fontWeight: '800', color: '#1A202C', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#718096', marginBottom: 20 },
  progressBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEFCBF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, alignSelf: 'flex-start' },
  progressText: { fontSize: 14, fontWeight: '700', color: '#975A16', marginLeft: 8 },
  listContainer: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', width: CARD_WIDTH, borderRadius: 24, margin: 8, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 3 },
  cardImage: { width: '100%', height: 130, backgroundColor: '#EDF2F7' },
  cardContent: { padding: 16, alignItems: 'center' },
  cardTitle: { fontSize: 22, fontWeight: '700', color: '#2D3748', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, fontWeight: '600', color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: 0.5 }
});