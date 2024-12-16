<template>
    <LayoutKaprodi />
    <div class="container mx-auto py-4 mr-px">
      <h1 class="text-xl font-bold mb-4">Pre Order Details</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4 bg-white shadow-md rounded-lg p-6 mb-12">
      <!-- Judul -->
      <h1 class="text-2xl font-bold text-gray-800">Form Pre Order</h1>

      <!-- Input Keterangan -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">
          Keterangan
        </label>
        <textarea
          id="description"
          v-model="send.keterangan"
          rows="3"
          class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Isi keterangan..."
        ></textarea>
      </div>

      <!-- Tombol Submit -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </div>
    </form>
      <!-- Loop melalui data container -->
      <div v-for="(container, index) in ordersGroupedByContainer" :key="index" class="card border border-gray-300 mb-6 rounded shadow">
        <!-- Card untuk Container -->
        <div class="p-4 bg-gray-100">
          <h2 class="text-lg font-semibold mb-2">Container ID: {{ container.id_container }}</h2>
          <p>Keterangan: {{ container.keterangan }}</p>
          <p>Status: 
            <span :class="container.status_kaprodi === 'PENDING' ? 'text-red-500' : 'text-green-500'">
              {{ container.status_kaprodi }}
            </span>
          </p>
          <!-- Tampilkan tombol update jika status warek 1 masih PENDING -->
          <button
            v-if="container.status_kaprodi === 'PENDING'"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
            @click="updateStatus(container.id_container)"
          >
            Update Status
          </button>
        </div>
  
        <!-- Card dalam card untuk tabel barang -->
        <div class="p-4">
          <h3 class="font-semibold mb-2">Daftar Barang</h3>
          <table class="table-auto border-collapse border border-gray-300 min-w-full text-sm">
            <thead>
              <tr>
                <th class="border border-gray-300 px-4 py-2">Nama Barang</th>
                <th class="border border-gray-300 px-4 py-2">Kode Barang</th>
                <th class="border border-gray-300 px-4 py-2">Harga Barang</th>
                <th class="border border-gray-300 px-4 py-2">Jumlah Barang</th>
                <th class="border border-gray-300 px-4 py-2">Kalkulasi Harga</th>
              </tr>
            </thead>
            <tbody>
              <!-- Loop barang dalam setiap container -->
              <tr v-for="(item, idx) in container.barang" :key="idx">
                <td class="border border-gray-300 px-4 py-2">{{ item.nama_barang }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ item.kode_barang }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ item.harga_barang }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ item.total_jumlah }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ item.kalkulasi_harga }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
    
    
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import LayoutKaprodi from "../components/LayoutKaprodi.vue";
  
  const apiUrl = import.meta.env.VITE_API_URL;
  
  // Define interfaces
  interface Barang {
    id_barang_preorder: number;
    nama_barang: string;
    kode_barang: string;
    harga_barang: number;
    total_jumlah: number;
    kalkulasi_harga: number;
  }
  
  interface Container {
    id_container: number;
    keterangan: string;
    status_kaprodi: string;
    status_dekan: string;
    status_warek1: string;
    status_warek2: string;
    status_pm: string;
    status_admin: string;
    barang: Barang[];
  }
  
  const send = ref<any>({
    keterangan: '',
  })
  // Reactive states
  const orders = ref<any[]>([]);
  const ordersGroupedByContainer = ref<Container[]>([]);
  
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${apiUrl}/barangpreoderapproved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      orders.value = response.data;
  
      const grouped = orders.value.reduce((acc: Record<number, Container>, item) => {
        const container = item.ContainerDataBarangPreOrder;
        if (!acc[container.id_container]) {
          acc[container.id_container] = { ...container, barang: [] };
        }
        acc[container.id_container].barang.push({
          id_barang_preorder: item.id_barang_preorder,
          nama_barang: item.nama_barang,
          kode_barang: item.kode_barang,
          harga_barang: item.harga_barang,
          total_jumlah: item.total_jumlah,
          kalkulasi_harga: item.kalkulasi_harga,
        });
        return acc;
      }, {});
      ordersGroupedByContainer.value = Object.values(grouped);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  const updateStatus = async (idContainer: number) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${apiUrl}/preorderdetailbarang/`, {
        keterangan: send.value.keterangan,
      });
      fetchOrders();
      alert("Status berhasil diupdate!");
    } catch (error) {
      console.error("Error updating status:");
      alert("Gagal mengupdate status!");
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token tidak ditemukan!");
      return;
    }

    try {
      await axios.post(`${apiUrl}/preorderdetailbarang/`, {
        keterangan: send.value.keterangan,
      });
      alert("Keterangan berhasil disimpan!");
    } catch (error) {
      console.error("Gagal menyimpan keterangan:", error);
      alert("Terjadi kesalahan, coba lagi.");
    }
  };


  
  onMounted(fetchOrders);
  </script>
  
  
    
  <style scoped>
  .container {
    padding: 16px;
  }
  
  .card {
    background-color: white;
    overflow: hidden;
  }
  
  .card .table-auto th,
  .card .table-auto td {
    text-align: left;
    padding: 8px;
  }
  
  .card .table-auto th {
    background-color: #f3f4f6;
    font-weight: bold;
  }
  
  .card .table-auto td {
    background-color: #fff;
  }
  </style>
  
    