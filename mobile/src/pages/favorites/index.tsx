import React from "react"
import { View, Image, StyleSheet, Text, FlatList, ImageBackground } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { Header, Icon } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import data from "../Home/data2"
import { Card } from "react-native-elements/dist/card/Card"

const Item = ({ item }) => (
    <View style={styles.card}>
        <ImageBackground source={{ uri: item.image }} style={styles.imgbg} imageStyle={{ borderRadius: 10 }}>
            <View style={{ height: 130, marginHorizontal: 10, justifyContent: "flex-end" }}>
                <Text style={styles.category}>{item.category}</Text>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{item.name}</Text>
                    <Icon name='star' size={30} color='#FFF'/>
                </View>
            </View>
        </ImageBackground>
    </View>
);

const Favorites = () => {
    const navigation = useNavigation()
    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    return (
        <>
            <Header
                placement="left"
                centerComponent={
                    <>
                        <Text style={{ color: '#000', fontSize: 25 }}>Olá, Fulaninho!</Text>
                    </>
                }
                rightComponent={
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='insights' size={30} onPress={() => navigation.navigate("Statistics")} />
                        <Icon name='perm-identity' size={30} onPress={() => navigation.navigate("configTime")} />
                    </View>
                }
                containerStyle={{ marginTop: 25 }}
                backgroundColor='#f0f0f0'
            />
            <View style={styles.favoriteList}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    favoriteList: {},
    card: {
        elevation: 20,
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 10,
        height: 140,
        flexDirection: 'row'
    },
    imgbg: {
        resizeMode: "stretch",
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
        alignItems: "center"
    },
    titleText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: ''
    }
});

export default Favorites