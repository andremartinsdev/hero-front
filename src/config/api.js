// Configuração da API
export const API_CONFIG = {
  // URL base da API - ajuste conforme necessário
  BASE_URL: 'http://localhost:5000',
  
  // Timeout para requisições (em ms)
  TIMEOUT: 10000,
  
  // Headers padrão
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json'
  }
}

// Endpoints da API baseados na especificação OpenAPI
export const API_ENDPOINTS = {
  HEROES: {
    LIST: '/heroes',
    CREATE: '/heroes',
    GET_BY_ID: (id) => `/heroes/${id}`,
    UPDATE: (id) => `/heroes/${id}`,
    DELETE: '/heroes'
  },
  HERO_POWER: {
    CREATE: '/api/HeroPower',
    GET_BY_HERO: (heroId) => `/api/HeroPower/${heroId}`,
    DELETE: (heroId, powerId) => `/api/HeroPower/${heroId}/${powerId}`
  }
}

export default {
  API_CONFIG,
  API_ENDPOINTS
}
