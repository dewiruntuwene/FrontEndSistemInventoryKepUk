<template>
  <Layout />
  <div class="mt-0 pl-60 sticky top-0 z-50">
    <div
      class="border-b-2 border-black flex flex-row justify-between items-center p-3 non-printable"
    >
      <h4 class="pa-3 text-2xl font-bold">Data Order</h4>
    </div>
  </div>
  <div class="mt-0 pb-5 pl-[15rem]">
     <!-- Filter Username -->
     <div class="container max-w-4xl mx-auto ml-24 mt-8 flex justify-left mb-4">
      <select v-model="selectedUsername" class="border p-2 rounded w-full">
        <option value="">Filter berdasarkan username</option>
        <option v-for="username in uniqueUsernames" :key="username" :value="username">
          {{ username }}
        </option>
      </select>
    </div>
    <!-- Tabel -->
    <div class="max-w-6xl mx-auto mr-24">
      <div class="bg-white mt-5 ml-30 pl-28 relative overflow-y-auto max-h-96">

          <table class="min-w-max w-full table-auto">
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
                <!-- <th
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
                  Ruangan Lab
                </th> -->
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                >
                  Tanggal Order
                </th>
                <!-- <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                >
                  Tanggal Pengembalian
                </th> -->
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                >
                  Detail Barang
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
              <tr v-for="(transaction, index) in filteredTransactions" :key="index">
                <!-- Isi Tabel -->
                <td class="px-2 py-2 whitespace-nowrap text-center">
                  <div class="text-xs text-gray-900">
                    {{ transaction.id_peminjam }}
                  </div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap text-center">
                  <div class="text-xs text-gray-900">
                    {{ transaction.users.username }}
                  </div>
                </td>
                <!-- <td class="px-2 py-2 whitespace-nowrap">
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
                    {{ transaction.ruangan_lab }}
                  </div>
                </td> -->
                <td class="px-2 py-2 whitespace-nowrap text-center">
                  <div class="text-xs text-gray-900">
                    {{ transaction.tanggal_order }}
                  </div>
                </td>
                <!-- <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">
                    {{ transaction.tanggal_kembali_alat }}
                  </div>
                </td> -->
                <td class="px-2 py-2 whitespace-nowrap text-center">
                  <div class="text-xs text-gray-900">
                    <!-- Tampilkan Detail Barang -->
                    <button
                      @click="showDetailBarang(index)"
                      class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Detail
                    </button>
                    <!-- Modal untuk detail barang -->
                    <div
                      v-if="detailBarangIndex === index"
                      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
                    >
                      <div class="bg-white rounded-lg shadow-xl w-1/2 p-6 printable overflow-y-auto max-h-[70vh]">
                        <h2 class="text-xl font-bold mb-4">Detail Barang</h2>
                        <div class="flex space-x-24 ">
                          <div class="space-y-2">
                            <p>Nama Dosen</p>
                            <div class="border border-gray-300 rounded px-2 py-1 mb-2">{{ transaction.users.username }}</div>
                          </div>
                          <div class="space-y-2">
                            <p>Nama Matakuliah</p>
                            <div class="border border-gray-300 rounded px-2 py-1 mb-2">{{ transaction.nama_matakuliah }}</div>
                          </div>
                          <div class="space-y-2">
                            <p>Prasat</p>
                            <div class="border border-gray-300 rounded px-2 py-1 mb-2">{{ transaction.prasat }}</div>
                          </div>
                          <div class="space-y-2">
                            <p>Jam Praktek</p>
                            <div class="border border-gray-300 rounded px-2 py-1 mb-2">{{ transaction.jam_praktek }}</div>
                          </div>
                        </div>

                        <div class="flex space-x-12 mt-4">
                          <div class="space-y-2">
                            <p>Tanggal Pengembalian</p>
                            <div class="border border-gray-300 rounded px-2 py-1 mb-2">{{ transaction.tanggal_kembali_alat }}</div>
                          </div>
                          <div class="space-y-2">
                            <p>Ruangan Lab</p>
                            <div class="border border-gray-300 rounded px-2 py-1 mb-2">{{ transaction.ruangan_lab }}</div>
                          </div>
                          <div class="space-y-2">
                            <p>Tanggal Order</p>
                            <div class="border border-gray-300 rounded px-2 py-1 mb-2">{{ transaction.tanggal_order }}</div>
                          </div>
                          <div class="space-y-2">
                            <p>Tanggal Praktek</p>
                            <div class="border border-gray-300 rounded px-2 py-1 mb-2">{{ transaction.tanggal_praktek }}</div>
                          </div>
                        </div>

                        <div class="space-y-2">
                          <div class="space-y-2">
                            <p>Keterangan</p>
                            <div class="border border-gray-300 rounded px-2 py-1 mb-2">{{ transaction.keterangan }}</div>
                          </div>
                        </div>

                        <h3 class="text-lg font-bold mt-6">Barang Habis Pakai</h3>
                        <table class="min-w-full divide-y divide-gray-200 mt-4 overflow-x-auto">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                              >
                                No
                              </th>
                              <th
                                scope="col"
                                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                              >
                                Nama Barang
                              </th>
                              <th
                                scope="col"
                                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                              >
                                Kode Barang
                              </th>
                              <th
                                scope="col"
                                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                              >
                                Jenis Barang
                              </th>
                              <th
                                scope="col"
                                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                              >
                                Jumlah
                              </th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200 mr-mx text-left">
                            <tr
                              v-for="(item, index) in transaction.barangHabisPakai.filter(b => b.jenis_barang === 'Barang Habis Pakai')"
                              :key="index"
                            >
                              <td class="px-2 py-2 whitespace-nowrap text-center">
                                <div class="text-xs text-gray-900">
                                  {{ index + 1 }}
                                </div>
                              </td>
                              <td class="px-2 py-2 whitespace-nowrap text-center">
                                <div class="text-xs text-gray-900">
                                  {{ item.nama_barang }}
                                </div>
                              </td>
                              <td class="px-2 py-2 whitespace-nowrap text-center">
                                <div class="text-xs text-gray-900">
                                  {{ item.kode_barang }}
                                </div>
                              </td>
                              <td class="px-2 py-2 whitespace-nowrap text-center">
                                <div class="text-xs text-gray-900">
                                  {{ item.jenis_barang }}
                                </div>
                              </td>
                              <td class="px-2 py-2 whitespace-nowrap text-center">
                                <div class="text-xs text-gray-900">
                                  {{ item.jumlah_barang }}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!-- Pemisah Halaman -->
                        <div class="page-break"></div>

                        <h3 class="text-lg font-bold mt-6">Alat Kesehatan</h3>
                        <table class="min-w-full divide-y divide-gray-200 mt-4 overflow-x-auto">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                              >
                                No
                              </th>
                              <th
                                scope="col"
                                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                              >
                                Nama Barang
                              </th>
                              <th
                                scope="col"
                                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                              >
                                Kode Barang
                              </th>
                              <th
                                scope="col"
                                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                              >
                                Jenis Barang
                              </th>
                              <th
                                scope="col"
                                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center"
                              >
                                Jumlah
                              </th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200 mr-mx text-left">
                            <tr
                              v-for="(item, index) in transaction.barangHabisPakai.filter(b => b.jenis_barang === 'Alat Kesehatan')"
                              :key="index"
                            >
                              <td class="px-2 py-2 whitespace-nowrap text-center">
                                <div class="text-xs text-gray-900">
                                  {{ index + 1 }}
                                </div>
                              </td>
                              <td class="px-2 py-2 whitespace-nowrap text-center">
                                <div class="text-xs text-gray-900">
                                  {{ item.nama_barang }}
                                </div>
                              </td>
                              <td class="px-2 py-2 whitespace-nowrap text-center">
                                <div class="text-xs text-gray-900">
                                  {{ item.kode_barang }}
                                </div>
                              </td>
                              <td class="px-2 py-2 whitespace-nowrap text-center">
                                <div class="text-xs text-gray-900">
                                  {{ item.jenis_barang }}
                                </div>
                              </td>
                              <td class="px-2 py-2 whitespace-nowrap text-center">
                                <div class="text-xs text-gray-900">
                                  {{ item.jumlah_barang }}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <button
                          @click="closeDetailBarang"
                          class="non-printable mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Close
                        </button>
                        <button
                          @click="printTable()"
                          class="non-printable ml-4 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Print
                        </button>
                      </div>
                    </div>

                  </div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap text-center">
                  <template v-if="transaction.status === 'pending'">
                    <button
                      @click="
                        updateTransaction(Number(transaction.id_peminjam))
                      "
                      type="button"
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Selesai
                    </button>
                    <button
                      @click="
                        cancaelTransaction(Number(transaction.id_peminjam))
                      "
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
                      >{{ transaction.status }}</span
                    >
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
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
  tanggal_order: string;
  tanggal_kembali_alat: string;
  ruangan_lab: string;
  keterangan: string;
  status: "sukses" | "pending" | "dibatalkan";
  users: {
    username: string;
  };
  barangHabisPakai: BarangHabisPakai[];
}

