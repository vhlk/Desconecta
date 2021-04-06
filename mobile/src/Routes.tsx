import React from "react"
import Home from "./pages/Home"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import configTime from "./pages/configTime"

const AppStack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none">
                <AppStack.Screen name="Home" component={configTime} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes