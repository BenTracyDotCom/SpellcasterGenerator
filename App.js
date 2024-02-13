import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import Launch from './src/screens/Launch';
import StorageTest from './src/screens/StorageTest';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Launch">
        <Stack.Screen
        name="Launch"
        component={Launch}
        />
        <Stack.Screen
        name="Storage Test"
        component={StorageTest}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
