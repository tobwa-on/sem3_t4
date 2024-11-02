<template>
  <h3>Produkt anlegen</h3>
  <div class="addproduct">
    <form @submit.prevent="create">
      <p>Name: <input type="text" v-model="name" /></p>
      <p><button type="submit">Anlegen</button></p>
    </form>
    <p>Result: {{ text }}</p>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import axios from 'axios';

const name = ref('');
const text = ref('');

const create = async () => {
  const product = { name: name.value };
  console.log(product);

  try {
    const response = await axios.post('/api/products', product);
    console.log(response);
    text.value = response.status;
  } catch (error) {
    console.error(error);
  }
};
</script>
