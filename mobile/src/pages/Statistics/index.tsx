import React, { useEffect, useState }  from "react"
import { Header, Icon, Button } from "react-native-elements";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import {View,Text,Dimensions, TouchableOpacity, StyleSheet} from "react-native";
import TrackerModule from "../../services/AppsTracker/TrackerModule"

const Statistics = () => {
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
    

                newData[0] = Math.round(value["Google Chrome"]);
                newData[1] = Math.round(value["Instagram"]);
                newData[2] = Math.round(value["Twitter"]);
                newData[3] = Math.round(value["WhatsApp"]);                
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
    return (
        <View style={styles.container}>
            <Header
          placement="left"
          leftComponent={
            <>
              <TouchableOpacity
                style={styles.returnButton}
              >
                <Icon name='navigate-before' size={25} style={styles.buttonIcon} />
                </TouchableOpacity>
              </>
            }
            centerComponent={
              <>
              <Text style={styles.titleText}>Monitore seu tempo nas Redes Sociais</Text>
              </>
            }
            containerStyle={{
              marginTop: 5,
              borderBottomColor: 'rgba(0, 0, 0, 0)'
            }}
            backgroundColor='rgba(0, 0, 0, 0)'
        />
        <View style={styles.containerChart}>
        <LineChart
            data={{
            labels: ["Chrome", "Instagram", "Twitter" , "WhatsApp"],
            datasets: [
                {
                    data
                }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={550}
            yAxisInterval= {1}
            yAxisSuffix=" Min"
            horizontalLabelRotation= {-43}
            chartConfig={{
            backgroundColor: "#202225",
            backgroundGradientFrom: "#202225",
            backgroundGradientTo: "black",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:5,
        backgroundColor:"white",
        height: '100%'
      },

    containerChart:{
        flex:1,
        marginTop:50,
        backgroundColor:"white",
        height: '100%'
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
    
      buttonIcon: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF'
      },
});

export default Statistics;