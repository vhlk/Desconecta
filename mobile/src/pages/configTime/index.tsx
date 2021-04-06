import React, { Component } from 'react';
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

export default class Craigslist extends Component {
   

  static defaultProps = {
    value: 0,
  };

   state = {
    modalVisible: false,
    itemChosen: null,
    value: this.props.value,
   };
   setModalVisible = (visible, item, range) => {
    this.setState({ modalVisible: visible, itemChosen: item, value:null});
  }

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      itemChosen: {},
      userSelected:[],
      data: [
        {id:1,  name: "WhatsApp",   image:"https://logospng.org/download/whatsapp/logo-whatsapp-verde-icone-ios-android-256.png",         count:null},
        {id:2,  name: "Facebook",    image:"https://imagepng.org/wp-content/uploads/2017/09/facebook-icone-icon.png",       count:12},
        {id:3,  name: "Instagram",       image:"https://logodownload.org/wp-content/uploads/2017/04/instagram-logo.png", count:2} ,
        {id:4,  name: "Twitter",   image:"https://imagepng.org/wp-content/uploads/2018/08/twitter-icone-5.png",    count:23} ,
        {id:5,  name: "TikTok",   image:"https://logodownload.org/wp-content/uploads/2019/08/tiktok-logo-0-1.png",        count:4} ,
      ]
    };
  }

  clickEventListener = (item) => {
    Alert.alert('Message', 'Item clicked. '+item.name);
  }
  

  render() {
    const { modalVisible } = this.state
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.container}>
       <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible, {}, null);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Defina quantas horas você gostaria de passar no {this.state.itemChosen.name}</Text>
              <Text style={styles.text}>
                {this.state.value== null ? <Text>{this.state.itemChosen.count} Horas por dia</Text> : <Text>{this.state.value} Horas por dia</Text>}
              </Text>
              <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={24}
                step={1}
                value={this.state.itemChosen.count}
                minimumTrackTintColor="red"
                maximumTrackTintColor="#000000"
                onValueChange={value => this.setState({value: value})}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible, {}, null)}
              >
                <Text style={styles.textStyle}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Text style={styles.titleText}>Personalize seu tempo nas Redes</Text>
        <Text style={styles.subtitleText}>Defina quantas horas por dia você quer passar em cada app!</Text>
        <FlatList 
          style={styles.contentList}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card}  onPress={() => {this.setModalVisible(true, item)}}>
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
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
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
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },

  card:{
    elevation: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"black",
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
    width: '98%',
    height: '50%',
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
  }
}); 