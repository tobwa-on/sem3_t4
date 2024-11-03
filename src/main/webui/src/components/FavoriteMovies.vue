<template>
  <v-container fluid>
    <h2>Meine Favoriten</h2>
    <v-container fluid>
      <!-- Ergebnisse -->
      <v-row class="mt-4" dense align-content="start">
        <v-col
            v-for="movie in favouriteMovies"
            :key="movie.id"
            cols="4"
        >
          <v-row>
            <v-card class="d-flex align-center pa-4" variant="flat">
              <v-col>
                <v-img
                    :src="movie.poster_path ? getImageUrl(movie.poster_path) : 'https://via.placeholder.com/100x150?text=No+Image'"
                    height="150px"
                    width="100px"
                />
              </v-col>

              <v-col>
                <div class="movie-info">
                  <v-card-title class="font-weight-bold">{{ movie.title }}</v-card-title>
                  <v-card-subtitle>{{ movie.release_date }}</v-card-subtitle>
                  <v-card-actions>
                    <v-btn @click="$emit('showDetails', movie.id)">Details ansehen</v-btn>
                  </v-card-actions>
                </div>
              </v-col>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getImageUrl, getMovieDetails } from '@/services/tmdb';
import { getFavouriteMovies } from "@/services/favoriteService.js";

const favouriteMovies = ref([]);
const uid = 'admin'; // Beispielhafte User-ID

// Funktion zum Abrufen der Filmdetails für alle Favoriten
const fetchMovieDetails = async () => {
  try {
    const favorites = await getFavouriteMovies(uid); // Ruft die Favoriten ab
    const movieDetailsPromises = favorites.map(favorite => getMovieDetails(favorite.movieId)); // Erstellt eine Liste von Versprechungen für die Filmdetails
    const movies = await Promise.all(movieDetailsPromises); // Holt alle Details parallel
    favouriteMovies.value = movies.map(response => response.data); // Speichert die Daten in favouriteMovies
  } catch (error) {
    console.error("Fehler beim Abrufen der Filmdetails:", error);
  }
};

onMounted(fetchMovieDetails); // Ruft die Funktion beim Laden der Komponente auf
</script>

<style scoped>
</style>
