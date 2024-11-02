<template>
  <v-container fluid class="d-flex justify-center align-center" style="height: 50vh;">
    <v-card class="pa-4" width="600" rounded title="Login" border variant="flat">
      <v-card-item>
        <v-form @submit.prevent="login" v-model="valid">
          <v-text-field
              class="mt-2 mb-1"
              label="Benutzername"
              v-model="username"
              :rules="[rules.required]"
              required
              clearable
              variant="outlined"
          ></v-text-field>

          <v-text-field
              class="mb-3"
              label="Passwort"
              v-model="password"
              :type="'password'"
              :rules="[rules.required]"
              required
              clearable
              variant="outlined"
          ></v-text-field>

          <v-btn type="submit" color="primary" variant="elevated" block :disabled="!valid">
            Login
          </v-btn>
        </v-form>
        <p>Ergebnis: {{ text }}</p>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiService from "@/services/apiService.js";


const username = ref("");
const password = ref("");
const text = ref("");
const valid = ref(false);
const router = useRouter();

const rules = {
  required: (value) => !!value || 'Feld darf nicht leer sein',
};

const login = async () => {
  try {
    const data = {user: username.value, password: password.value};
    const response = await apiService.post('/login', data);
    console.log(response);
    text.value = response.status;
    localStorage.setItem("user", response.data);
    await router.push({path: '/'});
    router.go();
  } catch (error) {
    if (error.response && error.response.status === 401) {
      text.value = "Nutzername oder Passwort falsch";
    } else {
      console.log(error);
      text.value = error.message;
    }
  }
};

</script>

<style scoped>
</style>
