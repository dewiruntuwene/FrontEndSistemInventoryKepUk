<template>
    <LayoutDekan />
    <div class="mt-0 pl-60 sticky top-0 z-50">
      <div class="border-b-2 border-black flex flex-row justify-between items-center p-3">
        <h4 class="pa-3 text-2xl font-bold">Data Barang</h4>
      </div>
    </div>
  
    <div class="mt-0 pl-[15rem] pr-4">
      <div class="flex flex-row mt-4">
        <!-- Tabel dengan data dari API -->
        <div class="max-w-4xl mr-8 bg-white border-y-2 border-b-4 p-5 overflow-x-auto">
          <table class="min-w-max w-full table-auto">
            <thead>
              <tr class="bg-blue-200 text-gray-600 uppercase text-sm leading-normal">
                <th class="py-2 px-4 text-left border">Kode Barang</th>
                <th class="py-2 px-4 text-left border">Nama Barang</th>
                <th class="py-2 px-4 text-left border">Total Stok</th>
                <th class="py-2 px-4 text-left border">Jenis Barang</th>
                <th class="py-2 px-4 text-left border">Harga Barang</th>
                <th class="py-2 px-4 text-left border">Gambar</th>
                <th class="py-2 px-4 text-left border">Action</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <tr v-for="(item, index) in barangs" :key="index" class="border-b hover:bg-gray-100">
                <td class="py-2 px-4 text-left border">{{ item.kode_barang }}</td>
                <td class="py-2 px-4 text-left border">
                  <input type="text" :value="item.nama_barang" class="border border-gray-300 rounded px-2 py-1 w-full" disabled>
                </td>
                <td class="py-2 px-4 text-left border">
                  <input type="number" :value="item.total_stock" class="border border-gray-300 rounded px-2 py-1 w-full" disabled>
                </td>
                <td class="py-2 px-4 text-left border">
                  <input type="text" :value="item.jenis_barang" class="border border-gray-300 rounded px-2 py-1 w-full" disabled>
                </td>
                <td class="py-2 px-4 text-left border">
                  <input type="number" :value="item.harga_barang" class="border border-gray-300 rounded px-2 py-1 w-full" disabled>
                </td>
                <td class="py-2 px-4 text-left border">
                  <img v-if="item.gambar_barang" :src="`https://inventory-order-kep-uk.vercel.app/uploads/${item.gambar_barang}`" alt="Gambar Barang" class="h-12 w-12 object-cover">
                </td>
                <td class="py-2 px-4 text-left border">
                  <<button @click="deleteBarang(Number(item.id_barang))" type="button" class="focus:outline-none" aria-label="remove Item">
                  <img src="/delete.png" alt="remove" class="h-6 w-6">
                </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Kolom baru di bagian kanan untuk menambahkan barang -->
        <div class="max-w-xs bg-white border-y-2 border-b-4 p-5">
          <h2 class="text-2xl font-bold mb-4">Tambah Barang</h2>
          <div class="flex flex-col">
            <input type="text" v-model="newItem.kode" class="border border-gray-300 rounded px-2 py-1 mb-2" placeholder="Kode Barang">
            <input type="text" v-model="newItem.nama" class="border border-gray-300 rounded px-2 py-1 mb-2" placeholder="Nama Barang">
            <input type="text" v-model="newItem.totalStok" class="border border-gray-300 rounded px-2 py-1 mb-2" placeholder="Total Stok">
            <input type="number" v-model="newItem.harga" class="border border-gray-300 rounded px-2 py-1 mb-2" placeholder="Harga">
            <select v-model="newItem.jenis" class="border border-gray-300 rounded px-2 py-1 mb-2">
              <option value="" disabled selected>Pilih Jenis Barang</option>
              <option value="Barang Habis Pakai">Barang Habis Pakai</option>
              <option value="Alat Kesehatan">Alat Kesehatan</option>
            </select>
            <input type="file" @change="handleImageUpload" class="border border-gray-300 rounded px-2 py-1 mb-2" accept="image/*">
            <button @click="validateAndAddItem" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded">Add</button>
            <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
  
      <!-- Komponen router-view untuk menampilkan halaman yang diarahkan -->
      <router-view />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import LayoutDekan from "../components/LayoutDekan.vue";
  import { useToast } from "vue-toast-notification";
  
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const toast = useToast();
  
  interface Barang {
    kode_barang: number;
    nama_barang: string;
    total_stock: number;
    jenis_barang: string;
    harga_barang: number;
    gambar_barang: string;
    id_barang: number;
  }
  
  export default defineComponent({
    components: {
      LayoutDekan
    },
    setup() {
      const barangs = ref<Barang[]>([]);
      const newItem = ref({
        kode: '',
        nama: '',
        totalStok: '',
        harga: '',
        jenis: '',
        image: ''
      });
      const errorMessage = ref('');
  
      const loadDataFromAPI = async () => {
        try {
          const response = await axios.get(`${apiUrl}/barang`);
          barangs.value = response.data;
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };
  
      const validateAndAddItem = async () => {
        if (!newItem.value.kode || !newItem.value.nama || !newItem.value.totalStok || !newItem.value.harga || !newItem.value.jenis || !newItem.value.image) {
          errorMessage.value = 'Harap isi semua kolom sebelum menambahkan!';
        } else if (checkDuplicateKode(newItem.value.kode)) {
          errorMessage.value = 'Kode barang sudah ada!';
        } else {
          await addItem();
          errorMessage.value = '';
        }
      };
  
      const addItem = async () => {
        const formData = new FormData();
        formData.append('kode_barang', newItem.value.kode);
        formData.append('nama_barang', newItem.value.nama);
        formData.append('total_stock', newItem.value.totalStok);
        formData.append('harga_barang', newItem.value.harga);
        formData.append('jenis_barang', newItem.value.jenis);
        formData.append('gambar_barang', newItem.value.image);
        // formData.append('gambar_barang', newItem.value.image);
  
        try {
          await axios.post(`${apiUrl}/barang`, formData);
          newItem.value = { kode: '', nama: '', totalStok: '', harga: '', jenis: '', image: '' };
          await loadDataFromAPI();
          toast.success("Barang Berhasil Ditambahkan", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        } catch (error) {
          console.error('Error adding item:', error);
          toast.error("Barang Sudah Ada", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        }
      };
  
  
      const deleteBarang = async (id_barang: number) => {
        try {
          await axios.delete(`${apiUrl}/barang/${id_barang}`);
          barangs.value = barangs.value.filter(
            (item) => item.id_barang !== id_barang,
          );
          toast.success("Sukses Hapus Keranjang", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        } catch (error) {
          console.log(error);
          toast.error("Gagal Hapus Keranjang", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        }
      };
      
  
      const checkDuplicateKode = (kode: string) => {
        return barangs.value.some(item => item.kode_barang.toString() === kode);
      };
  
      const handleImageUpload = (event: any) => {
        newItem.value.image = event.target.files[0];
      };
  
      loadDataFromAPI();
  
      return {
        barangs,
        newItem,
        errorMessage,
        validateAndAddItem,
        handleImageUpload,
        deleteBarang
      };
    }
  });
  </script>
  
  <style scoped>
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  th, td {
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tr:hover {
    background-color: #f1f1f1;
  }
  
  img {
    display: block;
    margin: 0 auto;
  }
  
  button {
    transition: background-color 0.3s ease;
  }
  </style>