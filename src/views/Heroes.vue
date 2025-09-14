<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Lista de Heróis</span>
            <v-btn
              color="primary"
              @click="openDialog()"
              :disabled="heroesStore.loading"
            >
              <v-icon left>mdi-plus</v-icon>
              Novo Herói
            </v-btn>
          </v-card-title>

          <v-card-text>
            <!-- Loading indicator -->
            <div v-if="heroesStore.loading" class="text-center pa-4">
              <v-progress-circular
                indeterminate
                color="primary"
                size="64"
              ></v-progress-circular>
              <p class="mt-2">Carregando heróis...</p>
            </div>

            <!-- Error message -->
            <v-alert
              v-if="heroesStore.error"
              type="error"
              dismissible
              @click:close="heroesStore.clearError()"
              class="mb-4"
            >
              {{ heroesStore.error }}
            </v-alert>

            <!-- Data table -->
            <v-data-table
              v-if="!heroesStore.loading"
              :headers="headers"
              :items="heroesStore.heroes"
              :items-per-page="10"
              class="elevation-1"
              :loading="heroesStore.loading"
            >
              <template v-slot:item.height="{ item }">
                {{ item.height }} cm
              </template>
              <template v-slot:item.weight="{ item }">
                {{ item.weight }} kg
              </template>
              <template v-slot:item.birthDate="{ item }">
                {{ formatDate(item.birthDate) }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  icon="mdi-pencil"
                  size="small"
                  @click="openDialog(item)"
                  class="mr-2"
                  :disabled="heroesStore.loading"
                >
                </v-btn>
                <v-btn
                  icon="mdi-delete"
                  size="small"
                  color="error"
                  @click="deleteHero(item.id)"
                  :disabled="heroesStore.loading"
                >
                </v-btn>
              </template>
            </v-data-table>

            <!-- Empty state -->
            <div v-if="!heroesStore.loading && !heroesStore.hasHeroes" class="text-center pa-8">
              <v-icon size="64" color="grey">mdi-account-supervisor</v-icon>
              <h3 class="mt-4">Nenhum herói encontrado</h3>
              <p class="text-grey">Clique em "Novo Herói" para adicionar o primeiro herói.</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog para criar/editar herói -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isEditing ? 'Editar' : 'Novo' }} Herói</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.name"
                  label="Nome do Herói"
                  required
                  :rules="[v => !!v || 'Nome é obrigatório']"
                  :disabled="heroesStore.loading"
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
                ></v-textarea>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="form.height"
                  label="Altura (cm)"
                  type="number"
                  min="50"
                  max="300"
                  required
                  :rules="[v => !!v || 'Altura é obrigatória', v => v >= 50 || 'Altura mínima: 50cm', v => v <= 300 || 'Altura máxima: 300cm']"
                  :disabled="heroesStore.loading"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="form.weight"
                  label="Peso (kg)"
                  type="number"
                  min="10"
                  max="500"
                  required
                  :rules="[v => !!v || 'Peso é obrigatório', v => v >= 10 || 'Peso mínimo: 10kg', v => v <= 500 || 'Peso máximo: 500kg']"
                  :disabled="heroesStore.loading"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-text-field
                  v-model="form.birthDate"
                  label="Data de Nascimento"
                  type="date"
                  required
                  :rules="[v => !!v || 'Data de nascimento é obrigatória']"
                  :disabled="heroesStore.loading"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeDialog"
            :disabled="heroesStore.loading"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveHero"
            :disabled="!isFormValid || heroesStore.loading"
            :loading="heroesStore.loading"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de confirmação para deletar -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir este herói? Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="deleteDialog = false"
            :disabled="heroesStore.loading"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="confirmDelete"
            :disabled="heroesStore.loading"
            :loading="heroesStore.loading"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { useHeroesStore } from '../stores/heroes'

export default {
  name: 'Heroes',
  setup() {
    const heroesStore = useHeroesStore()
    return { heroesStore }
  },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      isEditing: false,
      editingId: null,
      deleteId: null,
      form: {
        name: '',
        description: '',
        height: null,
        weight: null,
        birthDate: ''
      },
      headers: [
        { title: 'Nome', key: 'name' },
        { title: 'Descrição', key: 'description' },
        { title: 'Altura', key: 'height' },
        { title: 'Peso', key: 'weight' },
        { title: 'Data de Nascimento', key: 'birthDate' },
        { title: 'Ações', key: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    isFormValid() {
      return this.form.name && 
             this.form.description && 
             this.form.height && 
             this.form.weight && 
             this.form.birthDate
    }
  },
  async mounted() {
    // Carrega os heróis quando o componente é montado
    await this.heroesStore.loadHeroes()
  },
  methods: {
    openDialog(hero = null) {
      if (hero) {
        this.isEditing = true
        this.editingId = hero.id
        this.form = { ...hero }
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
      }
      this.dialog = true
    },
    
    closeDialog() {
      this.dialog = false
      this.isEditing = false
      this.editingId = null
      this.form = {
        name: '',
        description: '',
        height: null,
        weight: null,
        birthDate: ''
      }
    },
    
    async saveHero() {
      try {
        if (this.isEditing) {
          await this.heroesStore.updateHero(this.editingId, this.form)
        } else {
          await this.heroesStore.addHero(this.form)
        }
        this.closeDialog()
      } catch (error) {
        // Erro já é tratado na store
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
      } catch (error) {
        // Erro já é tratado na store
        console.error('Erro ao excluir herói:', error)
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR')
    }
  }
}
</script>
