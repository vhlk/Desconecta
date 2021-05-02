import React, { useState, useEffect } from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Animated, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native"
import MainApi from "../../services/ApiModule"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = () => {
  const navigation = useNavigation();
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [checkingLogin, setCheckingLogin] = useState(false);
  const LOGIN_EMAIL = "LOGIN_EMAIL";
  const LOGIN_PSW = "LOGIN_PSW";
  const LOGIN_ID = "LOGIN_ID";
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);


  useEffect(() => {
    async function fun() {
      const login = await AsyncStorage.getItem(LOGIN_EMAIL);
      const pass = await AsyncStorage.getItem(LOGIN_PSW);
      if (login !== null && pass != null) {
        setCheckingLogin(true);
        checkLogin(login, pass, false);
        
      }
    }
    fun();

  }, []);

  useEffect(() => {
    Animated.spring(offset.y, { toValue: 0, speed: 8, useNativeDriver: true }).start();
  }, []);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      }
      ), [navigation]
  );
  
    useEffect(() => {
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  
      // cleanup function
      return () => {
        Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      };
    }, []);
  

  function checkLogin(userEmail: string, userPsw: string, firstLogin: boolean) {
    MainApi.GetUser(userEmail, userPsw).then(res => {
      if (res.data === null || res.data.length === 0) {
        setCheckingLogin(false);
        Alert.alert("Não foi possível fazer login", "Por favor verifique os dados digitados!");
      }
      else {
        setCheckingLogin(false);
        if (firstLogin){
          saveLogin(res.data[0].ID).then( () => navigation.navigate("Home"));
        } else {
          navigation.navigate("Home");
        }
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
    checkLogin(email, psw, true);
  }

  return (
    <>
      <KeyboardAvoidingView style={styles.background}>

        <ImageBackground source={keyboardStatus ? null : require("../../assets/BgLogin.png")} style={styles.imgBg}>
        {/* {keyboardStatus &&
          (<View style={styles.containerTitle}>
            <Text style={styles.titleText}>DESCONECTA</Text>
          </View>)
        } */}

        <Animated.View
          style={[styles.containerBody,
          {
            transform: [
              { translateY: offset.y }]
          }]}>

          <TextInput style={styles.input} keyboardType={'email-address'} autoCapitalize="none" placeholder="Email" 
          onChangeText={e => setEmail(e.toLowerCase().trim())} />
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
        
        </ImageBackground >
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
  imgBg:{
    flex:1,
    backgroundColor:'#f6f7f1',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent:'flex-end'
  },
  containerTitle: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  titleText: {
    fontSize: 28,
    fontFamily:'Montserrat-SemiBold',
    color: '#db9487'
  },
  containerBody: {
    flex: 0.5,
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
    flex: 1,
    alignItems: 'center',
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