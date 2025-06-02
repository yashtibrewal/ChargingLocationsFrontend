<script setup>


import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const login = async () => {
  try {
    const url = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username.value, password: password.value })
    });

    const data = await response.json();

    if (response.ok) {
      // Success: contains token
      auth.setToken(data.token) // ✅ Store the token
      router.push("/dashboard");
    } else {
      // Error: contains message
      console.error('Error:', data.message);
      alert(data.message);
    }

    username.value = "";
    password.value = "";
    return data;
  } catch (error) {
    console.error('Network error:', error);

    username.value = "";
    password.value = "";
    return { message: 'Network error' };
  }
};
</script>

<template>
  <div class="flex flex-col space-y-5 m-5 p-5 py-24 w-100 items-center justify-center bg-yellow-100 rounded-xl">
    <div><input class="border-2 border-amber-600 rounded-xl p-2 bg-white" v-model="username"
        placeholder="Enter username" />
    </div>
    <div><input class="border-2 border-amber-600 rounded-xl p-2 bg-white" v-model="password" type="password"
        placeholder="Password" /></div>
    <div><button class="border-2 rounded-xl border-blue-600 py-1 px-4 bg-blue-600 text-white"
        @click="login">Login</button></div>
  </div>
</template>