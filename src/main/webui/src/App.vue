<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <!-- Logo -->
      <v-toolbar-title>
        <router-link to="/" class="text-white text-decoration-none">
          Film-App
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Links -->
      <v-btn to="/">Home</v-btn>
      <v-btn to="/favorites" v-if="user && Object.keys(user).length">Favoriten</v-btn>
      <v-btn to="/watchlist" v-if="user && Object.keys(user).length">Merkliste</v-btn>

      <!-- Dropdown für Kunden -->
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn v-bind="props">Kunden</v-btn>
        </template>
        <v-list>
          <v-list-item link :to="{ path: '/customerlist' }">
            <v-list-item-title>Kundenliste</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{ path: '/addcustomer' }">
            <v-list-item-title>Kunde anlegen</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Dropdown für Produkte -->
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn v-bind="props">Produkte</v-btn>
        </template>
        <v-list>
          <v-list-item link :to="{ path: '/productlist' }">
            <v-list-item-title>Produktliste</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{ path: '/addproduct' }">
            <v-list-item-title>Produkt anlegen</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Dropdown für Bestellung -->
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn v-bind="props">Bestellung</v-btn>
        </template>
        <v-list>
          <v-list-item link :to="{ path: '/orderlist' }">
            <v-list-item-title>Liste der Bestellungen</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{ path: '/addorder' }">
            <v-list-item-title>Bestellung anlegen</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Benutzer Dropdown oder Login -->
      <v-menu offset-y v-if="Object.keys(user).length">
        <template #activator="{ props }">
          <v-btn v-bind="props">{{ user.upn }}</v-btn>
        </template>
        <v-list>
          <v-list-item @click="logOut">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-else to="/login">Login</v-btn>

    </v-app-bar>

      <router-view />

  </v-app>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import { computed } from 'vue';

export default {
  data() {
    return {
      user: {}
    };
  },
  provide() {
    return {
      user: computed(() => {
        this.user = {};
        this.decodeUserData();
        return this.user;
      })
    }
  },
  methods: {
    decodeUserData() {
      let token = localStorage.getItem("user");
      if(token)
      {
        try {
          let decoded = VueJwtDecode.decode(token);
          this.user = decoded;
          if(Date.now() >= decoded.exp * 1000)
          {
            localStorage.removeItem("user");
            this.$router.push( {path: '/'}).then( () => {this.$router.go();} );
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    logOut() {
      localStorage.removeItem("user");
      // enforce refresh
      this.$router.push( {path: '/'}).then( () => {this.$router.go();} );
    }
  },
  created() {
    this.decodeUserData();
  },
};
</script>

<style scoped>

</style>
