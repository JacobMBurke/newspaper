import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { RootStackParamList } from '../navigation/navigationTypes'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Home'
>

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp
    route: HomeScreenRouteProp
}

const HomeScreen = (props: HomeScreenProps) => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Button
                title="Go to Newspapers"
                onPress={() => props.navigation.navigate('Newspaper-List')}
            />
            <Button
                title="Go to Paper Routes"
                onPress={() => props.navigation.navigate('Route-List')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})

export default HomeScreen
