<template>
    <LayoutWarek2 />
    <div class="container mx-auto mr-px">
      <h1 class="text-xl font-bold mb-4">Pre Order Details</h1>
      <table class="table-auto border-collapse border border-gray-300 min-w-max w-full text-sm">
        <thead>
          <tr>
            <th class="border border-gray-300 px-4 py-2">Nama Barang</th>
            <th class="border border-gray-300 px-4 py-2">Kode Barang</th>
            <th class="border border-gray-300 px-4 py-2">Harga Barang</th>
            <th class="border border-gray-300 px-4 py-2">Jumlah Barang</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orders" :key="index">
            <td class="border border-gray-300 px-4 py-2">{{ item.nama_barang }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ item.kode_barang }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ item.harga_barang }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ item.total_jumlah }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import LayoutWarek2 from "../components/LayoutWarek2.vue";
  
  const apiUrl = import.meta.env.VITE_API_URL;
  
  // Define the TypeScript interface for the API response structure
  interface PreOrderDetailBarang {
    nama_barang: string;
    kode_barang: string;
    harga_barang: number;
    total_jumlah: number;
  }
  
  // Reactive state to hold API response data
  const orders = ref<PreOrderDetailBarang[]>([]);
  
  // Function to fetch data from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/preorderdetailbarang`);
      orders.value = response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  // Fetch data when the component is mounted
  onMounted(fetchOrders);
  </script>
  
  <style scoped>
  .container {
    padding: 16px;
  }
  .table-auto th,
  .table-auto td {
    text-align: left;
  }
  </style>
  