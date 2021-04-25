import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Animated, Alert, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native"
import MainApi from "../../services/ApiModule"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = () => {
  const navigation = useNavigation()
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [checkingLogin, setCheckingLogin] = useState(false);
  const LOGIN_EMAIL = "LOGIN_EMAIL";
  const LOGIN_PSW = "LOGIN_PSW";
  const LOGIN_ID = "LOGIN_ID";

  useEffect(() => {
    async function fun() {
      const login = await AsyncStorage.getItem(LOGIN_EMAIL);
      const pass = await AsyncStorage.getItem(LOGIN_PSW);
      if (login !== null && pass != null) {
        checkLogin(login, pass);
      }
    }
    fun();

  }, []);

  useEffect(() => {
    Animated.spring(offset.y, { toValue: 0, speed: 8, useNativeDriver: true }).start();
  }, []);

  function checkLogin(userEmail: string, userPsw: string) {
    MainApi.GetUser(userEmail, userPsw).then(res => {
      if (res.data === null || res.data.length === 0) {
        setCheckingLogin(false);
        Alert.alert("Não foi possível fazer login", "Por favor verifique os dados digitados!");
      }
      else {
        setCheckingLogin(false);
        saveLogin(res.data[0].ID);
        navigation.navigate("Home");
      }
    }).catch(err => console.log(err));
  }

  async function saveLogin(id: string) {
    await AsyncStorage.setItem(LOGIN_EMAIL, email);
    await AsyncStorage.setItem(LOGIN_PSW, psw);
    await AsyncStorage.setItem(LOGIN_ID, id.toString());
  }

  function enterLogin() {
    setCheckingLogin(true);
    checkLogin(email, psw);
  }

  return (
    <>
      <KeyboardAvoidingView style={styles.background}>

        <View style={styles.containerTitle}>
          <Image source={require("../../assets/icone_desconecta.png")}
            resizeMode='center' style={styles.logo} />
          <Text style={styles.titleText}>DESCONECTA</Text>
        </View>


        <Animated.View
          style={[styles.containerBody,
          {
            transform: [
              { translateY: offset.y }]
          }]}>

          <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
          <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha" onChangeText={setPsw} />

          {!checkingLogin && (
              <TouchableOpacity style={styles.btnSubmit} onPress={enterLogin}>
                <Text style={styles.submitText}>Entrar</Text>
              </TouchableOpacity>)
           || 
          ( <ActivityIndicator size="large" color={'#34a0a4'} />)}

          {/* <TouchableOpacity style={styles.btnReset}>
          <Text style={styles.resetText}> Esqueci a senha</Text>
        </TouchableOpacity> */}

          <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}>Criar uma conta</Text>
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
    backgroundColor: '#f6f7f1',

  },
  containerTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  titleText: {
    fontSize: 28,
    fontFamily:'Montserrat-SemiBold',
    color: '#db9487'
  },
  containerBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  input: {
    backgroundColor: '#a1c9c9',
    width: '90%',
    padding: 10,
    color: '#000',
    marginBottom: 15,
    fontSize: 17,
    borderRadius: 7

  },
  btnSubmit: {
    width: '90%',
    height: 45,
    backgroundColor: '#34a0a4',
    marginTop: 10,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 0.75,
    alignItems: 'center',
    margin: 20,
    marginTop: 100
  },
  submitText: {
    color: '#fff',
    fontFamily:'Montserrat-Medium',
    fontSize: 16,
  },
  btnRegister: {
    width: '40%',
    height: 30,
    marginTop: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',

  },
  registerText: {
    color: '#103334',
    fontFamily:'Montserrat-Medium',
    textDecorationLine: 'underline'
  },
  btnReset: {
    marginTop: 5,

  },
  resetText: {
    color: 'black',
  }

});
export default Login