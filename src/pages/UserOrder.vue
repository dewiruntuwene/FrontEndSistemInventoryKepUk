<script setup lang="ts">
import { ref } from 'vue';
import { CartItem } from '../pages/UserCatalog.vue'; // Menggantikan dengan path sesuai kebutuhan Anda
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import NavBar  from '@components/layout.vue';
import axios from "axios";

// Dapatkan data keranjang dari komponen tempat Anda menambahkan item ke keranjang
// const cartItems = ref<CartItem[]>([]);
//   const itemList = ref([
//   { gambar_barang: '', id_barang: 1, nama_barang: 'Barang 1', total_stock: 10, jenis_barang: 'ABC123', hapus: '' },
//   { gambar_barang: '', id_barang: 1, nama_barang: 'Barang 1', total_stock: 10, jenis_barang: 'ABC123', hapus: '' },
//   { gambar_barang: '', id_barang: 1, nama_barang: 'Barang 1', total_stock: 10, jenis_barang: 'ABC123', hapus: '' }
// ]);

export interface Barang {
    id_barang: string;
    nama_barang: string;
    jenis_barang: string;
    total_stock: number;
    gambar_barang: string;
}

const keranjangs = ref<Barang[]>([]);
const peminjam = ref<{nama_dosen: string; id_barang: string}>({nama_dosen: '', id_barang: ''});

const router = useRouter();

const setKeranjangs = async (data: any) => {
  keranjangs.value = data;
};

const hapusKeranjang = async (id: number) => {
  try {
    await axios.delete(`https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang${barang.id_barang}`);
    console.log("Sukses Hapus Keranjang");
    const response = await axios.get("https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang");
    await setKeranjangs(response.data);
  } catch (error) {
    console.log(error);
  }
};

const checkOut = async () => {
  if (peminjam.value.nama_dosen && peminjam.value.id_barang) {
    peminjam.value.keranjangs = keranjangs.value;
    try {
      await axios.post("https://vjk2k0f5-5000.asse.devtunnels.ms/peminjamBarang", peminjam.value);
      await Promise.all(keranjangs.value.map((barang: any) =>
        axios.delete(`https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang${barang.id_barang}`)
      ));
      router.push({ path: "/pesanan-sukses" });
      console.log("Sukses Dipesan");
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Harus diisi semua");
  }
};
</script>

<template>
  <div class="flex justify-between center p-20">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">Daftar Barang</h2>
      <table class="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead class="bg-gray-100 text-gray-800 uppercase text-sm font-semibold text-left">
          <tr>
            <th class="px-6 py-3">Foto</th>
            <th class="px-6 py-3">ID Barang</th>
            <th class="px-6 py-3">Nama Barang</th>
            <th class="px-6 py-3">Keterangan</th>
            <th class="px-6 py-3">Jumlah</th>
            <th class="px-6 py-3">Hapus</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <!-- Dummy data, you should replace this with dynamic data -->
          <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id_barang">
            <td class="px-6 py-4">{{ keranjang.gambar_barang }}
              <img :src=" '../assets/images/' + keranjang.barang.gambar "
                      class="img-fluid shadow"
                      width="250"/>
            </td>
            <td class="px-6 py-4">{{ keranjang.barangKeluar.id_barang }}</td>
            <td class="px-6 py-4">{{ keranjang.barangKeluar.nama_barang }}</td>
            <td class="px-6 py-4">{{ keranjang.barangKeluar.total_stock }}</td>
            <td class="px-6 py-4">{{ keranjang.barangKeluar.jenis_barang }}</td>
            <td align="center" class="text-danger">
              <b-icon-trash @click="hapusKeranjang(keranjang.id_barang)"></b-icon-trash>
            </td>
          </tr>
        </tbody>
      </table>      
    </div>

    <div class="row justify-content-end">
      <div class="max-w-5xl ml-20 pl-28 mt-4 flex justify-end">
      <div class="flex flex-col">
        <input type="text" v-model="peminjam.nama_dosen" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Nama Dosen">
        <input type="text" v-model="peminjam.nama_matakuliah" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Nama Matakuliah">
        <input type="number" v-model="peminjam.prasat" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Prasat">
        <input type="text" v-model="peminjam.jam_praktek" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Jam Praktek">
        <input type="text" v-model="peminjam.tanggal_praktek" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Tanggal Praktek">
        <button @click="checkOut()" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2">Pesan</button>
      </div>
    </div>
      </div>
  </div>
  <RouterView />
</template>

