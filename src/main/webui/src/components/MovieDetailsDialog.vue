<template>
  <v-dialog v-model="localDialog" max-width="1000px" persistent>
    <v-card>
      <v-row no-gutters justify="center" align="center" class="mt-4">
        <v-col cols="3">
          <v-img :src="getImageUrl(movieDetails.poster_path)" height="300px"></v-img>
        </v-col>
        <v-col class="pl-4 pr-4">
          <v-card-title class="font-weight-bold text-h5">{{ movieDetails.title }}</v-card-title>
          <v-card-subtitle class="text-subtitle-1 grey--text">{{ movieDetails.release_date }}</v-card-subtitle>
          <v-card-text class="mt-4 mb-2">{{ movieDetails.overview }}</v-card-text>

          <v-rating
              :v-model="rating"
              @change="saveRating"
              color="amber"
              dense
              hover
              :length="5"
              half-increments
          ></v-rating>
        </v-col>
      </v-row>

      <v-row class="px-6">
        <v-col>
          <v-textarea variant="outlined" rows="4" :v-model="review" label="Deine Rezension" outlined class="mt-4"></v-textarea>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :prepend-icon="isSavedForLater ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
               @click="toggleSaveForLater">{{ isSavedForLater ? 'Aus Merkliste entfernen' : 'Zur Merkliste hinzufügen' }}</v-btn>
        <v-btn :prepend-icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
               @click="handleToggleFavorite">{{ isFavorite ? 'Entfernen aus Favoriten' : 'Zu Favoriten hinzufügen' }}</v-btn>
        <v-btn @click="closeDialog">Schließen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getImageUrl } from '@/services/tmdb';
import { isFavoriteMovie, removeFavorite, saveFavorite } from '@/services/favoriteService';
import UserService from "@/services/userService.js";

const props = defineProps({
  dialog: Boolean,
  movieDetails: Object,
  rating: Number,
  review: String,
  isSavedForLater: Boolean,
});


// Lokale Variable zur Anzeige des Favoritenstatus
const uid = UserService.getUser().upn; // User abrufen
let isFavorite = ref(false);

// Funktion zum Speichern/Entfernen des Favoriten
const handleToggleFavorite = async () => {
  isFavorite.value = !isFavorite.value;
  try {
    if (isFavorite.value) {
      await saveFavorite(uid, props.movieDetails.id);
      console.log("Film als Favorit gespeichert.");
    } else {
      await removeFavorite(uid, props.movieDetails.id);
      console.log("Film aus Favoriten entfernt.");
    }
  } catch (error) {
    console.error("Fehler bei der Favoritenaktualisierung:", error);
    isFavorite.value = !isFavorite.value;
  }
};

const checkFavoriteStatus = async () => {
  try {
    isFavorite.value = false;
    isFavorite.value = await isFavoriteMovie(uid, props.movieDetails.id);
  } catch (error) {
    console.error("Fehler beim Überprüfen des Favoritenstatus:", error);
  }
};
const emit = defineEmits(['update:dialog', 'toggleSaveForLater', 'saveRating']);

// Lokaler Dialogstatus und Überwachung
const localDialog = ref(props.dialog);
watch(
    () => props.dialog,
    (newValue) => {
      localDialog.value = newValue;
      if (newValue) {
        checkFavoriteStatus();
      }
    }
);

// Dialog schließen
const closeDialog = () => {
  emit('update:dialog', false);
  isFavorite.value = false; // Zurücksetzen bevor der Status überprüft wird
};

const toggleSaveForLater = () => {
  emit('toggleSaveForLater');
};

const saveRating = () => {
  emit('saveRating');
};
</script>

