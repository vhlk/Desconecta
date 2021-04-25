import React, { useState, useEffect } from "react"
import { View, Image, StyleSheet, Text, FlatList, ImageBackground, TouchableOpacity } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { Header, Icon } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";

import MainApi from '../../services/ApiModule';

const Item = ({ item }) => (
    <View style={styles.card}>
        {/* <ImageBackground source={{ uri: item.image }} style={styles.imgbg} imageStyle={{ borderRadius: 10 }}> */}
            <LinearGradient colors={['rgba(9,30,31,0)', 'rgba(9,30,31,0.3)', 'rgba(9,30,31,0.7)', 'rgba(9,30,31,0.9)']} style={styles.gradient}>
                <View style={{ height: 130, marginHorizontal: 10, justifyContent: "flex-end" }}>
                    <Text style={styles.category}>{item.Name}</Text>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{item.Title}</Text>
                        <Icon name='star' size={30} color='#FFF' />
                    </View>
                </View>
            </LinearGradient>
        {/* </ImageBackground> */}
    </View>
);

const Favorites = () => {
    const navigation = useNavigation();
    const [userId, setUserId]= useState("-1");
    const [favoriteList, setFavoriteList]= useState([]);
    const [username, setUsername]= useState("");

    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    useEffect(() => {
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
        async function updateUsername() {
            MainApi.GetUserDataByID(+userId).then(res => setUsername(res.data[0].Name));
        }
        if(userId != '-1'){
            updateUsername();
            updateFavorites();
        }
    },[userId]);

    return (
        <>
            <Header
                placement="left"
                leftComponent={
                    <Icon name='home' size={30} color={'#34a0a4'} onPress={() => navigation.navigate("Home")} />

                }
                centerComponent={
                    <>
                        {username!="" &&(<Text style={{ color: '#DB9487', fontSize: 25 }}>Olá, {username}!</Text>)}
                    </>
                }
                rightComponent={
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='star' size={30} color={'#34a0a4'} onPress={() => navigation.navigate("Favorites")} />
                        <Icon name='person' size={30} color={'#34a0a4'} onPress={() => navigation.navigate("configTime")} />
                    </View>
                }
                containerStyle={{ marginTop: 25 }}
                backgroundColor='rgba(0,0,0,0)'
            />
            <View style={styles.favoriteList}>
                {favoriteList.length>0 &&(
                <FlatList
                    data={favoriteList}
                    keyExtractor={(item) => item.Activity_ID}
                    renderItem={renderItem}
                />)}
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    favoriteList: {
        marginBottom: 110,
        backgroundColor: '#f6f7f1'
    },
    card: {
        elevation: 20,
        marginHorizontal: 20,
        marginVertical: 15,
        height: 140,
        flexDirection: 'row'
    },
    imgbg: {
        width: "100%",
        height: "100%",

    },
    category: {
        color: '#FFF',
        fontSize: 12
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2
    },
    titleText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: ''
    },
    gradient: {
        flex:1,
        borderRadius: 10
    }
});

export default Favorites