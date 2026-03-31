// Project: 21 | Author: 9e9db132-363d-4411-9541-8836de8a9da6 | Generated: 2026-03-30T13:54:31.464Z | Build: #1
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import { CATEGORIES } from '../src/data';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function FlashcardScreen({ route, navigation }: any) {
  const { categoryId, startIndex } = route.params;
  const category = CATEGORIES.find(c => c.id === categoryId);
  const items = category?.items || [];

  const [currentIndex, setCurrentIndex] = useState(startIndex || 0);
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());
  const [marking, setMarking] = useState(false);

  useEffect(() => {
     fetch('/api/learned_items')
        .then(r => r.json())
        .then(data => setLearnedIds(new Set(data.map((d: any) => d.item_id))))
        .catch(console.error);
  }, []);

  const currentItem = items[currentIndex];
  if (!currentItem) return null;

  const handleNext = () => { if (currentIndex < items.length - 1) setCurrentIndex(prev => prev + 1); };
  const handlePrev = () => { if (currentIndex > 0) setCurrentIndex(prev => prev - 1); };

  const markLearned = async () => {
      if (learnedIds.has(currentItem.id)) return;
      setMarking(true);
      try {
          await fetch('/api/learned_items', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ item_id: currentItem.id })
          });
          setLearnedIds(prev => new Set([...Array.from(prev), currentItem.id]));
      } catch (e) {
          console.error(e);
      } finally {
          setMarking(false);
      }
  };

  const isLearned = learnedIds.has(currentItem.id);
  const isLongWord = currentItem.char.length > 2;

  return (
      <SafeAreaView style={styles.container}>
         <View style={styles.cardContainer}>
            <View style={[styles.card, isLearned && styles.cardLearned]}>
               {isLearned && (
                  <View style={styles.learnedTag}>
                      <Ionicons name="star" size={20} color="#D69E2E" />
                      <Text style={styles.learnedTagText}>Mastered</Text>
                  </View>
               )}
               <Text style={[styles.mainChar, isLongWord && styles.mainCharSmall]}>
                  {currentItem.char}
               </Text>
               <Text style={styles.transliteration}>{currentItem.transliteration}</Text>

               {(currentItem.word || currentItem.wordEng) && (
                   <View style={styles.wordContainer}>
                      {currentItem.word && <Text style={styles.vocabWord}>{currentItem.word}</Text>}
                      {currentItem.wordEng && <Text style={styles.vocabEng}>({currentItem.wordEng})</Text>}
                   </View>
               )}
            </View>
         </View>

         <View style={styles.controlsContainer}>
             <TouchableOpacity 
                 style={[styles.navBtn, currentIndex === 0 && styles.navBtnDisabled]} 
                 onPress={handlePrev} 
                 disabled={currentIndex === 0}
             >
                 <Ionicons name="chevron-back" size={32} color={currentIndex === 0 ? "#CBD5E0" : "#4A5568"} />
             </TouchableOpacity>

             <TouchableOpacity
                 style={[styles.actionBtn, isLearned && styles.actionBtnLearned]}
                 onPress={markLearned}
                 disabled={isLearned || marking}
                 activeOpacity={0.8}
             >
                 {marking ? <ActivityIndicator color="#FFFFFF" /> : (
                    <Text style={[styles.actionBtnText, isLearned && styles.actionBtnTextLearned]}>
                        {isLearned ? 'Great Job!' : 'Mark as Learned'}
                    </Text>
                 )}
             </TouchableOpacity>

             <TouchableOpacity 
                 style={[styles.navBtn, currentIndex === items.length - 1 && styles.navBtnDisabled]} 
                 onPress={handleNext} 
                 disabled={currentIndex === items.length - 1}
             >
                 <Ionicons name="chevron-forward" size={32} color={currentIndex === items.length - 1 ? "#CBD5E0" : "#4A5568"} />
             </TouchableOpacity>
         </View>
         <Text style={styles.counter}>{currentIndex + 1} / {items.length}</Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  cardContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  card: { backgroundColor: '#FFFFFF', width: '100%', aspectRatio: 0.8, borderRadius: 40, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.08, shadowRadius: 32, elevation: 5, padding: 24, borderWidth: 2, borderColor: 'transparent' },
  cardLearned: { borderColor: '#C6F6D5', backgroundColor: '#F0FFF4' },
  learnedTag: { position: 'absolute', top: 24, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEFCBF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  learnedTagText: { fontSize: 14, fontWeight: '700', color: '#975A16', marginLeft: 6 },
  mainChar: { fontSize: 130, fontWeight: '800', color: '#2D3748', marginBottom: 8, textAlign: 'center' },
  mainCharSmall: { fontSize: 64 },
  transliteration: { fontSize: 28, fontWeight: '600', color: '#A0AEC0', marginBottom: 32 },
  wordContainer: { alignItems: 'center', backgroundColor: '#EDF2F7', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 24 },
  vocabWord: { fontSize: 32, fontWeight: '700', color: '#4A5568', marginBottom: 4 },
  vocabEng: { fontSize: 18, fontWeight: '500', color: '#718096' },
  controlsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 24 },
  navBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 2 },
  navBtnDisabled: { backgroundColor: '#F7FAFC', elevation: 0 },
  actionBtn: { flex: 1, height: 64, backgroundColor: '#2D3748', borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 3 },
  actionBtnLearned: { backgroundColor: '#48BB78', shadowColor: '#48BB78' },
  actionBtnText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  actionBtnTextLearned: { color: '#FFFFFF' },
  counter: { textAlign: 'center', color: '#A0AEC0', fontSize: 16, fontWeight: '700', marginBottom: 32, letterSpacing: 2 }
});