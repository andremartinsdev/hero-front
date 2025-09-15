import { createHeroPower, deleteHeroPower, getHeroPowers } from '../services/powersService'

import { defineStore } from 'pinia'

export const usePowersStore = defineStore('powers', {
  state: () => ({
    heroPowers: {}, 
    loading: false,
    error: null
  }),

  getters: {
    getPowersByHeroId: (state) => (heroId) => {
      return state.heroPowers[heroId] || []
    },
    hasPowers: (state) => (heroId) => {
      return state.heroPowers[heroId] && state.heroPowers[heroId].length > 0
    }
  },

  actions: {
    async loadHeroPowers(heroId) {
      this.loading = true
      this.error = null
      try {
        const powers = await getHeroPowers(heroId)
        this.heroPowers[heroId] = powers
        return powers
      } catch (error) {
        this.error = error.message
        console.error('Erro ao carregar poderes do herói:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async addPowerToHero(heroId, powerId) {
      this.loading = true
      this.error = null
      try {
        await createHeroPower(heroId, powerId)
        await this.loadHeroPowers(heroId)
        return true
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async removePowerFromHero(heroId, powerId) {
      this.loading = true
      this.error = null
      try {
        await deleteHeroPower(heroId, powerId)
        if (this.heroPowers[heroId]) {
          this.heroPowers[heroId] = this.heroPowers[heroId].filter(
            power => power.powerId !== powerId
          )
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
    }
  }
})
