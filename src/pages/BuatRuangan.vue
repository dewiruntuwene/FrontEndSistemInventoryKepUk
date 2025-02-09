<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import Layout from "../components/layout.vue";

// URL API dari environment variable
const apiUrl = import.meta.env.VITE_API_URL;

// State untuk form create ruangan lab
const namaRuanganLab = ref("");

// State untuk list ruangan lab
const ruanganLabList = ref<RuanganLab[]>([]);

// Interface untuk ruangan lab
interface RuanganLab {
  id_ruangan: number;
  nama_ruangan: string;
}

// Fungsi untuk mendapatkan data ruangan lab
const fetchRuanganLab = async () => {
  try {
    const response = await axios.get(`${apiUrl}/ruanganlab`);
    ruanganLabList.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Gagal memuat data ruangan lab.");
  }
};

// Fungsi untuk membuat ruangan lab baru
const createRuanganLab = async () => {
  if (!namaRuanganLab.value) {
    alert("Nama ruangan harus diisi.");
    return;
  }

  try {
    const response = await axios.post(`${apiUrl}/ruanganlab`, {
      nama_ruangan: namaRuanganLab.value,
    });

    alert(response.data.message || "Ruangan lab berhasil dibuat.");
    namaRuanganLab.value = ""; // Reset input field
    fetchRuanganLab(); // Refresh list setelah menambah data
  } catch (error) {
    console.error("Error creating ruangan lab:", error);
    alert("Gagal membuat ruangan lab.");
  }
};

// Load data ruangan lab ketika komponen dimuat
onMounted(() => {
  fetchRuanganLab();
});
</script>


<template>
  <Layout />
  <div class="p-6">
    <!-- Form Create Ruangan Lab -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Tambah Ruangan Lab</h2>
      <div class="flex items-center space-x-4">
        <input
          v-model="namaRuanganLab"
          type="text"
          placeholder="Masukkan nama ruangan lab"
          class="border border-gray-300 p-2 rounded w-1/2"
        />
        <button
          @click="createRuanganLab"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tambah
        </button>
      </div>
    </div>

    <!-- List Ruangan Lab -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Daftar Ruangan Lab</h2>
      <div class="overflow-y-auto max-h-[70vh]">
        <table class="w-full border-collapse border border-gray-200">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="py-2 px-4 border">ID</th>
            <th class="py-2 px-4 border">Nama Ruangan</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="lab in ruanganLabList"
            :key="lab.id_ruangan"
            class="hover:bg-gray-100"
          >
            <td class="py-2 px-4 border">{{ lab.id_ruangan }}</td>
            <td class="py-2 px-4 border">{{ lab.nama_ruangan }}</td>
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
