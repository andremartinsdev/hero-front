<template>
  <v-container fluid class="pa-4">
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="header-card pa-6" elevation="8" color="primary" dark>
          <v-card-text class="text-center">
            <v-icon size="64" class="mb-4">mdi-account-group</v-icon>
            <h1 class="display-1 font-weight-bold mb-2">Lista de Heróis</h1>
            <p class="headline mb-4">Gerencie seus heróis favoritos</p>
            <v-btn
              color="white"
              size="x-large"
              @click="openDialog()"
              :disabled="heroesStore.loading"
              class="add-hero-btn"
              elevation="4"
            >
              <v-icon left size="large">mdi-plus</v-icon>
              Novo Herói
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="heroes-card" elevation="6">
          <v-card-text class="pa-6">
            <div v-if="heroesStore.loading" class="text-center pa-8">
              <v-progress-circular
                indeterminate
                color="primary"
                size="80"
                width="8"
              ></v-progress-circular>
              <h3 class="mt-4 text-h5">Carregando heróis...</h3>
              <p class="text-body-1 text-grey">Aguarde um momento</p>
            </div>

            <v-alert
              v-if="heroesStore.error"
              type="error"
              dismissible
              @click:close="heroesStore.clearError()"
              class="mb-6"
              elevation="4"
            >
              <v-icon left>mdi-alert-circle</v-icon>
              {{ heroesStore.error }}
            </v-alert>

            <div v-if="!heroesStore.loading" class="mb-6">
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-card class="stat-card pa-4" color="primary" dark elevation="4">
                    <v-card-text class="text-center">
                      <v-icon size="32" class="mb-2">mdi-account-supervisor</v-icon>
                      <h3 class="text-h4 font-weight-bold">{{ heroesStore.heroes.length }}</h3>
                      <p class="text-body-2 mb-0">Total de Heróis</p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-card class="stat-card pa-4" color="green" dark elevation="4">
                    <v-card-text class="text-center">
                      <v-icon size="32" class="mb-2">mdi-check-circle</v-icon>
                      <h3 class="text-h4 font-weight-bold">{{ heroesWithBirthDate }}</h3>
                      <p class="text-body-2 mb-0">Com Data de Nascimento</p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-card class="stat-card pa-4" color="orange" dark elevation="4">
                    <v-card-text class="text-center">
                      <v-icon size="32" class="mb-2">mdi-lightning-bolt</v-icon>
                      <h3 class="text-h4 font-weight-bold">{{ totalPowers }}</h3>
                      <p class="text-body-2 mb-0">Poderes Atribuídos</p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-card class="stat-card pa-4" color="purple" dark elevation="4">
                    <v-card-text class="text-center">
                      <v-icon size="32" class="mb-2">mdi-trending-up</v-icon>
                      <h3 class="text-h4 font-weight-bold">{{ averageHeight }}cm</h3>
                      <p class="text-body-2 mb-0">Altura Média</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div v-if="!heroesStore.loading && heroesStore.heroes.length > 0">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                  v-for="hero in heroesStore.heroes"
                  :key="hero.id"
                >
                  <v-card
                    class="hero-card"
                    elevation="4"
                    hover
                    @click="openDialog(hero)"
                  >
                    <v-card-text class="pa-4">
                      <div class="hero-avatar mb-3">
                        <v-avatar size="80" color="primary" class="hero-avatar-img">
                          <v-icon size="40" color="white">mdi-account</v-icon>
                        </v-avatar>
                      </div>
                      
                      <h3 class="text-h6 font-weight-bold mb-2 text-center">
                        {{ hero.name }}
                      </h3>
                      
                      <p class="text-body-2 text-grey-darken-1 mb-3 text-center">
                        {{ hero.description }}
                      </p>
                      
                      <div class="hero-stats mb-3">
                        <div class="d-flex justify-space-between mb-1">
                          <span class="text-caption">Altura:</span>
                          <span class="text-caption font-weight-bold">{{ hero.height }}cm</span>
                        </div>
                        <div class="d-flex justify-space-between mb-1">
                          <span class="text-caption">Peso:</span>
                          <span class="text-caption font-weight-bold">{{ hero.weight }}kg</span>
                        </div>
                        <div class="d-flex justify-space-between">
                          <span class="text-caption">Nascimento:</span>
                          <span class="text-caption font-weight-bold">{{ formatDate(hero.birthDate) }}</span>
                        </div>
                      </div>

                      <div class="hero-powers mb-3">
                        <div class="d-flex align-center mb-2">
                          <v-icon size="16" color="orange" class="mr-1">mdi-lightning-bolt</v-icon>
                          <span class="text-caption font-weight-bold">Poderes:</span>
                        </div>
                        <div class="powers-container">
                          <div v-if="getHeroPowers(hero.id).length > 0" class="powers-chips">
                            <v-chip
                              v-for="power in getHeroPowers(hero.id).slice(0, 3)"
                              :key="power.powerId"
                              size="x-small"
                              color="orange"
                              class="ma-1"
                            >
                              {{ power.powerName }}
                            </v-chip>
                            <v-chip
                              v-if="getHeroPowers(hero.id).length > 3"
                              size="x-small"
                              color="grey"
                              class="ma-1"
                            >
                              +{{ getHeroPowers(hero.id).length - 3 }}
                            </v-chip>
                          </div>
                          <div v-else class="no-powers">
                            <span class="text-caption text-grey">Nenhum poder</span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="hero-actions d-flex justify-center">
                        <v-btn
                          icon="mdi-pencil"
                          size="small"
                          color="primary"
                          @click.stop="openDialog(hero)"
                          class="mr-2"
                        >
                        </v-btn>
                        <v-btn
                          icon="mdi-lightning-bolt"
                          size="small"
                          color="orange"
                          @click.stop="openPowersDialog(hero)"
                          class="mr-2"
                        >
                        </v-btn>
                        <v-btn
                          icon="mdi-delete"
                          size="small"
                          color="error"
                          @click.stop="deleteHero(hero.id)"
                        >
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div v-if="!heroesStore.loading && heroesStore.heroes.length === 0" class="text-center pa-12">
              <v-icon size="120" color="grey-lighten-1" class="mb-4">mdi-account-supervisor</v-icon>
              <h2 class="text-h4 font-weight-bold mb-4">Nenhum herói encontrado</h2>
              <p class="text-h6 text-grey mb-6">Comece criando seu primeiro herói!</p>
              <v-btn
                color="primary"
                size="large"
                @click="openDialog()"
                elevation="4"
              >
                <v-icon left>mdi-plus</v-icon>
                Criar Primeiro Herói
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card class="dialog-card" elevation="12">
        <v-card-title class="dialog-header pa-6" color="primary" dark>
          <v-icon size="32" class="mr-3">mdi-account</v-icon>
          <span class="text-h4 font-weight-bold">
            {{ isEditing ? 'Editar' : 'Novo' }} Herói
          </span>
        </v-card-title>

        <v-card-text class="pa-6">
          <div v-if="heroesStore.loadingHero" class="text-center pa-8">
            <v-progress-circular
              indeterminate
              color="primary"
              size="64"
              width="6"
            ></v-progress-circular>
            <h3 class="mt-4 text-h6">Buscando herói...</h3>
            <p class="text-body-2 text-grey">Carregando dados do herói</p>
          </div>

          <v-container v-else>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.name"
                  label="Nome do Herói"
                  required
                  :rules="[v => !!v || 'Nome é obrigatório']"
                  :disabled="heroesStore.loading"
                  variant="outlined"
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-textarea
                  v-model="form.description"
                  label="Descrição"
                  rows="3"
                  required
                  :rules="[v => !!v || 'Descrição é obrigatória']"
                  :disabled="heroesStore.loading"
                  variant="outlined"
                  prepend-inner-icon="mdi-text"
                ></v-textarea>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="form.height"
                  label="Altura (cm)"
                  type="number"
                  required
                  :rules="[v => !!v || 'Altura é obrigatória']"
                  :disabled="heroesStore.loading"
                  variant="outlined"
                  prepend-inner-icon="mdi-human-male-height"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="form.weight"
                  label="Peso (kg)"
                  type="number"
                  required
                  :rules="[v => !!v || 'Peso é obrigatório']"
                  :disabled="heroesStore.loading"
                  variant="outlined"
                  prepend-inner-icon="mdi-weight"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-text-field
                  v-model="form.birthDate"
                  label="Data de Nascimento (opcional)"
                  type="date"
                  :disabled="heroesStore.loading"
                  variant="outlined"
                  prepend-inner-icon="mdi-calendar"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            variant="outlined"
            @click="closeDialog"
            :disabled="heroesStore.loading || heroesStore.loadingHero"
            size="large"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            @click="saveHero"
            :disabled="!isFormValid || heroesStore.loading || heroesStore.loadingHero"
            :loading="heroesStore.loading"
            size="large"
            elevation="4"
          >
            <v-icon left>mdi-content-save</v-icon>
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="powersDialog" max-width="800px">
      <v-card class="dialog-card" elevation="12">
        <v-card-title class="dialog-header pa-6" color="orange" dark>
          <v-icon size="32" class="mr-3">mdi-lightning-bolt</v-icon>
          <span class="text-h4 font-weight-bold">Gerenciar Poderes</span>
          <v-spacer></v-spacer>
          <v-btn
            icon="mdi-close"
            @click="closePowersDialog"
            variant="text"
            color="white"
          ></v-btn>
        </v-card-title>
        <v-card-text class="pa-6">
          <HeroPowers v-if="selectedHero" :heroId="selectedHero.id" @powers-changed="onPowersChanged" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card class="dialog-card" elevation="12">
        <v-card-title class="dialog-header pa-6" color="error" dark>
          <v-icon size="32" class="mr-3">mdi-alert-circle</v-icon>
          <span class="text-h4 font-weight-bold">Confirmar Exclusão</span>
        </v-card-title>
        <v-card-text class="pa-6">
          <p class="text-h6">
            Tem certeza que deseja excluir este herói? Esta ação não pode ser desfeita.
          </p>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            variant="outlined"
            @click="deleteDialog = false"
            :disabled="heroesStore.loading"
            size="large"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="error"
            @click="confirmDelete"
            :disabled="heroesStore.loading"
            :loading="heroesStore.loading"
            size="large"
            elevation="4"
          >
            <v-icon left>mdi-delete</v-icon>
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { useHeroesStore } from '../stores/heroes'
import { usePowersStore } from '../stores/powers'
import HeroPowers from '../components/HeroPowers.vue'

