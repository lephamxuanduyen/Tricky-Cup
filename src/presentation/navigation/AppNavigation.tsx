import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../pages/Home'
import GamePlay from '../pages/GamePlay'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='home' component={Home} />
                <Stack.Screen name='gamePlay' component={GamePlay} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation