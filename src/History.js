import React, { Component } from 'react';

import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header, Left, Body, Right, Title, Button, Icon } from 'native-base';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {



  constructor(props) {

    super(props);

    this.state = {
      isLoading: true,
      text: '',
      data: []
    }

    this.arrayholder = [];
  }

  componentDidMount() {

    this.props.navigation.addListener('focus', () => {


      this.setState({
        data: []
      })

      console.log("history+++++++++++++++++++++++++")

      AsyncStorage.getItem('ipaddress').then((ipaddress) => {  


      const options = {


        url: 'http://'+ ipaddress + ':5009/data_list',

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },



      }

      //   console.log(options)
      axios(options)
        .then(response => {



          this.setState({
            isLoading: false,
            data: response.data,
          })


        })

      })
    }

    )



  }




  itemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "100%",
          borderColor: 'grey',
        }}
      />
    );
  }



  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size={70}
            color={'#059df7'}
          />
        </View>
      );
    }

    return (



      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View  >


          <Header style={{ backgroundColor: '#059df7' }}>
            <Button transparent

              onPress={() => {
                this.props.navigation.openDrawer();

              }}
            >
              <Icon name="menu" />
            </Button>
            <Body>
              <Title style={{
                alignSelf: 'center', flex: 0.5
              }}>History</Title>
            </Body>
            <Left />

          </Header>

        </View>








        <View style={styles.MainContainer}>

          <View>
            <FlatList
              data={this.state.data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.itemSeparator}
              renderItem={({ item }) => {


                return (

                  <View>


                    <ScrollView
                      ref={scrollView => this.scrollView = scrollView}
                      onContentSizeChange={() => {
                        this.addNewEle && this.scrollView.scrollToEnd();
                      }}
                    >

                      <LinearGradient colors={['#059df7', '#7ac8fa']} style={styles.linearGradient}>
                        <Text style={styles.row}
                        > {item.entry_date} - {item.info} </Text>
                        
                      </LinearGradient>

                    </ScrollView>


                  </View>

                )



              }



              }
              style={{ marginTop: 5, }} />

          </View>




        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    alignContent: 'center'

  },

  row: {
    fontSize: 20,
    padding: 15,
    color: 'white',
    textAlign: 'center',
    // backgroundColor: 'red',
    fontFamily: 'Gill Sans Medium',
    borderRadius: 5,
    fontWeight: '900',
    // fontStyle:'italic'


  },

  textInput: {

    textAlign: 'center',
    height: 42,
    borderWidth: 0.5,
    borderColor: '#f5f5f5',
    borderRadius: 8,
    backgroundColor: "#FFFF",
    fontFamily: 'Gill Sans Medium',
    fontSize: 18


  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10
  },
});