import React from "react"
import { View, Image, StyleSheet, Text } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { Header, Icon } from "react-native-elements"

import data from "./data2";
import Swiper from "react-native-deck-swiper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const colors = {
    red: '#D14950',
    blue: '#59A9E3',
    gray: '#777777',
    black: '#202225',
    white: '#f0f0f0',
    green: '#78D37B'
};

const Card = ({ card }: { card: any }) => (
    <View style={styles.card}>
        <Image source={{ uri: card.image }} style={styles.cardImage}/>
        <View style={styles.cardDetails}>
            <Text style={[styles.category]}>{card.category}</Text>
            <Text style={[styles.title]}>{card.name}</Text>
            <Text style={[styles.description]}>{card.description}</Text>

            <View style={styles.timeText}>
                <Icon name='access-time' size={20} color={colors.white}/>
                <Text style={[styles.time]}>{card.time}</Text>
            </View>
            
            <View style={styles.seeDetails}>
                <Text style={{ color: colors.white, fontWeight: "700", fontSize: 16, alignContent: "center", textAlign: "center"}}>VER ATIVIDADE</Text>
            </View>
        </View>

    </View>
);


// const swiperRef = React.createRef();

const Home = () => {
    const [index, setIndex] = React.useState(0);
    const onSwiped = () => {
        setIndex((index + 1) % data.length);
    }
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
                        <Icon name='star-rate' size={30} />
                        <Icon name='perm-identity' size={30} />
                    </View>
                }
                containerStyle={{ marginTop: 25 }}
                backgroundColor='#f0f0f0'
            />
            <View style={styles.container}>
                <View style={styles.swiperContainer}>
                    <Swiper
                        //ref="swiperRef"
                        cards={data}
                        cardIndex={index}
                        renderCard={card => <Card card={card} />}
                        onSwiped={onSwiped}
                        stackSize={2}
                        stackScale={7}
                        stackSeparation={10}
                        disableBottomSwipe
                        disableTopSwipe
                        animateOverlayLabelsOpacity
                        infinite
                        backgroundColor={"transparent"}
                        //showSecondCard={false}
                        overlayLabels={{
                            left: {
                                title: "DEPOIS",
                                style: {
                                    label: {
                                        backgroundColor: colors.red,
                                        color: colors.white,
                                        fontSize: 24
                                    },
                                    wrapper: {
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        justifyContent: "flex-start",
                                        marginTop: 20,
                                        marginLeft: -20
                                    }
                                }
                            },
                            right: {
                                title: "COMEÇAR",
                                style: {
                                    label: {
                                        backgroundColor: colors.blue,
                                        color: colors.white,
                                        fontSize: 24
                                    },
                                    wrapper: {
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        justifyContent: "flex-start",
                                        marginTop: 20,
                                        marginLeft: 20
                                    }
                                }
                            },
                        }}
                    />
                </View>

                {/* <View style={styles.bottomContainer}>
                    <CardDetails index={index}/>
                    <View>
                        <MaterialCommunityIcons.button
                            name="close"
                            size={94}
                            backgroundColor="transparent"
                            underlayColor="transparent"
                            activeOpacity={0.3}
                            color={colors.red}
                            onPress={() => swiperRef.current.swipeLeft()}
                        />
                    </View>
                </View> */}

            </View>

            {/* <View style={styles.main}>
                <Image source={require("../../assets/m5.png")} style={{ width: "100%", height: 90 }}/>
            </View> */}

            {/* <View style={styles.footer}>
                <RectButton style={styles.button} >
                    <Text style={styles.buttonText}>
                        Maroon 5
                    </Text>
                </RectButton>
            </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center'
    },

    footer: {},

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },

    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    
    },

    swiperContainer: {
        flex: 0.80
    },

    card: {
        flex: 0.75,
        borderRadius: 10,
        shadowRadius: 25,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 0 },
        backgroundColor: colors.black,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },

    cardImage: {
        // width: 400,
        // flex: 1,
        ...StyleSheet.absoluteFillObject,
        resizeMode: "cover",
        borderRadius: 10
    },

    bottomContainer: {
        flex: 0.45
    },

    cardDetails: {
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },

    text: {
        fontFamily: "Courier"

    },

    category: {
        fontSize: 14, 
        marginBottom: 10, 
        color: colors.white, 
        alignContent: "flex-start", 
        marginHorizontal: 15
    },

    title: {
        fontSize: 24, 
        marginBottom: 20, 
        color: colors.white, 
        alignContent: "flex-start", 
        marginHorizontal: 15
    },

    description: {
        fontSize: 16, 
        marginBottom: 30, 
        color: colors.white, 
        alignContent: "flex-start", 
        marginHorizontal: 15
    },

    time: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "500",
        alignContent: "flex-start",
        marginBottom: 10,
        marginHorizontal: 5
    },

    timeText: {
        flexDirection: "row",
        marginHorizontal: 15,
        marginBottom: 10
    }, 
    seeDetails: {
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: 'center',
        alignSelf: "center",
        margin: 20
    }

});

export default Home