<template>
    <Layout/>
    <div class="mt-16 pl-[15rem]">
      <div class="border-y-2 border-b-4 border-black flex flex-row justify-between items-center p-5">
        <h1 class="pa-3 text-4xl font-bold ">Data Barang Masuk</h1>
      </div>
    </div>
  
    <div class="max-w-6xl mx-auto px-5 md:px-10 mt-7">
      <div class="bg-white max-w-full overflow-x-auto">
        <table class="min-w-max w-full table-auto">
          <thead>
            <tr class="bg-gray-300 text-gray-900 uppercase text-sm leading-normal">
              <th class="py-3 px-2 text-left border">No</th>
              <th class="py-3 px-2 text-left border">Tanggal Barang Masuk</th>
              <th class="py-3 px-2 text-left border">Nama Barang</th>
              <th class="py-3 px-2 text-left border">ID Barang</th>
              <th class="py-3 px-2 text-left border">Total Stok</th>
              <th class="py-3 px-2 text-left border">Jenis Barang</th>
              <th class="py-3 px-2 text-left border">Harga Barang</th>
              <th class="py-3 px-2 text-left border">Gambar Barang</th>
              <th class="py-3 px-2 text-left border"></th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr v-for="(item, index) in data" :key="index">
              <td class="py-3 px-2 text-left border">
                <input type="text" v-model="item.No" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Nomor">
              </td>
              <td class="py-3 px-2 text-left border">
                <input type="text" v-model="item.tanggal" class="border border-gray-300 rounded px-2 py-1 w-full">
              </td>
              <td class="py-3 px-2 text-left border">
                <input type="text" v-model="item.nama" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Nama Barang">
              </td>
              <td class="py-3 px-2 text-left border">
                <input type="text" v-model="item.id" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Id Barang">
              </td>
              <td class="py-3 px-2 text-left border">
                <input type="text" v-model="item.number" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Total Stok">
              </td>
              <td class="py-3 px-2 text-left border">
                <input type="text" v-model="item.jenis" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Jenis Barang">
              </td>
              <td class="py-3 px-2 text-left border">
                <input type="text" v-model="item.Harga" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Harga Barang">
              </td>
              <td class="py-3 px-2 text-left border">
                <input type="text" v-model="item.Gambar" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Gambar Barang">
              </td>
              <td class="py-3 px-2 text-left border">
                <button @click="update(index)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">UPDATE</button>
                <button @click="deleteItem(index)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">DELETE</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="max-w-full md:max-w-md mx-auto mt-4 flex justify-end px-5 md:px-10">
      <div class="flex flex-col w-full md:w-96">
        <input type="date" v-model="newItem.tanggal" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Tanggal Barang Masuk">
        <input type="text" v-model="newItem.nama" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Nama Barang">
        <input type="text" v-model="newItem.id" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Id Barang">
        <input type="text" v-model="newItem.number" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="total Stok">
        <input type="text" v-model="newItem.jenis" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="jenis Barang">
        <input type="text" v-model="newItem.Harga" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="harga barang">
        <button @click="addItem" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2">Tambahkan</button>
      </div>
    </div>  
    <router-view />
  </template>
  
  <script >
  import { RouterView } from 'vue-router';
  import axios from 'axios';
  import Layout from "@components/layout.vue";
  
  export default {
    components: {
      RouterView,
      Layout
    },
    data() {
      return {
        data: [],
        newItem: { no: '', tanggal: '', nama: '', id_barang: '', total_stok: '', jenis_barang: '', harga_barang: '', gambar_barang: ''},
        errorMessage:''
      }
    },
    methods: {
      async addItem() {
        this.newItem.number = parseInt(this.newItem.number);
        this.data.push({
          tanggal: this.newItem.tanggal,
          nama: this.newItem.nama,
          id: this.newItem.id,
          stok: this.newItem.stok,
          jenis: this.newItem.jenis,
          harga: this.newItem.harga,
          gambar: this.newItem.gambar,
        });
      
        try {
          const response = await axios.post('https://vjk2k0f5-5000.asse.devtunnels.ms/barangMasuk', {
            tanggal_masuk: this.newItem.tanggal,
            nama_barang: this.newItem.nama,
            id_barang: this.newItem.id,
            total_stock: this.newItem.number,
            jenis_barang: this.newItem.jenis,
            harga_barang: this.newItem.harga,
            gambar_barang: this.newItem.gambar,
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
        this.newItem = { no: '', tanggal: '', nama: '', id_barang: '', total_stok: '', jenis_barang: '', harga_barang: '', gambar_barang: ''};
      },
  
      update(index) {
        const updatedItem = this.data[index];
        axios.put(`https://vjk2k0f5-5000.asse.devtunnels.ms/barangMasuk/${updatedItem.id}`, {
          nama_barang: updatedItem.nama,
          id_barang: updatedItem.id,
          total_stock: updatedItem.number,
          jenis_barang: updatedItem.jenis,
          harga_barang: updatedItem.harga,
          gambar_barang:updatedItem.gambar,
        }).then(response => {
          console.log(response.data);
        }).catch(error => {
          console.error(error);
        });
      },
  
      deleteItem(index) {
    const deletedItem = this.data[index];
    axios.delete(`https://vjk2k0f5-5000.asse.devtunnels.ms/barangMasuk/${deletedItem.id}`).then(response => {
      console.log(response.data);
      this.data.splice(index, 1);
    }).catch(error => {
      console.error(error);
    });
  }
  
    }
  };
  </script>