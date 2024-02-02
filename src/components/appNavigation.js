// AppNavigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MoviesScreen from './screens/movies';
import SearchScreen from './screens/search';
import TVShowsScreen from './screens/tvShows';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const AppNavigation = () => {
  const TabNavigator = ({ navigation }) => (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 16, textTransform: 'none' },
        tabStyle: { flex: 1, justifyContent: 'center' },
        style: { backgroundColor: '#fff', elevation: 0 },
        indicatorStyle: { backgroundColor: '#495057', height: 3 },
      }}
    >
      <Tab.Screen name="Movies">
        {(props) => <MoviesScreen {...props} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="TV Shows" component={TVShowsScreen} />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
