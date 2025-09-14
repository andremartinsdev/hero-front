import { defineStore } from 'pinia'
import { getHeroes, createHero, updateHero, deleteHero } from '../services/heroesService'

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    heroes: [],
    loading: false,
    error: null
  }),

  getters: {
    getHeroById: (state) => (id) => {
      return state.heroes.find(hero => hero.id === id)
    },
    hasHeroes: (state) => state.heroes.length > 0
  },

  actions: {
    // Carrega todos os heróis da API
    async loadHeroes() {
      this.loading = true
      this.error = null
      try {
        this.heroes = await getHeroes()
      } catch (error) {
        this.error = error.message
        console.error('Erro ao carregar heróis:', error)
      } finally {
        this.loading = false
      }
    },

    // Adiciona um novo herói via API
    async addHero(heroData) {
      this.loading = true
      this.error = null
      try {
        const newHero = await createHero(heroData)
        this.heroes.push(newHero)
        return newHero
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // Atualiza um herói existente via API
    async updateHero(id, heroData) {
      this.loading = true
      this.error = null
      try {
        const updatedHero = await updateHero(id, heroData)
        const index = this.heroes.findIndex(hero => hero.id === id)
        if (index !== -1) {
          this.heroes[index] = updatedHero
        }
        return updatedHero
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // Exclui um herói via API
    async deleteHero(id) {
      this.loading = true
      this.error = null
      try {
        await deleteHero(id)
        const index = this.heroes.findIndex(hero => hero.id === id)
        if (index !== -1) {
          this.heroes.splice(index, 1)
        }
        return true
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // Limpa erros
    clearError() {
      this.error = null
    }
  }
})
