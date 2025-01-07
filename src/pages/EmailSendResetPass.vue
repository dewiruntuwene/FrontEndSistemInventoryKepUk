<template>
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 items-center justify-content-center">
      <h2 class="text-xl font-medium text-gray-900 dark:text-white">Reset Password</h2>
      <form class="space-y-6" @submit.prevent="forgotPassword">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Email:</label>
          <input type="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black" id="email" v-model="email" required />
        </div>
        <button type="submit" :disabled="loading"  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset Password</button>
      </form>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import axios from "axios";
  
  const router = useRouter();  // Initialize the router

  const email = ref<string>("");
  const loading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);
  const successMessage = ref<string | null>(null);
  
  // Get token from the URL
 

  const apiUrl = import.meta.env.VITE_API_URL;
  
  const forgotPassword = async () => {
    if (!email.value) {
      errorMessage.value = "Invalid email.";
      return;
    }
  
    loading.value = true;
    errorMessage.value = null;
  
    try {
      // Make the API call to reset the password
      const response = await axios.post(`${apiUrl}/forgotpass`, {
        email: email.value,
      });
      successMessage.value = response.data.msg;

      alert("Cek Email")
    } catch (error: any) {
      errorMessage.value = error.response?.data?.msg || "An error occurred.";
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  .error {
    color: red;
  }
  
  .success {
    color: green;
  }

  body,
html {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 400px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
}
  </style>
  