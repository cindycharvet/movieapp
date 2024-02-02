import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w400${movie.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{movie.title}</Text>
      <Text>{movie.overview}</Text>
      <Text>Popularity: {movie.popularity}</Text>
      <Text>Release Date: {movie.release_date}</Text>
      <Button
        title="Back to Movies"
        onPress={() => navigation.goBack()}
        color="#00b4d8"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  movieImage: {
    width: 200,
    height: 300,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MovieDetailsScreen;
