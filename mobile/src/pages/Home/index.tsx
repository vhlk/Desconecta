import React, { useState, useEffect } from "react"
import { View, Image, StyleSheet, Text, ActivityIndicator } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { Header, Icon } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

import MainApi from "../../services/ApiModule"
import Swiper from "react-native-deck-swiper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen"

interface Activity {
    Activity_ID: number,
    Category_ID: string,
    Description: string,
    Duration: string,
    ID: number,
    Image: any,
    ImageLink: string,
    LinkNetflix: string,
    Title: string
}

interface Category {
    ID: number,
    Name: string,
}

const colors = {
    red: '#D14950',
    blue: '#59A9E3',
    gray: '#777777',
    black: '#202225',
    white: '#f0f0f0',
    green: '#78D37B'
};

const Card = ({ card }: { card: Activity }) => (
    <View style={styles.card}>
        <Image source={{ uri: card.ImageLink }} style={styles.cardImage} />
        <View style={styles.cardDetails}>
            <Text style={[styles.category]}>{card.Category_ID}</Text>
            <Text style={[styles.title]}>{card.Title}</Text>

            <View style={styles.timeText}>
                <Icon name='access-time' size={20} color={colors.white} />
                <Text style={[styles.time]}>{card.Duration}</Text>
            </View>

            <View style={styles.seeDetails}>
                <Text style={{ color: colors.white, fontWeight: "700", fontSize: 16, alignContent: "center", textAlign: "center" }}>VER ATIVIDADE</Text>
            </View>
        </View>

    </View>
);

// const swiperRef = React.createRef();

const Home = () => {
    const [index, setIndex] = useState(0)
    var [activities, setActivities] = useState<Activity[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    var categoriesFixxed = false

    const getCategories = async () => {
        await MainApi.GetAllCategories().then(res => setCategories(res.data))
    }
    const getActivities = async () => {
        await MainApi.GetAllActivities().then(res => setActivities(res.data))
    }

    function fixCategories() {
        for (let i = 0; i < activities.length; i++) {
            const index = categories.findIndex(category => category.ID.toString() == activities[i].Category_ID)
            if (index != -1) {
                activities[i].Category_ID = categories[index].Name
            }
        }
        return true
    }

    useEffect(() => {
        getCategories()
        getActivities()
    }, [])

    if (activities.length != 0 && categories.length != 0) {
        categoriesFixxed = fixCategories()
    }

    const onSwiped = () => {
        setIndex((index + 1) % activities.length);
    }
    const navigation = useNavigation()

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
            <View style={styles.container}>
                {categoriesFixxed && (
                    <View style={styles.swiperContainer}>
                        <Swiper
                            //ref="swiperRef"
                            cards={activities}
                            cardIndex={index}
                            renderCard={card => <Card card={card} />}
                            onSwiped={onSwiped}
                            onTapCard={() => navigation.navigate("Suggestion", { Activity_ID:  activities[index].Activity_ID,
                                                                                 Category_ID:  activities[index].Category_ID,
                                                                                 Description:  activities[index].Description,
                                                                                 Duration:     activities[index].Duration,
                                                                                 ID:           activities[index].ID,
                                                                                 ImageLink:    activities[index].ImageLink,
                                                                                 ActivityLink: activities[index].LinkNetflix,
                                                                                 Title:        activities[index].Title })}
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

                ) || (
                        <>
                            <View style={{ paddingVertical: 50, backgroundColor:colors.blue  }}>
                                <Text style={{ color: colors.white, fontWeight: "700", fontSize: 20, alignContent: "center", textAlign: "center" }}>
                                    Selecionando as melhores sugestões para você!
                                </Text>
                            </View>
                            <View style={{ paddingVertical: 50 }}>
                                <ActivityIndicator size="large" color={colors.blue} />
                            </View>
                        </>
                    )}
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
