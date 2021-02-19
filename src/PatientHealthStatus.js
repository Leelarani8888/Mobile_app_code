import React, { Component, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header, Left, Body, Right, Title, Button, Icon } from 'native-base';
const { width, height } = Dimensions.get("screen");
import MQTT from 'react-native-mqtt-new';
import Status from './Status';


export default function PatientHealthStatus({ navigation }) {
  const [heart, setheart] = useState("...");
  const [oxidation, setoxidation] = useState("...");
  const [temperature, settemperature] = useState("...");
  const [respiration, setrespiration] = useState("...");


  useEffect(() => {

    navigation.addListener('focus', () => {

      MQTT.createClient({
        uri: 'mqtt://broker.hivemq.com:1883',
        clientId: 'your_client_id'
      }).then(function (client) {

        client.on('closed', function () {
          // console.log('mqtt.event.closed');
        });

        client.on('error', function (msg) {
          // console.log('mqtt.event.error', msg);
        });

        client.on('message', function (msg) {
          // console.log('+++++++++++++++mqtt.event.message ++++++++++++++++++++++++', msg);
          console.log(msg.data)
          var mqttvalue = msg.data;
          var splits = mqttvalue.split(",");

          setheart(splits[0])
          settemperature(splits[1])
          setoxidation(splits[2])
          setrespiration(splits[3])


        });

        client.on('connect', function () {
          // console.log('connected');
          client.subscribe('tritcs1', 0);

        });

        client.connect();
      }).catch(function (err) {
        // console.log(err);
      });

    })



  });


  return (


    <View style={{ flex: 1 }}>

      <Header style={{ backgroundColor: '#059df7' }}>
        <Button transparent


          onPress={() => {
            navigation.openDrawer();

          }}
        >
          <Icon name="menu" />
        </Button>
        <Body>
          <Title style={{
            alignSelf: 'center', flex: 0.5
          }}>Health Data</Title>

        </Body>



        <Left />
      </Header>



      <View style={{ flex: 1, flexDirection: 'column' }}>

        <View style={{ marginTop: 10 }}>

          {

            temperature > 38 && heart < 50 ? (
              <Text style={{ fontSize: 18, color: 'red', textAlign: 'center', fontWeight: 'bold' }}>DISEASE PREDICTION : HEART ATTACK </Text>

            ) : oxidation < 93 && respiration !== "Normal" ? (

              <Text style={{ fontSize: 18, color: 'red', textAlign: 'center', fontWeight: 'bold' }}>DISEASE PREDICTION: ASTHMA </Text>

            ) : (

                  <Text style={{ fontSize: 18, color: 'red', textAlign: 'center', fontWeight: 'bold' }}>DISEASE PREDICTION : NORMAL </Text>

                )
          }
        </View>

        {

          respiration == 1 ? (
            <Status
              heart={heart}
              oxidation={oxidation}
              temperature={temperature}
              respiration={"Abnormal"}
            />

          ) : (

              <Status
                heart={heart}
                oxidation={oxidation}
                temperature={temperature}
                respiration={"Normal"}
              />
            )


        }





      </View>
    </View>


  )
}
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 23,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  },
  buttonText2: {
    fontSize: 35,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});