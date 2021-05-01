import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NewspaperModel } from '../../models/NewspaperModel'
import { RootStackParamList } from '../../navigation/navigationTypes'

type NewspaperListScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Newspaper-List'
>

type NewspaperListScreenRouteProp = RouteProp<RootStackParamList, 'Newspaper-List'>

interface NewspaperListScreenProps {
    navigation: NewspaperListScreenNavigationProp
    route: NewspaperListScreenRouteProp
}

const NewspaperListScreen = (props: NewspaperListScreenProps) => {

    useEffect(() => {
        props.navigation.setOptions({
            title: `Newspaper List`
        })
    }, [])

    const renderNewspaperItem = ({ item }: {item: NewspaperModel}) => {
        return (
        <View style={styles.container}>
            <Button
                title={item.title}
                onPress={() => props.navigation.navigate('Detail', { paper: item })}
            />
        </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text>NewspaperListScreen</Text>
            <StatusBar style="auto" />
            <FlatList data={[{id:'5', title: 'The Guardian', description: ' a lefty newspaper'}]} renderItem={ renderNewspaperItem } keyExtractor={item => item.id}/>
            
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

export default NewspaperListScreen
