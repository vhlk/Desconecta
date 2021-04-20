import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Animated, Alert } from 'react-native';
import { useNavigation , useRoute} from "@react-navigation/native"
import MainApi from "../../services/ApiModule"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = () => {
  const navigation = useNavigation()
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
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
    Animated.spring(offset.y, {toValue: 0, speed: 8, useNativeDriver: true}).start();
  }, []);
  
  function checkLogin(userEmail: string, userPsw: string) {
    MainApi.GetUser(userEmail, userPsw).then(res => {
      if (res.data === null || res.data.length === 0) {
        Alert.alert("Não foi possível fazer login", "Por favor verifique os dados digitados!");
      }
      else {
        navigation.navigate("Home");
        saveLogin(res.data[0].ID);
      }
    }).catch(err => console.log(err));
  }

  async function saveLogin(id: string) {
    await AsyncStorage.setItem(LOGIN_EMAIL, email);
    await AsyncStorage.setItem(LOGIN_PSW, psw);
    await AsyncStorage.setItem(LOGIN_ID, id.toString());
  }

  function enterLogin() {
    checkLogin(email, psw);
  }

  return (
    <>
      <KeyboardAvoidingView style={styles.background}>

        <View style={styles.containerTitle}>
          <Text style={styles.titleText}>Desconecta</Text>
        </View>

        <Animated.View
          style={[styles.containerBody,
          {
            transform: [
              { translateY: offset.y }]
          }]}>

          <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail}/>
          <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha" onChangeText={setPsw}/>

          <TouchableOpacity style={styles.btnSubmit} onPress={enterLogin}>
            <Text style={styles.submitText}> Entrar</Text>
          </TouchableOpacity>


          {/* <TouchableOpacity style={styles.btnReset}>
          <Text style={styles.resetText}> Esqueci a senha</Text>
        </TouchableOpacity> */}

          <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}> Criar uma conta</Text>
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
  containerTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  titleText: {
    fontSize: 28,
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
  btnSubmit: {
    width: '90%',
    height: 45,
    backgroundColor: '#1C1C1C',
    marginTop: 10,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
  },
  btnRegister: {
    width: '40%',
    height: 30,
    backgroundColor: '#9C9C9C',
    marginTop: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',

  },
  registerText: {
    color: '#fff',
  },
  btnReset: {
    marginTop: 5,

  },
  resetText: {
    color: 'black',
  }

});
export default Login