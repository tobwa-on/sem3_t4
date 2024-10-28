<template>
  <v-app>
    <v-container class="text-center">
      <v-row>
        <v-col>
          <h1>Willkommen zur Film-Suche</h1>
          <p>Finde Informationen über Filme, Serien und Schauspieler mit TMDB</p>
        </v-col>
      </v-row>

      <!-- Suchfeld -->
      <v-row>
        <v-col>
          <v-text-field
              v-model="query"
              label="Suche nach einem Film"
              @keyup.enter="fetchMovies"
              outlined
          ></v-text-field>
          <v-btn @click="fetchMovies" color="primary">Suche</v-btn>
        </v-col>
      </v-row>

      <!-- Ergebnisse -->
      <v-row v-if="movies.length">
        <v-col v-for="movie in movies" :key="movie.id" cols="12" md="4">
          <v-card>
            <v-img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"></v-img>
            <v-card-title>{{ movie.title }}</v-card-title>
            <v-card-subtitle>Bewertung: {{ movie.vote_average }}</v-card-subtitle>
            <v-card-text>{{ movie.overview }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      movies: [],
    };
  },
  methods: {
    async fetchMovies() {
      if (!this.query) return;
      try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie`,
            {
              params: {
                api_key: 'YOUR_TMDB_API_KEY', // Ersetze durch deinen API-Schlüssel
                query: this.query,
              },
            }
        );
        this.movies = response.data.results;
      } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error);
      }
    },
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
