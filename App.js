import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MoviesScreen from './src/components/screens/movies';
import SearchScreen from './src/components/screens/search';
import TVShowsScreen from './src/components/screens/tvShows';

const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#495057' }}>
          <View style={styles.movieTitleContainer}>
            <Text style={styles.movieTitle}>Movie App</Text>
          </View>

          <Tab.Navigator
            tabBarOptions={{
              labelStyle: { fontSize: 16, textTransform: 'none' }, 
              tabStyle: { flex: 1, justifyContent: 'center' }, 
              style: { backgroundColor: '#fff', elevation: 0 }, 
              indicatorStyle: { backgroundColor: '#495057', height:3 }, 
            }}
            screenOptions={({ route }) => ({
              headerTitle: 'Movie App',
              headerTitleAlign: 'center',
            })}
          >
            <Tab.Screen name="Movies" component={MoviesScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="TV Shows" component={TVShowsScreen} />
          </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  movieTitleContainer: {
    paddingTop: 20,
    backgroundColor: '#495057',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
