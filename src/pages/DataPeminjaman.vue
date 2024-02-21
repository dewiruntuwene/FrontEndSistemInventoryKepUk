<template>
    <div class="container mr-mx pl-4 pb-11">
      <!-- Judul -->
      <h2 class="text-center font-bold text-xl pb-10">Data Peminjaman Barang</h2>
  
      <!-- Dropdown untuk menyortir data -->
      <!-- Pindahkan bagian Sort by di sini -->
      <!-- Sesuaikan margin dan posisi sesuai kebutuhan -->
      <div class="flex items-center justify-end mb-4">
        <label for="sort" class="text-xs font-medium text-gray-500 uppercase tracking-wider mr-2">Sort by:</label>
        <select v-model="sortKey" id="sort" class="px-2 py-1 border rounded-md text-xs">
          <option value="idPeminjam">ID Peminjam</option>
          <option value="idBarang">ID Barang</option>
          <option value="namaDosen">Nama Dosen</option>
          <option value="namaMataKuliah">Nama Mata Kuliah</option>
          <option value="prasarat">Prasarat</option>
          <option value="jamPraktek">Jam Praktek</option>
          <option value="tanggalPraktek">Tanggal Praktek</option>
          <option value="tanggalPengambilan">Tanggal Pengambilan</option>
          <option value="namaBarang">Nama Barang</option>
          <option value="keterangan">Keterangan</option>
          <option value="jumlahBarang">Jumlah Barang</option>
        </select>
      </div>
  
      <!-- Tabel -->
      <div class="container max-w-4xl mx-auto  mr-px">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="overflow-x-auto mx-auto max-w-4xl mr-10 min-w-3.5 h-fit pt-2">
            <table class="min-w-full divide-y divide-gray-200">
              <!-- Tabel Header -->
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" @click="sortBy('idPeminjam')" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer">
                    ID Peminjam
                  </th>
                  <th scope="col" @click="sortBy('idBarang')" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer">
                    ID Barang
                  </th>
                  <th scope="col" @click="sortBy('namaDosen')" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer">
                    Nama Dosen
                  </th>
                  <th scope="col" @click="sortBy('namaMataKuliah')" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer">
                    Nama Mata Kuliah
                  </th>
                  <th scope="col" @click="sortBy('prasarat')" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer">
                    Prasarat
                  </th>
                  <th scope="col" @click="sortBy('jamPraktek')" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer">
                    Jam Praktek
                  </th>
                  <th scope="col" @click="sortBy('tanggalPraktek')" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer">
                    Tanggal Praktek
                  </th>
                  <th scope="col" @click="sortBy('tanggalPengambilan')" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer">
                    Tanggal Pengambilan
                  </th>
                  <th scope="col" @click="sortBy('namaBarang')" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer">
                    Nama Barang
                  </th>
                  <th scope="col" @click="sortBy('keterangan')" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer">
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
                    <div class="text-xs text-gray-900">{{ item.prasarat }}</div>
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
                    <div class="text-xs text-gray-900">{{ item.namaBarang }}</div>
                  </td>
                  <td class="px-2 py-2 whitespace-nowrap">
                    <div class="text-xs text-gray-900">{{ item.keterangan }}</div>
                  </td>
                  <td class="px-2 py-2 whitespace-nowrap">
                    <div class="text-xs text-gray-900">{{ item.jumlahBarang }}</div>
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
  export default {
    data() {
      return {
        data: [
          {
            idPeminjam: '123',
            idBarang: '456',
            namaDosen: 'John Doe',
            namaMataKuliah: 'Web Development',
            prasarat: 'None',
            jamPraktek: '08:00 - 10:00',
            tanggalPraktek: '2024-02-20',
            tanggalPengambilan: '2024-02-21',
            namaBarang: 'Laptop',
            keterangan: 'Barang dalam kondisi baik',
            jumlahBarang: '2'
          },
          // Tambahkan data lainnya di sini...
        ],
        sortKey: '', // Untuk menyimpan kunci sortir
        sortOrders: {
          // Menyimpan aturan sortir untuk setiap kunci
          idPeminjam: 1,
          idBarang: 1,
          namaDosen: 1,
          namaMataKuliah: 1,
          prasarat: 1,
          jamPraktek: 1,
          tanggalPraktek: 1,
          tanggalPengambilan: 1,
          namaBarang: 1,
          keterangan: 1,
          jumlahBarang: 1
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
          return order * a.localeCompare(b);
        });
      }
    },
    methods: {
      sortBy(key) {
        this.sortKey = key;
        this.sortOrders[key] = this.sortOrders[key] * -1;
      }
    }
  };
  </script>
  