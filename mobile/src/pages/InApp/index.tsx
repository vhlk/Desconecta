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
    coutry: string;
    object: string;
}

interface card {
    id: number;
    img: string;
}

const InApp = () => {
    const route = useRoute();
    const routeParams = route.params as params;
    const CARDS2LOAD  = 5;
    const getRandomUntil = (x:number):number => {
        return Math.floor(Math.random()*1000000 % x);
    };
    const [totalImgs, setTotalImages] = useState(0);
    const [imgIds, setImgIds] = useState([]);
    const onSwiped = (index: number) => {
        if(index < (CARDS2LOAD-1))
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
            let newCard = [... card];
            newCard.shift();
            let imgSrc = res.data["primaryImage"];
            newCard.push({id: id, img: imgSrc});
            Image.prefetch(imgSrc);
            card = newCard;
        });
    }
    const loadNewCards = async () => {
        const newCards = [... card];
        setCard(newCards);
    }

    const newImage = (uri:string):JSX.Element => {
        Image.prefetch(uri);
        return <Image style={styles.image} source={{uri: uri}} defaultSource={require("./biurifu.png")} blurRadius={1} resizeMode={"center"}/>;
    }
    
    useEffect(() => {
        Axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&geoLocation=${routeParams.coutry}&q=${routeParams.object}`).then(async res =>  {
            const data = res.data;
            const ids = data["objectIDs"];
            const total = data["total"];
            setTotalImages(total);
            setImgIds(ids);
            let nextIds:number[] = [];
            for (let i = 0; i<CARDS2LOAD;i ++) nextIds.push(ids[getRandomUntil(total)]);
            const next:card[] = [];
            for (let i=0;i<nextIds.length;i++) {
                await Axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${nextIds[i]}`).then(res => next.push({id: nextIds[i], img: res.data["primaryImage"]}));
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
              <Text style={styles.titleText}>Arte</Text>
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
                { card.map((item, key)=>(       
                        <View key={key}>
                            {newImage(item.img)}                                                       
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
    },
    
    titleText: {
        fontSize: 25,
        fontWeight: "bold",
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
        height: "99%",
        borderRadius: 20,
        alignContent: "center",
        alignSelf: "center",
        alignItems: "center",        
        justifyContent: "center"
    }
});

export default InApp