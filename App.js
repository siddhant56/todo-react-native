import React from 'react';

import StarterScreen from './src/screens/StarterScreen';
import HomeScreen from './src/screens/HomeScreen';
import TodayScreen from './src/screens/TodayScreen';
import WorkScreen from './src/screens/WorkScreen';
import PersonalScreen from './src/screens/PersonalScreen';
import GroceryScreen from './src/screens/GroceryScreen';

import DummyScreen from './src/screens/DummyScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dummy">
        <Stack.Screen
          options={{headerShown: false}}
          name="Dummy"
          component={DummyScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Starter"
          component={StarterScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Today"
          component={TodayScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Work"
          component={WorkScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Person"
          component={PersonalScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Grocery"
          component={GroceryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
