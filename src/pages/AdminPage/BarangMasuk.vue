<template>
  <Layout />
  <div class="mt-0 pl-60 sticky top-0 z-50">
    <div class="border-b-2 border-black flex flex-row justify-between items-center p-3">
      <h4 class="pa-3 text-2xl font-bold">Data Barang Masuk</h4>
      <div class="relative md:flex">
        <input
          v-model="searchQuery"
          @keydown.enter="searchItems"
          type="text"
          class="border border-gray-300 rounded px-2 py-1 mb-2 md:mb-0 md:mr-2"
          placeholder="Search..."
          id="search"
        />
        <button @click="searchItems" class="bg-gray-300 hover:bg-gray-400 rounded px-3 py-1">Search</button>
      </div>
    </div>
  </div>


  <div class="max-w-6xl mx-auto">
    <div class="bg-white mt-7 ml-20 pl-28 overflow-y-auto max-h-xs max-w-max">
      <table class="min-w-max w-full table-auto">
        <thead>
          <tr class="bg-slate-400 text-gray-900 uppercase text-sm leading-normal">
            <th class="py-3 px-2 text-center border">No</th>
            <th class="py-3 px-2 text-center border">Tanggal Barang Masuk</th>
            <th class="py-3 px-2 text-center border">Nama Barang</th>
            <th class="py-3 px-2 text-center border">Kode Barang</th>
            <th class="py-3 px-2 text-center border">Jumlah Barang</th>
            <th class="py-3 px-2 text-center border">Jenis Barang</th>
            <th class="py-3 px-2 text-center border">Harga Barang</th>
            <th class="py-3 px-2 text-center border">Gambar Barang</th>
            <th class="py-3 px-2 text-center border">Aksi</th>
          </tr>
        </thead>

        <tbody class="text-gray-600 text-sm font-light">
          <tr v-for="(item, index) in data" :key="index">
            <td class="py-3 px-2 text-center border">{{ index + 1 }}</td>
            <td class="py-3 px-2 text-center border">{{ item.tanggal_masuk }}</td>
            <td class="py-3 px-2 text-center border">{{ item.barangs.nama_barang }}</td>
            <td class="py-3 px-2 text-center border">{{ item.barangs.kode_barang }}</td>
            <td class="py-3 px-2 text-center border">{{ item.jumlah_barang }}</td>
            <td class="py-3 px-2 text-center border">{{ item.barangs.jenis_barang }}</td>
            <td class="py-3 px-2 text-center border">{{ item.harga_barang }}</td>
            <td class="py-3 px-2 text-center border" v-if="item.barangs.gambar_barang">
              <div class="flex justify-center">
              <img :src="`https://inventory-order-kep-uk.vercel.app/uploads/${item.barangs.gambar_barang}`" alt="gambar barang" class="h-8 w-18 object-cover rounded-md shadow-md transition transform hover:scale-110"/>
              </div>
            </td>

            <td class="py-3 px-2 text-left border flex space-x-2">
              <button @click="editItemFromBarangMasuk(Number(item.id_transaksi_barang))" type="button" class="focus:outline-none" aria-label="Edit Item">
                <img src="/edit.png" alt="Edit" class="h-6 w-6">
              </button>
              <button @click="deleteBarangMasuk(Number(item.id_transaksi_barang))" type="button" class="focus:outline-none" aria-label="remove Item">
                <img src="/delete.png" alt="remove" class="h-6 w-6">
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-5 ml-20 pl-28 relative">
      <button v-if="!showForm" @click="showForm = true" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Add
      </button>
      <div v-if="showForm" class="mt-4 p-4 border rounded bg-gray-100">
        <h3 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Barang' : 'Tambah Barang' }}</h3>
        <form @submit.prevent="validateForm">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label for="tanggal_masuk" class="block text-sm font-bold mb-2">Tanggal Barang Masuk:</label>
              <input v-model="newItem.tanggal_masuk" type="date" class="border rounded px-2 py-1 w-full" id="tanggal_masuk">
            </div>
            <div>
              <label for="nama_barang" class="block text-sm font-bold mb-2">Nama Barang:</label>
              <input v-model="newItem.nama_barang" type="text" class="border rounded px-2 py-1 w-full" id="nama_barang" :disabled="isAutofill">
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
              <label for="jumlah_barang" class="block text-sm font-bold mb-2">Jumlah Barang:</label>
              <input v-model="newItem.jumlah_barang" type="number" class="border rounded px-2 py-1 w-full" id="jumlah_barang">
            </div>
            <div>
              <label for="jenis_barang" class="block text-sm font-bold mb-2">Jenis Barang:</label>
              <input v-model="newItem.jenis_barang" type="text" class="border rounded px-2 py-1 w-full" id="jenis_barang" :disabled="isAutofill">
            </div>
            <div>
              <label for="harga_barang" class="block text-sm font-bold mb-2">Harga Barang:</label>
              <input v-model="newItem.harga_barang" type="number" class="border rounded px-2 py-1 w-full" id="harga_barang" :disabled="isAutofill">
            </div>
            <div class="flex justify-end space-x-4">
              <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
              <button @click="cancelForm" type="button" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </div>
            <div v-if="isFormIncomplete" class="text-red-500 mt-2">
              Harap isi semua data!
              <ul>
                <li v-if="!newItem.tanggal_masuk">Tanggal Barang Masuk harus diisi</li>
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import Layout from "../../components/layout.vue";
import { Barang } from "../DosenPage/UserCatalog.vue";

