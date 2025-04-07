<template>
    <Navbar />
    <div class="flex mx-auto p-6 min-h-screen bg-gray-100">
      <!-- Tabel -->
      <div class="w-2/3 mt-24">
        <table class="table-auto w-full border-collapse border border-gray-300">
          <thead class="bg-gray-200">
            <tr>
              <th class="border border-gray-300 px-4 py-2">No</th>
              <th class="border border-gray-300 px-4 py-2">Date</th>
              <th class="border border-gray-300 px-4 py-2">Transaction</th>
              <th class="border border-gray-300 px-4 py-2">Nama Barang</th>
              <th class="border border-gray-300 px-4 py-2">Prasat</th>
              <th class="border border-gray-300 px-4 py-2">Jumlah PO</th>
              <th class="border border-gray-300 px-4 py-2">Jumlah Pemakaian</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(transaction, index) in transactions"
              :key="index"
              class="hover:bg-gray-100"
            >
              <td class="border border-gray-300 px-4 py-2">#{{ index + 1 }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ formatDate(transaction.date) }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ transaction.transactionType }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ transaction.namaBarang }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ transaction.namaPrasat }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ transaction.jumlahPO }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ transaction.jumlahPemakaian }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Card -->
      <div class="w-1/5 ml-64 bg-gray-200 rounded-lg shadow-lg p-4  min-h-screen">
        <h2 class="text-xl font-bold mb-2">Transaction Details</h2>
        <p class="text-gray-600 mb-4">Transaction Dashboard</p>
        <div class="flex flex-col">
          <div v-for="(prasat, index) in transactionssisa" class="bg-white rounded-lg shadow-lg p-4 mb-4">
            <h3 class="text-lg font-bold mb-2">{{ prasat[0].nama_prasat }}</h3>
            <div
              v-for="(barang, index) in prasat"
              class="flex justify-between py-1 border-b border-gray-300"
            >
              <span>{{ barang.nama_barang }}</span>
              <span
                :class="{'text-red-500 font-bold': barang.jumlah_barang_po < 6}"
              >
                {{ barang.jumlah_barang_po }}
              </span>
            </div>

          </div>
        </div>
      </div>

      <!-- If there's no data, show an empty placeholder card -->
      <!-- <div v-else class="w-1/3 ml-6 bg-gray-200 rounded-lg shadow-lg p-4">
        <p>No data available</p>
      </div> -->
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
    namaPrasat: string;
  }

  interface TransactionsSisa {
    nama_barang: string;
    jumlah_barang_po: number;
    nama_prasat: string;
  }
  
  // State untuk menyimpan data transaksi dan transaksi yang dipilih
  const transactions = ref<Transaction[]>([]);
  const transactionssisa = ref<{
    nama_barang: string;
    jumlah_barang_po: number;
    nama_prasat: string;
  }[][]>([]);
  // Fungsi untuk memformat tanggal
  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("id-ID", options);
  };
  
  // Fungsi untuk memilih transaksi
  // const selectTransaction = (transaction: Transaction) => {
  //   transactionssisa.value = transaction;
  // };
  
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
        namaPrasat: item.nama_prasat,
        jumlahPO: item.jenis_transaksi === "Debit" ? `${item.jumlah} item` : "0 item",
        jumlahPemakaian: item.jenis_transaksi === "Credit" ? `${item.jumlah} item` : "0 item",
      }));
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

// Fungsi untuk mengambil data dari API dan memformat data
const fetchSisaTransactions = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/sisabarang`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;

    // Ubah data menjadi array
    const dataArray = Object.values(data) as {
      nama_barang: string;
      jumlah_barang_po: number;
      nama_prasat: string;
    }[][];

    // Cek apakah ada barang dengan jumlah di bawah 6
    dataArray.forEach(prasat => {
      prasat.forEach(barang => {
        if (barang.jumlah_barang_po < 6) {
          alert(
            `Peringatan! Barang "${barang.nama_barang}" tinggal ${barang.jumlah_barang_po} item. Segera lakukan pemesanan ulang.`
          );
        }
      });
    });

    transactionssisa.value = dataArray;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};
  
  // Panggil fetchTransactions saat komponen dimuat
  onMounted(() => {
    fetchTransactions();
    fetchSisaTransactions(); // Add this to fetch 'transactionssisa'
  });

  </script>
  
  <style>
  /* Tambahkan styling tambahan jika diperlukan */
  </style>
  