import React from "react"
import { View, Image, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { Header, Icon } from "react-native-elements"
import { Button } from "react-native-elements/dist/buttons/Button"
import { BackgroundImage } from "react-native-elements/dist/config"
import { useNavigation , useRoute} from "@react-navigation/native"

const imgBg = require("../../assets/1984.jpg")
const categ = "Leitura"
const suggestionTitle = "George Orwell: 1984"
const suggestionDesc = "Romance distópico, publicado em 1949, ambientado em um mundo de guerra perpétua, vigilância governamental onipresente e manipulação pública e histórica"
const suggestionDura = "45 minutos"

const Suggestion = () => {
    const navigation = useNavigation()
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
                <View style={styles.main}>
                    <View style={styles.info}>
                        <Text style={styles.category}>
                            {categ}
                        </Text>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>
                                {suggestionTitle}
                            </Text>
                            {/* <Icon name='star-border' size={30} color='#FFF' style={styles.buttonIcon} /> */}
                        </View>
                        <Text style={styles.description}>
                            {suggestionDesc}
                        </Text>
                        <View style={styles.duration}>
                            <Icon name='access-time' size={20} color='#FFF' style={styles.buttonIcon} />
                            <Text style={{ color: '#FFF', padding: 5}}>
                                {suggestionDura}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttons}>
                        <RectButton style={styles.startButton}>
                            <Text style={{ color: '#FFF', fontWeight: "700", fontSize: 17}}>
                                COMEÇAR A ATIVIDADE
                            </Text>
                        </RectButton>
                        <TouchableOpacity onPress={handleNav}>
                            <Text style={{ color: '#FFF', textDecorationLine: 'underline', paddingTop:10 }}>
                                NÃO TENHO INTERESSE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: '#000',
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
    },

    returnButton: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        borderRadius: 50,
        padding: 6
    },

    buttonIcon: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF'
    },

    buttons: {
        alignItems: 'center',
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
    },

    description: {
        color: '#FFF',
        paddingVertical: 10
    },

    duration: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    startButton: {
        backgroundColor: '#1ab2ff',
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