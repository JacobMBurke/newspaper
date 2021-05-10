import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'

import HomeScreen from './src/screens/home.screen'
import NewsPaperDetailScreen from './src/screens/newspapers/newspaper-detail.screen'
import NewsPaperListScreen from './src/screens/newspapers/newspaper-list.screen'
import RoutesListScreen from './src/screens/routes/routes-list.screen'

import { RootStackParamList } from './src/navigation/navigationTypes'

import store from './src/store'

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />

          <Stack.Screen
            name="Newspaper-Detail"
            component={NewsPaperDetailScreen}
            options={{ title: 'New Newspaper' }}
          />
          <Stack.Screen
            name="Newspaper-List"
            component={NewsPaperListScreen}
            options={{ title: 'Newspapers' }}
          />

          <Stack.Screen
            name="Route-List"
            component={RoutesListScreen}
            options={{ title: 'Routes' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
