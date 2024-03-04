<template>
  <div class="mt-16 pl-[15rem]">
  <div class="border-y-2 border-b-4 border-black flex flex-row justify-between items-center p-5">
    <h1 class="text-4xl font-bold">Data Barang</h1>
    </div>

    <div class="max-w-6xl mr-16">
      <!-- Tabel kosong -->
      <div class="bg-white max-w-5xl ml-20 pl-28 pe-8">
        <table class="min-w-max w-full table-auto px-1">
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
        <input type="number" v-model="newItem.totalStok" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Total Stok">
        <input type="text" v-model="newItem.jenis" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Jenis Barang">
        <button @click="addItem()" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2">Add</button>
      </div>
    </div>
    
   

    <!-- Komponen router-view untuk menampilkan halaman yang diarahkan -->
    <router-view />
  </div>
  <RouterView />
</template>

<script>
// Import komponen RouterView dari Vue Router jika belum diimpor
import { RouterView } from 'vue-router';
import axios from 'axios';

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
    async addItem ()  {
      // Tambahkan newItem ke data
      this.data.push({...this.newItem});
      // Kosongkan newItem untuk persiapan input data baru
      console.log(this.newItem)
      await axios.post('https://vjk2k0f5-5000.asse.devtunnels.ms/barang', {id_barang: this.newItem.id, nama_barang: this.newItem.nama, total_stock: this.newItem.totalStok, jenis_barang: this.newItem.jenis })
      .then(data => console.log(data))
      .catch(err => console.log(err))
      this.newItem = { id: '', nama: '', totalStok: '', jenis: '' };
    }
  }
};
</script>
