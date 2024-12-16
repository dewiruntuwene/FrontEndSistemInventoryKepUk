<template>
    <LayoutWarek1 />
    <div class="container mx-auto py-6 mr-px">
      <h1 class="text-2xl font-bold mb-6">Approval Tracking</h1>
      <div v-for="(container, index) in ordersGroupedByContainer" :key="index" class="mb-8">
        <div class="border border-gray-300 rounded-md p-4">
          <h2 class="text-lg font-semibold mb-4">Container: {{ container.keterangan }}</h2>
          <div class="flex items-center gap-2">
            <!-- Status Step -->
            <div v-for="(status, index) in approvalStatuses" :key="status.key" class="flex flex-col  items-center relative">
              <div
                :class="[ 'w-8 h-8 rounded-full flex items-center justify-center text-white text-sm', getStatusColor(container[status.key]) ]"
              >
              <!-- FontAwesome Checkmark Icon -->
              <span v-if="container[status.key] === 'APPROVED'" class="text-white text-lg">
                <i class="fas fa-check"></i> <!-- Ikon centang dari FontAwesome -->
              </span>
  
  
                <!-- <span v-else>{{ status.label.charAt(0) }}</span> -->
              </div>
              <span class="text-sm mt-2">{{ status.label }}</span>
              <span class="text-xs mt-1 text-gray-500">{{ container[status.dateKey] || 'Pending' }}</span>
              
              <!-- Arrow -->
              <div v-if="index < approvalStatuses.length - 1" class="absolute right-[-80px] top-[50%] transform -translate-y-[50%] text-gray-500">
                <i class="fas fa-arrow-right"></i>
              </div>
  
            </div>
          </div>
          <table class="table-auto border-collapse border border-gray-300 w-full text-sm mt-6">
            <thead>
              <tr>
                <th class="border border-gray-300 px-4 py-2">Nama Barang</th>
                <th class="border border-gray-300 px-4 py-2">Kode Barang</th>
                <th class="border border-gray-300 px-4 py-2">Harga Barang</th>
                <th class="border border-gray-300 px-4 py-2">Jumlah Barang</th>
                <th class="border border-gray-300 px-4 py-2">Kalkulasi Harga</th>
                <th class="border border-gray-300 px-4 py-2">Barang Sudah di Beli</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(barang, barangIndex) in container.barang" :key="barangIndex">
                <td class="border border-gray-300 px-4 py-2">{{ barang.nama_barang }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ barang.kode_barang }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ barang.harga_barang }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ barang.total_jumlah }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ barang.kalkulasi_harga }}</td>
                <td class="border border-gray-300 px-4 py-2 text-center align-middle">
                    <!-- Jika sudah_dibeli == "NO", tampilkan tombol -->
                    <span v-if="barang.sudah_dibeli === 'NO'">
                    <button
                        class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        @click="updateSudahDibeli(barang.id_barang_preorder)"
                    >
                        Update to YES
                    </button>
                    </span>
                    <!-- Jika sudah_dibeli == "YES", tampilkan teks hijau -->
                    <span v-else class="text-green-500 font-bold">YES</span>
                </td>
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
  
  // Tipe data
  interface Barang {
    id_barang_preorder: number;
    nama_barang: string;
    kode_barang: string;
    harga_barang: number;
    total_jumlah: number;
    kalkulasi_harga: number;
    sudah_dibeli: string;
    sudah_diterima: string;
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
    tanggal_update_kaprodi: string;
    tanggal_update_dekan: string;
    tanggal_update_warek1: string;
    tanggal_update_warek2: string;
    tanggal_update_pm: string;
    tanggal_update_admin: string;
    barang: Barang[];
  }
  
  // Reactive states
  const orders = ref<any[]>([]);
  const ordersGroupedByContainer = ref<Container[]>([]);
  
  const apiUrl = import.meta.env.VITE_API_URL;
  
  interface ApprovalStatus {
    key: "status_kaprodi" | "status_dekan" | "status_warek1" | "status_warek2" | "status_pm" | "status_admin";
    label: string;
    dateKey: "tanggal_update_kaprodi" | "tanggal_update_dekan" | "tanggal_update_warek1" | "tanggal_update_warek2" | "tanggal_update_pm" | "tanggal_update_admin";
  }
  
  
  const approvalStatuses: ApprovalStatus[] = [
    { key: "status_kaprodi", label: "Kaprodi", dateKey: "tanggal_update_kaprodi" },
    { key: "status_dekan", label: "Dekan", dateKey: "tanggal_update_dekan" },
    { key: "status_warek1", label: "Warek 1", dateKey: "tanggal_update_warek1" },
    { key: "status_warek2", label: "Warek 2", dateKey: "tanggal_update_warek2" },
    { key: "status_pm", label: "PM", dateKey: "tanggal_update_pm" },
    { key: "status_admin", label: "Admin", dateKey: "tanggal_update_admin" }
  ];
  
  
  
  // Fungsi untuk mendapatkan warna berdasarkan status
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500";
      case "PENDING":
        return "bg-orange-500";
      case "REJECTED":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };
  
  // Format tanggal menjadi format yang diinginkan
  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("id-ID", options);
    return formattedDate;
  };
  
  // Fetch data dari API
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${apiUrl}/barangpreoderapprovedwarek1`, {
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
          sudah_dibeli: item.sudah_dibeli,
          sudah_diterima: item.sudah_diterima
        });
        return acc;
      }, {});
      ordersGroupedByContainer.value = Object.values(grouped);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  onMounted(fetchOrders);

  const updateSudahDibeli = async (id_barang_preorder: number) => {
    const token = localStorage.getItem("token");
    try {
        await axios.patch(
        `${apiUrl}/barangsudahdibeli/${id_barang_preorder}`,
        { sudah_dibeli: "YES" },
        { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchOrders();
        alert("Status sudah_dibeli berhasil diupdate!");
    } catch (error) {
        console.error("Error updating sudah_dibeli:", error);
        alert("Gagal mengupdate status sudah_dibeli!");
    }
  };
  </script>
  
  <style scoped>
  .container {
    padding: 16px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .rounded-full {
    border-radius: 9999px;
  }
  .w-8 {
    width: 2rem;
    height: 2rem;
  }
  .bg-green-500 {
    background-color: #38a169;
  }
  .bg-orange-500 {
    background-color: #dd6b20;
  }
  .bg-red-500 {
    background-color: #e53e3e;
  }
  .bg-gray-400 {
    background-color: #a0aec0;
  }
  .text-lg {
    font-size: 1.125rem;
  }
  .text-white {
    color: white;
  }
  .text-sm {
    font-size: 0.875rem;
  }
  .text-xs {
    font-size: 0.75rem;
  }
  .text-gray-500 {
    color: #6b7280;
  }
  .fas {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
  }
  .fa-arrow-right {
    font-size: 1.25rem;
  }
  
  .checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
  }
  
  .checkmark::before {
    content: '✔';  /* Simbol centang */
    font-size: 18px;
    color: white;
  }
  
  </style>
  
  