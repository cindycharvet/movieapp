import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movie } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}
          title="Back to List"
          color="#007BFF"
        />
      ),
      headerTitle: movie.title, 
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.movieTitle}>{movie.title}</Text>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieOverview}>{movie.overview}</Text>
      <View style={styles.popularityReleaseDate}>
        <Text style={styles.popularity}>Popularity: {movie.popularity}</Text>
        <Text style={styles.release}>Release Date: {movie.release_date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F4F5F6',
    justifyContent: "center",
    alignItems: "center",
  },
  movieImage: {
    width: 200,
    height: 300,
    marginTop: 30,
    marginBottom: 30,
  },
  movieTitle: {
    fontSize: 25,
    color:"#49525A",
    fontWeight: 'bold',
    marginTop:50,
    marginBottom: 10,
    textAlign:"center",
  },
  movieOverview: {
    lineHeight:"23",
    color:"#535C65",
  },
  popularityReleaseDate: {
    flexDirection: 'row',
    marginTop: 10,
  },
  popularity: {
    color:"#535C65",
    marginRight:5,
  },
  release: {
    color:"#535C65",
    marginLeft:5
  },
  
});

export default MovieDetailsScreen;
