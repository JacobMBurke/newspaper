import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Button, TextInput, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import { Card } from 'react-native-elements'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'

import { RootStackParamList } from '../../navigation/navigationTypes'
import { NewspaperModel } from '../../models/NewspaperModel'
import { selectSingleNewspaper, upsert } from '../../store/newspapers/reducer'
import { RootState } from '../../store'

type NewspaperDetailScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Newspaper-Detail'
>

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Newspaper-Detail'>

interface NewspaperDetailScreenProps {
    navigation: NewspaperDetailScreenNavigationProp
    route: ProfileScreenRouteProp
}

const NewspaperDetailScreen = (props: NewspaperDetailScreenProps) => {
    const newspaper = useSelector((state: RootState) => selectSingleNewspaper(state, props.route.params.paperId))
    const dispatch = useDispatch()

    const [paper, setPaper] = useState<NewspaperModel>({
        id: uuidv4(),
        title: '',
        description: '',
        createdDate: (new Date()).getTime()
    })

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

        if (newspaper) {
            setPaper(newspaper)
            return
        }
        setEditable(true)
    }, [])

    useEffect(() => {
        if (editable) {
            props.navigation.setOptions({
                headerRight: () => (
                    <Button
                        onPress={() => {
                            console.log(paper)
                            dispatch(upsert(paper))

                            setEditable(false)
                        }}
                        title="Save"
                    />)
            })
            return
        }
        props.navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => setEditable(!editable)}
                    title="Edit"
                />)
        })
    }, [editable, paper])

    useEffect(() => {
        props.navigation.setOptions({
            title: paper.title
        })
    }, [paper])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        })

        console.log(result)

        if (!result.cancelled) {
            setPaper({ ...paper, image: result.uri })
        }
    }

    return (
        <View style={styles.container}>
            <Card>
                <Card.Title>Title</Card.Title>
                <Card.Divider />
                <StatusBar style="auto" />

                <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                    <TextInput
                        value={paper.title}
                        editable={editable}
                        style={{ padding: 5, height: 40, borderWidth: 1, alignSelf: 'center', flex: 3 }}
                        placeholder='Insert Newspaper Title here'
                        onChangeText={text => setPaper({ ...paper, title: text })}
                        defaultValue={'Insert Newspaper Title here'}
                    />
                </View>
            </Card>

            <Card>
                <Card.Title>Description</Card.Title>
                <Card.Divider />
                <StatusBar style="auto" />

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput
                        value={paper.description}
                        editable={editable}
                        style={{ padding: 5, height: 40, borderWidth: 1, alignSelf: 'center', flex: 3 }}
                        placeholder='Insert Newspaper Description here'
                        onChangeText={text => setPaper({ ...paper, description: text })}
                        defaultValue={'Insert Newspaper Description here'}
                    />
                </View>
            </Card>
            <Card>
                <Card.Title>Image</Card.Title>
                <Card.Divider />
                <StatusBar style="auto" />

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                    {paper.image && <Image style={{ height: 200, width: 200 }} source={{ uri: paper.image }} />}
                </View>
                <Button
                    onPress={pickImage}
                    title="Add Image"
                />
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
