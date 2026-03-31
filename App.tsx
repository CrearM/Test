// Project: 21 | Author: 9e9db132-363d-4411-9541-8836de8a9da6 | Generated: 2026-03-30T13:54:31.462Z | Build: #1
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import FlashcardScreen from './screens/FlashcardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FAFAFA' },
          headerTintColor: '#2D3748',
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '700', fontSize: 20 },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Gujarati for Kids' }} 
        />
        <Stack.Screen 
          name="Category" 
          component={CategoryScreen} 
          options={({ route }: any) => ({ title: route.params?.title || 'Learn' })} 
        />
        <Stack.Screen 
          name="Flashcard" 
          component={FlashcardScreen} 
          options={{ title: 'Practice' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}