const transactions = ref<Transaction[]>([]);
  const selectedUsername = ref<string>("");
const uniqueUsernames = computed(() => {
  // Mengambil username unik dari data transactions
  const usernames = transactions.value.map(transaction => transaction.users.username);
  return [...new Set(usernames)];
});

const fetchTransactions = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/dataOrderBarang`, {
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



const updateTransaction = async (id_peminjam: any) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.patch(
      `${apiUrl}/updateBarang/${id_peminjam}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    alert("Sukses Masuk Barang");
    reloadPage();
    // Update local state after successful patch
    // const updatedTransaction = transactions.value.find(t => t.id_peminjam === id_peminjam);
    // if (updatedTransaction) {
    //   updatedTransaction.status = status;
    // }
  } catch (error) {
    console.error("Error updating transaction:", error);
  }
};

const cancaelTransaction = async (id_peminjam: any) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.patch(
      `${apiUrl}/cancelOrder/${id_peminjam}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    alert("Order Dibatalkan");
    reloadPage();
    // Update local state after successful patch
    // const updatedTransaction = transactions.value.find(t => t.id_peminjam === id_peminjam);
    // if (updatedTransaction) {
    //   updatedTransaction.status = status;
    // }
  } catch (error) {
    console.error("Error updating transaction:", error);
  }
};

const reloadPage = () => {
  location.reload();
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

const filteredTransactions = computed(() => {
  if (selectedUsername.value) {
    return transactions.value.filter(transaction =>
      transaction.users.username === selectedUsername.value,
    );
  } else {
    return transactions.value;
  }
});

// Modal untuk detail barang
const detailBarangIndex = ref<number | null>(null);
const showDetailBarang = (index: number) => {
  detailBarangIndex.value = index;
};
const closeDetailBarang = () => {
  detailBarangIndex.value = null;
};

const printTable = () => {
  window.print();
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

@media print {
  body * {
    visibility: hidden;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .printable, .printable * {
    visibility: visible;
  }
  .printable {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    max-height: none !important;
    overflow: visible !important;
    page-break-before: auto;
    page-break-inside: avoid;
  }

  table {
    page-break-inside: auto;
  }

  thead {
    display: table-header-group;
  }

  tbody {
    display: table-row-group;
  }

  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }

  .page-break {
    page-break-before: always;
  }

   /* Sembunyikan elemen lain yang tidak diinginkan */
   .non-printable {
    display: none;
  }
}
</style>