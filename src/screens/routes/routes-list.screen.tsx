import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { Card } from 'react-native-elements'
import { useSelector } from 'react-redux'

import { RootStackParamList } from '../../navigation/navigationTypes'
import { selectRoutes } from '../../store/routes/reducer'
import { RouteModel } from '../../models/RouteModel'

type RouteListScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Route-List'
>

type RouteListScreenRouteProp = RouteProp<RootStackParamList, 'Route-List'>

interface RouteListScreenProps {
    navigation: RouteListScreenNavigationProp
    route: RouteListScreenRouteProp
}

const RoutesListScreen = (props: RouteListScreenProps) => {
    const routes = useSelector(selectRoutes)

    useEffect(() => {
        props.navigation.setOptions({
            title: `Routes`,
            headerRight: () => (
                <Button
                    onPress={() => props.navigation.navigate('Route-Detail', { routeId: undefined })}
                    title="New"
                />),
            headerRightContainerStyle: { paddingRight: 15 }
        })
    }, [])

    const renderRouteItem = ({ item }: { item: RouteModel }) => {
        return (
            <View style={styles.container}>
                <Card>
                    <View style={styles.cardHeader}>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Title>{item.deliveryUserId}</Card.Title>
                    </View>
                    <Card.Divider />
                    <Text>{item.description}</Text>
                    <Button
                        title={'View'}
                        onPress={() => props.navigation.navigate('Route-Detail', { routeId: item.id })}
                    />

                </Card>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList data={routes} renderItem={renderRouteItem} keyExtractor={item => item.id} />
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
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        padding: 5
    }
})

export default RoutesListScreen
