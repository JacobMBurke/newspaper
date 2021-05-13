import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NewspaperModel } from '../../models/NewspaperModel'
import { RootStackParamList } from '../../navigation/navigationTypes'
import { Card } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { selectNewspapers } from '../../store/newspapers/reducer'

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
    const newspapers = useSelector(selectNewspapers)

    useEffect(() => {
        props.navigation.setOptions({
            title: `Newspapers`,
            headerRight: () => (
                <Button
                    onPress={() => props.navigation.navigate('Newspaper-Detail', { paperId: undefined })}
                    title="New"
                />),
            headerRightContainerStyle: { paddingRight: 15 }
        })
    }, [])

    const renderNewspaperItem = ({ item }: { item: NewspaperModel }) => {
        return (
            <View style={styles.container}>
                <Card>
                    <View style={styles.cardHeader}>
                        <Card.Title>{item.title}</Card.Title>
                        {item.image && <Card.Image style={{width: 100, height: 100}} source={{ uri: item.image }} />}
                    </View>
                    <Card.Divider />
                    <Text style={styles.cardText}>{item.description}</Text>
                    <Button
                        title={'View'}
                        onPress={() => props.navigation.navigate('Newspaper-Detail', { paperId: item.id })}
                    />

                </Card>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList data={newspapers} renderItem={renderNewspaperItem} keyExtractor={item => item.id} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    cardText: {
        paddingBottom: 5
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        padding: 5
    }
})

export default NewspaperListScreen
