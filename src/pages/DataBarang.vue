<template>
    <div class="container mx-auto p-4">
      <!-- Judul -->
      <h2 class="text-center font-bold text-xl mb-4 px-20 ml-20 py-14 border-b border-gray-">Data Barang</h2>
  
      <div class="max-w-6xl mx-auto">
        <!-- Tabel kosong -->
        <div class="bg-white max-w-5xl ml-20 pl-28">
          <table class="min-w-max w-full table-auto">
            <thead>
              <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th class="py-3 px-2 text-left border">Id Barang</th>
                <th class="py-3 px-2 text-left border">Nama Barang</th>
                <th class="py-3 px-2 text-left border">Total Stok</th>
                <th class="py-3 px-2 text-left border">Jenis Barang</th>
                <th class="py-3 px-2 text-left border"></th> <!-- Kolom untuk tombol delete -->
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <!-- Data dari array -->
              <tr v-for="(item, index) in data" :key="index">
                <td class="py-3 px-2 text-left border"><input type="text" v-model="item.id" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Id Barang"></td>
                <td class="py-3 px-2 text-left border"><input type="text" v-model="item.nama" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Nama Barang"></td>
                <td class="py-3 px-2 text-left border"><input type="text" v-model="item.totalStok" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Total Stok"></td>
                <td class="py-3 px-2 text-left border"><input type="text" v-model="item.jenis" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Jenis Barang"></td>
                <td class="py-3 px-2 text-left border">
                  <button @click="editItem(index)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">Edit</button>
                  <button @click="deleteItem(index)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Kolom baru di bagian bawah -->
      <div class="max-w-5xl ml-20 pl-28 mt-4 flex justify-end">
        <div class="flex flex-col">
          <input type="text" v-model="newItem.id" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Id Barang">
          <input type="text" v-model="newItem.nama" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Nama Barang">
          <input type="text" v-model="newItem.totalStok" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Total Stok">
          <input type="text" v-model="newItem.jenis" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Jenis Barang">
          <button @click="addItem" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2">Add</button>
        </div>
      </div>
      
      <!-- Tombol "Add" -->
      <router-link to="/addcoursematerial">
        <button type="button" class="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-auto">Add</button>
      </router-link>
  
      <!-- Komponen router-view untuk menampilkan halaman yang diarahkan -->
      <router-view />
    </div>
  </template>
  
  <script>
  // Import komponen RouterView dari Vue Router jika belum diimpor
  import { RouterView } from 'vue-router';
  
  export default {
    components: {
      RouterView,
    },
    data() {
      return {
        data: [ // contoh data
          { id: '', nama: '', totalStok: '', jenis: '' },
          { id: '', nama: '', totalStok: '', jenis: '' },
        ],
        newItem: { id: '', nama: '', totalStok: '', jenis: '' } // data baru yang akan ditambahkan
      }
    },
    methods: {
      deleteItem(index) {
        this.data.splice(index, 1);
      },
      editItem(index) {
        // Lakukan sesuatu saat tombol edit ditekan
      },
      addItem() {
        // Tambahkan newItem ke data
        this.data.push({...this.newItem});
        // Kosongkan newItem untuk persiapan input data baru
        this.newItem = { id: '', nama: '', totalStok: '', jenis: '' };
      }
    }
  };
  </script>
  
  <style>
  /* Tidak diperlukan jika menggunakan Tailwind CSS dari CDN */
  </style>
  