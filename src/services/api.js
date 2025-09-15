import axios from 'axios'
import { API_CONFIG } from '../config/api'

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.error('❌ Erro na requisição:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.data || error.message)
    
    if (error.response?.status === 404) {
      throw new Error('Recurso não encontrado')
    } else if (error.response?.status === 500) {
      throw new Error('Erro interno do servidor')
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Não foi possível conectar ao servidor. Verifique se a API está rodando.')
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Erro de rede. Verifique sua conexão.')
    }
    
    return Promise.reject(error)
  }
)

export default api
