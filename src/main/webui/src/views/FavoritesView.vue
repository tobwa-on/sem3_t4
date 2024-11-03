<template>
  <FavoriteMovies @showDetails="showMovieDetails"/>

  <!-- Dialog für Filmdetails -->
  <MovieDetailsDialog
      :dialog="dialog"
      :movieDetails="movieDetails"
      :rating="rating"
      :review="review"
      :isSavedForLater="isSavedForLater"
      @update:dialog="dialog = $event"
  />
</template>

<script setup>
import FavoriteMovies from "@/components/FavoriteMovies.vue";
import MovieDetailsDialog from "@/components/MovieDetailsDialog.vue";
import {defineEmits, ref} from "vue";
import {getMovieDetails} from "@/services/tmdb.js";

const dialog = ref(false);
const movieDetails = ref({});
const rating = ref(0);
const review = ref("");
const isSavedForLater = ref(false);

defineEmits(['showDetails']);

const showMovieDetails = async (movieId) => {
  try {
    const response = await getMovieDetails(movieId);
    movieDetails.value = response.data;
    dialog.value = true;
  } catch (error) {
    console.error("Fehler beim Laden der Filmdetails:", error);
  }
};

</script>

<style scoped>

</style>