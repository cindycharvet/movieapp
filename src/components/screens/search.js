import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Dropdown from '../dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('movie');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchTypeMessage, setShowSearchTypeMessage] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Corrected variable name

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
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const navigateToDetails = (item) => {
    navigation.navigate('MovieDetails', { movie: item });
  };

  const renderDropdownItem = (item) => (
    <TouchableOpacity
      key={item.value}
      onPress={() => {
        setSearchType(item.value); // Corrected variable name
        setDropdownVisible(false);
      }}
      style={styles.dropdownItem}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const dropdownOptions = [
    { label: 'Movie', value: 'movie' },
    { label: 'TV Show', value: 'tv' },
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
            <Dropdown
              options={dropdownOptions}
              selectedOption={searchType}
              onSelect={setSearchType}
              isVisible={isDropdownVisible}
              onClose={() => setDropdownVisible(false)}
            />

            <TouchableOpacity style={styles.searchButton} onPress={() => setDropdownVisible(!isDropdownVisible)}>
              <Text style={styles.btnSearch}>Search</Text>
              <Icon name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {showSearchTypeMessage && (
            <Text style={styles.errorMessage}>Please select a search type.</Text>
          )}
        </View>

      {/* Search Results */}
      <View style={styles.resultsContainer}>
        {searchResults.length === 0 && (
          <Text style={styles.noResultMessage}>Please initiate search</Text>
        )}

        {searchResults.map((item) => (
          <View key={item.id} style={styles.resultItem}>
            <Text>{item.title || item.name}</Text>
            <Button title="More Details" onPress={() => navigateToDetails(item)} />
          </View>
        ))}
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
    marginBottom: 10,
  },
  searchTypeDropdown: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  noResultMessage: {
    fontStyle: 'italic',
    color: '#777',
  },
});

export default SearchScreen;
