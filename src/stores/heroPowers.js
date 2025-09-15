import { defineStore } from 'pinia'
import { heroPowersService } from '../services/heroPowersService'

export const useHeroPowersStore = defineStore('heroPowers', {
  state: () => ({
    heroPowers: {},
    allPowers: [],
    loading: false,
    error: null
  }),

  getters: {
    getPowersByHeroId: (state) => (heroId) => {
      return state.heroPowers[heroId] || []
    },

    getAllPowers: (state) => {
      return state.allPowers
    },

    isPowerAddedToHero: (state) => (heroId, powerId) => {
      const heroPowers = state.heroPowers[heroId] || []
      return heroPowers.some(power => power.powerId === powerId)
    }
  },

  actions: {
    async loadAllPowers() {
      this.loading = true
      this.error = null
      
      try {
        const powers = await heroPowersService.getAllPowers()
        this.allPowers = powers
      } catch (error) {
        console.error('❌ Erro ao carregar todos os poderes:', error)
        this.error = 'Erro ao carregar poderes disponíveis'
        throw error
      } finally {
        this.loading = false
      }
    },

    async loadHeroPowers(heroId) {
      this.loading = true
      this.error = null
      
      try {
        const powers = await heroPowersService.getHeroPowers(heroId)
        this.heroPowers[heroId] = powers
      } catch (error) {
        console.error(`❌ Erro ao carregar poderes do herói ${heroId}:`, error)
        this.error = 'Erro ao carregar poderes do herói'
        throw error
      } finally {
        this.loading = false
      }
    },

    async addHeroPower(heroId, powerId) {
      this.loading = true
      this.error = null
      
      try {
        
        if (this.isPowerAddedToHero(heroId, powerId)) {
          throw new Error('Este poder já foi adicionado a este herói')
        }
        
        await heroPowersService.addHeroPower(heroId, powerId)
        
        await this.loadHeroPowers(heroId)
        
      } catch (error) {
        console.error(`❌ Erro ao adicionar poder ${powerId} ao herói ${heroId}:`, error)
        this.error = error.message || 'Erro ao adicionar poder ao herói'
        throw error
      } finally {
        this.loading = false
      }
    },

    async removeHeroPower(heroId, powerId) {
      this.loading = true
      this.error = null
      
      try {
        await heroPowersService.removeHeroPower(heroId, powerId)
        
        await this.loadHeroPowers(heroId)
        
      } catch (error) {
        console.error(`❌ Erro ao remover poder ${powerId} do herói ${heroId}:`, error)
        this.error = 'Erro ao remover poder do herói'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },

    clearAll() {
      this.heroPowers = {}
      this.allPowers = []
      this.loading = false
      this.error = null
    }
  }
})
