import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, ImageBackground, Linking, Alert, ScrollView, ActivityIndicator} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Header, Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";

import MainApi from '../../services/ApiModule';

interface Activity {
    Activity_ID: string,
    Category_ID: string,
    Description: string,
    Duration: string,
    ID: number,
    Image: any,
    ImageLink: string,
    LinkNetflix: string,
    Title: string
}

interface ActivityID {
    Activity_ID: string,
    Category_ID: string
}

interface InAppParams {
    country: string;
    object: string;
}

var imgBg = require("../../assets/icone_desconecta.png")
var categ = "Oi"
var suggestionTitle = "Não era para isso"
var suggestionDesc = "APARECER"
var suggestionDura = ":("
var suggestionLink = "https://youtu.be/dQw4w9WgXcQ"

const colors = {
    green: '#091E1F'
};

async function goToActivity() {
    Linking.canOpenURL(suggestionLink).then(supported => {
        if (!supported) {
          console.log('Can\'t handle url: ' + suggestionLink);
        } else {
          return Linking.openURL(suggestionLink);
        }
      }).catch(err => console.error('An error occurred', err));
}

const Suggestion = () => {
    const navigation = useNavigation();
    const route = useRoute();
    var routeParam = route.params as ActivityID

    const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
    const [userId, setUserId] = useState("-1");
    const [favoriteList, setFavoriteList] = useState(null);
    const [activity, setActivity] = useState(null);
    const [canRenderPage, toggleRenderPage] = useState(false);

    const checkAndGoToActivity = () => {
        if (suggestionLink.charAt(0) === '&') {
            const params = suggestionLink.split("&");
            const param = {country: params[1], object: params[2]} as InAppParams;
            navigation.navigate("InApp", param);
        }   
        else goToActivity();
    } 

    useEffect(() => {
        imgBg = require("../../assets/icone_desconecta.png")
        function getActivity() {
            MainApi.GetActivity(routeParam.Activity_ID).then(res => setActivity(res.data[0]))
        }
        getActivity();
        async function getUserId() {
            const id = await AsyncStorage.getItem("LOGIN_ID");
            setUserId((id == null) ? '0' : id);
        }
        getUserId();
    }, []);

    useEffect(() => {
        async function updateFavorites() {
            MainApi.GetAllFavoritesForUser(userId).then(res => setFavoriteList(res.data));
        }
        if (userId != '-1') {
            updateFavorites();
        }
    }, [userId]);

    useEffect(() => {
        if (activity !== null) {
            function renderPage(activity: Activity) {
                imgBg = { uri: activity.ImageLink };
                categ = routeParam.Category_ID;
                suggestionTitle = activity.Title;
                suggestionDesc = activity.Description;
                suggestionDura = activity.Duration;
                suggestionLink = activity.LinkNetflix;
                toggleRenderPage(true);
            }
            // @ts-ignore: Argument of type 'null' is not assignable to parameter of type 'Activity'.
            renderPage(activity);
        }
    }, [activity]);


    useEffect(() => {
        if (favoriteList !== null) {
            // @ts-ignore: Object is possibly 'null'.
            const found = favoriteList.find(item => item.Activities_ID == routeParam.Activity_ID);
            if (found) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        }
    }, [favoriteList]);

    const toggleSwitch = async () => {
        const newFavorite = !isFavorite;
        setIsFavorite(newFavorite);

        if (newFavorite) {
            await MainApi.InsertFavoriteForUser(userId, routeParam.Activity_ID.toString());
            MainApi.GetAllFavoritesForUser(userId).then(res => setFavoriteList(res.data));
        } else {
            await MainApi.DeleteFavoriteForUser(userId, routeParam.Activity_ID.toString());
            MainApi.GetAllFavoritesForUser(userId).then(res => setFavoriteList(res.data));
        }
    };

    function handleNav() {
        navigation.navigate("Home")
    }

    return (
        <>
            <ImageBackground source={canRenderPage ? imgBg: null} style={styles.imgbg}>
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
                        borderBottomColor: 'rgba(0, 0, 0, 0)'
                    }}
                    backgroundColor='rgba(0, 0, 0, 0)'
                />
                { canRenderPage && (
                <LinearGradient colors={['rgba(9,30,31,0)','rgba(9,30,31,0.7)', 'rgba(9,30,31,0.9)', colors.green, colors.green,
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
                            <Icon name={isFavorite === null ? 'sync' : (isFavorite ? 'star' : 'star-border')} size={30} color='#a1c9c9' style={styles.buttonIcon} onPress={toggleSwitch} />
                        </View>
                        <ScrollView style={styles.descContainer}>
                            <Text style={styles.description}>
                                {suggestionDesc}
                            </Text>
                        </ScrollView>
                        <View style={styles.duration}>
                            <Icon name='access-time' size={13} color='#FFF' style={styles.buttonIcon} />
                            <Text style={{ fontFamily: 'Montserrat-Medium', color: '#FFF', padding: 5, fontSize: 13 }}>
                                {suggestionDura}
                            </Text>
                        </View>
                    </View>
                    {/* Alterar esses botões dependendo do status da atividade */}
                    <View style={styles.buttons}>
                        <RectButton style={styles.startButton} onPress={checkAndGoToActivity}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', color: '#FFF', fontSize: 17 }}>
                                COMEÇAR A ATIVIDADE
                            </Text>
                        </RectButton>
                        <TouchableOpacity onPress={handleNav}>
                            <Text style={{ fontFamily: 'Montserrat-Medium', color: '#EFD1CC', textDecorationLine: 'underline', paddingTop: 10 }}>
                                NÃO TENHO INTERESSE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                ) || (<ActivityIndicator size="large" color={colors.green} />)}
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
        flex: 2.5
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
        fontFamily: 'Montserrat-Medium',
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
        fontFamily: 'Montserrat-Bold'
    },

    description: {
        color: '#FFF',
        fontFamily: 'Montserrat-Medium',
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