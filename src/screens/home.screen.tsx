import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const HomeScreen = (props: any) => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Button
                title="Go to Newspapers"
                onPress={() => props.navigation.navigate('Newspaper-List')}
            />
            <Button
                title="Go to Newspapers"
                onPress={() => props.navigation.navigate('Newspaper-List')}
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
