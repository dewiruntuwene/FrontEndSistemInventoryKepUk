<template>
    <Layout/>
    <div class="mt-16 pl-[15rem]">
      <div class="border-y-2 border-b-4 bg-blue-200 flex flex-row justify-between items-center p-5">
        <h1 class="text-4xl font-bold pa-3">Data Barang</h1>
      </div>
  
  
      <div class="max-w-4xl mr-16">
        <!-- Tabel dengan data dari API -->
        <div class="bg-blue-200 border-y-2 border-b-4 flex flex-row justify-between items-center p-5 pl-0 pe-4 mt-4 overflow-x-auto">
          <div class="table-wrapper">
            <table class="min-w-max w-full table-auto px-1">
              <thead>
                <tr class="bg-blue-200 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-2 px-1 text-left border">Kode Barang</th>
                  <th class="py-2 px-1 text-left border">Nama Barang</th>
                  <th class="py-2 px-1 text-left border">Total Stok</th>
                  <th class="py-2 px-1 text-left border">Jenis Barang</th>
                  <th class="py-2 px-1 text-left border">Harga Barang</th>
                  <th class="py-2 px-1 text-left border">Gambar</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm font-light">
                <!-- Menampilkan data dari API -->
                <tr v-for="(item, index) in barangs" :key="index">
                  <td class="py-2 px-1 text-left border">{{ item.kode_barang }}</td>
                  <td class="py-2 px-1 text-left border">
                    <input type="text" :value="item.nama_barang" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Nama Barang" disabled>
                  </td>
                  <td class="py-2 px-1 text-left border">
                    <input type="number" :value="item.total_stock" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Total Stok" disabled>
                  </td>
                  <td class="py-2 px-1 text-left border">
                    <input type="text" :value="item.jenis_barang" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Jenis Barang" disabled>
                  </td>
                  <td class="py-2 px-1 text-left border">
                    <input type="number" :value="item.harga_barang" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Harga Barang" disabled>
                  </td>
                  <td class="py-2 px-1 text-left border">
                    <img v-if="item.gambar_barang" :src="item.gambar_barang" alt="Gambar Barang" class="h-12 w-12 object-cover">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
  
      <!-- Kolom baru di bagian bawah untuk menambahkan barang -->
      <div class="max-w-4xl ml-8 pl-20 mt-4 flex justify-end">
        <div class="flex flex-col">
          <input type="text" v-model="newItem.kode" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Kode Barang">
          <input type="text" v-model="newItem.nama" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Nama Barang">
          <input type="text" v-model="newItem.totalStok" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Total Stok">
          <input type="number" v-model="newItem.harga" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Harga">
          <input type="text" v-model="newItem.jenis" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Jenis Barang">
          <input type="file" @change="handleImageUpload" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" accept="image/*">
          <button @click="validateAndAddItem" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2">Add</button>
          <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
        </div>
      </div>
  
  
      <!-- Komponen router-view untuk menampilkan halaman yang diarahkan -->
      <router-view />
    </div>
  </template>
  
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import Layout from "../components/Layout.vue";
  
  
  interface Barang {
    kode_barang: number;
    nama_barang: string;
    total_stock: number;
    jenis_barang: string;
    harga_barang: number;
    gambar_barang: string;
  }
  
  
  export default defineComponent({
    components: {
      Layout
    },
    setup() {
      // Menggunakan ref untuk menyimpan data barang
      const barangs = ref<Barang[]>([]);
      // Data baru yang akan ditambahkan
      const newItem = ref({
        kode: '',
        nama: '',
        totalStok: '',
        harga: '',
        jenis: '',
        image: null
      });
      // Pesan kesalahan validasi
      const errorMessage = ref('');
  
  
      // Memuat data dari API saat komponen dimuat
      const loadDataFromAPI = async () => {
        try {
          const response = await axios.get('https://vjk2k0f5-5000.asse.devtunnels.ms/barang');
          barangs.value = response.data;
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };
  
  
      // Validasi dan menambahkan barang baru
      const validateAndAddItem = async () => {
        if (!newItem.value.kode || !newItem.value.nama || !newItem.value.totalStok || !newItem.value.harga || !newItem.value.jenis || !newItem.value.image) {
          errorMessage.value = 'Harap isi semua kolom sebelum menambahkan!';
        } else {
          await addItem();
          errorMessage.value = ''; // Bersihkan pesan kesalahan jika tidak ada
        }
      };
  
  
      // Menambahkan barang ke daftar
      const addItem = async () => {
        const formData = new FormData();
        formData.append('kode_barang', newItem.value.kode);
        formData.append('nama_barang', newItem.value.nama);
        formData.append('total_stock', newItem.value.totalStok);
        formData.append('harga_barang', newItem.value.harga);
        formData.append('jenis_barang', newItem.value.jenis);
        formData.append('gambar_barang', newItem.value.image);
  
  
        try {
          // Kirim permintaan POST dengan FormData
          await axios.post('https://vjk2k0f5-5000.asse.devtunnels.ms/barang', formData);
          // Reset newItem setelah berhasil
          newItem.value = { kode: '', nama: '', totalStok: '', harga: '', jenis: '', image: null };
          // Muat ulang data dari API
          await loadDataFromAPI();
        } catch (error) {
          console.error('Error adding item:', error);
        }
      };
  
  
      // Menangani upload gambar barang
      const handleImageUpload = (event: any) => {
        // Set the image property to the selected file
        newItem.value.image = event.target.files[0];
      };
  
  
      // Memuat data dari API saat komponen dimuat
      loadDataFromAPI();
  
  
      return {
        barangs,
        newItem,
        errorMessage,
        validateAndAddItem,
        handleImageUpload
      };
    }
  });
  </script>
  
  
  <style scoped>
  /* Tidak diperlukan jika menggunakan Tailwind CSS dari CDN */
  table {
    font-size: 14px;
  }
  
  
  th,
  td {
    padding: 8px;
  }
  
  
  /* Membuat tabel responsif */
  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  
  /* Menambahkan viewport meta tag untuk responsivitas */
  @media only screen and (max-width: 480px) {
    /* Sesuaikan lebar tabel dengan layar perangkat */
    .max-w-full {
      width: 100%;
    }
  }
  </style>
  