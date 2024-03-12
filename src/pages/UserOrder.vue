<template>
  <div class="keranjang bg-gray-100 min-h-screen">
    <Navbar :updateKeranjang="keranjangs" />
    <div class="container mx-auto py-8">
      <!-- breadcrumb -->
      <div class="mt-4">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white p-2 rounded-md shadow-md">
            <li class="breadcrumb-item">
              <router-link to="/UserCatalog" class="text-blue-500">User Catalog</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/UserCatalog" class="text-blue-500">Account</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Keranjang</li>
          </ol>
        </nav>
      </div>

      <div class="mt-8">
        <h2 class="text-3xl font-bold mb-4">Keranjang <span class="font-semibold">Saya</span></h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white shadow-md rounded-md overflow-hidden">
            <thead class="bg-gray-200">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID BARANG</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAMA BARANG</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JENIS BARANG</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL STOCK</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hapus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.barangKeluar[0].id_barang" class="bg-white">
                <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <img
                    :src="`${keranjang.barangKeluar[0].gambar_barang}`"
                    class="w-24 h-24 object-cover rounded-md shadow-md"
                    alt="Product"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray"><strong>{{ keranjang.barangKeluar[0].id_barang }}</strong></td>
                <td class="px-6 py-4 whitespace-nowrap">{{ keranjang.barangKeluar[0].nama_barang }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ keranjang.barangKeluar[0].jenis_barang }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ keranjang.barangKeluar[0].total_stock }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-red-500 cursor-pointer">
                  <i class="fas fa-trash text-red-500" @click="hapusKeranjang(keranjang.barangKeluar[0].id_barang)"></i>
                </td>
              </tr>

              
            </tbody>
          </table>
        </div>
      </div>

      <!-- Form Checkout -->
      <div class="mt-8 flex justify-end">
        <div class="w-full md:w-1/3">
          <form @submit.prevent="checkout" class="bg-white shadow-md rounded-md p-6">
            <div class="mb-4">
              <label for="nama" class="text-gray-600">Nama Dosen :</label>
              <input type="text" class="form-input mt-1 block w-full" v-model="pesan.nama_dosen" />
            </div>
            <div class="mb-4">
              <label for="noMeja" class="text-gray-600">Nama Matakuliah :</label>
              <input type="text" class="form-input mt-1 block w-full" v-model="pesan.nama_matakuliah" />
            </div>
            <div class="mb-4">
              <label for="noMeja" class="text-gray-600">Prasat :</label>
              <input type="text" class="form-input mt-1 block w-full" v-model="pesan.prasat" />
            </div>
            <div class="mb-4">
              <label for="noMeja" class="text-gray-600">Jam Praktek :</label>
              <input type="text" class="form-input mt-1 block w-full" v-model="pesan.jam_praktek" />
            </div>
            <div class="mb-4">
              <label for="noMeja" class="text-gray-600">Tanggal Praktek :</label>
              <input type="text" class="form-input mt-1 block w-full" v-model="pesan.tanggal_praktek" />
            </div>

            <button type="submit" class="btn btn-success w-full">
              Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@components/Navbar.vue";
import { ref, Ref, onMounted } from 'vue';
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

interface Keranjang {
  id_keranjang: number;
  barangKeluar: {
    id_barang: string;
    nama_barang: string;
    jenis_barang: string;
    total_stock: number;
    gambar_barang: string;
  }[];
}

const keranjangs: Ref<Keranjang[]> = ref([]);
console.log(keranjangs)

const pesan = ref({
  nama_dosen: '', 
  nama_matakuliah: '', 
  prasat: '', 
  jam_praktek: '',
  tanggal_praktek: '',
  keranjangs: [] as Keranjang[]
});

const setKeranjangs = (data: Keranjang[]) => {
  keranjangs.value = data;
};


const hapusKeranjang = async (id_barang: string) => {
  try {
    await axios.delete(`https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang${id_barang}`);
    toast.error("Sukses Hapus Keranjang", {
      type: "error",
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
    const response = await axios.get("https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang");
    setKeranjangs(response.data);
  } catch (error) {
    console.log(error);
  }
};

const checkout = async () => {
  if (pesan.value.nama_dosen && pesan.value.nama_matakuliah) {
    pesan.value.keranjangs = keranjangs.value;
    try {
      await axios.post("https://vjk2k0f5-5000.asse.devtunnels.ms/peminjamBarang", pesan.value);
      await Promise.all(
        keranjangs.value.map((item) =>
          axios.delete(`https://vjk2k0f5-5000.asse.devtunnels.ms/keranjangs/${item.barangKeluar[0].id_barang}`)
        )
      );
      router.push({ path: "/pesanan-sukses" });
      toast.success("Sukses Dipesan", {
        type: "success",
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    toast.error("Nama dan Nomor Meja Harus diisi", {
      type: "error",
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};

onMounted(async () => {
  try {
    const response = await axios.get("https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang");
    setKeranjangs(response.data);
    console.log(keranjangs.value);
  } catch (error) {
    console.log(error);
  }
});

</script>

<style>
.breadcrumb-item a:hover {
  text-decoration: underline;
}
.breadcrumb-item a.active {
  color: #333;
  pointer-events: none;
}
</style>
