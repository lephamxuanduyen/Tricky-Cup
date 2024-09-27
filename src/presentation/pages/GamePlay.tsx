import React, { useEffect, useRef, useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Animated, Modal, Text, Button } from 'react-native'
import { backGround, cup, ball, win, lose, reStartBtn } from '../../assets/images'
import { useNavigation } from '@react-navigation/native'

const GamePlay = () => {
    const navigation = useNavigation()
    const [ballPosition, setBallPosition] = useState<number | null>(null); // Vị trí của bóng ngẫu nhiên
    const [cupPositions, setCupPositions] = useState([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]); // Giá trị dịch chuyển của từng cup
    const [modalVisible, setModalVisible] = useState(false); // Trạng thái modal
    const [isWin, setIsWin] = useState<boolean | null>(null); // Trạng thái thắng hoặc thua

    useEffect(() => {
        // Đặt vị trí ngẫu nhiên của bóng
        const randomPosition = Math.floor(Math.random() * 3);
        setBallPosition(randomPosition);
    }, []);

    const moveCup = (index: number) => {
        Animated.timing(cupPositions[index], {
            toValue: -100, // Di chuyển lên 100px
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            if (ballPosition === index) {
                setIsWin(true);
            } else {
                setIsWin(false);
            }
            setModalVisible(true); // Hiển thị modal sau khi di chuyển
        });
    };

    const resetGame = () => {
        setModalVisible(false);
        setCupPositions([
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
        ]);
        const randomPosition = Math.floor(Math.random() * 3);
        setBallPosition(randomPosition); // Đặt lại vị trí bóng
    };

    return (
        <View>
            <View>
                <Image source={backGround} style={styles.container} />
                <View style={styles.cups}>
                    {cupPositions.map((position, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => moveCup(index)}
                            style={styles.cupContainer}
                        >
                            {ballPosition === index && (
                                <Image
                                    source={ball}
                                    style={styles.ballImage}
                                />
                            )}
                            <Animated.View style={{ transform: [{ translateY: position }] }}>
                                <Image
                                    source={cup}
                                    style={styles.cupImage}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    onPress={() => {
                        navigation.replace('home')
                        resetGame()
                    }}>
                    {isWin ? (
                        <Image source={win} />
                    ) : (
                        <Image source={lose} />
                    )
                    }
                    <Image source={reStartBtn} />
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        alignContent: 'center'
    },
    cups: {
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'center',
        bottom: 300,
        width: '100%',
    },
    cupContainer: {
        alignItems: 'center'
    },
    cupImage: {
        width: 100,
        height: 100,
        zIndex: 10,
    },
    ballImage: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 68, // Định vị bóng dưới cup
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Làm tối nền khi hiển thị modal
        gap: 50
    },
})

export default GamePlay