import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './src/screens/home.screen'
import NewsPaperDetailScreen from './src/screens/newspapers/newspaper-detail.screen'
import NewsPaperListScreen from './src/screens/newspapers/newspaper-list.screen'
import { RootStackParamList } from './src/navigation/navigationTypes'
import { Provider } from 'react-redux'

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
            name="Detail"
            component={NewsPaperDetailScreen}
            options={{ title: 'New Newspaper' }}
          />
          <Stack.Screen
            name="Newspaper-List"
            component={NewsPaperListScreen}
            options={{ title: 'Newspapers' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
