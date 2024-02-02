import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MoviesScreen from './screens/movies';
import SearchScreen from './screens/search';
import TVShowsScreen from './screens/tvShows';
import MovieDetailsScreen from './screens/movieDetails';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      labelStyle: { fontSize: 16, textTransform: 'none' },
      tabStyle: { flex: 1, justifyContent: 'center' },
      style: { backgroundColor: '#fff', elevation: 0 },
      indicatorStyle: { backgroundColor: '#495057', height: 3 },
    }}
  >
    <Tab.Screen name="Movies" component={MoviesScreen} />
    <Tab.Screen name="Search Results" component={SearchScreen} />
    <Tab.Screen name="TV Shows" component={TVShowsScreen} />
  </Tab.Navigator>
);

const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={({ route }) => ({
          tabBarVisible: route.state ? route.state.index <= 0 : true,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
