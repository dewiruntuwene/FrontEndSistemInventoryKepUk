<template>
    <Navbar />
    <div class="daftar min-h-screen bg-gray-100 p-4">
      <h1 class="text-3xl font-bold mb-6 text-center">Daftar Transaksi</h1>
      <div class="flex justify-center mb-4">
        <button
          @click="filterStatus('all')"
          :class="buttonClass('all')"
          class="mx-2 px-4 py-2 rounded"
        >
          Semua
        </button>
        <button
          @click="filterStatus('sukses')"
          :class="buttonClass('sukses')"
          class="mx-2 px-4 py-2 rounded"
        >
          Sukses
        </button>
        <button
          @click="filterStatus('pending')"
          :class="buttonClass('pending')"
          class="mx-2 px-4 py-2 rounded"
        >
          Pending
        </button>
        <button
          @click="filterStatus('dibatalkan')"
          :class="buttonClass('dibatalkan')"
          class="mx-2 px-4 py-2 rounded"
        >
          Dibatalkan
        </button>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="transaction in filteredTransactions"
          :key="transaction.tanggal_disetujui"
          class="bg-white p-4 rounded-lg shadow-md"
        >
          <div>
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-bold mb-2">
                {{ transaction.rencana_pemakaian }}
              </h2>
              <p :class="statusClass(transaction.status)">
                {{ transaction.status }}
              </p>
            </div>
  
            <!-- <p class="text-gray-700 mb-4">
              Jam Praktek: {{ transaction.jam_praktek }}
            </p>
            <p class="text-gray-700 mb-4">
              Tanggal Praktek: {{ transaction.tanggal_praktek }}
            </p> -->
            <div
              v-for="item in transaction.PreOrderPrasat"
              :key="item.nama_prasat"
              class="mt-2"
            >
              <p class="text-gray-600">
                {{ item.nama_prasat }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from "vue";
  import axios from "axios";
  import Navbar from "../components/Navbar.vue";
  
  const apiUrl = import.meta.env.VITE_API_URL;
  
interface Barang {
  id_barang: number;
  nama_barang: string;
  kode_barang: string;
}

interface BarangDalamPrasat {
  id_barang_dalam_paket: number;
  barang: Barang;
  jumlah_barang: number | null;
}

interface Prasat {
  barangDalamPrasat: BarangDalamPrasat[];
}

  interface PreOrderPrasat {
    nama_prasat: string;
    jumlah_barang: number;
    deskripsi: string;
    prasat: Prasat;
  }
  
  interface Transaction {
    tanggal_disetujui: string;
    rencana_pemakaian: string;
    status: "sukses" | "pending" | "dibatalkan";
    users: {
      username: string;
    };
    PreOrderPrasat: PreOrderPrasat[];
  }
  
  const transactions = ref<Transaction[]>([]);
  
  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${apiUrl}/preorder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.map((transaction: any) => {
        if (transaction.type === "APPROVED") {
          transaction.status = "sukses";
        } else if (transaction.type === "PENDING") {
          transaction.status = "pending";
        } else if (transaction.type === "REJECTED") {
          transaction.status = "dibatalkan";
        }
        // Anda bisa menambahkan logika serupa untuk mengubah type lain ke status yang sesuai
        return transaction;
      });
      transactions.value = data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  
  onMounted(() => {
    fetchTransactions();
  });
  
  const filter = ref<"all" | "sukses" | "pending" | "dibatalkan">("all");
  
  const filterStatus = (status: "all" | "sukses" | "pending" | "dibatalkan") => {
    filter.value = status;
  };
  
  const filteredTransactions = computed(() => {
    if (filter.value === "all") {
      return transactions.value;
    }
    return transactions.value.filter(
      (transaction) => transaction.status === filter.value,
    );
  });
  
  const buttonClass = (status: "all" | "sukses" | "pending" | "dibatalkan") => {
    return filter.value === status
      ? "bg-blue-500 text-white"
      : "bg-gray-300 text-black";
  };
  
  const statusClass = (status: "sukses" | "pending" | "dibatalkan") => {
    switch (status) {
      case "sukses":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "dibatalkan":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };
  </script>
  
  <style scoped>
  button {
    @apply px-4 py-2 rounded;
  }
  
  /* Default styles */
  .grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
  
  /* Styles for mobile */
  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
      @apply grid-cols-2;
      @apply px-4 py-2 rounded m-2;
    }
  
    button {
      font-size: 0.5rem;
      padding: 0.5rem 1rem;
      @apply text-sm;
    }
  
    .daftar {
      font-size: 0.5rem;
      padding: 0.5rem 1rem;
    }
  }
  
  /* Styles for tablet */
  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
      @apply grid-cols-3;
    }
  
    button {
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      @apply px-4 py-2 rounded;
    }
  }
  </style>
  