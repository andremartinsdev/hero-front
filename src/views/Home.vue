<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6">
          <v-card-title class="text-h4 text-center mb-4">
            Bem-vindo ao CRUD de Heróis
          </v-card-title>
          
          <v-card-text class="text-center">
            <p class="text-h6 mb-4">
              Gerencie seus heróis favoritos com facilidade!
            </p>
            
            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card class="pa-4" color="primary" dark>
                  <v-card-title class="text-h6">Nome</v-card-title>
                  <v-card-text>Identificação do herói</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4" color="secondary" dark>
                  <v-card-title class="text-h6">Descrição</v-card-title>
                  <v-card-text>História e características</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4" color="success" dark>
                  <v-card-title class="text-h6">Físico</v-card-title>
                  <v-card-text>Altura, peso e nascimento</v-card-text>
                </v-card>
              </v-col>
            </v-row>
            
            <v-btn
              color="primary"
              size="large"
              to="/heroes"
              class="ma-2"
            >
              <v-icon left>mdi-account-supervisor</v-icon>
              Ver Heróis
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>
