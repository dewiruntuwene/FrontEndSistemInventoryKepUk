<script setup lang="ts">
  import { ref, onMounted,computed } from 'vue';
  import Layout from "../components/layout.vue";
import axios from 'axios';
  


interface Sum {
  jumlah_barang: number
}


export interface transaksiBarang {
    barangId: string;
    nama_barang: string;
    nama_matakuliah: string;
    sum: Sum;
}

  const itemList = ref<transaksiBarang[]>([]);
  const selectedMatakuliah = ref<string>('');
  const selectedBarang = ref<string>('');

  async function fetchData() {
    try {
      const response = await axios.get('https://vjk2k0f5-5000.asse.devtunnels.ms/history');
      itemList.value = response.data.map((item: any) => ({
        barangId: item.barangId,
        nama_barang: item.nama_barang,
        nama_matakuliah: item.nama_matakuliah,
        sum: item._sum // Access _sum directly
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors here, like displaying an error message to the user
    }
  }

  onMounted(fetchData);

  const uniqueMatakuliah = computed(() => Array.from(new Set(itemList.value.map(item => item.nama_matakuliah))));
  const uniqueBarang = computed(() => Array.from(new Set(itemList.value.map(item => item.nama_barang))));

  const totalJumlahBarang = (namaMatakuliah: string, namaBarang: string) => {
    return itemList.value.filter(item => {
      if (namaMatakuliah && namaBarang) {
        return item.nama_matakuliah === namaMatakuliah && item.nama_barang === namaBarang;
      } else if (namaMatakuliah) {
        return item.nama_matakuliah === namaMatakuliah;
      } else if (namaBarang) {
        return item.nama_barang === namaBarang;
      }
      return false;
    }).reduce((total, item) => total + item.sum.jumlah_barang, 0);
  };

  const updateTotal = () => {
    // No need to do anything here, just to trigger reactivity
  };

  // Menghitung total jumlah barang berdasarkan nama_matakuliah
  const totalJumlahBarangByMatakuliah = computed(() => {
    const totals: Record<string, number> = {};
    itemList.value.forEach(item => {
      if (!totals[item.nama_matakuliah]) {
        totals[item.nama_matakuliah] = 0;
      }
      totals[item.nama_matakuliah] += item.sum.jumlah_barang;
    });
    return totals;
  
});

</script>

<template>
  <Layout />
    <div class="mx-auto max-w-6xl mr-20 min-w-3.5 h-fit overflow-x-auto pt-20">
      <table class="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead class="bg-gray-100 text-gray-800 uppercase text-sm font-semibold text-left">
          <tr>
            <th class="px-30 py-30 md:px-6 md:py-3">Kode Barang</th>
            <th class="px-40 py-30 md:px-6 md:py-3">Nama Barang</th>
            <th class="px-40 py-30 md:px-6 md:py-3">Nama Matakuliah</th>
            <th class="px-40 py-30 md:px-6 md:py-3">Jumlah Barang</th>

            <!-- <th v-for="(item, index) in itemList" :key="index">
              <th class="px-4 py-3 md:px-6 md:py-3">{{ item.nama_matakuliah }}</th>
            </th> -->
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <!-- Dummy data, you should replace this with dynamic data -->
          <tr v-for="(item, index) in itemList" :key="index">
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.barangId }}</td>
            <td class="px-40 py-20 md:px-6 md:py-3">{{ item.nama_barang }}</td>
            <td class="px-40 py-20 md:px-6 md:py-3">{{ item.nama_matakuliah }}</td>
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.sum.jumlah_barang }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Dropdowns -->
    <table>
      <thead class="bg-gray-100 text-gray-800 uppercase text-sm font-semibold text-left">
        <tr>
          <th class="px-30 py-30 md:px-6 md:py-3">
            <label for="namaMatakuliah" class="text-gray-600">Nama Matakuliah :</label>
            <select v-model="selectedMatakuliah" class="form-select mt-1 block w-full border rounded border-gray-300">
              <option value="" disabled selected>Pilih Matakuliah</option>
              <option v-for="matakuliah in uniqueMatakuliah" :key="matakuliah">{{ matakuliah }}</option>
            </select>
          </th>
          <th class="px-30 py-30 md:px-6 md:py-3">
            <label for="namaBarang" class="text-gray-600">Total Barang :</label>
            <select v-model="selectedBarang" class="form-select mt-1 block w-full border rounded border-gray-300">
              <option value="" disabled selected>Pilih Barang</option>
              <option v-for="barang in uniqueBarang" :key="barang">{{ barang }}</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="selectedMatakuliah || selectedBarang">
          <td v-if="selectedMatakuliah">Total '{{ selectedMatakuliah }}': {{ totalJumlahBarang(selectedMatakuliah, '') }}></td>
          <td v-if="selectedBarang">Total '{{ selectedBarang }}': {{ totalJumlahBarang('', selectedBarang) }}></td>
        </tr>
      </tbody>
    </table>

   
     <!-- <div v-if="selectedMatakuliah || selectedBarang">
      <p v-if="selectedMatakuliah">Total barang untuk Matakuliah '{{ selectedMatakuliah }}': {{ totalJumlahBarang(selectedMatakuliah) }}</p>
      <p v-if="selectedBarang">Total barang untuk Barang '{{ selectedBarang }}': {{ totalJumlahBarang(selectedBarang) }}</p>
    </div> -->

  </div>
    <RouterView />
  </template>
  
  

  