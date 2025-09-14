<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>CRUD de Heróis</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Início</v-btn>
      <v-btn to="/heroes" text>Heróis</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
