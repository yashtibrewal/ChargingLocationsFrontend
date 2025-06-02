<!-- src/views/AuthPage.vue -->
<script setup>
import { ref } from 'vue'
import Login from './Login.vue'
import Signup from './Signup.vue'

// State to track which form is active
const activeForm = ref('signup')
</script>

<template>
  <nav class="flex space-x-5 p-5 m-5 border-b-4 border-amber-200">
    <div
      @click="activeForm = 'login'"
      class="cursor-pointer"
      :class="{ 'font-bold underline': activeForm === 'login' }"
    >
      Login
    </div>
    <div
      @click="activeForm = 'signup'"
      class="cursor-pointer"
      :class="{ 'font-bold underline': activeForm === 'signup' }"
    >
      Signup
    </div>
  </nav>

  <div class="mt-4 flex justify-center">
    <Login v-if="activeForm === 'login'" />
    <Signup v-if="activeForm === 'signup'" />
  </div>
</template>
