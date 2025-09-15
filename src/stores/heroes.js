import { createHero, deleteHero, getHeroById, getHeroes, updateHero } from '../services/heroesService'

import { defineStore } from 'pinia'

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    heroes: [],
    currentHero: null,
    loading: false,
    loadingHero: false,
    error: null
  }),

  getters: {
    getHeroById: (state) => (id) => {
      return state.heroes.find(hero => hero.id === id)
    },
    hasHeroes: (state) => state.heroes.length > 0
  },

  actions: {
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

    async loadHeroById(id) {
      this.loadingHero = true
      this.error = null
      try {
        this.currentHero = await getHeroById(id)
        return this.currentHero
      } catch (error) {
        this.error = error.message
        console.error('Erro ao carregar herói:', error)
        throw error
      } finally {
        this.loadingHero = false
      }
    },

    async addHero(heroData) {
      this.loading = true
      this.error = null
      try {
        const newHero = await createHero(heroData)
        this.heroes.push(newHero)
        this.loadHeroes()
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateHero(id, heroData) {
      this.loading = true
      this.error = null
      try {
        const updatedHero = await updateHero(id, heroData)
        this.loadHeroes()
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

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

    clearError() {
      this.error = null
    },

    clearCurrentHero() {
      this.currentHero = null
    }
  }
})
