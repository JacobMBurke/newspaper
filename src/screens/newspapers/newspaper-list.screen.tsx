import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NewspaperModel } from '../../models/NewspaperModel'
import { RootStackParamList } from '../../navigation/navigationTypes'
import { Card } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { selectNewspapers, upsert } from '../../store/newspapers/reducer'

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

    const [papers, setPapers] = useState<NewspaperModel[]>(newspapers)

    useEffect(() => {
        props.navigation.setOptions({
            title: `Newspapers`,
            headerRight: () => (
                <Button
                    onPress={() => props.navigation.navigate('Detail', { paperId: undefined })}
                    title="New"
                />),
            headerRightContainerStyle: { paddingRight: 15 }
        })
    }, [])

    useEffect(() => {
        setPapers(newspapers)
    }, [newspapers])

    const renderNewspaperItem = ({ item }: { item: NewspaperModel }) => {
        return (
            <View style={styles.container}>
                <Card>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Divider />
                    <Text>{item.description}</Text>
                    <Button
                        title={'View'}
                        onPress={() => props.navigation.navigate('Detail', { paperId: item.id })}
                    />

                </Card>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList data={papers} renderItem={renderNewspaperItem} keyExtractor={item => item.id} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    }
})

export default NewspaperListScreen
