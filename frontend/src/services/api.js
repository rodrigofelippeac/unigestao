import axios from 'axios'

/**
 * Instância axios centralizada.
 * Todos os services devem importar esta instância — nunca criar instâncias avulsas.
 * VITE_API_URL deve ser definido em .env (ex: http://localhost:3000)
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de resposta global para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aqui pode-se adicionar lógica centralizada de erro (ex: toast global)
    return Promise.reject(error)
  }
)
