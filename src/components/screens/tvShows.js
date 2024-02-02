import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Dropdown from '../dropdown';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetailsScreen from './movieDetails';

const Stack = createStackNavigator();

const TVShowsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back To List"
        component={TVList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </Stack.Navigator>
  );
};

const TVList = ({ navigation }) => {
  const [tvShows, settvShows] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('airing_today');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    fetchTVShows(selectedCategory);
  }, [selectedCategory]);

  const fetchTVShows = async (category) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${category}?api_key=6ca46762aece731e3a07568e5fb9e304`);
      settvShows(response.data.results);
    } catch (error) {
      console.error('Error fetching tv shows:', error);
    }
  };

  const navigateToDetails = (item) => {
    navigation.navigate('MovieDetails', { item });
  };



  const renderDropdownItem = (item) => (
    <TouchableOpacity
      key={item.value}
      onPress={() => {
        setSelectedCategory(item.value);
        setDropdownVisible(false);
      }}
      style={styles.dropdownItem}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const dropdownOptions = [
    { label: 'airing today', value: 'airing_today' },
    { label: 'on the air', value: 'on_the_air' },
    { label: 'popular', value: 'popular' },
    { label: 'top_rated', value: 'top_rated' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.containerDropdown}>
        <TouchableOpacity
          onPress={() => setDropdownVisible(true)}
          style={styles.dropdownButton}
        >
          <Text style={styles.dropdownButtonText}>
            {dropdownOptions.find(option => option.value === selectedCategory)?.label}
          </Text>
          <Icon
            name="chevron-down"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      <Dropdown
        options={dropdownOptions}
        selectedOption={selectedCategory}
        onSelect={setSelectedCategory}
        isVisible={isDropdownVisible}
        onClose={() => setDropdownVisible(false)}
      />

      <FlatList
        data={tvShows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetails(item)}>
            <View style={styles.tvContainer}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                style={styles.tvImage}
              />
              <View style={styles.movieDetails}>
                <Text style={styles.tvTitle}>{item.name}</Text>
                <Text>Popularity: {item.popularity}</Text>
                <Text>Release Date: {item.release_date}</Text>
                <View style={styles.seeDetailsButtonContainer}>
                  <Button
                    title="More Details"
                    onPress={() => navigateToDetails(item)}
                    color="#fff"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  containerDropdown:{
    alignItems:"center",
  },
  dropdownButton: {
    width:250,
    height: 40,
    marginVertical: 10,
    padding:10,
    backgroundColor: '#fff',
    justifyContent:"space-between",
    alignItems: 'center',
    borderColor: '#dee2e6',
    borderWidth: 1,
    borderRadius: 5, 
    flexDirection: 'row', 
  },
  dropdownButtonText: {
    fontSize: 16,
    marginRight: 8,
    color:"#777"
  },
  arrowIcon:{
    fontSize: 16,
    fontWeight: "regular", 
    color:"#B9C2CB"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  dropdownItem: {
    padding: 15,
  },
  tvContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  tvImage: {
    width: 100,
    height: 130,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
  },
  tvTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  seeDetailsButtonContainer: {
    marginTop: 10,
    backgroundColor: '#00b4d8',
    padding: 6,
    borderRadius: 6,
  },
});

export default TVShowsScreen;
