import api from './api'
import { API_ENDPOINTS } from '../config/api'


export const CreateHeroDto = {
  name: '',
  description: '',
  height: 0,
  weight: 0,
  dateOfBirth: null
}

export const GetHeroesDto = {
  id: 0,
  name: '',
  description: '',
  dateOfBirth: null,
  height: 0,
  weight: 0
}

const formatHeroForAPI = (hero) => {
  const formatted = {
    name: hero.name || null,
    description: hero.description || null,
    height: parseInt(hero.height) || 0,
    weight: parseInt(hero.weight) || 0,
    dateOfBirth: hero.birthDate ? new Date(hero.birthDate).toISOString() : null
  }
  return formatted
}

const formatHeroFromAPI = (hero) => {
  const formatted = {
    id: hero.id,
    name: hero.name || '',
    description: hero.description || '',
    height: hero.height || 0,
    weight: hero.weight || 0,
    birthDate: hero.dateOfBirth ? hero.dateOfBirth.split('T')[0] : ''
  }
  return formatted
}

export const getHeroes = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.HEROES.LIST)
    
    if (!Array.isArray(response.data)) {
      console.error('❌ Resposta da API não é um array:', response.data)
      return []
    }
    
    const formattedHeroes = response.data.map(formatHeroFromAPI)
    return formattedHeroes
  } catch (error) {
    console.error('❌ Erro ao buscar heróis:', error)
    throw new Error('Falha ao carregar heróis')
  }
}

export const getHeroById = async (id) => {
  try {
    const response = await api.get(API_ENDPOINTS.HEROES.GET_BY_ID(id))
    
    if (!response.data) {
      console.error('❌ Herói não encontrado:', id)
      throw new Error('Herói não encontrado')
    }
    
    const formattedHero = formatHeroFromAPI(response.data)
    return formattedHero
  } catch (error) {
    console.error(`❌ Erro ao buscar herói ${id}:`, error)
    if (error.response?.status === 404) {
      throw new Error('Herói não encontrado')
    }
    throw new Error('Falha ao carregar herói')
  }
}

export const createHero = async (heroData) => {
  try {
    const formattedData = formatHeroForAPI(heroData)
    const response = await api.post(API_ENDPOINTS.HEROES.CREATE, formattedData)
    return formatHeroFromAPI(response.data)
  } catch (error) {
    console.error('❌ Erro ao criar herói:', error)
    throw new Error('Falha ao criar herói')
  }
}

export const updateHero = async (id, heroData) => {
  try {
    const formattedData = formatHeroForAPI(heroData)
    const response = await api.put(API_ENDPOINTS.HEROES.UPDATE(id), formattedData)
    return formatHeroFromAPI(response.data)
  } catch (error) {
    console.error(`❌ Erro ao atualizar herói ${id}:`, error)
    throw new Error('Falha ao atualizar herói')
  }
}

export const deleteHero = async (id) => {
  try {
    await api.delete(API_ENDPOINTS.HEROES.DELETE, {
      params: { id }
    })
    return true
  } catch (error) {
    console.error(`❌ Erro ao excluir herói ${id}:`, error)
    throw new Error('Falha ao excluir herói')
  }
}

export default {
  getHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
  CreateHeroDto,
  GetHeroesDto
}
