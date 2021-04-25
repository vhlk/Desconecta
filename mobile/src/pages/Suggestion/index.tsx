import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, ImageBackground, Linking, Alert, ScrollView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Header, Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainApi from '../../services/ApiModule';

interface Activity {
    Activity_ID: number,
    Category_ID: string,
    Description: string,
    Duration: string,
    ID: number,
    ImageLink: string,
    ActivityLink: string,
    Title: string
}

var imgBg = require("../../assets/SilvaCantaMarisa.jpg")
var categ = "Oi"
var suggestionTitle = "Não era para isso"
var suggestionDesc = "APARECER"
var suggestionDura = ":("
var suggestionLink = "https://youtu.be/dQw4w9WgXcQ"
var favoriteIcon = 'star-border'

const colors = {
    green: '#091E1F'
};

async function goToActivity() {
    const supported = await Linking.canOpenURL(suggestionLink);

    if (supported) {
        await Linking.openURL(suggestionLink);
    } else {
        Alert.alert(`Don't know how to open this URL: ${suggestionLink}`);
    }
}

function setActivity(activity: Activity) {
    imgBg = { uri: activity.ImageLink }
    categ = activity.Category_ID
    suggestionTitle = activity.Title
    suggestionDesc = activity.Description
    suggestionDura = activity.Duration
    suggestionLink = activity.ActivityLink
}

const Suggestion = () => {
    const navigation = useNavigation()
    const route = useRoute()
    var routeParam = route.params as Activity

    var isFavorite = false;
    const [userId, setUserId]= useState("-1");
    const [favoriteIcon, setFavoriteIcon]= useState("sync");
    const [favoriteList, setFavoriteList]= useState([]);

    useEffect(() => {
        setActivity(routeParam);
        async function getUserId() {
            const id = await AsyncStorage.getItem("LOGIN_ID");
            setUserId((id == null) ? '0' : id);
        }
        getUserId();
    }, []);

    useEffect(()=>{
        async function updateFavorites() {
            MainApi.GetAllFavoritesForUser(userId).then(res => setFavoriteList(res.data));
        }
        if(userId != '-1'){
            updateFavorites();
        }
    },[userId]);

    useEffect(()=>{
        for(let i = 0; i < favoriteList.length;i++){
            if (favoriteList[i].Activities_ID == routeParam.Activity_ID) {
                isFavorite = (favoriteList[i].Activities_ID == routeParam.Activity_ID);
                break;
            }
        }
        if(userId != '-1'){
            updateFavIcon();
        }
    },[favoriteList]);

    useEffect(()=>{
        if(userId!='-1'){
            updateFavIcon();
        }
    },[isFavorite]);

    const updateFavIcon = () => {
        if (isFavorite) {
            setFavoriteIcon('star')
        } else {
            setFavoriteIcon('star-border')
        }
    }

    const toggleSwitch = async () => {
        isFavorite = !isFavorite;
        updateFavIcon();
        if(isFavorite){
            await MainApi.InsertFavoriteForUser(userId, routeParam.Activity_ID.toString());
            MainApi.GetAllFavoritesForUser(userId).then(res => setFavoriteList(res.data));
        } else{
            await MainApi.DeleteFavoriteForUser(userId, routeParam.Activity_ID.toString());
            MainApi.GetAllFavoritesForUser(userId).then(res => setFavoriteList(res.data));
        }
    };

    function handleNav() {
        navigation.navigate("Home")
    }

    return (
        <>
            <ImageBackground source={imgBg} style={styles.imgbg}>
                <Header
                    placement="left"
                    leftComponent={
                        <>
                            <TouchableOpacity
                                style={styles.returnButton}
                                onPress={handleNav}
                            >
                                <Icon name='navigate-before' size={25} style={styles.buttonIcon} />
                            </TouchableOpacity>
                        </>
                    }
                    containerStyle={{
                        marginTop: 5,
                        borderBottomColor: 'rgba(0, 0, 0, 0)'
                    }}
                    backgroundColor='rgba(0, 0, 0, 0)'
                />
                <LinearGradient colors={['rgba(52,160,164,0)', colors.green, colors.green, colors.green,
                    colors.green, colors.green, colors.green, colors.green, colors.green, colors.green, colors.green]}
                    style={styles.main}>
                    <View style={styles.info}>
                        <Text style={styles.category}>
                            {categ}
                        </Text>
                        <View style={styles.title}>
                            <ScrollView horizontal={true}>
                                <Text style={styles.titleText}>
                                    {suggestionTitle}
                                </Text>
                            </ScrollView>
                            <Icon name={favoriteIcon} size={30} color='#a1c9c9' style={styles.buttonIcon} onPress={toggleSwitch} />
                        </View>
                        <ScrollView style={styles.descContainer}>
                            <Text style={styles.description}>
                                {suggestionDesc}
                            </Text>
                        </ScrollView>
                        <View style={styles.duration}>
                            <Icon name='access-time' size={13} color='#FFF' style={styles.buttonIcon} />
                            <Text style={{ color: '#FFF', padding: 5, fontSize: 13 }}>
                                {suggestionDura}
                            </Text>
                        </View>
                    </View>
                    {/* Alterar esses botões dependendo do status da atividade */}
                    <View style={styles.buttons}>
                        <RectButton style={styles.startButton} onPress={goToActivity}>
                            <Text style={{ color: '#FFF', fontWeight: "700", fontSize: 17 }}>
                                COMEÇAR A ATIVIDADE
                            </Text>
                        </RectButton>
                        <TouchableOpacity onPress={handleNav}>
                            <Text style={{ color: '#EFD1CC', textDecorationLine: 'underline', paddingTop: 10 }}>
                                NÃO TENHO INTERESSE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 25,
        height: '50%',
        width: '100%',
        position: "absolute",
        bottom: 0
    },

    imgbg: {
        width: "100%",
        height: "100%"
    },

    info: {
        flex: 2
    },

    returnButton: {
        alignItems: "center",
        backgroundColor: "#a1c9c9",
        borderRadius: 50,
        padding: 6
    },

    buttonIcon: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF'
    },

    buttons: {
        flex: 2,
        alignItems: 'center',
        justifyContent: "flex-end"
    },

    category: {
        color: '#FFF',
        fontSize: 12,
        paddingTop: 10
    },

    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        maxHeight: '27%'
    },

    titleText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: ''
    },

    description: {
        color: '#FFF',
        paddingVertical: 5
    },

    descContainer: {
        maxHeight: '50%'
    },
    duration: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    startButton: {
        backgroundColor: '#34a0a4',
        height: 50,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8
    }
});

export default Suggestion