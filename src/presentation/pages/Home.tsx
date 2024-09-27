import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { homeBg, logo, startBtn } from '../../assets/images'

const Home = () => {
    const navigation = useNavigation()
    return (
        <View>
            <Image source={homeBg}
                style={styles.container} />
            <TouchableOpacity
                style={styles.startGame}
                onPress={() => navigation.replace('gamePlay')}
            >
                <Image source={logo} />
                <Image source={startBtn} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    startGame: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        gap: 40,
    },
}
)

export default Home