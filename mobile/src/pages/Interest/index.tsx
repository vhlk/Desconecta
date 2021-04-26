import React, { useEffect, useState } from "react"
import { Header, Icon, Button } from "react-native-elements";
import { View, Text, Dimensions, TouchableOpacity, Switch, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import MainApi from "../../services/ApiModule"
import { transform } from "@babel/core";

interface Categories {
    Category_ID: string,
    Name: string,
}

const Interest = () => {
    const [variavel, setVariavel] = useState<Categories[]>([]);
    const navigation = useNavigation()
    const LOGIN_ID = "LOGIN_ID";
    const [id, setId] = useState("");
    var loading = false;
    useEffect(() => {
        async function fun() {
            const newlogin = await AsyncStorage.getItem(LOGIN_ID);
            setId((newlogin == null) ? '-1' : newlogin);
          }
          fun();
    }, []);

    useEffect(() => {
        const getCategory = async (id: string) => {
            const response = await MainApi.GetInterestForUser(id);
            setVariavel(response.data);
          }

        async function fun() {
            const login = await AsyncStorage.getItem(LOGIN_ID);
            getCategory((login == null) ? '-1' : login);
          }
          fun();
    }, []);

    function enterRegister() {
        let found = variavel.find(item => item.Category_ID == "2");
        if(isEnabled && !found){
            MainApi.InsertInterestForUser(id, "2");
        }else if (!isEnabled && found){
            MainApi.DeleteInterestForUser(id, "2");
        }
        found = variavel.find(item => item.Category_ID == "6");
        if(isEnabled_1 && !found){
            MainApi.InsertInterestForUser(id, "6");
        }else if (!isEnabled_1 && found){
            MainApi.DeleteInterestForUser(id, "6");
        }
        found = variavel.find(item => item.Category_ID == "3");
        if(isEnabled_2 && !found){
            MainApi.InsertInterestForUser(id, "3");
        }else if(!isEnabled_2 && found){
            MainApi.DeleteInterestForUser(id, "3");
        }
        found = variavel.find(item => item.Category_ID == "4");
        if(isEnabled_3 && !found){
            MainApi.InsertInterestForUser(id, "4");
        }else if(!isEnabled_3 && found){
            MainApi.DeleteInterestForUser(id, "4");
        }
        found = variavel.find(item => item.Category_ID == "5");
        if(isEnabled_4 && !found){
            MainApi.InsertInterestForUser(id, "5");
        }else if(!isEnabled_4 && found){
            MainApi.DeleteInterestForUser(id, "5");
        }
        navigation.navigate("Home");
    }

    loading = variavel.length != 0;
    
    function interestsUser(idCategoria: string){
        const found = variavel.find(element => element.Category_ID == idCategoria);
        return ((found == undefined) ? false : true);
    }
    
    var [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled_1, setIsEnabled_1] = useState(false);
    const [isEnabled_2, setIsEnabled_2] = useState(false);
    const [isEnabled_3, setIsEnabled_3] = useState(false);
    const [isEnabled_4, setIsEnabled_4] = useState(false);

    function setSwitch(){
        if(loading){
            if(interestsUser("2")){
                setIsEnabled(true)
            }
            if(interestsUser("6")){
                setIsEnabled_1(true)
            }
            if(interestsUser("3")){
                setIsEnabled_2(true)
            }
            
            if(interestsUser("4")){
                setIsEnabled_3(true)
            }
            if(interestsUser("5")){
                setIsEnabled_4(true)
            }
        }
        
    }

    useEffect(() => {
        setSwitch()
    }, [variavel]);
    
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    
    const toggleSwitch_1 = () => setIsEnabled_1(previousState => !previousState);
    
    
    const toggleSwitch_2 = () => setIsEnabled_2(previousState => !previousState);
    
    
    const toggleSwitch_3 = () => setIsEnabled_3(previousState => !previousState);
    
    
    const toggleSwitch_4 = () => setIsEnabled_4(previousState => !previousState);
    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header
          placement="left"
     
          centerComponent={
            <>
              <Text style={{ fontSize: 25, alignSelf: 'center', color: '#CE6F5D' }}>Selecione seus Interesses</Text>
            </>
          }
          backgroundColor='white'
        />
                
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
        marginTop: 10,
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
        marginTop:90,
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
        width: '80%',
        height: 45,
        backgroundColor: '#34a0a4',
        marginTop: 10,
        borderRadius: 7,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    registerText: {
        color: '#fff',
        fontSize: 17,
        alignSelf: 'center',
        marginBottom: 5
    },
});


export default Interest;