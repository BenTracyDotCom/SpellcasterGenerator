import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StatusBar } from 'expo-status-bar';
import Launch from './src/screens/Launch';
import StorageTest from './src/screens/StorageTest';
import Loading from './src/screens/Loading';
import AddNpc from './src/screens/AddNpc';

const Stack = createNativeStackNavigator();

export default function App() {

  const[loaded, setLoaded] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('dataLoaded')
    .then(data => {
      setLoaded(data === 'true' ? true : false)
    })
  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Loading">
        <Stack.Screen
        name="Loading"
        component={Loading}
        />
        <Stack.Screen
        name="Launch"
        component={Launch}
        />
        <Stack.Screen
        name="Storage Test"
        component={StorageTest}
        />
        <Stack.Screen
        name="Add NPC"
        component={AddNpc}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
