<template>
  <Layout/>
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
  
    <div class="max-w-24 mx-20">
      <div class="bg-white mt-5 ml-20 pl-28 relative">
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
              <td class="py-3 px-2 text-center border">
                <img v-if="item.barangs.gambar_barang" :src="`http://localhost:5000/get/${item.barangs.gambar_barang}`" alt="gambar barang" class="h-10 w-25 object-cover rounded-md shadow-md">
                <span v-else>Tidak ada gambar</span>
              </td>
              <td class="py-3 px-2 text-left border flex space-x-2">
                <button @click="editItem(index)" type="button" class="focus:outline-none" aria-label="Edit Item">
                  <img src="../src/assets/edit.png" alt="Edit" class="h-6 w-6">
                </button>
                <button @click="deleteItem(index)" type="button" class="focus:outline-none" aria-label="Delete Item">
                  <img src="../src/assets/delete.png" alt="Delete" class="h-6 w-6">
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
                <input v-model="newItem.nama_barang" type="text" class="border rounded px-2 py-1 w-full" id="nama_barang">
              </div>
              <div>
                <label for="kode_barang" class="block text-sm font-bold mb-2">Kode Barang:</label>
                <input v-model="newItem.kode_barang" type="text" class="border rounded px-2 py-1 w-full" id="kode_barang">
              </div>
              <div>
                <label for="jumlah_barang" class="block text-sm font-bold mb-2">Jumlah Barang:</label>
                <input v-model="newItem.jumlah_barang" type="number" class="border rounded px-2 py-1 w-full" id="jumlah_barang">
              </div>
              <div>
                <label for="jenis_barang" class="block text-sm font-bold mb-2">Jenis Barang:</label>
                <input v-model="newItem.jenis_barang" type="text" class="border rounded px-2 py-1 w-full" id="jenis_barang">
              </div>
              <div>
                <label for="harga_barang" class="block text-sm font-bold mb-2">Harga Barang:</label>
                <input v-model="newItem.harga_barang" type="number" class="border rounded px-2 py-1 w-full" id="harga_barang">
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
  import Layout from "../components/layout.vue";
  
  const isFormIncomplete = ref(false);
  
//   interface TransaksiBarang {
//     jumlah_barang: number;
//     tanggal_masuk: string;
//     nama_barang: string | null;
//     barangs: {
//       kode_barang: string;
//     };
//   }
  
  const showForm = ref<boolean>(false);
  const searchQuery = ref<string>('');
  const data = ref<any[]>([]);

//   interface Barang {

//     kode_barang: '';
//   }

//   const barangs = ref<Barang[]>();

  const newItem = ref<any>({
    tanggal_masuk: '',
    tanggal_keluar: null,
    jumlah_barang:0,
    kode_barang:'',
    nama_barang:'',
    jenis_barang: '',
    harga_barang:0
  });
  
  const isEditing = ref<boolean>(false);
  const currentItemIndex = ref<number | null>(null);
  
  const apiUrl = import.meta.env.VITE_API_URL;
  
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
        // type: 'BarangMasuk',
        tanggal_masuk: newItem.value.tanggal_masuk,
        nama_barang: newItem.value.nama_barang,
        jenis_barang: newItem.value.jenis_barang,
        harga_barang: newItem.value.harga_barang,
        kode_barang: newItem.value.kode_barang
        // barangs: {
        //   nama_barang: newItem.value.nama_barang,
        //   total_stock: newItem.value.jumlah_barang,
        //   jenis_barang: newItem.value.jenis_barang,
        //   harga_barang: newItem.value.harga_barang,
        //   gambar_barang: "1717054440508-edel.jpeg",
        //   kode_barang: newItem.value.kode_barang
        // }
      };
  
      const response = await axios.post(`${apiUrl}/barangMasuk`, newTransaksi);
      data.value.push(response.data);
      resetForm();
      showForm.value = true;
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Gagal menambahkan barang. Silakan coba lagi.');
    }
  };
  
  const editItem = (index: number) => {
    currentItemIndex.value = index;
    const item = data.value[index];
    newItem.value = {
      nama_barang: item.barangs.nama_barang,
      kode_barang: item.barangs.kode_barang,
      jumlah_barang: item.jumlah_barang,
      jenis_barang: item.barangs.jenis_barang,
      harga_barang: item.barangs.harga_barang,
      tanggal_masuk: item.tanggal_masuk
    };
    isEditing.value = true;
    showForm.value = true;
  };
  
  const updateItem = async (index: number) => {
    try {
      const updatedTransaksi = {
        ...data.value[index],
        tanggal_masuk: newItem.value.tanggal_masuk,
        jumlah_barang: newItem.value.jumlah_barang,
        barangs: {
          ...data.value[index].barangs,
          nama_barang: newItem.value.nama_barang,
          kode_barang: newItem.value.kode_barang,
          jenis_barang: newItem.value.jenis_barang,
          harga_barang: newItem.value.harga_barang
        }
      };
  
      const response = await axios.put(`${apiUrl}/${updatedTransaksi.id_transaksi_barang}`, updatedTransaksi);
      data.value.splice(index, 1, response.data);
      resetForm();
      showForm.value = false;
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Gagal memperbarui barang. Silakan coba lagi.');
    }
  };
  
  const deleteItem = async (index: number) => {
    const item = data.value[index];
    const confirmDelete = confirm(`Apakah Anda yakin ingin menghapus ${item.barangs.nama_barang}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`${apiUrl}/${item.id_transaksi_barang}`);
        data.value.splice(index, 1);
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Gagal menghapus barang. Silakan coba lagi.');
      }
    }
  };
  
  const cancelForm = () => {
    resetForm();
    showForm.value = false;
  };
  
  const resetForm = () => {
    newItem.value = {
      nama_barang: '',
      kode_barang: '',
      jumlah_barang: 0,
      jenis_barang: '',
      harga_barang: 0,
      tanggal_masuk: ''
    };
    isEditing.value = false;
    currentItemIndex.value = null;
  };
  
  const validateForm = () => {
    const requiredFields: (keyof any)[] = ['tanggal_masuk', 'nama_barang', 'kode_barang', 'jumlah_barang', 'jenis_barang', 'harga_barang'];
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
      console.error('Error searching items:', error);
    }
  };
  
  onMounted(() => {
    fetchData();
  });
  </script>
  

  <style scoped>
    .mt-14 {
      margin-top: 3.5rem;
    }
    .pl-60 {
      padding-left: 15rem;
    }
    .border-b-3 {
      border-bottom-width: 3px;
    }
    .max-w-24 {
      max-width: 24rem;
    }
  </style>. 