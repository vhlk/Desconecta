import React from "react"
import Home from "./pages/Home"
import Suggestion from "./pages/Suggestion"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import configTime from "./pages/configTime"
import TrackAppsUsage from "./services/AppsTracker/TrackAppsUsage"
import Statistics from "./pages/Statistics"


const AppStack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none" initialRouteName="Home">
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Suggestion" component={Suggestion} />
                <AppStack.Screen name="configTime" component={configTime} />
                <AppStack.Screen name="Statistics" component={Statistics} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes