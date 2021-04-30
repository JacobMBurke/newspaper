import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const NewspaperDetailScreen = (props: any) => {
    return (
        <View style={styles.container}>
            <Text>NewspaperDetailScreen</Text>
            <StatusBar style="auto" />
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

export default NewspaperDetailScreen
