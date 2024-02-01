// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Im Cindy, super coder</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesScreen from './src/components/MoviesScreen';
import SearchScreen from './src/components/searchScreen';
import TVShowsScreen from './src/components/tvShowsScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Movies" component={MoviesScreen} />
        <Tab.Screen name="SearchResults" component={SearchScreen} />
        <Tab.Screen name="TVShows" component={TVShowsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

<Tab.Screen
  name="Movies"
  component={MoviesScreen}
  options={{
    title: 'Movie App',
    headerStyle: {
      backgroundColor: '#f4511e', 
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
/>

export default App;
