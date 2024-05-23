<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { GoogleAuth, JWT, OAuth2Client } from 'google-auth-library'

const router = useRouter();
const email = ref('');
const password = ref('');


interface CustomJwtPayload extends JwtPayload {
  role: string;
}

// Mengambil URL API dari environment variables
const apiUrl = import.meta.env.VITE_API_URL;

// Fungsi untuk mengarahkan pengguna ke URL otorisasi Google
const googleAuth = (): void => {
  if (apiUrl) {
    redirectToUserCatalog();
  } else {
    console.error('API URL is not defined');
  }
};

// Fungsi untuk melakukan redirect ke halaman autentikasi Google
const redirectToUserCatalog = async (): Promise<void> => {
  const response = await axios.get(`${apiUrl}/auth/google/`, { withCredentials: true });
  const authUrl = response.data.url;
  window.location.href = authUrl;
    
};

// Fungsi untuk memeriksa token setelah redirect
const checkToken = async (): Promise<void> => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token) {
      try {
        // Decode token
        const decodedToken:CustomJwtPayload = jwtDecode(token);
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

interface User {
  name: string;
  email: string;
}

// const user = ref<User | null>(null);

//     const getUser = async () => {
//       try {
//         const url = `${apiUrl}/auth/login/`;
//         const { data } = await axios.get(url, { withCredentials: true });
//         user.value = data.user._json;
//       } catch (err) {
//         console.log(err);
//       }
//     };


//Jika menggunakan Vue.js, panggil checkToken setelah komponen dimuat
onMounted(() => {
  checkToken();
});



const login = async () => {
  try {
    console.log('Email:', email.value);
    console.log('Password:', password.value);
    const response = await axios.post(`${apiUrl}/login`, { email: email.value, password: password.value });
    console.log('Response:', response.data);

    // Dekode token JWT untuk mendapatkan informasi peran pengguna
    const decodedToken: CustomJwtPayload = jwtDecode(response.data.token);
    console.log('Decoded Token:', decodedToken); // Debugging statement
    if (!decodedToken || !decodedToken.role) {
      console.error('Token does not contain role information.');
      return; // Exit the function
    }

    const userRole = decodedToken.role;
    console.log('User Role:', userRole); // Debugging statement

    // Redirect user based on role after successful login
    if (userRole === 'USER') {
      router.push('/UserCatalog');
    } else if (userRole === 'ADMIN') {
      router.push('/Dashboard');
    }
    // Arahkan pengguna sesuai peran setelah login berhasil
    if (userRole  === 'USER') {
      router.push('/UserCatalog');
    } else if (userRole  === 'ADMIN') {
      router.push('/Dashboard');
    }

    // Simpan token ke local storage untuk digunakan pada permintaan berikutnya
    localStorage.setItem('token', response.data.token);
    // Cek apakah token sudah tersimpan di local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Token sudah tersimpan di local storage
      console.log('Token sudah tersimpan:', token);
      // Lakukan penanganan sesuai kebutuhan, misalnya, lanjutkan ke halaman berikutnya
    } else {
      // Token belum tersimpan di local storage
      console.log('Token belum tersimpan.');
    }
    

    
    // Set header otorisasi untuk permintaan selanjutnya
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

    // Verifikasi bahwa token telah diset di header
    console.log('Header Authorization telah diset:', axios.defaults.headers.common['Authorization']);


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
      <h3 class="text-lg text-gray-600 mb-6 text-center ">Login</h3>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="text" id="email" v-model="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div  class="mt-4 text-gray-600 text-center">Belum Punya Account Silahkan <router-link to="/register" class="underline">Register</router-link>.</div>
        <div class="flex flex-col items-center justify-between">
          <button type="submit" class="mt-5 bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600">Login</button>
        </div>
      </form>
      <div>
        <button @click="googleAuth">Login with Google</button>
      </div>
    </div>
  </div>
</template>