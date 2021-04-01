import React from "react"
import { View, Image, StyleSheet, Text} from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { Header, Icon } from "react-native-elements"

const Home = () => {
    return (
        <>
            <Header
                placement="left"
                centerComponent={
                    <>
                        <Text style={{color:'#000', fontSize:25}}>Olá, Fulaninho!</Text>
                    </>
                }
                rightComponent={
                    <View style={{flexDirection:'row'}}>
                        <Icon name='star-rate' size={30} />
                        <Icon name='perm-identity' size={30}/>
                    </View>
                }
                containerStyle={{marginTop: 25}}
                backgroundColor='#f0f0f0'
            />
            <View style={styles.main}>
                <Image source={require("../../assets/m5.png")} style={{ width: "100%", height: 90 }}/>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} >
                    <Text style={styles.buttonText}>
                        Maroon 5
                    </Text>
                </RectButton>
            </View>
        </>
    )
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
    }
});

export default Home