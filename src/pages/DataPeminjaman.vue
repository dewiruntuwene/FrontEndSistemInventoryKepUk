<template>
  <div class="mt-16 pl-[15rem]">
    <div class="border-y-2 border-b-4 bg-blue-200  flex flex-row justify-between items-center p-5">
      <h1 class="text-4xl font-bold pa-3">Data Peminjam</h1>
    </div>

    <div class="flex justify-left mb-4">
      <button @click="fetchData()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pl-">
        Ambil Data
      </button>
    </div>

    <!-- Tabel -->
    <div class="container max-w-4xl mx-auto mr-px mt-4 flex justify-left mb-4"> <!-- Menambahkan properti mt-4 untuk memindahkan ke bawah -->
      <div class="bg-white shadow bg-blue-500 overflow-hidden sm:rounded-lg">
        <div class="overflow-x-auto mx-auto max-w-4xl mr-10 min-w-3.5 h-fit pt-2">
          <table class="min-w-full divide-y  divide-gray-200 justify-center">
            <!-- Tabel Header -->
            <thead class="bg-blue-200 ">
              <tr>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  ID Peminjam
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  ID Barang
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Nama Dosen
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Nama Mata Kuliah
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Prasarat
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Jam Praktek
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Tanggal Praktek
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Tanggal Pengambilan
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Nama Barang
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Keterangan
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Jumlah Barang
                </th>
              </tr>
            </thead>
            <!-- Tabel Body -->
            <tbody class="bg-white divide-y divide-gray-200 mr-mx">
              <!-- Data -->
              <tr v-for="(item, index) in sortedData" :key="index">
                <!-- Isi Tabel -->
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.idPeminjam }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.idBarang }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.namaDosen }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.namaMataKuliah }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.prasat }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.jamPraktek }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.tanggalPraktek }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.tanggalPengambilan }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.keranjang .barangKeluar.namaBarang }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.keranjang.barangKeluar.jenisBarang }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.keranjang.barangKeluar.totalstok }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, computed, Ref } from 'vue';

// Tipe data untuk item dalam array data
interface DataItem {
  idPeminjam: number;
  idBarang: number;
  namaDosen: string;
  namaMataKuliah: string;
  prasat: number;
  jamPraktek: string;
  tanggalPraktek: string;
  tanggalPengambilan: string;
  keranjang: {
    barangKeluar: {
      namaBarang: string;
      jenisBarang: string;
      totalstok: number;
    }
  }
}

// Membuat referensi dengan tipe DataItem[]
const data: Ref<DataItem[]> = ref([]); // Menyimpan data yang diperoleh dari API

// Membuat referensi dengan tipe string
const sortKey = ref<string>(''); // Untuk menyimpan kunci sortir

// Menyimpan aturan sortir untuk setiap kunci
const sortOrders: Record<string, number> = {
  idPeminjam: 1,
  idBarang: 1,
  namaDosen: 1,
  namaMataKuliah: 1,
  prasat: 1,
  jamPraktek: 1,
  tanggalPraktek: 1,
  tanggalPengambilan: 1,
  namaBarang: 1,
  jenisBarang: 1,
  totalstok: 1
};

// Membuat komputed dengan tipe DataItem[]
const sortedData = computed<DataItem[]>(() => {
  const key = sortKey.value as keyof DataItem;
  const order = sortOrders[key] || 1;
  return data.value.slice().sort((a, b) => {
    // Mengakses nilai properti dengan aman menggunakan pengindeksan yang diberikan oleh keyof
    const aValue: string = String(a[key]);
    const bValue: string = String(b[key]);
    return order * aValue.localeCompare(bValue);
  });
});


async function fetchData(): Promise<void> {
  try {
    // Menggunakan Axios untuk mengambil data dari endpoint API
    const response = await axios.get('https://vjk2k0f5-5000.asse.devtunnels.ms/peminjamBarang'); // Ganti URL_ENDPOINT dengan URL yang benar
    data.value = response.data;
    console.log(data.value)

    // Mendapatkan elemen tbody dari tabel menggunakan query selector
    const tbodyElement = document.querySelector('.min-w-full tbody') as HTMLTableSectionElement | null;

    if (tbodyElement) {
      // Mengosongkan isi tbody sebelum mengisi dengan data baru
      tbodyElement.innerHTML = '';

      // Loop melalui data dan menambahkan baris baru ke dalam tbody
      data.value.forEach(item => {
        const row = tbodyElement.insertRow();
        Object.values(item).forEach(value => {
          const cell = row.insertCell();
          const text = document.createTextNode(String(value));
          cell.appendChild(text);
        });
      });
    } else {
      console.error('Error: tbody element not found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function sortBy(key: string): void {
  sortKey.value = key;
  sortOrders[key] = sortOrders[key] * -1;
}

onMounted(() => {
  fetchData(); // Panggil fetchData saat komponen dimuat
});
</script>
