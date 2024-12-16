<template>
    <LayoutDekan />
    <div class="container mx-auto py-4 mr-px">
      <h1 class="text-xl font-bold mb-4">Pre Order Details</h1>
  
      <!-- Loop melalui data container -->
      <div v-for="(container, index) in ordersGroupedByContainer" :key="index" class="card border border-gray-300 mb-6 rounded shadow">
        <!-- Card untuk Container -->
        <div class="p-4 bg-gray-100">
          <h2 class="text-lg font-semibold mb-2">Container ID: {{ container.id_container }}</h2>
          <p>Keterangan: {{ container.keterangan }}</p>
          <p>Status Warek 1: 
            <span :class="container.status_warek1 === 'PENDING' ? 'text-red-500' : 'text-green-500'">
              {{ container.status_warek1 }}
            </span>
          </p>
          <!-- Tampilkan tombol update jika status warek 1 masih PENDING -->
          <button
            v-if="container.status_warek1 === 'PENDING'"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
            @click="updateStatusDekan(container.id_container)"
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
              </tr>
            </thead>
            <tbody>
              <!-- Loop barang dalam setiap container -->
              <tr v-for="(item, idx) in container.barang" :key="idx">
                <td class="border border-gray-300 px-4 py-2">{{ item.nama_barang }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ item.kode_barang }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ item.harga_barang }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ item.total_jumlah }}</td>
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
  import LayoutWarek1 from "../components/LayoutWarek1.vue";
import LayoutDekan from "../components/LayoutDekan.vue";
  
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
  
  // Reactive states
  const orders = ref<any[]>([]);
  const ordersGroupedByContainer = ref<Container[]>([]);
  
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${apiUrl}/barangpreoderapproveddekan`, {
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
  
  const updateStatusDekan = async (idContainer: number) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`${apiUrl}/databarangpreorderdekan/${idContainer}`, {
        status_warek1: "APPROVED",
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
      alert("Status berhasil diupdate!");
    } catch (error) {
      console.error("Error updating status:");
      alert("Gagal mengupdate status!");
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
  
    