import { NavigationHelpersContext } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Animated, Alert } from 'react-native';
import { Header, Icon } from "react-native-elements"
import { useNavigation , useRoute} from "@react-navigation/native"
import MainApi from "../../services/ApiModule"


const Register = () => {
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
    const navigation = useNavigation()
    const [pswDoesntMatchText, setPswDoesntMatchText] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const [pswConf, setPswConf] = useState("");
    const [pswsMatches, setPswMatches] = useState(false);

    function checkNRegister() {
        MainApi.CheckIfEmailExists(email).then(res => {
            const emailExists = res.data[0]["EmailCadastrado"];
            if (!emailExists) {
                MainApi.InsertUser(name, email, psw);
                navigation.navigate("Home");
            }
            else {
                Alert.alert("Email inválido", "O email já existe!");
            }
        });
      }
    
    function enterRegister() {
        if (name === "") {
            Alert.alert("Nome inválido", "O nome não pode ser vazio!");
            return;
        }
        else if (email === "") {
            Alert.alert("Email inválido", "O email não pode ser vazio!");
            return;
        }
        else if (psw === "") {
            Alert.alert("Senha inválida", "A senha não pode ser vazia!");
            return;
        }
        else if (!pswsMatches) {
            Alert.alert("Senha inválida", "As senhas não batem!");
            return;
        }

        checkNRegister();
    }

    useEffect(() => {
        // only update after load all inputs
        if (name === "" && email === "" && psw === "" && pswConf === "") return;

        if (pswConf === "")  return;

        setPswDoesntMatchText(getPswTextAndSetMatch);
    }, [psw]);

    useEffect(() => {
        // only update after load all inputs
        if (name === "" && email === "" && psw === "" && pswConf === "") return;

        setPswDoesntMatchText(getPswTextAndSetMatch);
    }, [pswConf]);

    const getPswTextAndSetMatch = ():string => {
        if (psw === "" && pswConf === "") {
            setPswMatches(false);
            return "Por favor digite uma senha";
        }
        else if (psw !== pswConf) {
            setPswMatches(false);
            return "As senhas não batem!";
        }
        else {
            setPswMatches(true);
            return "";
        }
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
                    <TextInput style={styles.input} placeholder="Nome" onChangeText={setName}/>
                    <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail}/>
                    <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha" onChangeText={setPsw}/>
                    <TextInput style={styles.lastInput} secureTextEntry={true} placeholder="Confirme a senha" onChangeText={setPswConf} />
                    <Text style={styles.pswDoesntMatch}>{pswDoesntMatchText}</Text>

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
        color: '#000',
        marginBottom: 15,
        fontSize: 17,
        borderRadius: 7
    },
    lastInput: {
        backgroundColor: '#E8E8E8',
        width: '90%',
        padding: 10,
        color: '#000',
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
    },
    pswDoesntMatch: {
        color: '#ff0033',

    }

});

export default Register
