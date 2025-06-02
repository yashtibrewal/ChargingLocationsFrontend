import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {

  const storedToken = localStorage.getItem('token');
  const token = ref(storedToken ? storedToken : null)

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken);
  }

  return { token, setToken }
})