const toast = useToast();
const apiUrl = import.meta.env.VITE_API_URL;
const isFormIncomplete = ref(false);

const showForm = ref<boolean>(false);
const searchQuery = ref<string>('');
const data = ref<any[]>([]);
const isAutofill = ref<boolean>(false);
const barangOptions = ref<any[]>([]);

const props = defineProps({
  barang: {
    type: Object as () => Barang,
    required: true,
  },
});

const newItem = ref<any>({
  tanggal_masuk: '',
  jumlah_barang: 0,
  kode_barang: '',
  nama_barang: '',
  jenis_barang: '',
  harga_barang: 0,
  id_barang: null, // Add this line to store id_barang
});

const isEditing = ref<boolean>(false);
const currentItemIndex = ref<number | null>(null);

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


const fetchData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/barangMasuk`);
    data.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const addItem = async () => {
  try {
    const newTransaksi = {
      jumlah_barang: newItem.value.jumlah_barang,
      tanggal_masuk: newItem.value.tanggal_masuk,
      nama_barang: newItem.value.nama_barang,
      kode_barang: newItem.value.kode_barang,
      jenis_barang: newItem.value.jenis_barang,
      harga_barang: newItem.value.harga_barang,
      id_barang: newItem.value.id_barang,
    };

    await axios.post(`${apiUrl}/barangMasuk`, newTransaksi);
    toast.success('Item added successfully');
    fetchData();
    resetForm();
    showForm.value = false;
  } catch (error) {
    console.error('Error adding item:', error);
    toast.error('Failed to add item');
  }
};

const editItemFromBarangMasuk = (id: number) => {
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

const updateItem = async () => {
  if (currentItemIndex.value !== null) {
    try {
      const updatedTransaksi = {
        jumlah_barang: newItem.value.jumlah_barang,
        tanggal_masuk: newItem.value.tanggal_masuk,
        nama_barang: newItem.value.nama_barang,
        kode_barang: newItem.value.kode_barang,
        jenis_barang: newItem.value.jenis_barang,
        harga_barang: newItem.value.harga_barang,
        id_barang: newItem.value.id_barang,
      };

      await axios.patch(`${apiUrl}/barangMasuk/${currentItemIndex.value}`, updatedTransaksi);
      toast.success('Item updated successfully');
      fetchData();
      resetForm();
      showForm.value = false;
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item');
    }
  }
};

const deleteBarangMasuk = async (id: number) => {
  try {
    await axios.delete(`${apiUrl}/barangMasuk/${id}`);
    toast.success('Item deleted successfully');
    fetchData();
  } catch (error) {
    console.error('Error deleting item:', error);
    toast.error('Failed to delete item');
  }
};

const validateForm = () => {
  isFormIncomplete.value = !newItem.value.tanggal_masuk || !newItem.value.jumlah_barang || !newItem.value.kode_barang || !newItem.value.nama_barang || !newItem.value.jenis_barang || !newItem.value.harga_barang;

  if (!isFormIncomplete.value) {
    if (isEditing.value) {
      updateItem();
    } else {
      addItem();
    }
  }
};

const resetForm = () => {
  newItem.value = {
    tanggal_masuk: '',
    jumlah_barang: 0,
    kode_barang: '',
    nama_barang: '',
    jenis_barang: '',
    harga_barang: 0,
    id_barang: null,
  };
  isEditing.value = false;
  currentItemIndex.value = null;
};

const cancelForm = () => {
  resetForm();
  showForm.value = false;
};

const searchItems = async () => {
  try {
    const response = await axios.get(`${apiUrl}/barangMasuk?search=${searchQuery.value}`);
    data.value = response.data;
  } catch (error) {
    console.error('Error searching items:', error);
  }
};

onMounted(() => {
  fetchData();
  fetchBarangOptions();
});
</script>

<style scoped>
/* Add your custom styles here */
</style>