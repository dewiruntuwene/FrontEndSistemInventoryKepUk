<template>
  <Layout/>
  <div class="mt-16 pl-[15rem]">
    <div class="border-y-2 border-b-4 border-black flex flex-row justify-between items-center p-5">
      <h1 class="py-3 text-4xl font-bold">Data Barang Keluar</h1>
    </div>
  </div>

  <div class="max-w-6xl mx-auto">
    <div class="bg-white max-w-5xl mt-7 ml-20 pl-28">
      <table class="min-w-max w-full table-auto">
        <thead>
          <tr class="bg-gray-300 text-gray-900 uppercase text-sm leading-normal">
            <th class="py-3 px-2 text-left border">No</th>
            <th class="py-3 px-2 text-left border">Tanggal Barang Keluar</th>
            <th class="py-3 px-2 text-left border">Nama Barang</th>
            <th class="py-3 px-2 text-left border">ID Barang</th>
            <th class="py-3 px-2 text-left border">Total Stok</th>
            <th class="py-3 px-2 text-left border">Jenis Barang</th>
            <th class="py-3 px-2 text-left border">Harga Barang</th>
            <th class="py-3 px-2 text-left border">Gambar Barang</th>
            <th class="py-3 px-2 text-left border"></th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr v-for="(item, index) in data" :key="index">
            <td class="py-3 px-2 text-left border">{{ index + 1 }}</td>
            <td class="py-3 px-2 text-left border">{{ item.tanggal_keluar }}</td>
            <td class="py-3 px-2 text-left border">{{ item.nama_barang }}</td>
            <td class="py-3 px-2 text-left border">{{ item.barangs.id_barang }}</td>
            <td class="py-3 px-2 text-left border">{{ item.barangs.total_stock }}</td>
            <td class="py-3 px-2 text-left border">{{ item.barangs.jenis_barang }}</td>
            <td class="py-3 px-2 text-left border">{{ item.barangs.harga_barang }}</td>
            <td class="py-3 px-2 text-left border">
              <img :src="`http://localhost:5000/uploads/${item.barangs.gambar_barang}`" alt="Gambar Barang" class="h-16 w-16 object-cover">
            </td>
            <td class="py-3 px-2 text-left border">
              <button @click="editItem(index)" type="button" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">UPDATE</button>
              <button @click="deleteItem(index)" type="button" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">DELETE</button>
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
import Layout from "@components/layout.vue";

interface BarangKeluar {
  id_transaksi_barang: number;
  jumlah_barang: number;
  barangId: string;
  type: string;
  peminjamId: number;
  tanggal_keluar: string;
  tanggal_masuk: string | null;
  nama_matakuliah: string;
  nama_barang: string;
  barangs: {
    id_barang: string;
    nama_barang: string;
    total_stock: number;
    jenis_barang: string;
    harga_barang: number;
    gambar_barang: string;
  };
}

const data = ref<BarangKeluar[]>([]);

async function fetchData() {
  try {
    const response = await axios.get<BarangKeluar[]>('https://vjk2k0f5-5000.asse.devtunnels.ms/barangKeluar');
    data.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function deleteItem(index: number) {
  data.value.splice(index, 1);
}

function editItem(index: number) {
  const item = data.value[index];
}

onMounted(() => {
  fetchData();
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
});
</script>