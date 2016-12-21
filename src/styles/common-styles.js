import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');

let PRIMARY_COLOR = '#007e9e'
let SECONDARY_COLOR = '#1abc9c'

module.exports = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    dropZone: {
      height: 250,
      paddingTop: 40,
      backgroundColor: PRIMARY_COLOR,
      alignItems: 'center',
    },
    high_five_header: {

    },
    high_five_footer: {
      backgroundColor: SECONDARY_COLOR,
      position: 'absolute',
      flexDirection: 'row',
      flex: 3,
      left: 0,
      bottom: 0,
      right: 0
    },
    high_five_text: {
      flex: 3,
      fontFamily: 'GeezaPro-Bold',
      color: 'white',
      alignSelf: 'flex-end',
      padding: 13
    },
    high_five_back: {
      alignSelf: 'flex-start',
      flex: 3
    },
    text: {
      marginTop: 25,
      marginLeft: 5,
      marginRight: 5,
      textAlign: 'center',
      color: '#fff'
    },
    draggableContainer: {
      position: 'absolute',
      top: Window.height / 2 - CIRCLE_RADIUS,
      left: Window.width / 2 - CIRCLE_RADIUS,
    },
    circle: {
      backgroundColor: '#1abc9c',
      width: CIRCLE_RADIUS * 2,
      height: CIRCLE_RADIUS * 2,
      borderRadius: CIRCLE_RADIUS
    },
    container: {
      flex: 1,
    },
    // styles
    contact_item: {
      padding: 15,
      width: Window.width - 20,
      borderBottomWidth: 1,
      borderBottomColor: '#d6d6d6',
      flexDirection: 'row',
      margin: 10,
      alignSelf: 'center',
    },
    contact_text: {
      flex: 3,
      color: 'black'
    },
    body: {
      flex: 9,
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    textinput: {
      marginTop: 10,
      height: 30,
      width: 300,
    },
    transparent_button: {
      marginTop: 10,
      padding: 15
    },
    transparent_button_text: {
      color: '#0485A9',
      fontSize: 16
    },
    account_container: {
      alignItems: 'center',
      paddingTop: 50
    },
    account_name: {
      fontFamily: 'GeezaPro-Bold',
      fontSize: 30,
      padding: 20
    },
    account_info: {
      fontFamily: 'GeezaPro-Bold',
      padding: 10
    },
    account_stats: {
      alignItems: 'center',
      width: Window.width - 100,
      margin: 20,
      padding: 0
    },
    account_back_button: {
      alignSelf: 'flex-start'
    },
    primary_button: {
      marginTop: 30,
      padding: 15,
      backgroundColor: '#529ecc',
      borderRadius: 30
    },
    primary_button_text: {
      color: '#FFF',
      fontSize: 18
    },
    image: {
      width: 100,
      height: 100
    },
    header: {
      height: 85,
      backgroundColor: PRIMARY_COLOR,
      paddingTop: 20,
      paddingBottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1
    },
    header_item: {
      alignItems: 'center',
      flex: 1
    },
    loading: {
      height: Window.height / 1.5,
      width: Window.width,
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
      margin: 0
    },
    header_text: {
      fontFamily: 'GeezaPro-Bold',
      color: 'white',
      fontSize: 18
    },
    high_five_button: {
      flex: 1,
      justifyContent: 'flex-end'
    },
});
