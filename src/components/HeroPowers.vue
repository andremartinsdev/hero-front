<template>
  <div class="hero-powers-container">
    <div class="powers-header">
      <v-icon color="orange" size="24" class="mr-3">mdi-lightning-bolt</v-icon>
      <h4 class="text-h6 font-weight-bold">Poderes do Herói</h4>
      <v-chip 
        v-if="heroPowers.length > 0" 
        color="orange" 
        variant="tonal" 
        size="small" 
        class="ml-3"
      >
        {{ heroPowers.length }}
      </v-chip>
    </div>

    <div v-if="powersStore.loading" class="text-center py-6">
      <v-progress-circular indeterminate color="orange" size="40" class="mb-2"></v-progress-circular>
      <p class="text-body-2 text-grey">Carregando poderes...</p>
    </div>

    <v-alert 
      v-if="powersStore.error" 
      type="error" 
      class="mb-4" 
      closable 
      @click:close="powersStore.clearError"
      variant="tonal"
    >
      {{ powersStore.error }}
    </v-alert>

    <div v-if="!powersStore.loading && !powersStore.error">
      <div class="mb-6">
        <div class="d-flex align-center mb-3">
          <v-icon color="orange" size="20" class="mr-2">mdi-lightning-bolt</v-icon>
          <h5 class="text-subtitle-1 font-weight-bold">Poderes Atuais</h5>
        </div>
        
        <div v-if="heroPowers.length === 0" class="empty-state text-center py-4">
          <v-icon size="40" color="grey-lighten-2" class="mb-2">mdi-lightning-bolt-off</v-icon>
          <p class="text-body-2 text-grey">Nenhum poder atribuído</p>
        </div>

        <div v-else class="powers-list">
          <v-chip
            v-for="power in heroPowers"
            :key="power.powerId"
            color="orange"
            variant="tonal"
            closable
            @click:close="removePower(power.powerId)"
            :disabled="powersStore.loading"
            class="power-chip mr-2 mb-2"
          >
            <v-icon start>mdi-lightning-bolt</v-icon>
            {{ power.powerName }}
          </v-chip>
        </div>
      </div>

      <v-divider class="my-4"></v-divider>
      
      <div>
        <div class="d-flex align-center mb-3">
          <v-icon color="green" size="20" class="mr-2">mdi-plus-circle</v-icon>
          <h5 class="text-subtitle-1 font-weight-bold">Adicionar Poder</h5>
        </div>
        
        <div class="add-power-section">
          <v-select
            v-model="selectedPowerId"
            :items="availablePowers"
            item-title="name"
            item-value="id"
            label="Selecione um poder"
            variant="outlined"
            density="compact"
            :disabled="powersStore.loading || availablePowers.length === 0"
            class="mb-3"
            prepend-inner-icon="mdi-lightning-bolt"
            color="green"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props">
                <template v-slot:prepend>
                  <v-icon color="green" size="small">mdi-lightning-bolt</v-icon>
                </template>
                <v-list-item-subtitle v-if="item.raw.description" class="text-caption">
                  {{ item.raw.description }}
                </v-list-item-subtitle>
              </v-list-item>
            </template>
          </v-select>

          <div v-if="availablePowers.length === 0" class="text-center py-4">
            <v-icon size="40" color="green-lighten-2" class="mb-2">mdi-check-all</v-icon>
            <p class="text-body-2 text-grey">Todos os poderes já foram adicionados</p>
          </div>

          <v-btn
            v-else
            color="green"
            @click="addPower"
            :disabled="!selectedPowerId || powersStore.loading"
            :loading="powersStore.loading"
            size="small"
            variant="outlined"
          >
            <v-icon left size="small">mdi-plus</v-icon>
            Adicionar
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useHeroPowersStore } from '../stores/heroPowers'
import { useHeroesStore } from '../stores/heroes'

export default {
  name: 'HeroPowers',
  props: {
    heroId: {
      type: Number,
      required: true
    }
  },
  emits: ['powers-changed'],
  setup(props, { emit }) {
    const powersStore = useHeroPowersStore()
    const heroesStore = useHeroesStore()
    
    const selectedPowerId = ref(null)

    const heroPowers = computed(() => {
      return powersStore.getPowersByHeroId(props.heroId)
    })

    const availablePowers = computed(() => {
      const allPowers = powersStore.allPowers || []
      const currentHeroPowers = heroPowers.value
      
      return allPowers.filter(power => 
        !currentHeroPowers.some(heroPower => heroPower.powerId === power.id)
      )
    })

    const loadData = async () => {
      try {
        await powersStore.loadAllPowers()
        await powersStore.loadHeroPowers(props.heroId)
      } catch (error) {
        console.error('Erro ao carregar poderes:', error)
      }
    }

    onMounted(() => {
      loadData()
    })

    const addPower = async () => {
      if (!selectedPowerId.value) return
      
      try {
        await powersStore.addHeroPower(props.heroId, selectedPowerId.value)
        
        selectedPowerId.value = null
        
        emit('powers-changed')
        
      } catch (error) {
        console.error('Erro ao adicionar poder:', error)
      }
    }

    const removePower = async (powerId) => {
      try {
        await powersStore.removeHeroPower(props.heroId, powerId)
        
        emit('powers-changed')
        
      } catch (error) {
        console.error('Erro ao remover poder:', error)
      }
    }

    return {
      selectedPowerId,
      heroPowers,
      availablePowers,
      powersStore,
      heroesStore,
      addPower,
      removePower
    }
  }
}
</script>

<style scoped>
.hero-powers-container {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background: #fafafa;
  margin: 8px 0;
}

.powers-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.empty-state {
  background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%);
  border-radius: 8px;
  border: 1px dashed #e0e0e0;
}

.powers-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.power-chip {
  transition: all 0.2s ease;
}

.power-chip:hover {
  transform: scale(1.05);
}

.add-power-section {
  background: linear-gradient(135deg, #f8fff8 0%, #f1f8e9 100%);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e8f5e8;
}
</style>
