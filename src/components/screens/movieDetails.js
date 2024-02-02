import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';

const MovieDetailsScreen = ({ route, navigation }) => {
    const { item } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button
                    onPress={() => navigation.goBack()}
                    title="Back to List"
                    color="#007BFF"
                />
            ),
            headerTitle: item.title || item.name || 'Details',
        });
    }, [navigation, item]);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {item && (
                    <>
                        <Text style={styles.movieTitle}>{item.title || item.name || 'Untitled'}</Text>
                        {item.poster_path && (
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                                style={styles.movieImage}
                            />
                        )}
                        <Text style={styles.movieOverview}>{item.overview}</Text>
                        <View style={styles.popularityReleaseDate}>
                            <Text style={styles.popularity}>Popularity: {item.popularity}</Text>
                            <Text style={styles.release}>
                                {item.release_date || item.first_air_date || 'Release Date N/A'}
                            </Text>
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 30,
    backgroundColor: '#F4F5F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieImage: {
    width: 200,
    height: 300,
    marginTop: 30,
    marginBottom: 30,
  },
  movieTitle: {
    fontSize: 25,
    color: '#49525A',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  movieOverview: {
    lineHeight: 23,
    color: '#535C65',
  },
  popularityReleaseDate: {
    flexDirection: 'row',
    marginTop: 20,
  },
  popularity: {
    color: '#535C65',
    marginRight: 5,
  },
  release: {
    color: '#535C65',
    marginLeft: 5,
  },
});

export default MovieDetailsScreen;
