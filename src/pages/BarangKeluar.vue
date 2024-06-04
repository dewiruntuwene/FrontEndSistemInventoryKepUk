<template>
  <Layout/>
  <div class="mt-0 pl-60 sticky top-0 z-50">
    <div class="border-b-2 border-black flex flex-row justify-between items-center p-3">
      <h4 class="pa-3 text-2xl font-bold">Data Barang Masuk</h4>
      <div class="relative md:flex">
        <input
          v-model="searchQuery"
          @keydown.enter="searchItems"
          type="text"
          class="border border-gray-300 rounded px-2 py-1 mb-2 md:mb-0 md:mr-2"
          placeholder="Search..."
          id="search"
        />
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
    <div class="mt-5 ml-20 pl-28 relative">
        <button v-if="!showForm" @click="showForm = true" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add
        </button>
        <div v-if="showForm" class="mt-4 p-4 border rounded bg-gray-100">
          <h3 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Barang' : 'Tambah Barang' }}</h3>
          <form @submit.prevent="validateForm">
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label for="tanggal_masuk" class="block text-sm font-bold mb-2">Tanggal Barang Masuk:</label>
                <input v-model="newItem.tanggal_masuk" type="date" class="border rounded px-2 py-1 w-full" id="tanggal_masuk">
              </div>
              <div>
                <label for="nama_barang" class="block text-sm font-bold mb-2">Nama Barang:</label>
                <input v-model="newItem.nama_barang" type="text" class="border rounded px-2 py-1 w-full" id="nama_barang">
              </div>
              <div>
                <label for="kode_barang" class="block text-sm font-bold mb-2">Kode Barang:</label>
                <input v-model="newItem.kode_barang" type="text" class="border rounded px-2 py-1 w-full" id="kode_barang">
              </div>
              <div>
                <label for="jumlah_barang" class="block text-sm font-bold mb-2">Jumlah Barang:</label>
                <input v-model="newItem.jumlah_barang" type="number" class="border rounded px-2 py-1 w-full" id="jumlah_barang">
              </div>
              <div>
                <label for="jenis_barang" class="block text-sm font-bold mb-2">Jenis Barang:</label>
                <input v-model="newItem.jenis_barang" type="text" class="border rounded px-2 py-1 w-full" id="jenis_barang">
              </div>
              <div>
                <label for="harga_barang" class="block text-sm font-bold mb-2">Harga Barang:</label>
                <input v-model="newItem.harga_barang" type="number" class="border rounded px-2 py-1 w-full" id="harga_barang">
              </div>
              <div class="flex justify-end space-x-4">
                <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
                
              </div>
              <div v-if="isFormIncomplete" class="text-red-500 mt-2">
                Harap isi semua data!
                <ul>
                  <li v-if="!newItem.tanggal_masuk">Tanggal Barang Masuk harus diisi</li>
                  <li v-if="!newItem.nama_barang">Nama Barang harus diisi</li>
                  <li v-if="!newItem.kode_barang">Kode Barang harus diisi</li>
                  <li v-if="!newItem.jumlah_barang">Jumlah Barang harus diisi</li>
                  <li v-if="!newItem.jenis_barang">Jenis Barang harus diisi</li>
                  <li v-if="!newItem.harga_barang">Harga Barang harus diisi</li>
                  
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Layout from "../components/layout.vue";

const apiUrl = import.meta.env.VITE_API_URL;

const data = ref<any[]>([]);
const searchQuery = ref('');
const filteredData = ref<BarangKeluar[]>([]);
const isFormIncomplete = ref(false);
const isEditing = ref<boolean>(false);
const currentItemIndex = ref<number | null>(null);
const showForm = ref<boolean>(false);

const newItem = ref<any>({
    tanggal_masuk: '',
    tanggal_keluar: null,
    jumlah_barang:0,
    kode_barang:'',
    nama_barang:'',
    jenis_barang: '',
    harga_barang:0
  });

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

