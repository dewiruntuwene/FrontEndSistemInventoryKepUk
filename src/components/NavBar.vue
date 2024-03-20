<template>
  <div>
    <nav class="bg-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex-shrink-0">
            <router-link to="/" class="text-xl font-bold text-gray-800">Sistem Inventory</router-link>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link to="/" class="text-gray-800 hover:text-gray-600">Home</router-link>
              <router-link to="/UserCatalog" class="text-gray-800 hover:text-gray-600">Catalog Barang</router-link>
              <div class="md:w-32 lg:w-48">
                <input type="text" class="w-96 rounded-full pl-3 py-1" placeholder="Search">
              </div>
              <div class="flex-row ">
              <router-link to="/logout">
                <a href="#" class="inline-block text-sm px-4 py-2 leading-none border-black rounded text-black border-white hover:border-transparent hover:text-natural-900 hover:bg-white mt-4 lg:mt-0">Logout</a>
              </router-link>
          </div>
            </div>
          </div>
          
          <div class="ml-auto flex">
            <div class="flex items-center space-x-4 ">
              <router-link to="/UserOrder" class="relative text-gray-800 hover:text-gray-600">
                <span>Keranjang</span>
                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
                <span class="bg-green-500 text-white rounded-full px-2 py-1">{{ updateKeranjang ? updateKeranjang.length : jumlah_pesanans.length }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const jumlah_pesanans = ref([]);

const updateKeranjang = ref([]);

const setJumlah = (data: any[]) => {
  total_stock.value = data;
};

onMounted(() => {
  axios
    .get('https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang')
    .then((response) => setJumlah(response.data))
    .catch((error) => console.log(error));
});
</script>

<style scoped>
/* Custom styles here */
</style>
