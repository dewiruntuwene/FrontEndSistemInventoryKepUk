<script setup lang="ts">
import { ref } from 'vue';

// Dummy data, you should replace this with your actual data
const itemList = ref([
  { tanggalMasuk: '2024-02-20', idBarang: 1, namaBarang: 'Barang 1', totalStok: 10, kodeBarang: 'ABC123' },
  { tanggalMasuk: '2024-02-21', idBarang: 2, namaBarang: 'Barang 2', totalStok: 15, kodeBarang: 'DEF456' },
  { tanggalMasuk: '2024-02-22', idBarang: 3, namaBarang: 'Barang 3', totalStok: 20, kodeBarang: 'GHI789' },
]);
</script>

<template>
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">Daftar Barang</h2>
      <table class="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead class="bg-gray-100 text-gray-800 uppercase text-sm font-semibold text-left">
          <tr>
            <th class="px-6 py-3">Tanggal Masuk</th>
            <th class="px-6 py-3">ID Barang</th>
            <th class="px-6 py-3">Nama Barang</th>
            <th class="px-6 py-3">Total Stok</th>
            <th class="px-6 py-3">Kode Barang</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <!-- Dummy data, you should replace this with dynamic data -->
          <tr v-for="(item, index) in itemList" :key="index">
            <td class="px-6 py-4">{{ item.tanggalMasuk }}</td>
            <td class="px-6 py-4">{{ item.idBarang }}</td>
            <td class="px-6 py-4">{{ item.namaBarang }}</td>
            <td class="px-6 py-4">{{ item.totalStok }}</td>
            <td class="px-6 py-4">{{ item.kodeBarang }}</td>
          </tr>
        </tbody>
      </table>

      <router-link to="/addcoursematerial">
        <button type="button" class="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-50 ">Add</button>
      </router-link>
    </div>
    <RouterView />
  </template>