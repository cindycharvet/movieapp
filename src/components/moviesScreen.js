import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('now_playing');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMovies(selectedCategory);
  }, [selectedCategory]);

  const fetchMovies = async (category) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=6ca46762aece731e3a07568e5fb9e304`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const navigateToDetails = (movie) => {
    navigation.navigate('MovieDetails', { movie });
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
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setDropdownVisible(true)}
        style={styles.dropdownButton}
      >
        <Text style={styles.dropdownButtonText}>{dropdownOptions.find(option => option.value === selectedCategory)?.label}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDropdownVisible}
        onRequestClose={() => setDropdownVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {dropdownOptions.map(renderDropdownItem)}
          </View>
        </View>
      </Modal>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetails(item)}>
            <View style={styles.movieContainer}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                style={styles.movieImage}
              />
              <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text>Popularity: {item.popularity}</Text>
                <Text>Release Date: {item.release_date}</Text>
                <Button
                  title="See Details"
                  onPress={() => navigateToDetails(item)}
                  color="#fff"  
                  style={styles.seeDetailsButton}
                />
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
  dropdownButton: {
    height: 40,
    marginVertical: 10,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#dee2e6',
    borderWidth: 1,
    borderRadius: 5, 
    flexDirection: 'row', 
  },
  dropdownButtonText: {
    fontSize: 16,
    marginRight: 8, // Add space between text and arrow
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  movieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  movieImage: {
    width: 50,
    height: 75,
    marginRight: 10,
    borderRadius: 4,
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  seeDetailsButton: {
    marginTop: 10, 
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
  },
});

export default MoviesScreen;
