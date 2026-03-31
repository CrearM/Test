// Project: 21 | Author: 9e9db132-363d-4411-9541-8836de8a9da6 | Generated: 2026-03-30T13:54:31.464Z | Build: #1
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { CATEGORIES } from '../src/data';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 64) / 3;

export default function CategoryScreen({ route, navigation }: any) {
  const { categoryId } = route.params;
  const category = CATEGORIES.find(c => c.id === categoryId);
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());

  useFocusEffect(
    React.useCallback(() => {
      fetch('/api/learned_items')
         .then(r => r.json())
         .then(data => {
            setLearnedIds(new Set(data.map((d: any) => d.item_id)));
         })
         .catch(console.error);
    }, [])
  );

  if (!category) return null;

  return (
     <SafeAreaView style={styles.container}>
        <FlatList
          data={category.items}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={styles.grid}
          renderItem={({ item, index }) => {
             const isLearned = learnedIds.has(item.id);
             const isLongWord = item.char.length > 2;
             return (
                 <TouchableOpacity
                     style={[styles.itemCard, isLearned && styles.itemCardLearned]}
                     onPress={() => navigation.navigate('Flashcard', { categoryId: category.id, startIndex: index })}
                     activeOpacity={0.7}
                 >
                    <Text style={[styles.itemChar, isLongWord && styles.itemCharSmall]}>{item.char}</Text>
                    <Text style={styles.itemTrans}>{item.transliteration}</Text>
                    {isLearned && (
                        <View style={styles.checkBadge}>
                           <Ionicons name="checkmark-circle" size={24} color="#48BB78" />
                        </View>
                    )}
                 </TouchableOpacity>
             )
          }}
        />
     </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  grid: { padding: 16, alignItems: 'center' },
  itemCard: { width: ITEM_SIZE, height: ITEM_SIZE * 1.1, margin: 8, backgroundColor: '#FFFFFF', borderRadius: 24, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2, padding: 8 },
  itemCardLearned: { backgroundColor: '#F0FFF4', borderColor: '#C6F6D5', borderWidth: 2 },
  itemChar: { fontSize: 44, fontWeight: '700', color: '#2D3748', marginBottom: 4, textAlign: 'center' },
  itemCharSmall: { fontSize: 24 },
  itemTrans: { fontSize: 13, color: '#A0AEC0', fontWeight: '600' },
  checkBadge: { position: 'absolute', top: -8, right: -8, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 2 }
});