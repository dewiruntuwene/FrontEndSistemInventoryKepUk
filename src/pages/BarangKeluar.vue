<template>
  <Layout />
  <div class="mt-0 pl-60 sticky top-0 z-50">
    <div
      class="border-b-2 border-black flex flex-row justify-between items-center p-3"
    >
      <h4 class="pa-3 text-2xl font-bold">Data Barang Habis Pakai</h4>
      <div class="relative md:flex">
        <input
          v-model="searchQuery"
          @keydown.enter="searchItems"
          type="text"
          class="border border-gray-300 rounded px-2 py-1 mb-2 md:mb-0 md:mr-2"
          placeholder="Search..."
          id="search"
        />
        <button
          @click="searchItems"
          class="bg-gray-300 hover:bg-gray-400 rounded px-3 py-1"
        >
          Search
        </button>
      </div>
    </div>
  </div>

  <div class="max-w-6xl mx-auto">
    <div class="bg-white max-w-max mt-7 ml-24 pl-28 max-h-xs overflow-y-auto">
      <table class="min-w-max w-full table-auto">
        <thead>
          <tr
            class="bg-slate-400 text-gray-900 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-2 text-left border">No</th>
            <th class="py-3 px-2 text-left border">Tanggal Barang Keluar</th>
            <th class="py-3 px-2 text-left border">Nama Barang</th>
            <th class="py-3 px-2 text-left border">Kode Barang</th>
            <th class="py-3 px-2 text-left border">Jumlah Barang</th>
            <th class="py-3 px-2 text-left border">Jenis Barang</th>
            <th class="py-3 px-2 text-left border">Harga Barang</th>
            <th class="py-3 px-2 text-left border">Gambar Barang</th>
            <th class="py-3 px-2 text-left border"></th>
          </tr>
        </thead>
        <tbody class="text-black text-sm font-light-bolt">
          <tr v-if="filteredData.length === 0">
            <td colspan="9" class="text-center py-3">Not found</td>
          </tr>
          <tr v-for="(item, index) in filteredData" :key="index">
            <td class="py-3 px-2 text-left border">{{ index + 1 }}</td>
            <td class="py-3 px-2 text-left border">
              {{ formatDate(item.tanggal_keluar) }}
            </td>
            <td class="py-3 px-2 text-left border">
              {{ item.barangs.nama_barang }}
            </td>
            <td class="py-3 px-2 text-left border">
              {{ item.barangs.kode_barang }}
            </td>
            <td class="py-3 px-2 text-left border">
              {{ item.jumlah_barang }}
            </td>
            <td class="py-3 px-2 text-left border">
              {{ item.barangs.jenis_barang }}
            </td>
            <td class="py-3 px-2 text-left border">{{ item.harga_barang }}</td>
            <td class="py-3 px-2 text-left border">
              <img
                :src="`https://inventory-order-kep-uk.vercel.app/uploads/${item.barangs.gambar_barang}`"
                alt="Gambar Barang"
                class="h-10 w-25 object-cover rounded-md shadow-md transition transform hover:scale-110"/>
            </td>
            <td class="py-3 px-2 text-left border flex space-x-2">
              <button @click="editItemFromBarangKeluar(Number(item.id_transaksi_barang))" type="button" class="focus:outline-none" aria-label="Edit Item">
                <img src="/edit.png" alt="Edit" class="h-6 w-6">
              </button>
              <button @click="deleteBarangKeluar(Number(item.id_transaksi_barang))" type="button" class="focus:outline-none" aria-label="remove Item">
                <img src="/delete.png" alt="remove" class="h-6 w-6">
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-5 ml-20 pl-28 relative">
      <button
        v-if="!showForm"
        @click="showForm = true"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
      <div v-if="showForm" class="mt-4 p-4 border rounded bg-gray-100">
        <h3 class="text-xl font-bold mb-4">
          {{ isEditing ? "Edit Barang" : "Tambah Barang" }}
        </h3>
        <form @submit.prevent="validateForm">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label for="tanggal_keluar" class="block text-sm font-bold mb-2"
                >Tanggal Barang Keluar:</label
              >
              <input
                v-model="newItem.tanggal_keluar"
                type="date"
                class="border rounded px-2 py-1 w-full"
                id="tanggal_keluar"
              />
            </div>
            <div>
              <label for="nama_barang" class="block text-sm font-bold mb-2"
                >Nama Barang:</label
              >
              <input
                v-model="newItem.nama_barang"
                type="text"
                class="border rounded px-2 py-1 w-full"
                id="nama_barang"
                :disabled="isAutofill"
              />
            </div>
            <div>
              <label for="kode_barang" class="block text-sm font-bold mb-2">Kode Barang:</label>
              <select
                v-model="newItem.kode_barang"
                class="border rounded px-2 py-1 w-full"
                id="kode_barang"
                @change="onKodeBarangChange"
              >
                <option value="" disabled>Pilih Kode Barang</option>
                <option v-for="barang in barangOptions" :key="barang.kode_barang" :value="barang.kode_barang">
                  {{ barang.kode_barang }} - {{ barang.nama_barang }}
                </option>
              </select>
            </div>
            <div>
              <label for="jumlah_barang" class="block text-sm font-bold mb-2"
                >Jumlah Barang:</label
              >
              <input
                v-model="newItem.jumlah_barang"
                type="number"
                class="border rounded px-2 py-1 w-full"
                id="jumlah_barang"
              />
            </div>
            <div>
              <label for="jenis_barang" class="block text-sm font-bold mb-2"
                >Jenis Barang:</label
              >
              <input
                v-model="newItem.jenis_barang"
                type="text"
                class="border rounded px-2 py-1 w-full"
                id="jenis_barang"
                :disabled="isAutofill"
              />
            </div>
            <div>
              <label for="harga_barang" class="block text-sm font-bold mb-2"
                >Harga Barang:</label
              >
              <input
                v-model="newItem.harga_barang"
                type="number"
                class="border rounded px-2 py-1 w-full"
                id="harga_barang"
                :disabled="isAutofill"
              />
            </div>
            <div class="flex justify-end space-x-4">
              <button
                type="submit"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
            <div v-if="isFormIncomplete" class="text-red-500 mt-2">
              Harap isi semua data!
              <ul>
                <li v-if="!newItem.tanggal_keluar">
                  Tanggal Barang Keluar harus diisi
                </li>
                <li v-if="!newItem.nama_barang">Nama Barang harus diisi</li>
                <li v-if="!newItem.kode_barang">Kode Barang harus diisi</li>
                <li v-if="!newItem.jumlah_barang">Jumlah Barang harus diisi</li>
                <li v-if="!newItem.jenis_barang">Jenis Barang harus diisi</li>
                <li v-if="!newItem.harga_barang">Harga Barang harus diisi</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from 'vue-toast-notification';
