import React, { useEffect, useState } from "react"
import { Header, Icon, Button } from "react-native-elements";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from "react-native-chart-kit";
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import TrackerModule from "../../services/AppsTracker/TrackerModule";
import { useNavigation } from "@react-navigation/native";
import  MainApi  from "../../services/ApiModule"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface Categories {
    Category_ID: string,
    Name: string,
}

const Item = ({ Name }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{Name}</Text>
    </View>
);
const Statistics = () => {
    const LOGIN_ID = "LOGIN_ID";
    const [variavel, setVariavel] = useState<Categories[]>([]);
    const [username, setUsername]= useState("");
    const [userId, setUserId]= useState("-1");

    const getCategory = (id: string) => {
        MainApi.GetInterestForUser(id).then(res => setVariavel(res.data));
      }

    useEffect(() => {
        setVariavel([]);
        function fun() {
            AsyncStorage.getItem(LOGIN_ID).then(
                res => {
                    setUserId((res == null) ? '-1' : res);
                    getCategory((res == null) ? '-1' : res);
            });
          }
          fun();
    }, []);

    useEffect(()=>{
        function updateUsername() {
            MainApi.GetUserDataByID(+userId).then(res => setUsername(res.data[0].Name));
        }
        if(userId != '-1'){
            updateUsername();
        }
    },[userId]);


    useEffect(() => {
        function fun() {
            TrackerModule.GetDailyTimeForApps(["Chrome", "WhatsApp", "Facebook", "Instagram", "Twitter"],
                (error: String, value: Object) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        var newData = [...data];

                        newData[0] = Math.round(value["Google Chrome"] ? value["Google Chrome"] : 0);
                        newData[1] = Math.round(value["Instagram"] ? value["Instagram"] : 0);
                        newData[2] = Math.round(value["Twitter"] ? value["Twitter"] : 0);
                        newData[3] = Math.round(value["WhatsApp"] ? value["WhatsApp"] : 0);
                        setData(newData);
                    }
                })
        }
        fun();
    }, []);

    const [data, setData] = useState([
        203,
        190,
        40,
        60,
    ]);
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <Item Name={item.Name} />
    );
    return (
        <View style={styles.container}>
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
                        {username!="" &&(<Text style={{ color: '#DB9487', fontSize: 25, fontFamily:'MontserratAlternates-SemiBold'}}>
                            Olá, {username}!
                            </Text>)}
                    </>
                }
                rightComponent={
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='star-border' size={30} color={'#34a0a4'} onPress={() => navigation.navigate("Favorites")} />
                        <Icon name='person' size={30} color={'#34a0a4'} onPress={() => navigation.navigate("Statistics")} />
                    </View>
                }
                containerStyle={{ marginTop: 10 }}
                backgroundColor='#f0f0f0'
            />
            <View style={styles.containerChart}>
                <Text style={{ color: '#000', fontSize: 25, fontFamily:'Montserrat-Bold'}}>
                    Estatística
                </Text>
                <BarChart
                    data={{
                        labels: ["Chrome", "Instagram", "Twitter", "WhatsApp"],
                        datasets: [
                            {
                                data
                            }
                        ]
                    }}
                    width={(Dimensions.get("window").width) * 0.9} // from react-native
                    height={250}
                    yAxisInterval={1}
                    //withHorizontalLabels={false}
                    showValuesOnTopOfBars={true}
                    yAxisSuffix=" Min"
                    withInnerLines={false}
                    chartConfig={{
                        backgroundColor: "#1C595B",
                        backgroundGradientFrom: "#1C595B",
                        backgroundGradientTo: "#1C595B",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, 1)`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "7",
                            strokeWidth: "3",
                            stroke: "red"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
                <View style={styles.interests}>
                    <View style={styles.yourInterests}>
                        <Text style={{ color: '#000', fontSize: 22,  fontFamily:'Montserrat-Bold',  marginTop:2 }} >Seus Interesses</Text>
                        <Icon name='edit' size={25} color='#000' onPress={() => navigation.navigate("Interest")}/>
                    </View>
                    {variavel !== null && variavel.length > 0 &&(
                    <FlatList
                        data={variavel}
                        renderItem={renderItem}
                        horizontal={true}
                        keyExtractor={item => {return item.Category_ID}}
                    />)}
                </View>
            </View>
            <View style={{padding:10}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("configTime")}
                >
                    <Text style={{fontFamily:'Montserrat-Regular'}}>Configure seu tempo</Text>
                    <Icon name='edit' size={20} color='#000'/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={{fontFamily:'Montserrat-Regular'}}>Edite seu perfil</Text>
                    <Icon name='edit' size={20} color='#000'/>
                </TouchableOpacity>
            </View>
            <View style={{padding:10}}>
            <TouchableOpacity
                    style={styles.buttonLogout}
                >
                    <Text style={{ color: 'red', fontSize: 22, fontFamily:'Montserrat-Medium'}}>Encerrar Sessão</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:5,
        backgroundColor:'#f6f7f1',
        height: '100%'
    },

    containerChart: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: "#f6f7f1",
        height: '100%'
    },
    contentList: {
        flex: 1,
        height: '100%'
    },
    card: {
        elevation: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "#202225",
        padding: 10,
        flexDirection: 'row',
        borderRadius: 30,
    },

    titleText: {
        fontSize: 25,
        fontFamily:'Montserrat-Bold',
        textAlign: "center",
        color: '#db9487'
      },
      returnButton: {
        backgroundColor: "#a1c9c9",
        borderRadius: 50,
        padding: 6
    },
    item: {
        flex:1,
        alignSelf:"flex-start",
        backgroundColor: '#34a0a4',
        padding: 16,
        marginHorizontal: 7,
        borderRadius: 10
    },
    title: {
        fontSize: 18,
        fontFamily:'Montserrat-Medium',
        color:'white'
    },
    button: {
        alignSelf: "flex-start",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#a1c9c9",
        padding: 10,
        width: '100%'
    },
    buttonLogout: {
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "#f6f7f1",
        padding: 15,
        width: '100%'
    },

    buttonIcon: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF'
    },
    interests: {
        flex: 2,
        justifyContent: "space-between",
        alignSelf: "flex-start"
    },
    yourInterests: {
        padding:15,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

export default Statistics;