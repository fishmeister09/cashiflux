import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Image, StyleSheet} from 'react-native';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator(
    {
      TrackList: {
        screen: createStackNavigator(
          {
            Donate: TrackListScreen,
            TrackDetail: TrackDetailScreen,
          },
          {
            header: null,
            headerMode: 'none',
          },
        ),

        navigationOptions: {
          tabBarLabel: 'Donate',
          tabBarIcon: ({focused, size}) => {
            const iconimg = focused
              ? require('./src/donate_white.png')
              : require('./src/donate_black.png');
            return (
              <Image
                source={iconimg}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
            );
          },
        },
      },
      TrackCreate: {
        screen: TrackCreateScreen,
        navigationOptions: {
          tabBarLabel: 'Request',
          tabBarIcon: ({focused, size}) => {
            const iconimg = focused
              ? require('./src/request_white.png')
              : require('./src/request_black.png');
            return (
              <Image
                source={iconimg}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
            );
          },
        },
      },
      Feedback: {
        screen: FeedbackScreen,
        navigationOptions: {
          tabBarLabel: 'Feedback',
          tabBarIcon: ({focused, size}) => {
            const iconimg = focused
              ? require('./src/feedback_white.png')
              : require('./src/feedback_black.png');
            return (
              <Image
                source={iconimg}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
            );
          },
        },
      },
      Account: {
        screen: AccountScreen,

        navigationOptions: {
          tabBarLabel: 'Request',

          tabBarIcon: ({focused, size}) => {
            const iconimg = focused
              ? require('./src/user_white.png')
              : require('./src/user_black.png');
            return (
              <Image
                source={iconimg}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
            );
          },
        },
      },
    },
    {
      tabBarOptions: {
        showLabel: false,
        style: {backgroundColor: '#000000', height: 50, borderTopWidth: 0},
      },
    },
  ),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={navigator => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};
