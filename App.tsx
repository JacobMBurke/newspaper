import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './src/screens/home.screen'
import NewsPaperDetailScreen from './src/screens/newspaper-detail.screen'

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Overview' }}
        />
        <Stack.Screen name="Detail" component={NewsPaperDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
