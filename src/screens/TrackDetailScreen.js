import React, {useState} from 'react';
import axios from 'axios';

import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import Progress from '../components/ProgressBar';
import RNUpiPayment from 'react-native-upi-payment';

const TrackListScreen = ({navigation}) => {
  const [addAmount, setAddAmount] = useState('50');

  const updateStats = () => {
    const Request = {
      fundraised: navigation.getParam('fundraised') + addAmount,
      pplDonated: navigation.getParam('pplDonated') + 1,
    };

    axios
      .post(
        `https://donate-server-new.herokuapp.com/displayreq/${navigation.getParam(
          'id',
        )}`,
        Request,
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  function successCallback(data) {
    updateStats();
    console.log('success', data);
  }

  function failureCallback(data) {
    console.log('failure', data);
  }

  const pay = () => {
    RNUpiPayment.initializePayment(
      {
        vpa: navigation.getParam('upi'),
        payeeName: navigation.getParam('name'),
        amount: parseInt(addAmount),
        transactionRef: 'dG5Y-yH5t-jL2u0893-ioP922',
      },
      successCallback,
      failureCallback,
    );
  };

  return (
    <View style={{backgroundColor: '#1C1C32', height: '100%'}}>
      <TouchableOpacity
        style={{padding: 5, paddingLeft: 10}}
        onPress={() => navigation.navigate('Donate')}>
        <Image
          source={require('../back_button.png')}
          style={{height: 40, width: 50}}
        />
      </TouchableOpacity>

      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          backgroundColor: '#F8F8FF',
          height: '90%',

          borderRadius: 20,
        }}>
        <Text
          style={{
            color: 'black',

            fontSize: 20,
            fontFamily: 'HelveticaNowText-Bold',

            padding: 4,
            paddingLeft: 15,
          }}>
          Support {navigation.getParam('name')}
        </Text>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Image
              source={{uri: navigation.getParam('image')}}
              style={{
                height: 230,
                width: '100%',

                marginBottom: 10,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              paddingLeft: '10%',
              paddingRight: '10%',
            }}>
            <View
              style={{
                height: 1.5,
                backgroundColor: 'black',
                width: '100%',
                margin: 10,
              }}
            />
          </View>

          <View style={{padding: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 22,
                fontFamily: 'HelveticaNowText-Medium',
              }}>
              {navigation.getParam('title')}
            </Text>
            <Text
              style={{
                color: 'rgba(0,0,0,0.8)',
                fontSize: 19,
                fontFamily: 'HelveticaNowText-Regular',
              }}>
              {navigation.getParam('problem')}
            </Text>
          </View>
        </ScrollView>

        <View
          style={{
            alignItems: 'center',
            paddingLeft: '10%',
            paddingRight: '10%',
          }}>
          <View
            style={{
              height: 1.5,
              backgroundColor: 'black',
              width: '100%',
              margin: 10,
            }}
          />
        </View>

        <View style={{alignItems: 'center', width: '100%'}}>
          <View
            style={{
              margin: '1%',
              width: '100%',
              paddingLeft: '2%',
              paddingRight: '2%',
            }}>
            <Progress
              step={navigation.getParam('fundraised')}
              steps={navigation.getParam('fundrequired')}
              height={13}
              totalWidth={'100%'}
              fontColor={'rgba(0,0,0,1)'}
            />
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                color: '#1C1C32',
                fontSize: 16,
                padding: '0.7%',
                paddingLeft: '1.4%',
                fontFamily: 'HelveticaNowText-Bold',
              }}>
              {navigation.getParam('pplDonated')} people have just made a
              donation
            </Text>
          </View>
        </View>
        <View style={{padding: '1%', width: '100%'}}>
          <TextInput
            style={{
              borderColor: 'black',
              borderWidth: 1.7,
              borderRadius: 5,
              fontSize: 30,
              fontWeight: 'bold',
            }}
            placeholder="Enter amount (₹)"
            placeholderTextColor="rgba(0,0,0,0.4)"
            keyboardType="numeric"
            onChangeText={userInput => setAddAmount(parseInt(userInput))}
            value={addAmount}
          />
        </View>

        <View style={{marginTop: 'auto', bottom: 0}}>
          <TouchableOpacity
            onPress={() => pay()}
            style={{
              backgroundColor: 'rgb(250, 166, 50)',
              padding: 10,
              width: '100%',
              alignItems: 'center',
              marginTop: 'auto',
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, letterSpacing: 2}}>
              DONATE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
