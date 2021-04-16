import { NavigationHelpersContext } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Animated } from 'react-native';
import { Header, Icon } from "react-native-elements"
import { useNavigation , useRoute} from "@react-navigation/native"


const Register = () => {
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
    const navigation = useNavigation()

    function checkNRegister() {
        //check server if login exists and add user to server
        return true
      }
    
      function enterRegister() {
        if(checkNRegister())
          navigation.navigate("Home")
      }
    useEffect(() => {
        Animated.spring(offset.y,{toValue:0, speed:8, useNativeDriver: true}).start();
    }, []);

    return (
        <>
            <Header
                placement="left"
                leftComponent={
                    <>
                        <TouchableOpacity
                            style={styles.returnButton}
                            onPress={() => navigation.navigate("Login")}
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
            <KeyboardAvoidingView style={styles.background}>


                <Animated.View
                    style={[styles.containerBody,
                    {
                        transform: [
                            { translateY: offset.y }]
                    }]}>
                    <Text style={styles.titleText}>Vamos criar um conta! </Text>
                    <TextInput style={styles.input} placeholder="Nome" />
                    <TextInput style={styles.input} placeholder="Email" />
                    <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha" />

                    <TouchableOpacity style={styles.btnRegister} onPress={enterRegister}>
                        <Text style={styles.registerText}>Cadastar</Text>
                    </TouchableOpacity>

                </Animated.View>

            </KeyboardAvoidingView>
        </>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',

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
    titleText: {
        fontSize: 20,
        textAlign: 'left',
        marginLeft: -80,
        marginBottom: 40,
    },
    containerBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    input: {
        backgroundColor: '#E8E8E8',
        width: '90%',
        padding: 10,
        color: '#EED5B7',
        marginBottom: 15,
        fontSize: 17,
        borderRadius: 7
    },
    btnRegister: {
        width: '70%',
        height: 50,
        backgroundColor: '#1C1C1C',
        marginTop: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',

    },
    registerText: {
        color: '#fff',
        fontSize: 17,
    }

});

export default Register
