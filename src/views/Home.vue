<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="hero-section">
      <v-col cols="12">
        <div class="hero-content">
          <v-container>
            <v-row justify="center" align="center" class="fill-height">
              <v-col cols="12" md="8" class="text-center">
                <div class="hero-text">
                  <h1 class="display-2 font-weight-bold text-white mb-4">
                    🦸‍♂️ CRUD de Heróis
                  </h1>
                  <p class="headline text-white mb-6">
                    Gerencie seus heróis favoritos com facilidade e estilo!
                  </p>
                  <v-btn
                    color="white"
                    size="x-large"
                    to="/heroes"
                    class="hero-btn"
                    elevation="8"
                  >
                    <v-icon left size="large">mdi-account-supervisor</v-icon>
                    Começar Jornada
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>

    <v-container class="py-12">
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="display-1 font-weight-bold text-primary mb-4">
            Funcionalidades Incríveis
          </h2>
          <p class="headline text-grey-darken-1">
            Tudo que você precisa para gerenciar heróis
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" v-for="(feature, index) in features" :key="index">
          <v-card
            class="feature-card pa-6 text-center"
            elevation="4"
            hover
            :color="feature.color"
            dark
          >
            <v-card-text>
              <v-icon :color="feature.iconColor" size="64" class="mb-4">
                {{ feature.icon }}
              </v-icon>
              <h3 class="text-h5 font-weight-bold mb-3">
                {{ feature.title }}
              </h3>
              <p class="text-body-1">
                {{ feature.description }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="stats-section py-12">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2 class="display-1 font-weight-bold text-white mb-4">
              Estatísticas
            </h2>
            <p class="headline text-white">
              Veja o que você pode fazer
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3" v-for="(stat, index) in stats" :key="index">
            <v-card class="stat-card pa-6 text-center" elevation="8" dark>
              <v-card-text>
                <v-icon :color="stat.color" size="48" class="mb-3">
                  {{ stat.icon }}
                </v-icon>
                <h3 class="display-1 font-weight-bold mb-2">
                  {{ stat.value }}
                </h3>
                <p class="text-h6">
                  {{ stat.label }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <v-card class="cta-card pa-8" elevation="12" color="primary" dark>
            <v-card-text>
              <v-icon size="80" class="mb-4">mdi-rocket-launch</v-icon>
              <h2 class="display-1 font-weight-bold mb-4">
                Pronto para começar?
              </h2>
              <p class="headline mb-6">
                Crie, edite e gerencie seus heróis favoritos agora mesmo!
              </p>
              <v-btn
                color="white"
                size="x-large"
                to="/heroes"
                class="cta-btn"
                elevation="8"
              >
                <v-icon left size="large">mdi-account-plus</v-icon>
                Criar Primeiro Herói
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      features: [
        {
          icon: 'mdi-account-plus',
          title: 'Criar Heróis',
          description: 'Adicione novos heróis com informações completas',
          color: 'primary',
          iconColor: 'white'
        },
        {
          icon: 'mdi-lightning-bolt',
          title: 'Gerenciar Poderes',
          description: 'Associe poderes únicos aos seus heróis',
          color: 'orange',
          iconColor: 'white'
        },
        {
          icon: 'mdi-pencil',
          title: 'Editar Informações',
          description: 'Atualize dados dos heróis a qualquer momento',
          color: 'green',
          iconColor: 'white'
        }
      ],
      stats: [
        {
          icon: 'mdi-account-supervisor',
          value: '∞',
          label: 'Heróis Possíveis',
          color: 'primary'
        },
        {
          icon: 'mdi-lightning-bolt',
          value: '10+',
          label: 'Poderes Disponíveis',
          color: 'orange'
        },
        {
          icon: 'mdi-pencil',
          value: '100%',
          label: 'Personalizável',
          color: 'green'
        },
        {
          icon: 'mdi-rocket',
          value: '⚡',
          label: 'Super Rápido',
          color: 'purple'
        }
      ]
    }
  }
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 70vh;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-text {
  animation: fadeInUp 1s ease-out;
}

.hero-btn {
  transform: translateY(0);
  transition: all 0.3s ease;
}

.hero-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.2) !important;
}

.feature-card {
  transition: all 0.3s ease;
  border-radius: 16px !important;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.2) !important;
}

.stats-section {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  position: relative;
}

.stats-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.3;
}

.stat-card {
  transition: all 0.3s ease;
  border-radius: 16px !important;
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
}

.stat-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.2) !important;
}

.cta-card {
  border-radius: 24px !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

.cta-btn {
  transform: translateY(0);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.cta-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.2) !important;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .hero-section {
    min-height: 60vh;
  }
  
  .display-2 {
    font-size: 2.5rem !important;
  }
  
  .display-1 {
    font-size: 2rem !important;
  }
}
</style>
