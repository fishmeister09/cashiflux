import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Context as AuthContext} from '../context/AuthContext';

const AccountScreen = () => {
  const {signout} = useContext(AuthContext);
  const [emailAuth, setEmailFromAuth] = useState('loading...');

  const height = Dimensions.get('window').height;

  const width = Dimensions.get('window').width;

  const Boiler = async () => {
    setEmailFromAuth(await AsyncStorage.getItem('email'));
  };

  useEffect(() => {
    Boiler();
  }, []);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
    }).start();
  };

  return (
    <View
      style={{
        backgroundColor: '#1C1C32',

        height: height,
        width: width,
      }}>
      <View
        style={{
          alignItems: 'center',
          padding: 40,
          height: height,
          width: width,
        }}>
        <Animated.Image
          source={require('./avatar.png')}
          onLoad={fadeIn}
          style={{height: 250, width: 250, opacity: fadeAnim}}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 26,
            marginTop: '10%',
            fontStyle: 'italic',
          }}>
          {emailAuth}
        </Text>
        <TouchableOpacity
          onPress={signout}
          style={{
            backgroundColor: '#151527',
            padding: 6,
            borderColor: 'white',
            borderWidth: 1,
            paddingRight: 15,
            paddingLeft: 15,
            borderRadius: 10,
            marginTop: '30%',
          }}>
          <Text
            style={{
              fontSize: 27,
              fontFamily: 'HelveticaNowText-ExtraBold',
              color: 'white',
            }}>
            SIGN OUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;
