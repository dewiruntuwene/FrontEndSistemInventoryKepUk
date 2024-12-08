<template>
    <Navbar />
    <div class="flex p-6 min-h-screen bg-gray-100">
      <!-- Tabel -->
      <div class="w-2/3 mt-24">
        <table class="table-auto w-full border-collapse border border-gray-300">
          <thead class="bg-gray-200">
            <tr>
              <th class="border border-gray-300 px-4 py-2">No</th>
              <th class="border border-gray-300 px-4 py-2">Date</th>
              <th class="border border-gray-300 px-4 py-2">Transaction</th>
              <th class="border border-gray-300 px-4 py-2">Nama Barang</th>
              <th class="border border-gray-300 px-4 py-2">Jumlah PO</th>
              <th class="border border-gray-300 px-4 py-2">Jumlah Pemakaian</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(transaction, index) in transactions"
              :key="index"
              class="hover:bg-gray-100 cursor-pointer"
              @click="selectTransaction(transaction)"
            >
              <td class="border border-gray-300 px-4 py-2">#{{ index + 1 }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ formatDate(transaction.date) }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ transaction.transactionType }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ transaction.namaBarang }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ transaction.jumlahPO }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ transaction.jumlahPemakaian }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Card -->
      <div v-if="selectedTransaction" class="w-1/3 ml-6 bg-gray-200 rounded-lg shadow-lg p-4">
        <h2 class="text-xl font-bold mb-2">{{ selectedTransaction.transactionType }}</h2>
        <p class="text-gray-600 mb-4">{{ formatDate(selectedTransaction.date) }}</p>
        <div>
          <div class="flex justify-between py-1 border-b border-gray-300">
            <span>Nama Barang</span>
            <span>{{ selectedTransaction.namaBarang }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-gray-300">
            <span>Jumlah PO</span>
            <span>{{ selectedTransaction.jumlahPO }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-gray-300">
            <span>Jumlah Pemakaian</span>
            <span>{{ selectedTransaction.jumlahPemakaian }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import Navbar from "../components/Navbar.vue";

  const apiUrl = import.meta.env.VITE_API_URL;
  
  // Tipe untuk transaksi
  interface Transaction {
    date: string;
    transactionType: string;
    namaBarang: string;
    jumlahPO: string;
    jumlahPemakaian: string;
  }
  
  // State untuk menyimpan data transaksi dan transaksi yang dipilih
  const transactions = ref<Transaction[]>([]);
  const selectedTransaction = ref<Transaction | null>(null);
  
  // Fungsi untuk memformat tanggal
  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("id-ID", options);
  };
  
  // Fungsi untuk memilih transaksi
  const selectTransaction = (transaction: Transaction) => {
    selectedTransaction.value = transaction;
  };
  
  // Fungsi untuk mengambil data dari API dan memformat data
  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${apiUrl}/transaction`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
  
      transactions.value = data.map((item: any) => ({
        date: item.tanggal,
        transactionType: item.transaksi_type,
        namaBarang: item.nama_barang,
        jumlahPO: item.jenis_transaksi === "Debit" ? `${item.jumlah} item` : "0 item",
        jumlahPemakaian: item.jenis_transaksi === "Credit" ? `${item.jumlah} item` : "0 item",
      }));
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  
  // Panggil fetchTransactions saat komponen dimuat
  onMounted(fetchTransactions);
  </script>
  
  <style>
  /* Tambahkan styling tambahan jika diperlukan */
  </style>
  