export default {
  name: 'Heroes',
  components: {
    HeroPowers
  },
  setup() {
    const heroesStore = useHeroesStore()
    const powersStore = usePowersStore()
    return { heroesStore, powersStore }
  },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      powersDialog: false,
      isEditing: false,
      editingId: null,
      deleteId: null,
      selectedHero: null,
      powersChanged: false,
      form: {
        name: '',
        description: '',
        height: null,
        weight: null,
        birthDate: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.form.name && 
             this.form.description && 
             this.form.height && 
             this.form.weight
    },
    heroesWithBirthDate() {
      return this.heroesStore.heroes.filter(hero => hero.birthDate).length
    },
    totalPowers() {
      return this.heroesStore.heroes.reduce((total, hero) => {
        return total + this.getHeroPowers(hero.id).length
      }, 0)
    },
    averageHeight() {
      if (this.heroesStore.heroes.length === 0) return 0
      const total = this.heroesStore.heroes.reduce((sum, hero) => sum + hero.height, 0)
      return Math.round(total / this.heroesStore.heroes.length)
    }
  },
  async mounted() {
    await this.heroesStore.loadHeroes()
    
    await this.loadAllHeroesPowers()
  },
  methods: {
    async loadAllHeroesPowers() {
      for (const hero of this.heroesStore.heroes) {
        try {
          await this.powersStore.loadHeroPowers(hero.id)
        } catch (error) {
        }
      }
    },

    getHeroPowers(heroId) {
      return this.powersStore.getPowersByHeroId(heroId)
    },

    async openDialog(hero = null) {
      if (hero) {
        this.isEditing = true
        this.editingId = hero.id
        this.dialog = true
        
        try {
          const updatedHero = await this.heroesStore.loadHeroById(hero.id)
          this.form = { ...updatedHero }
        } catch (error) {
          console.error('❌ Erro ao carregar herói:', error)
          this.form = { ...hero }
        }
      } else {
        this.isEditing = false
        this.editingId = null
        this.form = {
          name: '',
          description: '',
          height: null,
          weight: null,
          birthDate: ''
        }
        this.dialog = true
      }
    },
    
    closeDialog() {
      this.dialog = false
      this.isEditing = false
      this.editingId = null
      this.heroesStore.clearCurrentHero()
      this.form = {
        name: '',
        description: '',
        height: null,
        weight: null,
        birthDate: ''
      }
    },

    openPowersDialog(hero) {
      this.selectedHero = hero
      this.powersDialog = true
    },
    closePowersDialog() {
      if (this.selectedHero) {
        this.loadHeroPowers(this.selectedHero.id)
      }
      this.powersDialog = false
      this.selectedHero = null
    },

    async loadHeroPowers(heroId) {
      try {
        await this.powersStore.loadHeroPowers(heroId)
      } catch (error) {
        console.error(`❌ Erro ao recarregar poderes do herói ${heroId}:`, error)
      }
    },

    onPowersChanged() {
      this.powersChanged = true
    },
    
    async saveHero() {
      try {
        if (this.isEditing) {
          await this.heroesStore.updateHero(this.editingId, this.form)
        } else {
          await this.heroesStore.addHero(this.form)
        }
        this.closeDialog()
        await this.loadAllHeroesPowers()
      } catch (error) {
        console.error('Erro ao salvar herói:', error)
      }
    },
    
    deleteHero(id) {
      this.deleteId = id
      this.deleteDialog = true
    },
    
    async confirmDelete() {
      try {
        await this.heroesStore.deleteHero(this.deleteId)
        this.deleteDialog = false
        this.deleteId = null
        await this.loadAllHeroesPowers()
      } catch (error) {
        console.error('Erro ao excluir herói:', error)
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Não informado'
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR')
    }
  }
}
</script>

