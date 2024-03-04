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
              <td class="py-3 px-2 text-left border"><input type="text" v-model="item.id" class="border border-gray-300 rounded px-2 py-1 w-full"></td>
              <td class="py-3 px-2 text-left border"><input type="text" v-model="item.nama" class="border border-gray-300 rounded px-2 py-1 w-full" ></td>
              <td class="py-3 px-2 text-left border"><input type="number" v-model="item.totalStok" class="border border-gray-300 rounded px-2 py-1 w-full" ></td>
              <td class="py-3 px-2 text-left border"><input type="text" v-model="item.jenis" class="border border-gray-300 rounded px-2 py-1 w-full"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Kolom baru di bagian bawah -->
    <div class="max-w-5xl ml-20 pl-28 mt-4 flex justify-end">
      <div class="flex flex-col">
        <button @click="updateItem()" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2">Add</button>
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
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  components: {
    RouterView,
  },
  data() {
    return {
      data: [] as { id: string; nama: string; totalStok: string; jenis: string }[],
      newItem: { id: '', nama: '', totalStok: '', jenis: '' } // data baru yang akan ditambahkan
    };
  },
  methods: {
    async updateItem() {
      // Tambahkan newItem ke data
      this.data.push({...this.newItem});

      // Kosongkan newItem untuk persiapan input data baru
      console.log(this.newItem);
      
      try {
        const response = await axios.get('https://vjk2k0f5-5000.asse.devtunnels.ms/dashboardNotif');
        console.log(response.data);
        this.data = response.data;

        const table = document.querySelector('.min-w-full');

        if (table) {
          table.innerHTML = '';

          this.data.forEach((item: any) => {
            const row = table.insertRow();
            Object.values(item).forEach((value: any) => {
              const cell = row.insertCell();
              const text = document.createTextNode(value);
              cell.appendChild(text);
            });
          });
        } else {
          console.error('Table element not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    mounted() {
      this.updateItem();
    }
  }
});
</script>
