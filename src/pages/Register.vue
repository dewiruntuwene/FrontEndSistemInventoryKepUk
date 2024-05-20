<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const email = ref('');
const password = ref('');
const confpassword = ref('');
const registrationSuccess = ref(false);
const userExists = ref(false); // Variabel untuk menampilkan pemberitahuan jika pengguna sudah terdaftar

const register = async () => {
  try {
    const data = {
      username: username.value,
      email: email.value,
      password: password.value,
      confpassword: confpassword.value
    };

    // Kirim permintaan pendaftaran ke server
    const response = await axios.post('https://vjk2k0f5-5000.asse.devtunnels.ms/register', data);
    console.log('Response:', response.data);

    // Tampilkan pemberitahuan bahwa registrasi berhasil
    registrationSuccess.value = true;
    userExists.value = false; // Reset variabel userExists

    // Tambahkan pemberitahuan bahwa registrasi berhasil
    alert('Registrasi berhasil! Silakan login.');
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-80">
      <h2 class="text-2xl font-semibold mb-4 text-center">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" v-model="username" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="confpassword" class="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
          <input type="password" id="confpassword" v-model="confpassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div  class="mt-4 text-gray-600 text-center">Sudah Punya Account Silahkan <router-link to="/login" class="underline">Login</router-link>.</div>
        <div class="flex flex-col items-center justify-between">
          <button type="submit" class="mt-5 items-center bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600">Daftar</button>
        </div>
        <!-- Pemberitahuan registrasi berhasil -->
        <div v-if="registrationSuccess" class="mt-4 text-green-600">Registrasi berhasil! Silakan <router-link to="/login" class="underline">login</router-link>.</div>
        <!-- Pemberitahuan jika pengguna sudah terdaftar -->
        <div v-if="userExists" class="mt-4 text-red-600">Pengguna dengan email atau username ini sudah terdaftar.</div>
      </form>
    </div>  
  </div>
</template>