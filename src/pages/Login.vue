<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { JwtPayload,jwtDecode } from 'jwt-decode';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref(''); // Empty error message initially

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const navigate = (url: string) => {
  window.location.href = url;
};

const urlParams = new URLSearchParams(window.location.search);
console.log('this url:',urlParams)
const token: string = urlParams.get('token') || '';

// const decodeTokenAndRedirect  = async (token:string) => {

//   try {
//     // Dekode token (anda memerlukan library JWT untuk ini)
//     const decodedToken : CustomJwtPayload = jwtDecode(token);

//     // Periksa rolenya
//     if (decodedToken.role === 'ADMIN') {
//       // Jika role adalah ADMIN, arahkan ke halaman dashboard
//       navigate('http://localhost:5173/dashboard');
//     } else {
//       // Jika role adalah USER, arahkan ke halaman UserCatalog dengan menyertakan token sebagai query parameter
//       navigate(`http://localhost:5173/userCatalog?token=${token}`);
//     }
//   } catch (error) {
//     console.error('Error decoding token:', error);
//   }
// };

// Fungsi untuk mengarahkan pengguna ke Google untuk otentikasi
const auth = async () => {
  try {
    const response = await fetch('http://localhost:5000/auth/google', { method: 'POST' });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data)

    // Logging untuk debugging
    console.log('Data dari API:', data);

    if (data.url) {
      // Redirect ke URL otentikasi Google
      window.location.href = data.url;
    } else {
      throw new Error('Response data does not contain URL');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

// Fungsi untuk memeriksa token setelah redirect
const checkToken = () => {
  const urlParams = new URLSearchParams(window.location.search);
  console.log('URL Params:', urlParams);

  const token = urlParams.get('token');
  console.log('Token:',token);

  if (token) {
    try {
      // Decode token menggunakan tipe khusus
      const decodedToken : CustomJwtPayload = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);

      // Simpan token ke local storage
      localStorage.setItem('token', token);

      // Check role and redirect accordingly
      const userRole = decodedToken.role;
      if (userRole === 'USER') {
        router.push('/UserCatalog');
      } else if (userRole === 'ADMIN') {
        router.push('/Dashboard');
      } else {
        console.error('Unknown role:', userRole);
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  } else {
    console.error('No token found in URL');
  }
};

window.onload = checkToken;

// // Panggil fungsi auth untuk memulai proses
// auth();




const login = async () => {
  try {
    const response = await axios.post(`${apiUrl}/login`, { email: email.value, password: password.value });
    const decodedToken: CustomJwtPayload = jwtDecode(response.data.token);

    if (!decodedToken || !decodedToken.role) {
      console.error('Token does not contain role information.');
      return;
    }

    const userRole = decodedToken.role;
    if (userRole === 'USER') {
      router.push('/UserCatalog');
    } else if (userRole === 'ADMIN') {
      router.push('/Dashboard');
    }

    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    alert('Login berhasil!');
  } catch (error) {
    console.error('Error:', error);
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 401) {
        errorMessage.value = 'Email atau password salah.';
      } else if (status === 404) {
        errorMessage.value = 'Username tidak ditemukan.';
      } else {
        errorMessage.value = 'Terjadi kesalahan pada server.';
      }
    } else {
      errorMessage.value = 'Terjadi kesalahan pada server.';
    }
  }
};




</script>


<template>
  <div class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-80">
      <h2 class="text-2xl font-semibold mb-4">Klinik Inventory System</h2>
      <h3 class="text-lg text-gray-600 mb-6 text-center">Login</h3>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="text" id="email" v-model="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</div>
        <div class="mt-4 text-gray-600 text-center">Belum Punya Account Silahkan <router-link to="/register" class="underline">Register</router-link>.</div>
        <div class="flex flex-col items-center justify-between">
          <button type="submit" class="mt-5 bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600">Login</button>
        </div>
      </form>
      <div>
        <button @click="auth" class="mt-4 bg-red-500 text-white py-2 px-4 rounded focus:outline-none focus:bg-red-600 hover:bg-red-600">Login with Google</button>
      </div>
    </div>
  </div>
</template>
