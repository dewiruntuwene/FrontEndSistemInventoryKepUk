<script setup lang="ts">
import { ref } from 'vue';
import { CartItem } from '../pages/UserCatalog.vue'; // Menggantikan dengan path sesuai kebutuhan Anda

// Dapatkan data keranjang dari komponen tempat Anda menambahkan item ke keranjang
const cartItems = ref<CartItem[]>([]);
    const itemList = ref([
  { foto: '', idBarang: 1, namaBarang: 'Barang 1', keterangan: 10, jumlah: 'ABC123', hapus: '' },
  { foto: '', idBarang: 2, namaBarang: 'Barang 2', keterangan: 15, jumlah: 'DEF456', hapus: '' },
  { foto: '', idBarang: 3, namaBarang: 'Barang 3', keterangan: 20, jumlah: 'GHI789', hapus: '' },
]);
</script>


<template>
    <div>
        <h2>Keranjang Belanja</h2>
        <ul>
            <li v-for="(item, index) in cartItems" :key="index">
                {{ item.nama }} - {{ item.jumlah }}
            </li>
        </ul>
    </div>
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">Daftar Barang</h2>
      <table class="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead class="bg-gray-100 text-gray-800 uppercase text-sm font-semibold text-left">
          <tr>
            <th class="px-6 py-3">Foto</th>
            <th class="px-6 py-3">ID Barang</th>
            <th class="px-6 py-3">Nama Barang</th>
            <th class="px-6 py-3">Keterangan</th>
            <th class="px-6 py-3">Jumlah</th>
            <th class="px-6 py-3">Hapus</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <!-- Dummy data, you should replace this with dynamic data -->
          <tr v-for="(item, index) in itemList" :key="index">
            <td class="px-6 py-4">{{ item.foto }}</td>
            <td class="px-6 py-4">{{ item.idBarang }}</td>
            <td class="px-6 py-4">{{ item.namaBarang }}</td>
            <td class="px-6 py-4">{{ item.keterangan }}</td>
            <td class="px-6 py-4">{{ item.jumlah }}</td>
            <td class="px-6 py-4">{{ item.hapus }}</td>
          </tr>
        </tbody>
      </table>

      <router-link to="/addcoursematerial">
        <button type="button" class="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-50 ">Add</button>
      </router-link>
    </div>
    <RouterView />
  </template>

