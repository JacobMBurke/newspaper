import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/navigationTypes'
import { NewspaperModel } from '../../models/NewspaperModel'
import { Card } from 'react-native-elements'

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

    const [paper, setPaper] = useState<NewspaperModel>(props.route.params.paper)
    const [editable, setEditable] = useState<boolean>(false)

    useEffect(() => {
        props.navigation.setOptions({
            title: `${paper.title}`,
            headerRight: () => (
                <Button
                    onPress={() => setEditable(!editable)}
                    title="Edit"
                />),
            headerRightContainerStyle: { paddingRight: 15 },
            headerBackTitle: 'Home'
        })
    }, [])

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => setEditable(!editable)}
                    title="Edit"
                />)
        })
    }, [editable])

    useEffect(() => {
        props.navigation.setOptions({
            title: paper.title
        })
    }, [paper])

    return (
        <View style={styles.container}>
            <Card
                containerStyle={
                    {
                        alignSelf: 'stretch'
                    }
                }>
                <Card.Title>{paper.title}</Card.Title>
                <Card.Divider />
                <StatusBar style="auto" />

                <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
                    <Text style={{textAlign: 'center', textAlignVertical: 'center', flex: 1}}>Title: </Text>
                    <TextInput
                        value={paper.title}
                        editable={editable}
                        style={{ height: 40, borderWidth: 1, alignSelf: 'center', flex: 3 }}
                        placeholder='Insert Newspaper Title here'
                        onChangeText={text => setPaper({ ...paper, title: text })}
                        defaultValue={'Insert Newspaper Title here'}
                    />
                </View>
            </Card>

            <Card
                containerStyle={
                    {
                        alignSelf: 'stretch'
                    }
                }>
                <Card.Title>{paper.description}</Card.Title>
                <Card.Divider />
                <StatusBar style="auto" />

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center', textAlignVertical: 'center', flex: 1}}>Description: </Text>
                    <TextInput
                        value={paper.description}
                        editable={editable}
                        style={{ height: 40, borderWidth: 1, alignSelf: 'center', flex: 3 }}
                        placeholder='Insert Newspaper Description here'
                        onChangeText={text => setPaper({ ...paper, description: text })}
                        defaultValue={'Insert Newspaper Description here'}
                    />
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    }
})

export default NewspaperDetailScreen
