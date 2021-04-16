import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Animated } from 'react-native';
import { useNavigation , useRoute} from "@react-navigation/native"

const Login = () => {
  const navigation = useNavigation()
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));

  useEffect(() => {
    Animated.spring(offset.y, {toValue: 0, speed: 8, useNativeDriver: true}).start();
  }, []);
  
  function checkLogin() {
    //check server if login exists and is correct
    return true
  }

  function enterLogin() {
    if(checkLogin())
      navigation.navigate("Home")
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

          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha" />

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
    color: '#EED5B7',
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