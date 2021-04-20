import React, { useEffect, useState } from "react"
import { Header, Icon, Button } from "react-native-elements";
import { View, Text, Dimensions, TouchableOpacity, Switch, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import MainApi from "../../services/ApiModule"


const Interest = () => {
    const navigation = useNavigation()
    const LOGIN_ID = "LOGIN_ID";
    const [id, setId] = useState("");
    useEffect(() => {
        async function fun() {
            const newlogin = await AsyncStorage.getItem(LOGIN_ID);
            setId((newlogin == null) ? '-1' : newlogin);

          }
          fun();
    }, []);
    function enterRegister() {
        if(isEnabled){
            MainApi.InsertInterestForUser(id, "2");
        }else{
            MainApi.DeleteInterestForUser(id, "2");
        }
        if(isEnabled_1){
            MainApi.InsertInterestForUser(id, "6");
        }else{
            MainApi.DeleteInterestForUser(id, "6");
        }
        if(isEnabled_2){
            MainApi.InsertInterestForUser(id, "3");
        }else{
            MainApi.DeleteInterestForUser(id, "3");
        }
        if(isEnabled_3){
            MainApi.InsertInterestForUser(id, "4");
        }else{
            MainApi.DeleteInterestForUser(id, "4");
        }
        if(isEnabled_4){
            MainApi.InsertInterestForUser(id, "5");
        }else{
            MainApi.DeleteInterestForUser(id, "5");
        }
        navigation.navigate("Home");
    }
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled_1, setIsEnabled_1] = useState(false);
    const toggleSwitch_1 = () => setIsEnabled_1(previousState => !previousState);
    const [isEnabled_2, setIsEnabled_2] = useState(false);
    const toggleSwitch_2 = () => setIsEnabled_2(previousState => !previousState);
    const [isEnabled_3, setIsEnabled_3] = useState(false);
    const toggleSwitch_3 = () => setIsEnabled_3(previousState => !previousState);
    const [isEnabled_4, setIsEnabled_4] = useState(false);
    const toggleSwitch_4 = () => setIsEnabled_4(previousState => !previousState);
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.containerChart}>
                    <Text>FILME</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.containerChart}>
                    <Text>SÉRIE</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch_1}
                        value={isEnabled_1}
                    />
                </View>
                <View style={styles.containerChart}>
                    <Text>DANÇA</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch_2}
                        value={isEnabled_2}
                    />
                </View>
                <View style={styles.containerChart}>
                    <Text>TEATRO</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch_3}
                        value={isEnabled_3}
                    />
                </View>
                <View style={styles.containerChart}>
                    <Text>ARTE</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch_4}
                        value={isEnabled_4}
                    />
                </View>
                <TouchableOpacity style={styles.btnRegister} onPress={enterRegister}>
                        <Text style={styles.registerText}>Salvar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 150,
        backgroundColor: "white",
        height: '100%'
    },

    containerChart: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
        backgroundColor: "white",
        height: '100%'
    },

    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    returnButton: {
        backgroundColor: "#DDDDDD",
        borderRadius: 50,
        padding: 6
    },

    buttonIcon: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF'
    },
    btnRegister: {
        width: '70%',
        height: 50,
        backgroundColor: '#1C1C1C',
        marginTop: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',

    },
    registerText: {
        color: '#fff',
        fontSize: 17,
    },
});


export default Interest;