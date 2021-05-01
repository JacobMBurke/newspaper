import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const HomeScreen = (props: any) => {
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <StatusBar style="auto" />
            <Button
                title="Go to Details 1"
                onPress={() => props.navigation.navigate('Detail', {paperId: 1})}
            />
            <Button
                title="Go to Details 2"
                onPress={() => props.navigation.navigate('Detail', {paperId: 2})}
            />
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

export default HomeScreen
