import api from './api'
import { API_ENDPOINTS } from '../config/api'


const AVAILABLE_POWERS = [
  { id: 1, name: 'Super Força', description: 'Força sobre-humana' },
  { id: 2, name: 'Voo', description: 'Capacidade de voar' },
  { id: 3, name: 'Invisibilidade', description: 'Tornar-se invisível' },
  { id: 4, name: 'Telepatia', description: 'Ler mentes' },
  { id: 5, name: 'Telecinese', description: 'Mover objetos com a mente' },
  { id: 6, name: 'Super Velocidade', description: 'Velocidade sobre-humana' },
  { id: 7, name: 'Regeneração', description: 'Curar ferimentos rapidamente' },
  { id: 8, name: 'Teletransporte', description: 'Transportar-se instantaneamente' },
  { id: 9, name: 'Manipulação do Tempo', description: 'Controlar o tempo' },
  { id: 10, name: 'Manipulação de Energia', description: 'Controlar energia' },
  { id: 11, name: 'Super Inteligência', description: 'Inteligência sobre-humana' },
  { id: 12, name: 'Controle Mental', description: 'Controlar mentes de outros' },
  { id: 13, name: 'Manipulação de Elementos', description: 'Controlar fogo, água, terra, ar' },
  { id: 14, name: 'Precognição', description: 'Ver o futuro' },
  { id: 15, name: 'Super Agilidade', description: 'Agilidade sobre-humana' }
]

export const getAllPowers = async () => {
  try {
    return AVAILABLE_POWERS
  } catch (error) {
    console.error('❌ Erro ao obter poderes disponíveis:', error)
    throw error
  }
}

export const getHeroPowers = async (heroId) => {
  try {
    const response = await api.get(API_ENDPOINTS.HERO_POWER.GET_BY_HERO(heroId))
    return response.data
  } catch (error) {
    console.error(`❌ Erro ao buscar poderes do herói ${heroId}:`, error)
    throw error
  }
}

export const addHeroPower = async (heroId, powerId) => {
  try {
    const response = await api.post(API_ENDPOINTS.HERO_POWER.CREATE, {
      heroId,
      powerId
    })
    return response.data
  } catch (error) {
    console.error(`❌ Erro ao adicionar poder ${powerId} ao herói ${heroId}:`, error)
    throw error
  }
}

export const removeHeroPower = async (heroId, powerId) => {
  try {
    const response = await api.delete(API_ENDPOINTS.HERO_POWER.DELETE(heroId, powerId))
    return response.data
  } catch (error) {
    console.error(`❌ Erro ao remover poder ${powerId} do herói ${heroId}:`, error)
    throw error
  }
}

export const heroPowersService = {
  getAllPowers,
  getHeroPowers,
  addHeroPower,
  removeHeroPower
}
