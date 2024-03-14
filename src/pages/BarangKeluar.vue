<template>
    <div class="mt-16 pl-[15rem]">
      <div class="border-y-2 border-b-4 border-black flex flex-row justify-between items-center p-5">
        <h1 class="pa-3 text-4xl font-bold ">Data Barang Keluar</h1></div></div>
  
      <div class="max-w-6xl mx-auto">
        <div class="bg-white max-w-5xl mt-7 ml-20 pl-28">
          <table class="min-w-max w-full table-auto">
            <thead>
              <tr class="bg-gray-300 text-gray-900 uppercase text-sm leading-normal">
                <th class="py-3 px-2 text-left border">Tanggal Barang Keluar</th>
                <th class="py-3 px-2 text-left border">Nama Barang</th>
                <th class="py-3 px-2 text-left border">ID Barang</th>
                <th class="py-3 px-2 text-left border">Total Stok</th>
                <th class="py-3 px-2 text-left border">Jenis Barang</th>
                <th class="py-3 px-2 text-left border"></th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <tr v-for="(item, index) in data" :key="index">
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
                  <button @click="editItem(index)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">UPDATE</button>
                  <button @click="deleteItem(index)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">DELETE</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </template>
  
  <script setup lang="ts">
  import { RouterView } from 'vue-router';
  import axios from 'axios';

  export interface BarangKeluar {
  id_barang: string,
  nama_barang: string,
  jenis_barang: string,
  total_stock: string,
  gambar_barang: string,
  path: string
}

const barangKeluar = ref<BarangKeluar[]>();
  
  async function addItem() {
    try {
      const response = await axios.get("https://vjk2k0f5-5000.asse.devtunnels.ms/barangKeluar", {
        id_barang_keluar: newItem.id_barang_keluar,
        id_barang: newItem.id_barang,
        nama_barang: newItem.nama_barang,
        tanggal_keluar: newItem.tanggal_keluar,
        total_stock: newItem.total_stock,
        jenis_barang: newItem.jenis_barang
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    
  }

  function update(index: number) {
    const updatedItem = data.value[index];
    axios
      .put(`${url}/${updatedItem.id}`, {
        id_barang: updatedItem.id,
        nama_barang: updatedItem.nama,
        tanggal_keluar: updatedItem.tanggal,
        total_stock: updatedItem.number,
        jenis_barang: updatedItem.jenis
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function deleteItem(index: number) {
    const deletedItem = data.value[index];
    axios
      .delete(`${url}/${deletedItem.id}`)
      .then(response => {
        console.log(response.data);
        data.value.splice(index, 1);
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function fetchData() {
    try {
      const response = await axios.get(url);
      data.value = response.data;

      data.value.forEach(item => {
        axios
          .post(url, {
            tanggal: item.tanggalPengambilan,
            id: item.idBarang,
            nama: item.namaBarang,
            number: item.jumlahBarang,
            jenis: item.keterangan
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      });

      const tbody = document.querySelector('.min-w-full tbody');
      tbody.innerHTML = '';

      data.value.forEach(item => {
        const row = tbody.insertRow();
        Object.values(item).forEach(value => {
          const cell = row.insertCell();
          const text = document.createTextNode(value);
          cell.appendChild(text);
        });
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function sortBy(key: string) {
    sortKey = key;
    sortOrders[key] = sortOrders[key] * -1;
  }

  onMounted(() => {
    fetchData();
  });
</script>

<script lang="ts">
  import { defineComponent, onMounted, ref, reactive } from 'vue';

  export default defineComponent({
    components: {
      RouterView
    }
  });
</script>
