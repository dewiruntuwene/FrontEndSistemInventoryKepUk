<template>
  <Layout/>
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
    <div class="container max-w-4xl mx-auto mr-px mt-4 flex justify-left mb-4 overflow-x-auto">
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
                  Nama Dosen
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Nama Mata Kuliah
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Prasat
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Jam Praktek
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Tanggal Pemngambilan
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Jumlah Barang 
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Id Barang
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Nama Barang
                </th>
                <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Jenis Barang
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
                  <div class="text-xs text-gray-900">{{ item.tanggalPengambilan }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.jumlahBarang }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.idBarang }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.namaBarang }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-xs text-gray-900">{{ item.jenisBarang }}</div>
                </td>
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import Layout from "@components/layout.vue";

export default {
  components: {
    Layout 
  },
  data() {
    return {
      data: [],
      sortKey: '',
      sortOrders: {
        idPeminjam: 1,
        namaDosen: 1,
        namaMataKuliah: 1,
        prasat: 1,
        jamPraktek: 1,
        tanggalPemngambilan: 1,
        jumlahBarang: 1,
        idBarang: 1,
        namaBarang: 1,
        jenisBarang: 1
      }
    };
  },
  computed: {
    sortedData() {
      const key = this.sortKey;
      const order = this.sortOrders[key] || 1;
      return this.data.slice().sort((a, b) => {
        a = a[key];
        b = b[key];
        // Periksa apakah nilai tidak null atau undefined sebelum mengonversinya menjadi string
        if (a !== null && a !== undefined && b !== null && b !== undefined) {
          // Jika nilai tidak null atau undefined, konversi ke string dan bandingkan
          return order * (a.toString().localeCompare(b.toString()));
        } else {
          // Jika nilai null atau undefined, atur urutan ke nilai default (misalnya, 1)
          return order;
      }
      });
    }
  },
  methods: {
    async fetchData() {
  try {
    const response = await axios.get('https://vjk2k0f5-5000.asse.devtunnels.ms/peminjamBarang');
    this.data = response.data.map(item => ({
      idPeminjam: item.id_peminjam,
      namaDosen: item.nama_dosen,
      namaMataKuliah: item.nama_matakuliah,
      prasat: item.prasat,
      jamPraktek: item.jam_praktek,
      tanggalPengambilan: item.tanggal_pengambilan,
      jumlahBarang: item.keranjangs.jumlah_barang, // Ubah properti jumlahBarang
      idBarang: item.keranjangs.barangs.id_barang,
      namaBarang: item.keranjangs.barangs.nama_barang,
      totalStock: item.keranjangs.barangs.total_stock, // Tambah properti totalStock jika diperlukan
      jenisBarang: item.keranjangs.barangs.jenis_barang,
      hargaBarang: item.keranjangs.barangs.harga_barang, // Tambah properti hargaBarang jika diperlukan
      gambarBarang: item.keranjangs.barangs.gambar_barang // Tambah properti gambarBarang jika diperlukan
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

  },
  mounted() {
    this.fetchData();
  }
};
</script>