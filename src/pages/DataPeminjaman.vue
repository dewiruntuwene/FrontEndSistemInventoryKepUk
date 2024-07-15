<template>
  <Layout />
  <div class="mt-0 pl-60 sticky top-0 z-50">
    <div
      class="border-b-2 border-black flex flex-row justify-between items-center p-3"
    >
      <h4 class="pa-3 text-2xl font-bold">Data Peminjaman</h4>
    </div>
  </div>
  <div class="mt-0 pb-5 pl-[15rem]">
    <!-- Tabel -->
    <div
      class="container max-w-4xl mx-auto mr-xs mt-4 flex justify-left mb-4 overflow-x-auto"
    >
      <div class="bg-white shadow bg-blue-500 overflow-hidden sm:rounded-lg">
        <div
          class="overflow-x-auto mx-auto max-w-4xl mr-10 min-w-3.5 h-fit pt-2"
        >
          <table class="min-w-full divide-y divide-gray-200 justify-center">
            <!-- Tabel Header -->
            <thead class="bg-blue-200">
              <tr>
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                >
                  Id Peminjam
                </th>
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                >
                  Nama Dosen
                </th>
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                >
                  Nama Mata Kuliah
                </th>
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                >
                  Prasat
                </th>
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                >
                  Jam Praktek
                </th>
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                >
                  Tanggal Pengambilan
                </th>
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                >
                  Barang yang Dipinjam
                </th>
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                >
                  Action
                </th>
              </tr>
            </thead>
            <!-- Tabel Body -->
            <tbody class="bg-white divide-y divide-gray-200 mr-mx">
              <!-- Data -->
              <tr v-for="(transaction, index) in transactions" :key="index">
                <!-- Isi Tabel -->
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">
                    {{ transaction.id_peminjam }}
                  </div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">
                    {{ transaction.users.username }}
                  </div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">
                    {{ transaction.nama_matakuliah }}
                  </div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">
                    {{ transaction.prasat }}
                  </div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">
                    {{ transaction.jam_praktek }}
                  </div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">
                    {{ transaction.tanggal_pengambilan }}
                  </div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">
                    <ul>
                      <li
                        v-for="(item, index) in transaction.barangHabisPakai"
                        :key="index"
                      >
                        {{ item.nama_barang }} ({{ item.jenis_barang }}) -
                        {{ item.jumlah_barang }}
                      </li>
                    </ul>
                  </div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap text-center">
                  <template v-if="transaction.status === 'pending'">
                    <button
                      v-if="transaction.barangHabisPakai[0].jenis_barang === 'Barang Habis Pakai'"
                      @click="updateTransactionOrder(Number(transaction.id_peminjam))"
                      type="button"
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Selesai
                    </button>
                    <button
                      v-if="transaction.barangHabisPakai[0].jenis_barang === 'Barang Pinjam'"
                      @click="updateTransactionPinjam(Number(transaction.id_peminjam))"
                      type="button"
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Selesai
                    </button>
                    <button
                      @click="updateTransactionOrder(Number(transaction.id_peminjam))"
                      type="button"
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Ditolak
                    </button>
                  </template>
                  <template v-else>
                    <span
                      :class="{
                        'text-green-500': transaction.status === 'sukses',
                        'text-red-500': transaction.status === 'dibatalkan',
                      }"
                      class="font-semibold"
                    >{{ transaction.status }}</span>
                  </template>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Layout from "../components/layout.vue";

const apiUrl = import.meta.env.VITE_API_URL;

interface BarangHabisPakai {
  kode_barang: string;
  jumlah_barang: number;
  nama_barang: string;
  jenis_barang: string;
}

interface Transaction {
  id_peminjam: number;
  nama_matakuliah: string;
  prasat: string;
  jam_praktek: string;
  tanggal_praktek: string;
  tanggal_pengambilan: string;
  status: "sukses" | "pending" | "dibatalkan";
  users: {
    username: string;
  };
  barangHabisPakai: BarangHabisPakai[];
}



const transactions = ref<Transaction[]>([]);

const fetchTransactions = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/orderBarang`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data.map((transaction: any) => {
      if (transaction.type === "BarangKeluar") {
        transaction.status = "sukses";
      }else if (transaction.type === "BarangPinjam") {
        transaction.status = "sukses";
      }else if (transaction.type === "PENDING") {
        transaction.status = "pending";
      } else if (transaction.type === "CANCEL") {
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

const updateTransactionOrder = async (id_peminjam: any) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.patch(
      `${apiUrl}/orderBarang/${id_peminjam}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    alert("Sukses Masuk Barang Keluar!");
    // Update local state after successful patch
    // const updatedTransaction = transactions.value.find(t => t.id_peminjam === id_peminjam);
    // if (updatedTransaction) {
    //   updatedTransaction.status = status;
    // }
  } catch (error) {
    console.error("Error updating transaction:", error);
  }
};

const updateTransactionPinjam = async (id_peminjam: any) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.patch(
      `${apiUrl}/pinjamBarang/${id_peminjam}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    alert("Sukses Masuk Barang Pinjam!");
    // Update local state after successful patch
    // const updatedTransaction = transactions.value.find(t => t.id_peminjam === id_peminjam);
    // if (updatedTransaction) {
    //   updatedTransaction.status = status;
    // }
  } catch (error) {
    console.error("Error updating transaction:", error);
  }
};

onMounted(() => {
  fetchTransactions();
});
</script>

<style scoped>
/* Tidak diperlukan jika menggunakan Tailwind CSS dari CDN */
table {
  font-size: 14px;
}

th,
td {
  padding: 8px;
}

/* Membuat tabel responsif */
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Menambahkan viewport meta tag untuk responsivitas */
@media only screen and (max-width: 480px) {
  /* Sesuaikan lebar tabel dengan layar perangkat */
  .max-w-full {
    width: 100%;
  }
}
</style>
