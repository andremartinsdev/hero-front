import api from './api'
import { API_ENDPOINTS } from '../config/api'


export const CreateHeroPowerDto = {
  heroId: 0,
  powerId: 0
}

export const createHeroPower = async (heroId, powerId) => {
  try {
    const data = {
      heroId: parseInt(heroId),
      powerId: parseInt(powerId)
    }
    const response = await api.post(API_ENDPOINTS.HERO_POWER.CREATE, data)
    return response.data
  } catch (error) {
    console.error('❌ Erro ao criar associação herói-poder:', error)
    throw new Error('Falha ao associar poder ao herói')
  }
}

export const getHeroPowers = async (heroId) => {
  try {
    const response = await api.get(API_ENDPOINTS.HERO_POWER.GET_BY_HERO(heroId))
    return response.data
  } catch (error) {
    console.error(`❌ Erro ao buscar poderes do herói ${heroId}:`, error)
    throw new Error('Falha ao carregar poderes do herói')
  }
}

export const deleteHeroPower = async (heroId, powerId) => {
  try {
    await api.delete(API_ENDPOINTS.HERO_POWER.DELETE(heroId, powerId))
    return true
  } catch (error) {
    console.error(`❌ Erro ao remover associação herói-poder:`, error)
    throw new Error('Falha ao remover poder do herói')
  }
}

export default {
  createHeroPower,
  getHeroPowers,
  deleteHeroPower,
  CreateHeroPowerDto
}
