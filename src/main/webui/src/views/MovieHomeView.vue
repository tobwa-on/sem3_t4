<template>
  <v-container fluid>
    <PopularMovies @showDetails="showMovieDetails" />
    <SearchMovie @showDetails="showMovieDetails"/>

    <!-- Dialog für Filmdetails -->
    <MovieDetailsDialog
        :dialog="dialog"
        :movieDetails="movieDetails"
        :rating="rating"
        :review="review"
        :isFavorite="isFavorite"
        :isSavedForLater="isSavedForLater"
        @update:dialog="dialog = $event"
        @toggleFavorite="toggleFavorite"
        @toggleSaveForLater="toggleSaveForLater"
        @saveRating="saveRating"
    />

  </v-container>
</template>

<script setup>
import { ref, onMounted, defineEmits  } from 'vue';

import { getPopularMovies, getMovieDetails } from '@/services/tmdb';
import SearchMovie from "@/components/SearchMovie.vue";
import MovieDetailsDialog from "@/components/MovieDetailsDialog.vue";
import PopularMovies from "@/components/PopularMovies.vue";

const popularMovies = ref([]);
const dialog = ref(false);
const movieDetails = ref({});
const rating = ref(0);
const review = ref("");
const isFavorite = ref(false);
const isSavedForLater = ref(false);

defineEmits(['showDetails']);

const fetchPopularMovies = async () => {
  try {
    const response = await getPopularMovies();
    popularMovies.value = response.data.results;
  } catch (error) {
    console.error("Fehler beim Abrufen der beliebten Filme:", error);
  }
};

const showMovieDetails = async (movieId) => {
  try {
    const response = await getMovieDetails(movieId);
    movieDetails.value = response.data;
    dialog.value = true;
  } catch (error) {
    console.error("Fehler beim Laden der Filmdetails:", error);
  }
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const toggleSaveForLater = () => {
  isSavedForLater.value = !isSavedForLater.value;
};

const saveRating = () => {
  //speicherlogik
};

onMounted(fetchPopularMovies);
</script>
