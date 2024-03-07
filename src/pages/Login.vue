<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const login = async () => {
  try {
    console.log('Username:', username.value);
    console.log('Password:', password.value);
    const response = await axios.post('https://vjk2k0f5-5000.asse.devtunnels.ms/login', { username: username.value, password: password.value });
    console.log('Response:', response.data);
    // Lakukan penanganan respons sesuai kebutuhan
    // Tambahkan pemberitahuan bahwa login berhasil
    alert('Login berhasil!');
  } catch (error) {
    console.error('Error:', error);
    // Lakukan penanganan kesalahan sesuai kebutuhan
  }
};
</script>

<template>
  <div class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-80">
      <h2 class="text-2xl font-semibold mb-4">Klinik Inventory System</h2>
      <h3 class="text-lg text-gray-600 mb-6">Login</h3>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" v-model="username" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>