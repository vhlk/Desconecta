import React, { useEffect, useState } from "react"
import { Header, Icon, Button } from "react-native-elements";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import TrackerModule from "../../services/AppsTracker/TrackerModule";
import { useNavigation } from "@react-navigation/native";
// import { GetAllCategories } from "../../services/ApiModule";
import data from "./data";

const DATA = [
    { id: 2, Name: "Filme" },
    { id: 3, Name: "Dança" },
    { id: 4, Name: "Teatro" },
    { id: 5, Name: "Arte" },
    { id: 6, Name: "Série" }
];
const Item = ({ Name }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{Name}</Text>
    </View>
);
const Statistics = () => {
    interface Categories {
        ID: number,
        Name: string,
    }
    const [variavel, setVariavel] = useState<Categories[]>([])
    useEffect(() => {
        // GetAllCategories().then(res => setVariavel(res)).catch(function(error) {
        //   console.log('Erro na requisição: ' + error.message);
        //    // ADD THIS THROW error
        //     throw error;
        //   });
    })
    useEffect(() => {
        async function fun() {
            TrackerModule.GetDailyTimeForApps(["Chrome", "WhatsApp", "Facebook", "Instagram", "Twitter"],
                (error: String, value: Object) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        console.log(value);
                        var newData = [...data];

                        newData[0] = Math.round(value["Google Chrome"] ? value["Google Chrome"] : 0);
                        newData[1] = Math.round(value["Instagram"] ? value["Instagram"] : 0);
                        newData[2] = Math.round(value["Twitter"] ? value["Twitter"] : 0);
                        newData[3] = Math.round(value["WhatsApp"] ? value["WhatsApp"] : 0);
                        console.log(newData);
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
                        <Text style={{ color: '#000', fontSize: 25 }}>Olá, Fulaninho!</Text>
                    </>
                }
                rightComponent={
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='insights' size={30} onPress={() => navigation.navigate("Statistics")} />
                        <Icon name='perm-identity' size={30} onPress={() => navigation.navigate("configTime")} />
                    </View>
                }
                containerStyle={{ marginTop: 10 }}
                backgroundColor='#f0f0f0'
            />
            <View style={styles.containerChart}>
                <Text style={{ color: '#000', fontSize: 25, fontWeight:'700' }}>Estatística</Text>
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
                    height={200}
                    yAxisInterval={1}
                    //withHorizontalLabels={false}
                    showValuesOnTopOfBars={true}
                    yAxisSuffix=" Min"
                    withInnerLines={false}
                    chartConfig={{
                        backgroundColor: "#202225",
                        backgroundGradientFrom: "#202225",
                        backgroundGradientTo: "black",
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
                        <Text style={{ color: '#000', fontSize: 25, fontWeight: '700',  marginTop:2 }}>Seus Interesses</Text>
                        <Icon name='edit' size={25} color='#000'/>
                    </View>
                
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        horizontal={true}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 2,
        backgroundColor: "white",
        height: '100%'
    },

    containerChart: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: "white",
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
        fontWeight: "bold",
        textAlign: "center"
    },
    returnButton: {
        backgroundColor: "#DDDDDD",
        borderRadius: 50,
        padding: 6
    },
    item: {
        flex:1,
        alignSelf:"flex-start",
        backgroundColor: '#202225',
        padding: 16,
        marginHorizontal: 7,
        borderRadius: 10
    },
    title: {
        fontSize: 18,
        color:'white'
    },

    buttonIcon: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF'
    },
    interests: {
        flex: 2,
        alignSelf: "flex-start"
    },
    yourInterests: {
        padding:15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

export default Statistics;