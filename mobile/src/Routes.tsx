import React from "react"
import Home from "./pages/Home"
import Suggestion from "./pages/Suggestion"
import configTime from "./pages/configTime"
import Statistics from "./pages/Statistics"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Interest from "./pages/Interest"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

const AppStack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none" initialRouteName="Login">
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Suggestion" component={Suggestion} />
                <AppStack.Screen name="configTime" component={configTime} />
                <AppStack.Screen name="Statistics" component={Statistics} />
                <AppStack.Screen name="Interest" component={Interest} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes