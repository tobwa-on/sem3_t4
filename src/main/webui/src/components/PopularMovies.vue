<template>
  <v-container fluid>
    <h2 class="text-center mb-2">Beliebte Filme</h2>
    <v-sheet class="mx-auto">
      <v-slide-group show-arrows>
        <v-slide-group-item
            v-for="(movie) in popularMovies.slice(0, 20)"
            :key="movie.id"
            v-slot="{ toggle }"
        >
          <v-card
              class="movie-card ma-2"
              @click="() => { toggle(); $emit('showDetails', movie.id); }"
              flat
          >
            <v-img :src="getImageUrl(movie.poster_path)" height="200px"></v-img>
            <v-card-title class="font-weight-bold text-truncate">{{ movie.title }}</v-card-title>
            <v-card-subtitle class="text-truncate">{{ movie.release_date }}</v-card-subtitle>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, onMounted,defineEmits } from 'vue';
import { getPopularMovies, getImageUrl } from '@/services/tmdb';

defineEmits(['showDetails']);  // Deklariert das "showDetails" Event

const popularMovies = ref([]);

onMounted(async () => {
  try {
    const response = await getPopularMovies();
    popularMovies.value = response.data.results;
  } catch (error) {
    console.error("Fehler beim Abrufen der beliebten Filme:", error);
  }
});
</script>

<style scoped>
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.movie-card {
  width: 150px;
  margin: 0 10px;
  position: relative;
}
</style>
