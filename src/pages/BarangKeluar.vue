<template>
    <Layout/>
    <div class="mt-14 pl-[15rem]">
      <div class="border-y-2 border-b-3 border-black flex flex-row justify-between items-center p-5">
        <h1 class="pa-3 text-2xl font-bold ">Data Barang Keluar</h1>
        <div class="relative md:flex">
          <input
            v-model="searchQuery"
            @keydown.enter="searchItems"
            type="text"
            class="border border-gray-300 rounded px-2 py-1 mb-2 md:mb-0 md:mr-2"
            placeholder="Search..."
          >
          <button @click="searchItems" class="bg-gray-300 hover:bg-gray-400 rounded px-3 py-1">Search</button>
        </div>
      </div>
    </div>
  
    <div class="max-w-6xl mx-auto">
      <div class="bg-white max-w-5xl mt-7 ml-20 pl-28">
        <table class="min-w-max w-full table-auto">
          <thead>
            <tr class="bg-slate-400 text-gray-900 uppercase text-sm leading-normal">
              <th class="py-3 px-2 text-left border">No</th>
              <th class="py-3 px-2 text-left border">Tanggal Barang Keluar</th>
              <th class="py-3 px-2 text-left border">Nama Barang</th>
              <th class="py-3 px-2 text-left border">Kode Barang</th>
              <th class="py-3 px-2 text-left border">Total Stok</th>
              <th class="py-3 px-2 text-left border">Jenis Barang</th>
              <th class="py-3 px-2 text-left border">Harga Barang</th>
              <th class="py-3 px-2 text-left border">Gambar Barang</th>
              <th class="py-3 px-2 text-left border"></th>
            </tr>
          </thead>
          <tbody class="text-black text-sm font-light-bolt">
            <tr v-if="filteredData.length === 0">
              <td colspan="9" class="text-center py-3">Not found</td>
            </tr>
            <tr v-for="(item, index) in filteredData" :key="index">
              <td class="py-3 px-2 text-left border">{{ index + 1 }}</td>
              <td class="py-3 px-2 text-left border">{{ formatDate(item.tanggal_keluar) }}</td>
              <td class="py-3 px-2 text-left border">{{ item.nama_barang }}</td>
              <td class="py-3 px-2 text-left border">{{ item.barangs.kode_barang }}</td>
              <td class="py-3 px-2 text-left border">{{ item.barangs.total_stock }}</td>
              <td class="py-3 px-2 text-left border">{{ item.barangs.jenis_barang }}</td>
              <td class="py-3 px-2 text-left border">{{ item.barangs.harga_barang }}</td>
              <td class="py-3 px-2 text-left border">
                <img :src="`http://localhost:5000/uploads/${item.barangs.gambar_barang}`"
                alt="Gambar Barang"
                class="h-10 w-25 object-cover rounded-md shadow-md">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Layout from "../components/layout.vue";
  
  interface BarangKeluar {
    id_transaksi_barang: number;
    jumlah_barang: number;
    barangk_kode: string;
    type: string;
    peminjamId: number;
    tanggal_keluar: string;
    tanggal_masuk: string | null;
    nama_matakuliah: string;
    nama_barang: string;
    barangs: {
      kode_barang: string;
      nama_barang: string;
      total_stock: number;
      jenis_barang: string;
      harga_barang: number;
      gambar_barang: string;
    };
  }
  
  const data = ref<BarangKeluar[]>([]);
  const searchQuery = ref('');
  const filteredData = ref<BarangKeluar[]>([]);
  
  async function fetchData() {
    try {
      const response = await axios.get<BarangKeluar[]>('https://vjk2k0f5-5000.asse.devtunnels.ms/barangKeluar');
      data.value = response.data;
      filteredData.value = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  function searchItems() {
    if (searchQuery.value.trim() === '') {
      filteredData.value = data.value;
    } else {
      filteredData.value = data.value.filter(item => 
        item.nama_barang.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.barangs.kode_barang.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
  }
  
  function deleteItem(index: number) {
    data.value.splice(index, 1);
    searchItems();
  }
  
  function editItem(index: number) {
    const item = data.value[index];
  }
  
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tambahkan 1 karena getMonth() mengembalikan bulan dari 0-11
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  onMounted(() => {
    fetchData();
  });
</script>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
  
 
