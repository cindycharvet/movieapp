import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Dropdown from '../dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('movie');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchTypeMessage, setShowSearchTypeMessage] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false); 

  const handleSearch = async () => {
    if (query.trim() === '') {
      return;
    }

    if (!searchType) {
      setShowSearchTypeMessage(true);
      return;
    } else {
      setShowSearchTypeMessage(false);
    }

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/${searchType}?api_key=6ca46762aece731e3a07568e5fb9e304&query=${query}`);
      setSearchResults(response.data.results);
      setQuery('');
    } catch (error) {
      console.error('Error searching:', error);
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
    { label: 'movie', value: 'movie' },
    { label: 'multi', value: 'multi' },
    { label: 'tv', value: 'tv' },
  ];

  return (
    <View style={styles.container}>

      {/* Search Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Search Movie/TV Show Name<Text style={styles.mandatory}>*</Text></Text>
          <View style={styles.inputContainer}>
            <Icon name="search" size={20} color="#B0B8BF" />
            <TextInput
              style={styles.input}
              placeholder="i.e. James Bond, CSI"
              placeholderTextColor="#777"
              value={query}
              onChangeText={(text) => setQuery(text)}
            />
        </View>

        <View>
          <Text style={styles.formLabel}>Choose Search Type<Text style={styles.mandatory}>*</Text></Text>
          <View style={styles.searchTypeContainer}>
          <TouchableOpacity
              onPress={() => setDropdownVisible(true)}
              style={styles.dropdownButton}
            >
              <Text style={styles.dropdownButtonText}>
                {dropdownOptions.find(option => option.value === searchType)?.label}
              </Text>
              <Icon
                name="chevron-down"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>

            <Dropdown
              options={dropdownOptions}
              selectedOption={searchType}
              onSelect={(value) => setSearchType(value)}
              isVisible={isDropdownVisible}
              onClose={() => setDropdownVisible(false)}
            />

            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
              <Text style={styles.btnSearch}>Search</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.message}>Please select a search type.</Text>
        </View>

      {/* Search Results */}
      <View style={styles.resultsContainer}>
        {searchResults.length === 0 && (
          <Text style={styles.noResultMessage}>Please initiate search</Text>
        )}

        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigateToDetails(item)}>
                <View style={styles.movieContainer}>
                  {/* Adjust the image source based on your API response */}
                  <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                    style={styles.movieImage}
                  />
                  <View style={styles.movieDetails}>
                    <Text style={styles.movieTitle}>{item.title || item.name}</Text>
                    {/* Adjust the content based on your API response */}
                    <Text>Popularity: {item.popularity}</Text>
                    <Text>Release Date: {item.release_date || item.first_air_date}</Text>
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
        )}
      </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    paddingRight:35,
    paddingLeft:35,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:"#F4F5F6",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop:10,
    marginBottom:10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    color: 'black',
  },
  mandatory:{
    color:"red",
  },
  searchTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButton: {
    height: 40,
    marginVertical: 10,
    marginRight:10,
    padding:10,
    backgroundColor: '#fff',
    justifyContent:"space-between",
    alignItems: 'center',
    borderColor: '#dee2e6',
    borderWidth: 1,
    borderRadius: 5, 
    flexDirection: 'row', 
    flexGrow:1,
  },
  dropdownButtonText: {
    fontSize: 16,
    marginRight: 8,
    color:"#777",
  },
  arrowIcon:{
    fontSize: 16,
    fontWeight: "regular", 
    color:"#B9C2CB",
  },
  searchButton: {
    backgroundColor: '#00b4d8',
    borderRadius: 5,
    paddingTop:12,
    paddingBottom:12,
    paddingLeft:25,
    paddingRight:25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', 
  },
  searchIcon: {
    marginRight: 5,
  },
  btnSearch:{
    color:'white',
    fontSize:16,
    fontWeight:"600",
  },
  message:{
    fontSize:12,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  noResultMessage: {
    fontSize: 25,
    fontWeight:"700",
    color: '#49525A',
    textAlign:"center",
    marginTop:100,
  },
  movieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  movieImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  seeDetailsButtonContainer: {
    marginTop: 10,
    backgroundColor: '#00b4d8',
    padding: 8,
    borderRadius: 8,
  },
});

export default SearchScreen;
