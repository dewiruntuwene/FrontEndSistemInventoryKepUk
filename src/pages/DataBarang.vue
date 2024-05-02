<template>
  <Layout/>
  <div class="mt-16 pl-[15rem]">
    <div class="border-y-2 border-b-4 bg-blue-200 flex flex-row justify-between items-center p-5">
      <h1 class="text-4xl font-bold pa-3">Data Barang</h1>
    </div>

    <div class="max-w-4xl mr-16">
      <!-- Tabel kosong -->
      <div class="bg-blue-100 max-w-full ml-20 pl-0 pe-8 mt-7 overflow-x-auto">
        <div class="table-wrapper">
          <table class="min-w-max w-full table-auto px-1">
            <thead>
              <tr class="bg-blue-200 text-gray-600 uppercase text-sm leading-normal">
                <th class="py-2 px-1 text-left border">Id Barang</th>
                <th class="py-2 px-1 text-left border">Nama Barang</th>
                <th class="py-2 px-1 text-left border">Harga</th>
                <th class="py-2 px-1 text-left border">Total Stok</th> <!-- Kolom untuk harga -->
                <th class="py-2 px-1 text-left border">Jenis Barang</th>
                <th class="py-2 px-1 text-left border">Gambar</th> <!-- Kolom untuk gambar -->
                <th class="py-2 px-1 text-left border"></th> <!-- Kolom untuk tombol delete -->
                <th class="py-2 px-1 text-left border"></th> <!-- Kolom untuk tombol edit -->
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <!-- Data dari array -->
              <tr v-for="(item, index) in data" :key="index">
                <td class="py-2 px-1 text-left border">
                  <input type="text" v-model="item.id" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Id Barang">
                </td>
                <td class="py-2 px-1 text-left border">
                  <input type="text" v-model="item.nama" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Nama Barang">
                </td>
                <td class="py-2 px-1 text-left border">
                  <input type="text" v-model="item.harga" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Harga">
                </td>
                <td class="py-2 px-1 text-left border">
                  <input type="number" v-model="item.totalStok" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Total Stok">
                </td>
                <td class="py-2 px-1 text-left border">
                  <input type="text" v-model="item.jenis" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Jenis Barang">
                </td>
                <td class="py-2 px-1 text-left border">
                  <!-- Tampilkan gambar jika ada -->
                  <img v-if="item.image" :src="item.image" alt="Gambar Barang" class="h-12 w-12 object-cover">
                </td>
                <td class="py-2 px-1 text-left border">
                  <button @click="deleteItem(index)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Delete</button>
                </td>
                <td class="py-2 px-1 text-left border">
                  <button @click="editItem(index)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Kolom baru di bagian bawah -->
    <div class="max-w-4xl ml-8 pl-20 mt-4 flex justify-end">
      <div class="flex flex-col">
        <input type="text" v-model="newItem.id" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Id Barang">
        <input type="text" v-model="newItem.nama" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Nama Barang">
        <input type="text" v-model="newItem.harga" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Harga">
        <input type="number" v-model="newItem.totalStok" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Total Stok">
        <input type="text" v-model="newItem.jenis" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Jenis Barang">
        <!-- Image input field -->
        <input type="file" @change="handleImageUpload" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" accept="image/*">
        <button @click="validateAndAddItem" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2">Add</button>
        <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
      </div>
    </div>

    <!-- Komponen router-view untuk menampilkan halaman yang diarahkan -->
    <router-view />
  </div>
</template>

<script>
// Import komponen RouterView dari Vue Router jika belum diimpor
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
      data: [], // Menyimpan data yang diperoleh dari API
      newItem: { id: '', nama: '', totalStok: '', harga: '', jenis: '', image: null }, // data baru yang akan ditambahkan
      errorMessage: '' // Pesan kesalahan validasi
    }
  },
  created() {
    // Coba ambil data dari localStorage saat komponen dibuat
    const storedData = localStorage.getItem('barangData');

    // Jika ada data di localStorage, gunakan itu. Jika tidak, inisialisasi dengan array kosong.
    this.data = storedData ? JSON.parse(storedData) : [];
  },
  methods: {
    deleteItem(index) {
      this.data.splice(index, 1);
      this.saveDataToLocalStorage(); // Simpan perubahan setelah menghapus item
    },
    editItem(index) {
      // Lakukan sesuatu saat tombol edit ditekan
    },
    validateAndAddItem() {
      if (!this.newItem.id || !this.newItem.nama || !this.newItem.totalStok || !this.newItem.harga || !this.newItem.jenis || !this.newItem.image) {
        this.errorMessage = 'Harap isi semua kolom sebelum menambahkan!';
      } else {
        this.addItem();
        this.errorMessage = ''; // Bersihkan pesan kesalahan jika tidak ada
      }
    },
    async addItem() {
      // Tambahkan newItem ke data
      this.data.push({ ...this.newItem });
      // Kosongkan newItem untuk persiapan input data baru
      console.log(this.newItem)
      // Kirim data termasuk gambar ke backend
      const formData = new FormData();
      formData.append('id_barang', this.newItem.id);
      formData.append('nama_barang', this.newItem.nama);
      formData.append('harga_barang', this.newItem.harga);
      formData.append('total_stock', this.newItem.totalStok);
      formData.append('jenis_barang', this.newItem.jenis);
      formData.append('gambar_barang', this.newItem.image);

      try {
        // Kirim permintaan POST dengan FormData
        await axios.post('https://vjk2k0f5-5000.asse.devtunnels.ms/barang', formData);
        // Reset newItem setelah berhasil
        this.newItem = { id: '', nama: '', totalStok: '', harga: '', jenis: '', image: '', };
      } catch (error) {
        console.error('Error adding item:', error);
      }

      this.saveDataToLocalStorage(); // Simpan perubahan setelah menambah item
    },
    saveDataToLocalStorage() {
      localStorage.setItem('barangData', JSON.stringify(this.data));
    },
    handleImageUpload(event) {
      // Set the image property to the selected file
      this.newItem.image = event.target.files[0];
    },
    formatCurrency(value) {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      });
      return formatter.format(value);
    }
  }
};
</script>

<style scoped>
/* Tidak diperlukan jika menggunakan Tailwind CSS dari CDN */
table {
  font-size: 14px;
}

th,
td {
  padding: 8px;
}

/* Membuat tabel responsif */
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Menambahkan viewport meta tag untuk responsivitas */
@media only screen and (max-width: 480px) {
  /* Sesuaikan lebar tabel dengan layar perangkat */
  .max-w-full {
    width: 100%;
  }
}
</style>