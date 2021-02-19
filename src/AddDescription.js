import React, { Component, useState, useEffect } from 'react'
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Container, Header, Left, Body, Right, Title, Button, Icon } from 'native-base';
import CardView from 'react-native-cardview';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { width, height } = Dimensions.get("screen");
import Textarea from 'react-native-textarea';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';

export default function AddDescription({ navigation }, props) {
    const [description, setdescription] = useState(null);

    function addDescription() {
        console.log("sub9it called")





        AsyncStorage.getItem('ipaddress').then((ipaddress) => {


            const today = new Date();

            const date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();

            const patientdescription = {
                "info": description,
                "entry_date": date
            }

            const options = {


                url: 'http://' + ipaddress + ':5009/data_create',

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // data: JSON.stringify(userdata)

                data: patientdescription


            }

            //   console.log(options)
            axios(options)
                .then(response => {

                    console.log("*********************respd*************")

                    console.log(response.data)

                    Alert.alert(
                        'Confirmation',
                        'Your information has been saved.',
                        [

                            {
                                text: 'OK', onPress: () =>


                                    //   navigation.navigate('Live')

                                    setdescription(null)



                            }
                        ],
                        { cancelable: false }
                    );


                    console.log("*********************respd*************")




                })

        })
    }
    return (


        <KeyboardAwareScrollView
            enableAutomaticScroll
            extraScrollHeight={10}
            enableOnAndroid={true}
            extraHeight={Platform.select({ android: 350 })}
            style={{ flexGrow: 1 }}

        >

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View  >
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
                            }}>Save  Information</Title>
                        </Body>
                        <Left />

                    </Header>

                </View>



                <View style={{ flex: 1, width: width * 1, padding: 20, marginTop: 50 }}>
                    <CardView
                        // style={styles.cardStyle}
                        cardElevation={14}
                        cardMaxElevation={50}
                        cornerRadius={10}
                    >
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={(text) => {
                                setdescription(text)

                            }}
                            defaultValue={description}
                            maxLength={500}
                            placeholder={'Add Patient health information and click on submit ...'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />

                    </CardView>

                </View>


                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: width }}>


                    <TouchableOpacity style={styles.loginBtn}
                        onPress={() => addDescription()}

                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>SUBMIT</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </KeyboardAwareScrollView>



    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textareaContainer: {
        height: 350,
        padding: 5,
        backgroundColor: 'white',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 20,
        color: 'black',
    },

    loginBtn: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#059df7",
        marginTop: 50
    },
});