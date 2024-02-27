<template>
  <div class="mt-16 pl-[15rem]">
    <div class="border-y-2 border-b-4 border-black flex flex-row justify-between items-center p-5">
      <h1 class="pa-3 text-4xl font-bold ">Data Barang Masuk</h1></div></div>

    <div class="max-w-6xl mx-auto">
      <div class="bg-white-400 max-w-5xl mt-7 ml-20 pl-28">
        <table class="min-w-max w-full table-auto">
          <thead>
            <tr class="bg-gray-300 text-gray-900 uppercase text-sm leading-normal">
              <th class="py-3 px-2 text-left border">Tanggal Barang Masuk</th>
              <th class="py-3 px-2 text-left border">ID Barang</th>
              <th class="py-3 px-2 text-left border">Total Stok</th>
              <th class="py-3 px-2 text-left border">Kode Barang</th>
              <th class="py-3 px-2 text-left border"></th> <!-- Kolom untuk tombol delete -->
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <!-- Data dari array -->
            <tr v-for="(item, index) in data" :key="index">
              <td class="py-3 px-2 text-left border"><input type="textr" v-model="item.id" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Year/Month/Day"></td>
              <td class="py-3 px-2 text-left border"><input type="text" v-model="item.nama" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Id Barang"></td>
              <td class="py-3 px-2 text-left border"><input type="text" v-model="item.totalStok" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Total Stok"></td>
              <td class="py-3 px-2 text-left border"><input type="text" v-model="item.jenis" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Kode Barang"></td>
              <td class="py-3 px-2 text-left border">
                <button @click="editItem(index)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">UPDATE</button>
                <button @click="deleteItem(index)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">DELETE</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Kolom baru di bagian bawah -->
    <div class="max-w-5xl ml-[12rem] pl-20 mt-4 flex justify-end">
      <div class="flex flex-col">
        <input type="text" v-model="newItem.id" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Id Barang">
        <input type="text" v-model="newItem.nama" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Nama Barang">
        <input type="text" v-model="newItem.totalStok" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Total Stok">
        <input type="text" v-model="newItem.jenis" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Jenis Barang">
        <button @click="addItem" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2">Add</button>
      </div>
    </div>
    <router-view />
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