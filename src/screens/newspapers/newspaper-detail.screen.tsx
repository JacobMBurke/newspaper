import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/navigationTypes'

type NewspaperDetailScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Detail'
>

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>

interface NewspaperDetailScreenProps {
    navigation: NewspaperDetailScreenNavigationProp
    route: ProfileScreenRouteProp
}

const NewspaperDetailScreen = (props: NewspaperDetailScreenProps) => {

    useEffect(() => {
        props.navigation.setOptions({
            title: `Newspaper ${props.route.params.paper.id}`,
            headerRight: () => (
                <Button
                    onPress={() => alert('This is a button!')}
                    title="Edit"
                />),
            headerRightContainerStyle: { paddingRight: 15 },
            headerBackTitle: 'Home'
        })
    }, [])
    return (
        <View style={styles.container}>
            <Text>NewspaperDetailScreen {props.route.params.paper.id}</Text>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default NewspaperDetailScreen