import Layout from "../components/layout.vue";
import { Barang } from "../pages/UserCatalog.vue";

const apiUrl = import.meta.env.VITE_API_URL;

const toast = useToast();
const data = ref<any[]>([]);
const searchQuery = ref("");
const filteredData = ref<BarangKeluar[]>([]);
const isFormIncomplete = ref(false);
const isEditing = ref<boolean>(false);
const currentItemIndex = ref<number | null>(null);
const showForm = ref<boolean>(false);
const isAutofill = ref<boolean>(false);
const barangOptions = ref<any[]>([]);

const props = defineProps({
  barang: {
    type: Object as () => Barang,
    required: true,
  },
});

const newItem = ref<any>({
  tanggal_keluar: "",
  jumlah_barang: 0,
  kode_barang: "",
  nama_barang: "",
  jenis_barang: "",
  harga_barang: 0,
});

interface BarangKeluar {
  id_transaksi_barang: number;
  jumlah_barang: number;
  kode_barang: string;
  type: string;
  peminjamId: number;
  tanggal_keluar: string;
  tanggal_masuk: string | null;
  tanggal_pinjam: string | null;
  nama_matakuliah: string;
  nama_barang: string;
  harga_barang: number;
  barangs: {
    kode_barang: string;
    nama_barang: string;
    total_stock: number;
    jenis_barang: string;
    harga_barang: number;
    gambar_barang: string;
  };
}

const fetchBarangOptions = async () => {
  try {
    const response = await axios.get(`${apiUrl}/barang`); // Ganti dengan endpoint API yang sesuai
    barangOptions.value = response.data;
  } catch (error) {
    console.error("Error fetching barang options:", error);
  }
};

const onKodeBarangChange = async (event: Event) => {
  const kodeBarang = (event.target as HTMLSelectElement).value;
  if (kodeBarang) {
    const selectedBarang = barangOptions.value.find(barang => barang.kode_barang === kodeBarang);
    if (selectedBarang) {
      newItem.value = {
        ...newItem.value,
        nama_barang: selectedBarang.nama_barang,
        jenis_barang: selectedBarang.jenis_barang,
        harga_barang: selectedBarang.harga_barang,
        // Misalkan Anda juga ingin memperbarui jumlah_barang jika ada data default
        jumlah_barang: 1, // Default jumlah_barang jika diperlukan
      };
    }
  }
};

