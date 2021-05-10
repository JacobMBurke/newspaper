import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Button, TextInput, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import { Card } from 'react-native-elements'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import 'react-native-get-random-values'
import { useDispatch, useSelector } from 'react-redux'

import { RootStackParamList } from '../../navigation/navigationTypes'
import { RootState } from '../../store'
import { selectSingleRoute, upsert } from '../../store/routes/reducer'
import { RouteModel } from '../../models/RouteModel'

type RouteDetailScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Newspaper-Detail'
>

type RouteScreenRouteProp = RouteProp<RootStackParamList, 'Route-Detail'>

interface RouteDetailScreenProps {
    navigation: RouteDetailScreenNavigationProp
    route: RouteScreenRouteProp
}

const RouteDetailScreen = (props: RouteDetailScreenProps) => {
    
    const routeG = useSelector((state: RootState) => selectSingleRoute(state, props.route.params.routeId))
    const dispatch = useDispatch()

    const [route, setRoute] = useState<RouteModel>({
        name: '',
        id: '',
        deliveryUserId: '',
        description: '',
        warnings: [],
        newspaperIds: []
    })

    const [editable, setEditable] = useState<boolean>(false)

    useEffect(() => {
        props.navigation.setOptions({
            title: `${route.name}`,
            headerRight: () => (
                <Button
                    onPress={() => setEditable(!editable)}
                    title="Edit"
                />),
            headerRightContainerStyle: { paddingRight: 15 },
            headerBackTitle: 'Home'
        })

        if (route) {
            setRoute(route)
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
                            console.log(route)
                            dispatch(upsert(route))

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
    }, [editable, route])

    useEffect(() => {
        props.navigation.setOptions({
            title: route.name
        })
    }, [route])

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: false,
    //         aspect: [4, 3],
    //         quality: 1,
    //     })

    //     console.log(result)

    //     if (!result.cancelled) {
    //         setRoute({ ...route, image: result.uri })
    //     }
    // }

    return (
        <View style={styles.container}>
            <Card>
                <Card.Title>Route Name</Card.Title>
                <Card.Divider />
                <StatusBar style="auto" />

                <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                    <TextInput
                        value={route.name}
                        editable={editable}
                        style={{ padding: 5, height: 40, borderWidth: 1, alignSelf: 'center', flex: 3 }}
                        placeholder='Insert Route Name here'
                        onChangeText={text => setRoute({ ...route, name: text })}
                        defaultValue={'Insert Route Name here'}
                    />
                </View>
            </Card>

            <Card>
                <Card.Title>Description</Card.Title>
                <Card.Divider />
                <StatusBar style="auto" />

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput
                        value={route.description}
                        editable={editable}
                        style={{ padding: 5, height: 40, borderWidth: 1, alignSelf: 'center', flex: 3 }}
                        placeholder='Insert route Description here'
                        onChangeText={text => setRoute({ ...route, description: text })}
                        defaultValue={'Insert route Description here'}
                    />
                </View>
            </Card>
            {/* <Card>
                <Card.Title>Image</Card.Title>
                <Card.Divider />
                <StatusBar style="auto" />

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                    {route.image && <Image style={{ height: 200, width: 200 }} source={{ uri: paper.image }} />}
                </View>
                <Button
                    onPress={pickImage}
                    title="Add Image"
                />
            </Card> */}
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

export default RouteDetailScreen
