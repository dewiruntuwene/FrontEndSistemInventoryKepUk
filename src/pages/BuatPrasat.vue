<template>
    <LayoutKaprodi />
    <div class="mt-0 pl-60 sticky top-0 z-50">
      <div class="border-b-2 border-black flex flex-row justify-between items-center p-3">
        <h4 class="pa-3 text-2xl font-bold">Buat Prasat</h4>
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
      <div class="bg-white mt-7 ml-20 pl-28 overflow-x-auto max-h-xs max-w-full">
  <table class="min-w-full table-auto border-collapse">
    <thead class="bg-gradient-to-r from-slate-400 to-slate-600 text-gray-900 uppercase text-sm leading-normal">
      <tr>
        <th class="py-3 px-4 text-center border-b">No</th>
        <th class="py-3 px-4 text-center border-b">Nama Prasat</th>
        <th class="py-3 px-4 text-center border-b">Deskripsi</th>
        <th class="py-3 px-4 text-center border-b">Barang</th>
      </tr>
    </thead>
    <tbody class="text-gray-600 text-sm font-light">
      <tr v-for="(item, index) in data" :key="index" class="hover:bg-gray-100 transition-all">
        <td class="py-3 px-4 text-center border-b">{{ index + 1 }}</td>
        <td class="py-3 px-4 text-center border-b">{{ item.nama_prasat }}</td>
        <td class="py-3 px-4 text-center border-b">{{ item.deskripsi }}</td>
        <td class="py-3 px-4 text-center border-b">
          <ul>
            <li v-for="barang in item.barangDalamPrasat" :key="barang.id_barang_dalam_paket">
              {{ barang.barang.nama_barang }} - Jumlah: {{ barang.jumlah_barang }}
            </li>
          </ul>
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
                <label for="nama_prasat" class="block text-sm font-bold mb-2">Nama Prasat:</label>
                <input v-model="newItem.nama_prasat" type="text" class="border rounded px-2 py-1 w-full" id="nama_prasat">
              </div>
              <div>
                <label for="deskripsi" class="block text-sm font-bold mb-2">Deskripsi:</label>
                <input v-model="newItem.deskripsi" type="text" class="border rounded px-2 py-1 w-full" id="deskripsi" :disabled="isAutofill">
              </div>

                <div class="flex justify-between space-x-4">
                <div>
                  <label for="kode_barang" class="block text-sm font-bold mb-2">Kode Barang:</label>
                  <select
                    v-model=" newItem.kode_barang"
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
                  <input v-model="newItem.jumlah_barang" type="text" class="border rounded px-2 py-1 w-full" id="jumlah_barang" :disabled="isAutofill">
                </div>

                <button @click="addBarang" type="button" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Tambahkan
                </button>
              </div>
              <div>
                <h3>Barang yang Dipilih:</h3>
                <ul class="border rounded px-2 py-1 w-full bg-white">
                  <li v-for="item in barangDalamPrasat" :key="item.barangId">
                    {{ item.kode_barang }} - {{ item.nama_barang }} - {{ item.jumlah_barang }}
                  </li>
                </ul>
              </div>
              <!-- <div>
                <label for="barangIds" class="block text-sm font-bold mb-2">Barang Terkait:</label>
                <select
                  v-model="newItem.barangIds"
                  multiple
                  class="border rounded px-2 py-1 w-full"
                  id="barangIds"
                >
                <ul>
                  <li v-for="item in barangDalamPrasat" :key="item.barangId">
                    {{ item.kode_barang }} - {{ item.nama_barang }} - {{ item.jumlah_barang }}
                  </li>
                </ul>
                </select>
              </div> -->
              <!-- <div>
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
              </div> -->
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
                  <li v-if="!newItem.nama_prasat">Tanggal Barang Masuk harus diisi</li>
                  <li v-if="!newItem.deskripsi">Deskripsi harus diisi</li>
                  <li v-if="!newItem.barangDalamPrasat">Kode Barang harus diisi</li>
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
  import LayoutKaprodi from "../components/LayoutKaprodi.vue";
  import { Barang } from "../pages/UserCatalog.vue";
  
  const toast = useToast();
  const apiUrl = import.meta.env.VITE_API_URL;
  const isFormIncomplete = ref(false);
  
  const showForm = ref<boolean>(false);
  const searchQuery = ref<string>('');
  const data = ref<any[]>([]);
  const isAutofill = ref<boolean>(false);
  const barangOptions = ref<any[]>([]);
  
  console.log(data);

  const props = defineProps({
    barang: {
      type: Object as () => Barang,
      required: true,
    },
  });
  
  const newItem = ref<any>({
    nama_prasat: '',
    deskripsi: '',
    barangDalamPrasat: [],
  });

  export interface BarangDalamPrasat {
    barangId: Number;
    jumlah_barang: Number;
  }

  const barangDalamPrasat = ref<any[]>([]);

//   const setbarangDalamPrasat = (data: BarangDalamPrasat[]) => {
//     barangDalamPrasat.value = data.map((item) => ({
//     ...item,
//     id_keranjang: Number(item.id_keranjang), // Pastikan id_keranjang adalah number
//   }));
// };
  
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
          id_barang: selectedBarang.id_barang
          // Misalkan Anda juga ingin memperbarui jumlah_barang jika ada data default
          //jumlah_barang: 1, // Default jumlah_barang jika diperlukan
        };
      }
    }
  };
  
  
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${apiUrl}/prasat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      data.value = response.data;
      // console.log(data.value);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addBarang = () => {
    const selectedBarang = barangOptions.value.find(barang => barang.kode_barang === newItem.value.kode_barang);
    if (selectedBarang) {
      const itemToAdd = {
        barangId: selectedBarang.id_barang, // ID barang yang akan dikirim ke API
        kode_barang: selectedBarang.kode_barang, // Kode barang untuk ditampilkan
        nama_barang: selectedBarang.nama_barang, // Nama barang untuk ditampilkan
        jumlah_barang: newItem.value.jumlah_barang // Jumlah barang
      };
      barangDalamPrasat.value.push(itemToAdd);
      newItem.value.kode_barang = '';
      newItem.value.jumlah_barang = '';
    } else {
      alert('Silakan pilih kode barang yang valid.');
    }
  };
  
  const addItem = async () => {
    const token = localStorage.getItem("token");
    try {
      const newPrasat = {
        nama_prasat: newItem.value.nama_prasat,
        deskripsi: newItem.value.deskripsi,
        barangDalamPrasat: barangDalamPrasat.value.map((item) => ({
          barangId: item.barangId,
          jumlah_barang: item.jumlah_barang
        })),
      };
  
      await axios.post(`${apiUrl}/prasat`, newPrasat,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Prasat added successfully');
      fetchData();
      resetForm();
      showForm.value = false;
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item');
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
    isFormIncomplete.value = !newItem.value.nama_prasat || !newItem.value.deskripsi || !newItem.value.barangDalamPrasat 
  
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
      nama_prasat: '',
      deskripsi: '',
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