import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Button, TextInput, FlatList, Text, Modal, TouchableHighlight } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Card, CheckBox } from 'react-native-elements'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import 'react-native-get-random-values'
import { useDispatch, useSelector } from 'react-redux'

import { RootStackParamList } from '../../navigation/navigationTypes'
import { RootState } from '../../store'
import { selectSingleRoute, upsert } from '../../store/routes/reducer'
import { RouteModel } from '../../models/RouteModel'
import { selectNewspapers, selectSingleNewspaper } from '../../store/newspapers/reducer'
import { NewspaperModel } from '../../models/NewspaperModel'

type RouteDetailScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Route-Detail'
>

type RouteScreenRouteProp = RouteProp<RootStackParamList, 'Route-Detail'>

interface RouteDetailScreenProps {
    navigation: RouteDetailScreenNavigationProp
    route: RouteScreenRouteProp
}

const RouteDetailScreen = (props: RouteDetailScreenProps) => {

    const routeG = useSelector((state: RootState) => selectSingleRoute(state, props.route.params.routeId))
    const papers = useSelector(selectNewspapers)
    const dispatch = useDispatch()

    const [route, setRoute] = useState<RouteModel>({
        name: '',
        id: uuidv4(),
        deliveryUserId: '',
        description: '',
        warnings: [],
        newspaperIds: []
    })

    const [paperIds, setPaperIds] = useState<string[]>(route.newspaperIds)

    const [showNewspaperModal, setShowNewspaperModal] = useState<boolean>(false)
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

        if (routeG) {
            setRoute(routeG)
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
                            dispatch(upsert({...route, newspaperIds: paperIds}))

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

    const renderRouteNewspaperItem = ({ item }: { item: string }) => {
        const newspaper = papers.find(el=> el.id === item)
        return (
            <Card containerStyle={{alignItems: 'flex-start', paddingBottom: 0}}>
                {newspaper ? <Card.Title>{newspaper.title}</Card.Title> : <Card.Title>Could not find paper in local records</Card.Title>}
            </Card>
        )
    }

    const renderNewspapersList = ({ item }: { item: NewspaperModel }) => {
        const found = paperIds.includes(item.id)
        return (
            <CheckBox
                title={item.title}
                checked={found}
                onPress={() => {
                    if (found) {
                        setPaperIds(paperIds.filter(el => el !== item.id))
                        return
                    }
                    setPaperIds([...paperIds, item.id])
                }} />
        )
    }

    return (
        <View style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showNewspaperModal}
            >
                <View style={styles.container}>

                    <FlatList data={papers} renderItem={renderNewspapersList} keyExtractor={item => item.id} />
                </View>

                <Button
                    onPress={() => {
                        setShowNewspaperModal(!showNewspaperModal);
                    }}
                    title="Hide Modal"
                />
            </Modal>

            <Card>
                <Card.Title>Route Name</Card.Title>
                <Card.Divider />
                <StatusBar style="auto" />

                <View style={styles.inputContainer}>
                    <TextInput
                        value={route.name}
                        editable={editable}
                        style={styles.input}
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

                <View style={styles.inputContainer}>
                    <TextInput
                        value={route.description}
                        editable={editable}
                        style={styles.input}
                        placeholder='Insert route Description here'
                        onChangeText={text => setRoute({ ...route, description: text })}
                        defaultValue={'Insert route Description here'}
                    />
                </View>
            </Card>
            <Card>
                <Card.Title>Newspapers</Card.Title>
                <Button
                    onPress={() => { setShowNewspaperModal(true) }}
                    title="Add or Remove Newspapers"
                />
                <Card.Divider />
                <View>
                    <FlatList data={paperIds} renderItem={renderRouteNewspaperItem} keyExtractor={item => item} />
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
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    input: {
        padding: 5,
        height: 40,
        borderWidth: 1,
        alignSelf: 'center',
        flex: 3
    }
})

export default RouteDetailScreen
