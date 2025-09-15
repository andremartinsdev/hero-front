<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
      elevation="4"
      class="app-bar"
    >
      <v-container class="d-flex align-center">
        <v-app-bar-title class="d-flex align-center">
          <v-icon size="32" class="mr-3">mdi-account-supervisor</v-icon>
          <span class="text-h5 font-weight-bold">CRUD de Heróis</span>
        </v-app-bar-title>
        
        <v-spacer></v-spacer>
        
        <div class="d-flex align-center">
          <v-btn
            to="/"
            variant="text"
            class="nav-btn mr-2"
            :class="{ 'active': $route.path === '/' }"
          >
            <v-icon left>mdi-home</v-icon>
            Início
          </v-btn>
          
          <v-btn
            to="/heroes"
            variant="text"
            class="nav-btn"
            :class="{ 'active': $route.path === '/heroes' }"
          >
            <v-icon left>mdi-account-group</v-icon>
            Heróis
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="main-content">
      <router-view />
    </v-main>

    <v-footer
      color="grey-darken-4"
      dark
      class="footer"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="text-center text-md-left">
            <div class="d-flex align-center justify-center justify-md-start">
              <v-icon class="mr-2">mdi-account-supervisor</v-icon>
              <span class="text-h6 font-weight-bold">CRUD de Heróis</span>
            </div>
            <p class="text-body-2 mt-2 mb-0">
              Gerencie seus heróis favoritos com facilidade
            </p>
          </v-col>
          
          <v-col cols="12" md="6" class="text-center text-md-right">
            <div class="d-flex align-center justify-center justify-md-end">
              <v-icon class="mr-2">mdi-heart</v-icon>
              <span class="text-body-2">
                Feito com Vue 3 + Vuetify
              </span>
            </div>
            <p class="text-body-2 mt-2 mb-0">
              © 2024 - Todos os direitos reservados
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.app-bar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  backdrop-filter: blur(10px);
}

.nav-btn {
  transition: all 0.3s ease;
  border-radius: 8px !important;
  color: white !important;
  opacity: 0.9;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  transform: translateY(-2px);
  opacity: 1;
}

.nav-btn.active {
  background-color: rgba(255, 255, 255, 0.2) !important;
  font-weight: bold;
  opacity: 1;
}

.main-content {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: calc(100vh - 64px - 80px);
}

.footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
}

/* Animações globais */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}
</style>
