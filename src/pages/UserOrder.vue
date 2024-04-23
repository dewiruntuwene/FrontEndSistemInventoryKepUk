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
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JUMLAH BARANG</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hapus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.barangs.id_barang" class="bg-white">
                <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <img
                    :src="`${keranjang.barangs.gambar_barang}`"
                    class="w-24 h-24 object-cover rounded-md shadow-md"
                    alt="Product"
                  />
                </td>
                <td v-if="keranjang.barangs && keranjang.barangs" class="px-6 py-4 whitespace-nowrap text-gray"><strong>{{ keranjang.barangs.id_barang }}</strong></td>
                <td class="px-6 py-4 whitespace-nowrap">{{ keranjang.barangs.nama_barang }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ keranjang.barangs.jenis_barang }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="number" class="form-input mt-1 block w-full border border-gray-300 rounded" v-model="pesan_keranjang.jumlah_barang[index]"/> 
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-red-500 cursor-pointer">
                  <button @click="removeItemFromKeranjang(index)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Delete</button>
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
              <label for="namaDosen" class="text-gray-600">Nama Dosen :</label>
              <input type="text" class="form-input mt-1 block w-full border border-gray-300 rounded" v-model="pesan.nama_dosen" />
            </div>
            <div class="mb-4">
              <label for="namaMatakuliah" class="text-gray-600">Nama Matakuliah :</label>
              <input type="text" class="form-input mt-1 block w-full border border-gray-300 rounded" v-model="pesan.nama_matakuliah" />
            </div>
            <div class="mb-4">
              <label for="noMeja" class="text-gray-600">Prasat :</label>
              <input type="text" class="form-input mt-1 block w-full border border-gray-300 rounded" v-model="pesan.prasat" />
            </div>
            <div class="mb-4">
              <label for="noMeja" class="text-gray-600">Jam Praktek :</label>
              <input type="text" class="form-input mt-1 block w-full border border-gray-300 rounded" v-model="pesan.jam_praktek" />
            </div>
            <div class="mb-4">
              <label for="noMeja" class="text-gray-600">Tanggal Praktek :</label>
              <input type="text" class="form-input mt-1 block w-full border border-gray-300 rounded" v-model="pesan.tanggal_praktek" />
            </div>

            <button @click="toggleSubmitModal" type="submit" class="btn btn-success w-full bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2">
              Pesan
            </button>

            <div v-if="isSubmitOpen" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div class="bg-white p-8 rounded-lg">
                <p>Pesanan Anda Akan di Proses</p>
                <button @click="toggleSubmitModal" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Close 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import axios from "axios";
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';
import Navbar from "@components/Navbar.vue";
import { Barang, Keranjang } from "../pages/UserCatalog.vue";


// const useSubmit = () => {
//   const isSubmitOpen = ref(false);

//   const toggleSubmit = () => {
//     isSubmitOpen.value = !isSubmitOpen.value;
//   };

//   return {
//     isSubmitOpen,
//     toggleSubmit,
//   };
// };

// const ModalExample = defineComponent({
//   name: 'SubmitExample',
//   setup() {
//     const { isSubmitOpen, toggleSubmit } = useSubmit();

//     return {
//       isSubmitOpen,
//       toggleSubmit,
//     };
//   },
// });


const router = useRouter();
const toast = useToast();
const isSubmitOpen = ref(false);


const keranjangs = ref<Keranjang[]>([]);
console.log(keranjangs)

const pesan_keranjang = ref({
  jumlah_barang: Array(keranjangs.value.length).fill(0), 
});

const setKeranjangs = (data: Keranjang[]) => {
  keranjangs.value = data;
};

const pesan = ref({
  nama_dosen: '', 
  nama_matakuliah: '', 
  prasat: '', 
  jam_praktek: '',
  tanggal_praktek: '',
  keranjangs: []
});



const hapusKeranjang = async (id_keranjang: number) => {
  try {
    await axios.delete(`https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang/${id_keranjang}`);
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


const removeItemFromKeranjang = async (id_keranjang: number) => {
  try {
    await axios.delete(`https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang/${id_keranjang}`);
    keranjangs.value = keranjangs.value.filter((item: any) => item.id_keranjang !== id_keranjang);
  } catch (error) {
    console.log(error);
  }
};

// const updateJumlahBarang = (index:number, newValue:number) => {
//   pesan.value.jumlah_barang = newValue;
// };

const updateKeranjang = async (id_keranjang: number) => {
        try {
          await axios.patch(`https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang/${id_keranjang}`,
          {jumlah_barang: pesan_keranjang.value.jumlah_barang}
        );
        } catch (error) {
          console.log(error);
        }
};


const checkout = async () => {
    try {
      //Update items from the keranjang 
      await Promise.all(keranjangs.value.map((item: any) => updateKeranjang(item.id_keranjang)));
      
      const requestData = {
        nama_dosen: pesan.value.nama_dosen,
        nama_matakuliah: pesan.value.nama_matakuliah,
        prasat: pesan.value.prasat,
        jam_praktek: pesan.value.jam_praktek,
        tanggal_praktek: pesan.value.tanggal_praktek,
        // keranjangs: {
        //   // pesan_keranjang.value.jumlah_barang
        // }
      };


      await axios.post("https://vjk2k0f5-5000.asse.devtunnels.ms/peminjamBarang", requestData);
      //Update items from the keranjang 
      await Promise.all(keranjangs.value.map((item: any) => updateKeranjang(item.id_keranjang)));
      
      isSubmitOpen.value = true;
    } catch (err) {
      console.log(err);
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


const toggleSubmitModal = () => {
  isSubmitOpen.value = !isSubmitOpen.value;
};
</script>