<style scoped>
.header-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border-radius: 16px !important;
}

.add-hero-btn {
  transform: translateY(0);
  transition: all 0.3s ease;
}

.add-hero-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.2) !important;
}

.heroes-card {
  border-radius: 16px !important;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
}

.stat-card {
  border-radius: 12px !important;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2) !important;
}

.hero-card {
  border-radius: 16px !important;
  transition: all 0.3s ease;
  cursor: pointer;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
}

.hero-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.15) !important;
}

.hero-avatar {
  display: flex;
  justify-content: center;
}

.hero-avatar-img {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.hero-stats {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 12px;
}

.hero-powers {
  background: rgba(255, 152, 0, 0.05);
  border-radius: 8px;
  padding: 12px;
  border: 1px solid rgba(255, 152, 0, 0.1);
}

.powers-container {
  min-height: 24px;
}

.powers-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.no-powers {
  text-align: center;
  padding: 8px 0;
}

.hero-actions {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 12px;
}

.dialog-card {
  border-radius: 16px !important;
}

.dialog-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border-radius: 16px 16px 0 0 !important;
}

/* Animações */
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

/* Responsive */
@media (max-width: 960px) {
  .display-1 {
    font-size: 2rem !important;
  }
  
  .headline {
    font-size: 1.2rem !important;
  }
}
</style>
