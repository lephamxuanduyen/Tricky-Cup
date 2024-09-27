import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, StyleSheet } from 'react-native'

const Home = () => {
    const navigation = useNavigation()
    return (
        <Text
            style={styles.container}
            onPress={() => {
                navigation.replace('gamePlay')
            }}
        >Home Screen</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 40
    }
}
)

export default Home