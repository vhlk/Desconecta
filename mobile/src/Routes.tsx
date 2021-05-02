import React from "react"
import Home from "./pages/Home"
import Suggestion from "./pages/Suggestion"
import configTime from "./pages/configTime"
import Statistics from "./pages/Statistics"
import Login from "./pages/Login"
import Register from "./pages/Register"
import InApp from "./pages/InApp"
import Favorites from "./pages/favorites"
import Interest from "./pages/Interest"
import EditProfile from "./pages/EditProfile"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"


const AppStack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none" initialRouteName={"Login"}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="InApp" component={InApp} />
                <AppStack.Screen name="Suggestion" component={Suggestion} />
                <AppStack.Screen name="configTime" component={configTime} />
                <AppStack.Screen name="Statistics" component={Statistics} />
                <AppStack.Screen name="Favorites" component={Favorites} />
                <AppStack.Screen name="Interest" component={Interest} />
                <AppStack.Screen name="EditProfile" component={EditProfile} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes