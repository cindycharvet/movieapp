import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/components/appNavigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainContainer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const MainContainer = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#495057' }}>
        <TitleBar />
        <AppNavigator />
    </SafeAreaView>
  );
};

const TitleBar = () => {
  return (
    <View style={styles.movieTitleContainer}>
      <Text style={styles.movieTitle}>Movie App</Text>
    </View>
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
