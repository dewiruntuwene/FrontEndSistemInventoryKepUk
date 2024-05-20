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
              <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.barangs.kode_barang" class="bg-white">
                <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <img
                    :src="`http://localhost:5000/uploads/${keranjang.barangs.gambar_barang}`"
                    class="w-24 h-24 object-cover rounded-md shadow-md"
                    alt="Product"
                  />
                </td>
                <td v-if="keranjang.barangs && keranjang.barangs" class="px-6 py-4 whitespace-nowrap text-gray"><strong>{{ keranjang.barangs.kode_barang }}</strong></td>
                <td class="px-6 py-4 whitespace-nowrap">{{ keranjang.barangs.nama_barang }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ keranjang.barangs.jenis_barang }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="number" class="form-input mt-1 block w-full border border-gray-300 rounded" v-model="pesan_keranjang.jumlah_barang[index]"  :class="{ 
    'border-red-500': isFormIncomplete && (!pesan_keranjang.jumlah_barang[index].valueOf() || pesan_keranjang.jumlah_barang[index].valueOf() <= 0) 
  }"/> 
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
                    <label for="namaMatakuliah" class="text-gray-600">Nama Matakuliah :</label>
                    <select v-model="pesan.nama_matakuliah" class="form-select mt-1 block w-full border rounded border-gray-300" :class="{ 'border-red-500': isFormIncomplete && !pesan.nama_matakuliah }">
                      <option value="" disabled selected>Pilih Matakuliah</option>
                      <option v-for="mk in matakuliah" :key="mk" :value="mk">{{ mk }}</option>
                    </select>
                  </div>

                  <div class="mb-4">
                      <label for="prasat" class="text-gray-600">Prasat :</label>
                      <input type="text" class="form-input mt-1 block w-full border rounded border-gray-300" v-model="pesan.prasat" 
                      :class="{ 'border-red-500': isFormIncomplete && !pesan.prasat }" />
                  </div>
                  <div class="mb-4">
                      <label for="jamPraktek" class="text-gray-600">Jam Praktek :</label>
                      <input type="text" class="form-input mt-1 block w-full border rounded border-gray-300" v-model="pesan.jam_praktek" 
                      :class="{ 'border-red-500': isFormIncomplete && !pesan.jam_praktek }"/>
                     
                  </div>
                  <div class="mb-4">
                      <label type="Date" for="tanggalPraktek" class="text-gray-600">Tanggal Praktek :</label>
                      <input datepicker type="Date" class="form-input mt-1 block w-full border rounded border-gray-300" v-model="pesan.tanggal_praktek" 
                      :class="{ 'border-red-500': isFormIncomplete && !pesan.tanggal_praktek }"/>
                  </div>        

                  <!-- Error message for incomplete form -->
                  <div>
                    <p v-show="showError" class="text-red-500 text-xs italic mb-4">
                      Mohon lengkapi semua field sebelum melakukan checkout
                    </p>
                  </div>

                  <!-- Button "Pesan" -->
                 <button 
                      @click="toggleSubmitModal" 
                      type="submit"
                      class="btn btn-success w-full bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2"
                    >
                      Pesan
                    </button>

                  <!-- Modal for submission confirmation -->
                <div v-if="isSubmitOpen && !isFormIncomplete" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                  <div class="bg-white p-8 rounded-lg">
                    <p>Pesanan Anda Akan di Proses</p>
                    <button @click="toggleSubmitModal"
                      class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
import Navbar from "../components/Navbar.vue";
import { Barang, Keranjang } from "../pages/UserCatalog.vue";

const apiUrl = import.meta.env.VITE_API_URL;
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
const isFormIncomplete = ref(false); // New variable to track form completion
const showError = ref(false);


const matakuliah = ['Kardio', 'Hematologi', 'Anatomi', 'Fisiologi', 'Patologi', 'Farmakologi'];

const keranjangs = ref<Keranjang[]>([]);
console.log(keranjangs)


interface PesanKeranjang {
  jumlah_barang: number;
  // Properti lain yang mungkin ada
}

const pesan_keranjang = ref({
  jumlah_barang: keranjangs.value.map(item => item.jumlah_barang), 
});

const setKeranjangs = (data: Keranjang[]) => {
  keranjangs.value = data.map((item) => ({ ...item, jumlah_barang: 0 })); // Initialize quantity to 0 for each item;
};

const pesan = ref({
  nama_dosen: '', 
  nama_matakuliah: '', 
  prasat: '', 
  jam_praktek: '',
  tanggal_praktek: '',
  jumlah_barang: 0,
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
          // find the index of the item in keranjangs.value that matches the id_keranjang
          const itemIndex = keranjangs.value.findIndex(item => item.id_keranjang === id_keranjang);
          
          // If the item exists (findIndex doesn't return -1), we create an update data object containing the specific jumlah_barang
          // from pesan_keranjang.value.jumlah_barang at the corresponding index.
          if (itemIndex !== -1) {
            const updateData = {
              jumlah_barang: pesan_keranjang.value.jumlah_barang[itemIndex]
            };
            await axios.patch(`https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang/${id_keranjang}`, updateData);
          }
        } catch (error) {
          console.log(error);
        }
};



const checkout = async () => {
    try {
      const token = localStorage.getItem('token');
      // Update items from the keranjang 
      await Promise.all(keranjangs.value.map(async (item: any) => {
        await updateKeranjang(item.id_keranjang);
      }));

      const requestData = {
        nama_matakuliah: pesan.value.nama_matakuliah,
        prasat: pesan.value.prasat,
        jam_praktek: pesan.value.jam_praktek,
        tanggal_praktek: pesan.value.tanggal_praktek,
        // keranjangs: {
        //   // pesan_keranjang.value.jumlah_barang
        // }
      };

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

      await axios.post(`${apiUrl}/peminjamBarang`, requestData, config);
     
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
    // Check if all fields in the form are filled
    isFormIncomplete.value = !pesan.value.nama_matakuliah || !pesan.value.prasat || !pesan.value.jam_praktek || !pesan.value.tanggal_praktek || !pesan_keranjang.value.jumlah_barang;


  if (isFormIncomplete.value) {
    showError.value = true;
    throw new Error("Mohon lengkapi semua field sebelum melakukan checkout");
  }

  isSubmitOpen.value = !isSubmitOpen.value;

};
</script>
