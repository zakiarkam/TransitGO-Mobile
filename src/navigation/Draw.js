import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from '../components/CustomDrawer';
import BottomTab from './BottomTab';
import Tracking from '../screens/TrackingScreen/Tracking';
import ActivityHistoryScreen from '../screens/ActivityHistoryScreen/ActivityHistoryScreen';
import FormConductor from '../screens/FormConductor/FormConductor';
import {useNavigation} from 'expo-router';

const Drawer = createDrawerNavigator();

const Draw = () => {
  const [userRole, setUserRole] = useState('');
  // const navigation = useNavigation();

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        if (role) {
          setUserRole(role);
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };

    getUserRole();
  }, []);

  const getPackageStatusComponent = () => {
    return userRole === 'employee' ? FormConductor : Tracking;
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {marginLeft: -20, fontSize: 15},
        drawerActiveBackgroundColor: '#FA6B6B',
        drawerActiveTintColor: 'white',
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="HOME"
        component={BottomTab}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Package Status"
        component={getPackageStatusComponent()}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="cube-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Activity History"
        component={ActivityHistoryScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="time-outline" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Draw;
