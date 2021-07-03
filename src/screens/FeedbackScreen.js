import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';

import {
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  View,
  Image,
  Alert,
  Dimensions,
} from 'react-native';

const FeedbackScreen = () => {
  const height = Dimensions.get('window').height;

  const width = Dimensions.get('window').width;

  const [emailAuth, setEmailFromAuth] = useState('loading...');
  const Boiler = async () => {
    setEmailFromAuth(await AsyncStorage.getItem('email'));
  };
  useEffect(() => {
    Boiler();
  }, []);

  const [Feedback, setFeedback] = useState('');
  const onSubmit = () => {
    console.log(Feedback.length);
    if (Feedback.length >= 10) {
      Alert.alert('Submitted', 'Your feedback has been recorded', [
        {text: 'OK'},
      ]);
    } else {
      Alert.alert(
        'Failed to submit',
        'Your feedback is too short to be recorded',
        [{text: 'OK'}],
      );
    }
  };

  return (
    <View style={{height: height, width: width, backgroundColor: '#1C1C32'}}>
      <ScrollView
        style={{
          width: width,
          height: height,
          padding: '7%',
          position: 'absolute',
        }}>
        <View style={{padding: '2.3%'}}>
          <Text style={styles.Heading1}>CONTACT US</Text>
          <View style={{paddingBottom: '1%'}}>
            <Text
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: 20,

                fontFamily: 'HelveticaNowText-Medium',
              }}>
              Email
            </Text>
            <TextInput
              style={{
                color: 'rgba(0,0,0,0.9)',

                fontSize: 19,
                textAlignVertical: 'top',
                backgroundColor: 'white',
                borderRadius: 7,
                fontFamily: 'HelveticaNowText-Medium',
              }}
              placeholder="Enter email"
              editable={false}
              placeholderTextColor="white"
              value={emailAuth}
            />
          </View>
          <View>
            <Text
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: 20,

                fontFamily: 'HelveticaNowText-Medium',
              }}>
              Message
            </Text>
            <TextInput
              style={{
                color: 'rgba(0,0,0,0.9)',
                height: 150,
                fontSize: 19,
                textAlignVertical: 'top',
                backgroundColor: 'white',
                borderRadius: 7,
                fontFamily: 'HelveticaNowText-Medium',
              }}
              placeholderTextColor="rgba(0,0,0,0.9)"
              placeholder="What would you like to tell us.."
              onChangeText={userInput => setFeedback(userInput)}
              value={Feedback}
              multiline={true}
              maxLength={150}
            />
          </View>
          <View style={{paddingTop: '8%'}}>
            <Button
              title="Submit"
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: 7,
              }}
              titleStyle={{
                color: '#1C1C32',
                fontSize: 20,
                fontWeight: 'bold',
                letterSpacing: 3,
              }}
              onPress={() => onSubmit()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Heading1: {
    color: 'white',

    fontFamily: 'HelveticaNowText-ExtraBold',

    fontSize: 55,
    paddingBottom: '5%',
  },
});

export default FeedbackScreen;