const addItem = async () => {
  try {
    const newTransaksi = {
      jumlah_barang: newItem.value.jumlah_barang,
      // type: 'BarangMasuk',
      tanggal_keluar: newItem.value.tanggal_keluar,
      nama_barang: newItem.value.nama_barang,
      jenis_barang: newItem.value.jenis_barang,
      harga_barang: newItem.value.harga_barang,
      kode_barang: newItem.value.kode_barang,
      // barangs: {
      //   nama_barang: newItem.value.nama_barang,
      //   total_stock: newItem.value.jumlah_barang,
      //   jenis_barang: newItem.value.jenis_barang,
      //   harga_barang: newItem.value.harga_barang,
      //   gambar_barang: "1717054440508-edel.jpeg",
      //   kode_barang: newItem.value.kode_barang
      // }
    };

    const response = await axios.post(`${apiUrl}/barangKeluar`, newTransaksi);
    toast.success('Item added successfully');
    fetchData();
    resetForm();
    showForm.value = false;
  } catch (error) {
    console.error("Error adding item:", error);
    toast.error('Failed to add item');
  }
};

async function fetchData() {
  try {
    const response = await axios.get<BarangKeluar[]>(
      `${apiUrl}/barangKeluar`,
    );
    data.value = response.data;
    filteredData.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const editItemFromBarangKeluar = (id: number) => {
  const itemToEdit = data.value.find((item) => item.id_transaksi_barang === id);
  if (itemToEdit) {
    newItem.value = {
      tanggal_masuk: itemToEdit.tanggal_masuk,
      jumlah_barang: itemToEdit.jumlah_barang,
      kode_barang: itemToEdit.barangs.kode_barang,
      nama_barang: itemToEdit.barangs.nama_barang,
      jenis_barang: itemToEdit.barangs.jenis_barang,
      harga_barang: itemToEdit.harga_barang,
      id_barang: itemToEdit.barangs.id_barang, // Add this line to store id_barang
    };
    isEditing.value = true;
    currentItemIndex.value = id;
    showForm.value = true;
  }
};

const deleteBarangKeluar = async (id: number) => {
  try {
    await axios.delete(`${apiUrl}/barangMasuk/${id}`);
    toast.success('Item deleted successfully');
    fetchData();
  } catch (error) {
    console.error('Error deleting item:', error);
    toast.error('Failed to delete item');
  }
};

const updateItem = async (index: number) => {
  try {
    const updatedTransaksi = {
      ...data.value[index],
      tanggal_keluar: newItem.value.tanggal_keluar,
      jumlah_barang: newItem.value.jumlah_barang,
      barangs: {
        ...data.value[index].barangs,
        nama_barang: newItem.value.nama_barang,
        kode_barang: newItem.value.kode_barang,
        jenis_barang: newItem.value.jenis_barang,
        harga_barang: newItem.value.harga_barang,
      },
    };

    const response = await axios.put(
      `${apiUrl}/${updatedTransaksi.id_transaksi_barang}`,
      updatedTransaksi,
    );
    data.value.splice(index, 1, response.data);
    resetForm();
    showForm.value = false;
  } catch (error) {
    console.error("Error updating item:", error);
    alert("Gagal memperbarui barang. Silakan coba lagi.");
  }
};

const deleteItem = async (index: number) => {
  const item = data.value[index];
  const confirmDelete = confirm(
    `Apakah Anda yakin ingin menghapus ${item.barangs.nama_barang}?`,
  );
  if (confirmDelete) {
    try {
      await axios.delete(`${apiUrl}/${item.id_transaksi_barang}`);
      data.value.splice(index, 1);
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Gagal menghapus barang. Silakan coba lagi.");
    }
  }
};

const cancelForm = () => {
  resetForm();
  showForm.value = false;
};

const resetForm = () => {
  newItem.value = {
    nama_barang: "",
    kode_barang: "",
    jumlah_barang: 0,
    jenis_barang: "",
    harga_barang: 0,
    tanggal_keluar: "",
  };
  isEditing.value = false;
  currentItemIndex.value = null;
};

const validateForm = () => {
  const requiredFields: (keyof any)[] = [
    "tanggal_keluar",
    "nama_barang",
    "kode_barang",
    "jumlah_barang",
    "jenis_barang",
    "harga_barang",
  ];
  if (requiredFields.some((field) => !newItem.value[field])) {
    isFormIncomplete.value = true;
    return;
  }
  isEditing.value ? updateItem(currentItemIndex.value!) : addItem();
};

const searchItems = async () => {
  try {
    const response = await axios.get(`${apiUrl}?search=${searchQuery.value}`);
    data.value = response.data;
  } catch (error) {
    console.error("Error searching items:", error);
  }
};
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tambahkan 1 karena getMonth() mengembalikan bulan dari 0-11
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

onMounted(() => {
  fetchData();
  fetchBarangOptions();
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
