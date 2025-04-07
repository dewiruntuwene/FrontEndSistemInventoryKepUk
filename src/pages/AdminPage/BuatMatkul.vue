<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import Layout from "../../components/layout.vue";

// URL API dari environment variable
const apiUrl = import.meta.env.VITE_API_URL;

// State untuk form create mata kuliah
const namaMatakuliah = ref("");

// State untuk list mata kuliah
const mataKuliahList = ref<Matakuliah[]>([]);

// Interface untuk mata kuliah
interface Matakuliah {
  id_matakuliah: number;
  nama_matakuliah: string;
}

// Fungsi untuk mendapatkan data mata kuliah
const fetchMataKuliah = async () => {
  try {
    const response = await axios.get(`${apiUrl}/matakuliah`);
    mataKuliahList.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Gagal memuat data mata kuliah.");
  }
};

// Fungsi untuk membuat mata kuliah baru
const createMataKuliah = async () => {
  if (!namaMatakuliah.value) {
    alert("Nama mata kuliah harus diisi.");
    return;
  }

  try {
    const response = await axios.post(`${apiUrl}/matakuliah`, {
      nama_matakuliah: namaMatakuliah.value,
    });

    alert(response.data.message || "Mata kuliah berhasil dibuat.");
    namaMatakuliah.value = ""; // Reset input field
    fetchMataKuliah(); // Refresh list setelah menambah data
  } catch (error) {
    console.error("Error creating mata kuliah:", error);
    alert("Gagal membuat mata kuliah.");
  }
};

// Load data mata kuliah ketika komponen dimuat
onMounted(() => {
  fetchMataKuliah();
});
</script>

<template>
    <Layout />
    <div class="p-6">
      <!-- Form Create Mata Kuliah -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Tambah Mata Kuliah</h2>
        <div class="flex items-center space-x-4">
          <input
            v-model="namaMatakuliah"
            type="text"
            placeholder="Masukkan nama mata kuliah"
            class="border border-gray-300 p-2 rounded w-1/2"
          />
          <button
            @click="createMataKuliah"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Tambah
          </button>
        </div>
      </div>
  
      <!-- List Mata Kuliah -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Daftar Mata Kuliah</h2>
        <div class="overflow-y-auto max-h-[70vh]">
          <table class="w-full border-collapse border border-gray-200 overflow-y-auto max-h-[70vh]">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="py-2 px-4 border">ID</th>
              <th class="py-2 px-4 border">Nama Mata Kuliah</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="matkul in mataKuliahList"
              :key="matkul.id_matakuliah"
              class="hover:bg-gray-100"
            >
              <td class="py-2 px-4 border">{{ matkul.id_matakuliah }}</td>
              <td class="py-2 px-4 border">{{ matkul.nama_matakuliah }}</td>
            </tr>
          </tbody>
        </table>
        </div>
        
      </div>
    </div>
  </template>
  



<style>
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
       .font-family-karla { font-family: karla; }
        .bg-sidebar { background: #3d68ff; }
        .cta-btn { color: #3d68ff; }
        .upgrade-btn { background: #1947ee; }
        .upgrade-btn:hover { background: #0038fd; }
        .active-nav-link { background: #1947ee; }
        .nav-item:hover { background: #1947ee; }
        .account-link:hover { background: #3d68ff; }
</style>
