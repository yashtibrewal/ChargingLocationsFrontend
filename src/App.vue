<script setup>
import { useRoute } from 'vue-router'
import { useAuthStore } from './store/auth';
import router from './router';

const { setToken } = useAuthStore()

function logout() {
  setToken(undefined);
  router.push("/");
}

const route = useRoute()
</script>

<template>
  <nav class="flex space-x-5 p-5 m-5 border-b-4 border-amber-200 justify-between">
    <div class="space-x-5">
      <RouterLink to="/dashboard" class="cursor-pointer" :class="{
        'font-bold underline': route.path === '/dashboard'
      }">
        Dashboard
      </RouterLink>
      <RouterLink to="/" class="cursor-pointer" :class="{
        'font-bold underline': route.path === '/'
      }">
        Home
      </RouterLink>
    </div>
    <button class="cursor-pointer" @click="logout()">Logout</button>
  </nav>

  <main>
    <RouterView />
  </main>
</template>
