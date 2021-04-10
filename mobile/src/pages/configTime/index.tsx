import React, { useState } from 'react';
import { Header, Icon } from "react-native-elements"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
  Modal,
  Pressable,
  SafeAreaView 
} from 'react-native';
import Slider from '@react-native-community/slider';



const configTime = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState('');
  const [modalTitle, setModalTitle] =  useState('');

  const openSettingsModal = (title,settings) => {
    setModalTitle(title);
    setModalData(settings);
    setModalVisible(!modalVisible);
  }
  const data=  [
    {id:1,  name: "WhatsApp",   image:"https://logospng.org/download/whatsapp/logo-whatsapp-verde-icone-ios-android-256.png",         count:null},
    {id:2,  name: "Facebook",    image:"https://imagepng.org/wp-content/uploads/2017/09/facebook-icone-icon.png",       count:12},
    {id:3,  name: "Instagram",       image:"https://logodownload.org/wp-content/uploads/2017/04/instagram-logo.png", count:2} ,
    {id:4,  name: "Twitter",   image:"https://imagepng.org/wp-content/uploads/2018/08/twitter-icone-5.png",    count:23} ,
    {id:5,  name: "TikTok",   image:"https://logodownload.org/wp-content/uploads/2019/08/tiktok-logo-0-1.png",        count:4} ,
  ];

    return (
        <>
            <SafeAreaView style={styles.container}>
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
              <Text style={styles.titleText}>Personalize seu tempo nas Redes</Text>
              </>
            }
            containerStyle={{
              marginTop: 5,
              borderBottomColor: 'rgba(0, 0, 0, 0)'
            }}
            backgroundColor='rgba(0, 0, 0, 0)'
        />
      <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Defina quantas horas você gostaria de passar no {modalTitle}</Text>
              <Text style={styles.text}>
                <Text>{modalData} Horas por dia</Text>
              </Text>
              <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={24}
                step={1}
                value={modalData}
                minimumTrackTintColor="red"
                maximumTrackTintColor="#000000"
                onValueChange={value => setModalData(value)}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Salvar</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
        <Text style={styles.subtitleText}>Defina quantas horas por dia você quer passar em cada app!</Text>
        <FlatList 
          style={styles.contentList}
          data={data}
          keyExtractor= {(item) => item.id.toString()}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card}  onPress={() => openSettingsModal(item.name,item.count)}>
              <Image style={styles.image} source={{uri: item.image}}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <View>
                    {item.count == null  ? <Text style={styles.count}>Defina uma meta para o app!</Text> : <Text style={styles.count}>Meta: {item.count}H por dia</Text>}
                </View>
              </View>
            </TouchableOpacity>
          )}}/>
      </View>
      </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:5,
        backgroundColor:"white",
        height: '100%'
      },
      contentList:{
        flex:1,
        height: '100%'
      },
      cardContent: {
        marginLeft:20,
        marginTop:10,
        alignSelf: 'center'
      },
      image:{
        width:90,
        height:90,
      },
      text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
        margin: 10,
      },
      subtitleText: {
        fontSize: 13,
        textAlign: 'center',
        fontWeight: '500',
      },
    
      card:{
        elevation: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop:20,
        backgroundColor:"#202225",
        padding: 10,
        flexDirection:'row',
        borderRadius:30,
      },
    
      name:{
        fontSize:20,
        flex:1,
        alignSelf:'flex-start',
        color:"#ffffff",
        fontWeight:'bold'
      },
      count:{
        fontSize:15,
        flex:1,
        alignSelf:'flex-start',
        color:"#ffffff"
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        width: '90%',
        height: '45%',
        justifyContent: 'center',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 5.25,
        shadowRadius: 9,
        elevation: 10
      },
      button: {
        borderRadius: 20,
        padding: 15,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        fontSize: 25,
        marginBottom: 15,
        fontWeight: "bold",
        textAlign: "center"
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

export default configTime