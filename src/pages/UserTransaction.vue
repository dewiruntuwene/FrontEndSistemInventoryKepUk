<template>
  <Navbar/>
  <div class="min-h-screen bg-gray-100 p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Daftar Transaksi</h1>
    <div class="flex justify-center mb-4">
      <button @click="filterStatus('all')" :class="buttonClass('all')" class="mx-2 px-4 py-2 rounded">Semua</button>
      <button @click="filterStatus('sukses')" :class="buttonClass('sukses')" class="mx-2 px-4 py-2 rounded">Sukses</button>
      <button @click="filterStatus('pending')" :class="buttonClass('pending')" class="mx-2 px-4 py-2 rounded">Pending</button>
      <button @click="filterStatus('dibatalkan')" :class="buttonClass('dibatalkan')" class="mx-2 px-4 py-2 rounded">Dibatalkan</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="transaction in filteredTransactions" :key="transaction.tanggal_pengambilan" class="bg-white p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-2">{{ transaction.nama_matakuliah }}</h2>
        <p class="text-gray-700 mb-4">Jam Praktek: {{ transaction.jam_praktek }}</p>
        <p class="text-gray-700 mb-4">Tanggal Praktek: {{ transaction.tanggal_praktek }}</p>
        <p :class="statusClass(transaction.status)">{{ transaction.status }}</p>
        <div v-for="item in transaction.barangPinjam" :key="item.kode_barang" class="mt-2">
          <p class="text-gray-600">{{ item.nama_barang }} - Jumlah: {{ item.jumlah_barang }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Navbar from "../components/Navbar.vue";

const apiUrl = import.meta.env.VITE_API_URL;

interface BarangPinjam {
  kode_barang: string;
  jumlah_barang: number;
  nama_barang: string;
}

interface Transaction {
  nama_matakuliah: string;
  prasat: string;
  jam_praktek: string;
  tanggal_praktek: string;
  tanggal_pengambilan: string;
  status: 'sukses' | 'pending' | 'dibatalkan';
  users: {
    username: string;
  };
  barangPinjam: BarangPinjam[];
}

const transactions = ref<Transaction[]>([]);

const fetchTransactions = async () => {
  try {
    const response = await axios.get(`${apiUrl}/peminjamBarang`);
    const data = response.data.map((transaction: any) => {
      if (transaction.type === 'BarangKeluar') {
        transaction.status = 'sukses';
      }
      // Anda bisa menambahkan logika serupa untuk mengubah type lain ke status yang sesuai
      return transaction;
    });
    transactions.value = data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};

onMounted(() => {
  fetchTransactions();
});

const filter = ref<'all' | 'sukses' | 'pending' | 'dibatalkan'>('all');

const filterStatus = (status: 'all' | 'sukses' | 'pending' | 'dibatalkan') => {
  filter.value = status;
};

const filteredTransactions = computed(() => {
  if (filter.value === 'all') {
    return transactions.value;
  }
  return transactions.value.filter(transaction => transaction.status === filter.value);
});

const buttonClass = (status: 'all' | 'sukses' | 'pending' | 'dibatalkan') => {
  return filter.value === status ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black';
};

const statusClass = (status: 'sukses' | 'pending' | 'dibatalkan') => {
  switch (status) {
    case 'sukses':
      return 'text-green-500';
    case 'pending':
      return 'text-yellow-500';
    case 'dibatalkan':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};
</script>

<style scoped>
button {
  @apply px-4 py-2 rounded;
}
</style>