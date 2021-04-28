import React, { useState, useEffect } from "react"
import { View, Image, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native"
import { Header, Icon } from "react-native-elements"
import { useNavigation, useRoute } from "@react-navigation/native"
import Axios from "axios"

import Swiper from "react-native-swiper";

const colors = {
    red: '#D14950',
    blue: '#59A9E3',
    gray: '#777777',
    black: '#202225',
    white: '#f6f7f1',
    green: '#34a0a4'
};

interface params {
    country: string;
    object: string;
    InAppTitle: string
}

interface card {
    id: number;
    img: string;
    title: string;
    artist: string;
}

const InApp = () => {
    const route = useRoute();
    const routeParams = route.params as params;
    const activityTitle = routeParams.InAppTitle;
    const CARDS2LOAD = 5;
    const getRandomUntil = (x: number): number => {
        return Math.floor(Math.random() * 1000000 % x);
    };
    const [totalImgs, setTotalImages] = useState(0);
    const [imgIds, setImgIds] = useState([]);
    const onSwiped = (index: number) => {
        if (index < (CARDS2LOAD - 1))
            load1MoreCard();
        else {
            loadNewCards();
        }
    }
    let [card, setCard] = useState<card[]>([]);
    const navigation = useNavigation();
    const load1MoreCard = async () => {
        const id = imgIds[getRandomUntil(totalImgs)];
        await Axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => {
            let newCard = [...card];
            newCard.shift();
            const imgSrc = res.data["primaryImage"];
            const title = res.data["title"];
            const artist = res.data["artistDisplayName"];
            newCard.push({ id: id, img: imgSrc, title: title, artist: artist });
            Image.prefetch(imgSrc);
            card = newCard;
        });
    }
    const loadNewCards = async () => {
        const newCards = [...card];
        setCard(newCards);
    }

    const newImage = (uri: string): JSX.Element => {
        Image.prefetch(uri);
        return <Image style={styles.image} source={{ uri: uri }} defaultSource={require("./Loading.png")} blurRadius={1} resizeMode={"center"} />;
    }

    useEffect(() => {
        const country = routeParams.country;
        const obj = routeParams.object;
        Axios.get("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&geoLocation=" + country + "&q=" + obj).then(async res => {
            const data = res.data;
            const ids = data["objectIDs"];
            const total = data["total"];
            setTotalImages(total);
            setImgIds(ids);
            let nextIds: number[] = [];
            for (let i = 0; i < CARDS2LOAD; i++) nextIds.push(ids[getRandomUntil(total)]);
            const next: card[] = [];
            for (let i = 0; i < nextIds.length; i++) {
                await Axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${nextIds[i]}`)
                    .then(res => next.push({ id: nextIds[i], img: res.data["primaryImage"], title: res.data["title"], artist: res.data["artistDisplayName"] }));
            }

            setCard(next);

        }).catch(err => console.log(err));
    }, []);
    return (
        <>
            <Header
                placement="left"
                leftComponent={
                    <>
                        <TouchableOpacity
                            style={styles.returnButton}
                        >
                            <Icon name='navigate-before' size={25} style={styles.buttonIcon} onPress={() => navigation.navigate("Home")} />
                        </TouchableOpacity>
                    </>
                }
                centerComponent={
                    <>
                        <Text style={styles.titleText}>{activityTitle}</Text>
                    </>
                }
                containerStyle={{
                    marginTop: 5,
                    borderBottomColor: 'rgba(0, 0, 0, 0)'
                }}
                backgroundColor='rgba(0, 0, 0, 0)'
            />
            {card.length !== 0 && (
                <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false} onIndexChanged={onSwiped}>
                    {card.map((item, key) => (
                        <View key={key}>
                            <View >
                                {newImage(item.img)}
                            </View>
                            <View > 
                                {item.title!="" && (
                                    <Text style={styles.descriptionText}>{"Título: "+item.title}</Text>
                                ) || (
                                    <Text style={styles.descriptionText}>{"Título desconhecido :("}</Text>
                                )}
                                {item.artist!="" && (
                                <Text style={styles.descriptionText}>{"Artista: "+item.artist}</Text>
                                ) || (
                                    <Text style={styles.descriptionText}>{"Artista desconhecido :("}</Text>
                                )}
                            </View>
                        </View>
                    ))}
                </Swiper>)}
        </>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center'
    },

    footer: {},

    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",

    },

    swiperContainer: {
        flex: 0.80
    },

    titleText: {
        fontSize: 25,
        fontFamily: 'Montserrat-Bold',
        textAlign: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginEnd: 25,
        color: '#db9487'
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
    wrapper: {
    },
    image: {
        width: "90%",
        height: "91%",
        borderRadius: 20,
        alignSelf: "center"
    },
    descriptionText: {
        textAlign: "center",
        fontFamily:'Montserrat-Medium',
        color: colors.green

    }
});

export default InApp