const addItem = async () => {
    try {
      const newTransaksi = {
        jumlah_barang: newItem.value.jumlah_barang,
        // type: 'BarangMasuk',
        tanggal_masuk: newItem.value.tanggal_masuk,
        nama_barang: newItem.value.nama_barang,
        jenis_barang: newItem.value.jenis_barang,
        harga_barang: newItem.value.harga_barang,
        kode_barang: newItem.value.kode_barang
        // barangs: {
        //   nama_barang: newItem.value.nama_barang,
        //   total_stock: newItem.value.jumlah_barang,
        //   jenis_barang: newItem.value.jenis_barang,
        //   harga_barang: newItem.value.harga_barang,
        //   gambar_barang: "1717054440508-edel.jpeg",
        //   kode_barang: newItem.value.kode_barang
        // }
      };
  
      const response = await axios.post(`${apiUrl}/barangKeluar`, newTransaksi);
      data.value.push(response.data);
     
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Gagal menambahkan barang. Silakan coba lagi.');
    }
  };

  

async function fetchData() {
  try {
    const response = await axios.get<BarangKeluar[]>('https://vjk2k0f5-5000.asse.devtunnels.ms/barangKeluar');
    data.value = response.data;
    filteredData.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const editItem = (index: number) => {
    currentItemIndex.value = index;
    const item = data.value[index];
    newItem.value = {
      nama_barang: item.barangs.nama_barang,
      kode_barang: item.barangs.kode_barang,
      jumlah_barang: item.jumlah_barang,
      jenis_barang: item.barangs.jenis_barang,
      harga_barang: item.barangs.harga_barang,
      tanggal_masuk: item.tanggal_masuk
    };
    isEditing.value = true;
    showForm.value = true;
  };
  
  const updateItem = async (index: number) => {
    try {
      const updatedTransaksi = {
        ...data.value[index],
        tanggal_masuk: newItem.value.tanggal_masuk,
        jumlah_barang: newItem.value.jumlah_barang,
        barangs: {
          ...data.value[index].barangs,
          nama_barang: newItem.value.nama_barang,
          kode_barang: newItem.value.kode_barang,
          jenis_barang: newItem.value.jenis_barang,
          harga_barang: newItem.value.harga_barang
        }
      };
  
      const response = await axios.put(`${apiUrl}/${updatedTransaksi.id_transaksi_barang}`, updatedTransaksi);
      data.value.splice(index, 1, response.data);
      resetForm();
      showForm.value = false;
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Gagal memperbarui barang. Silakan coba lagi.');
    }
  };
  
  const deleteItem = async (index: number) => {
    const item = data.value[index];
    const confirmDelete = confirm(`Apakah Anda yakin ingin menghapus ${item.barangs.nama_barang}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`${apiUrl}/${item.id_transaksi_barang}`);
        data.value.splice(index, 1);
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Gagal menghapus barang. Silakan coba lagi.');
      }
    }
  };
  
  const cancelForm = () => {
    resetForm();
    showForm.value = false;
  };
  
  const resetForm = () => {
    newItem.value = {
      nama_barang: '',
      kode_barang: '',
      jumlah_barang: 0,
      jenis_barang: '',
      harga_barang: 0,
      tanggal_masuk: ''
    };
    isEditing.value = false;
    currentItemIndex.value = null;
  };
  
  const validateForm = () => {
    const requiredFields: (keyof any)[] = ['tanggal_masuk', 'nama_barang', 'kode_barang', 'jumlah_barang', 'jenis_barang', 'harga_barang'];
    if (requiredFields.some((field) => !newItem.value[field])) {
      isFormIncomplete.value = true;
      return;
    }
    isEditing.value ? updateItem(currentItemIndex.value!) : addItem();
  };
  
  const searchItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}?search=${searchQuery.value}`);
      data.value = response.data;
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };
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

