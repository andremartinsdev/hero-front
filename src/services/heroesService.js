import api from './api'
import { API_ENDPOINTS } from '../config/api'

/**
 * Serviço para gerenciar heróis via API
 * Baseado na especificação OpenAPI fornecida
 */

// DTOs baseados na especificação OpenAPI
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

/**
 * Converte dados do formulário para o formato da API
 */
const formatHeroForAPI = (hero) => {
  return {
    name: hero.name || null,
    description: hero.description || null,
    height: parseInt(hero.height) || 0,
    weight: parseInt(hero.weight) || 0,
    dateOfBirth: hero.birthDate ? new Date(hero.birthDate).toISOString() : null
  }
}

/**
 * Converte dados da API para o formato da aplicação
 */
const formatHeroFromAPI = (hero) => {
  return {
    id: hero.id,
    name: hero.name || '',
    description: hero.description || '',
    height: hero.height || 0,
    weight: hero.weight || 0,
    birthDate: hero.dateOfBirth ? hero.dateOfBirth.split('T')[0] : ''
  }
}

/**
 * Busca todos os heróis
 * GET /heroes
 */
export const getHeroes = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.HEROES.LIST)
    return response.data.map(formatHeroFromAPI)
  } catch (error) {
    console.error('Erro ao buscar heróis:', error)
    throw new Error('Falha ao carregar heróis')
  }
}

/**
 * Busca um herói por ID
 * GET /heroes/{id}
 */
export const getHeroById = async (id) => {
  try {
    const response = await api.get(API_ENDPOINTS.HEROES.GET_BY_ID(id))
    return formatHeroFromAPI(response.data)
  } catch (error) {
    console.error(`Erro ao buscar herói ${id}:`, error)
    throw new Error('Falha ao carregar herói')
  }
}

/**
 * Cria um novo herói
 * POST /heroes
 */
export const createHero = async (heroData) => {
  try {
    const formattedData = formatHeroForAPI(heroData)
    const response = await api.post(API_ENDPOINTS.HEROES.CREATE, formattedData)
    return formatHeroFromAPI(response.data)
  } catch (error) {
    console.error('Erro ao criar herói:', error)
    throw new Error('Falha ao criar herói')
  }
}

/**
 * Atualiza um herói existente
 * PUT /heroes/{id} (assumindo que existe, baseado no padrão REST)
 */
export const updateHero = async (id, heroData) => {
  try {
    const formattedData = formatHeroForAPI(heroData)
    const response = await api.put(API_ENDPOINTS.HEROES.UPDATE(id), formattedData)
    return formatHeroFromAPI(response.data)
  } catch (error) {
    console.error(`Erro ao atualizar herói ${id}:`, error)
    throw new Error('Falha ao atualizar herói')
  }
}

/**
 * Exclui um herói
 * DELETE /heroes?id={id}
 */
export const deleteHero = async (id) => {
  try {
    await api.delete(API_ENDPOINTS.HEROES.DELETE, {
      params: { id }
    })
    return true
  } catch (error) {
    console.error(`Erro ao excluir herói ${id}:`, error)
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
