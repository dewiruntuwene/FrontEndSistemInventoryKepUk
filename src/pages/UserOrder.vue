<style scoped>
  /* Desktop styles */
 .container {
    max-width: 1200px;
    margin: 40px auto;
  }

 .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

 .table {
    min-width: 768px;
  }

  /* Tablet styles (max-width: 1024px) */
  @media (max-width: 1024px) {
   .container {
      max-width: 900px;
      margin: 20px auto;
    }

   .grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }

   .table {
      min-width: 600px;
    }
  }

  /* Mobile styles (max-width: 768px) */
  @media (max-width: 768px) {
   .container {
      max-width: 50px;
      padding-right: 0px;
      margin-left: 0px;
     
    }

   .grid {
      grid-template-columns: repeat(1, 1fr);
      gap: 5px;
      flex-direction: row-reverse;
    }

   .table {
      min-width: 250px;
    }

    .form {
      min-width: 200px;
      min-height: 50px;
      font-size: 12px;
      padding: 7px;

    }

    .form {
      font-size: 12px;
      padding: 7px;
      margin: 50px;
    }

    .form label {
      font-weight: normal;
      margin-bottom: 10px;
    }

    .form input,.form select,.form textarea {
      padding: 0.1rem;
      height: 1.5rem;
      font-size: 0.7rem;
    }

    .form button {
      padding: 0.1rem 0.25rem;
      font-size: 0.75rem;
    }


    .keranjang table {
      border-spacing: 0;
      border: 1px solid #ddd;
      border-width: 1px 0;
    }

    .keranjang table td{
      font-size: 8px;
      padding: 6px;
    } 
    .keranjang table th {
      font-size: 9px;
      padding: 6px;
      border-width: 0 1px;
    }
  }

  .keranjang table td img {
      width: 80px;
      height: 30px;
    }


</style>


<template>
    <div class="keranjang bg-gray-100 min-h-screen">
      <Navbar :updateKeranjang="keranjangs" />
      
      <div class="container mx-10 py-8 md:mr-3">

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          <!-- Tabel Keranjang -->
          <div class=" table lg:col-span-2 pl-8">
            <h2 class="text-3xl font-bold mb-4">Keranjang <span class="font-semibold">Saya</span></h2>
              <div class="overflow-x-auto">
                <table class="min-w-full bg-white shadow-md rounded-md overflow-hidden">
                  <!-- Table Header -->
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
                    <!-- Table Body -->
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.barangs.kode_barang" class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <img :src="`http://localhost:5000/uploads/${keranjang.barangs.gambar_barang}`" class="w-24 h-24 object-cover rounded-md shadow-md" alt="Product" />
                        </td>
                        <td v-if="keranjang.barangs && keranjang.barangs" class="px-6 py-4 whitespace-nowrap text-gray"><strong>{{ keranjang.barangs.kode_barang }}</strong></td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ keranjang.barangs.nama_barang }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ keranjang.barangs.jenis_barang }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <input type="number" class="form-input mt-1 block w-full border border-gray-300 rounded" v-model="keranjang.jumlah_barang" @change="updateKeranjang(Number(keranjang.id_keranjang), Number(keranjang.jumlah_barang))"/> 
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-red-500 cursor-pointer">
                          <button @click="removeItemFromKeranjang(Number(keranjang.id_keranjang))" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Delete</button>
                        </td>
                      </tr>    
                  </tbody>
                </table>
              </div>
          </div>


          <!-- Form Checkout -->
          <div class="mt-8 md:w-full lg:w-1/3 ml-20 form">
              <div class=" w-full md:w-56 md:ml-10 lg:w-56 sm:w-28s">
                <form  @submit.prevent="checkout" class="bg-white shadow-md rounded-md p-6">
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
                          <input type="time" id="time" class=" border  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:border-blue-500   form-input mt-1 block w-full border rounded border-gray-300" min="09:00" max="18:00" value="00:00" required v-model="pesan.jam_praktek" 
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
                    <button @click="toggleSubmitModal" type="submit"class="btn btn-success w-full bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2">Pesan</button>
    
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
    jumlah_barang: number[];
    // Properti lain yang mungkin ada
  }
  
  const pesan_keranjang = ref({
    jumlah_barang: keranjangs.value.map(item => item.jumlah_barang), 
  });
  
  const setKeranjangs = (data: Keranjang[]) => {
    keranjangs.value = data.map(item => ({
      ...item,
      id_keranjang: Number(item.id_keranjang), // Pastikan id_keranjang adalah number
    }));
  };
  
  const pesan = ref({
    nama_dosen: '', 
    nama_matakuliah: '', 
    prasat: '', 
    jam_praktek: '',
    tanggal_praktek: '',
    jumlah_barang: '',
    keranjangs: []
  });
  
  
  
  // const hapusKeranjang = async (id_keranjang: number) => {
  //   try {
  //     await axios.delete(`https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang/${id_keranjang}`);
  //     toast.error("Sukses Hapus Keranjang", {
  //       type: "error",
  //       position: "top-right",
  //       duration: 3000,
  //       dismissible: true,
  //     });
  //     const response = await axios.get("https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang");
  //     setKeranjangs(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  
  const removeItemFromKeranjang = async (id_keranjang: number) => {
    try {
      await axios.delete(`${apiUrl}/keranjang/${id_keranjang}`);
      keranjangs.value = keranjangs.value.filter(item => item.id_keranjang !== id_keranjang);
      toast.error("Sukses Hapus Keranjang", {
        type: "error",
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  // const updateJumlahBarang = (index:number, newValue:number) => {
  //   pesan.value.jumlah_barang = newValue;
  // };
  
  const updateKeranjang = async (id_keranjang: number, jumlah_barang: number) => {
  try {
    const updateData = { jumlah_barang };
    await axios.patch(`${apiUrl}/keranjang/${id_keranjang}`, updateData);
  } catch (error) {
    console.log(error);
  }
};

  
  
  
  const checkout = async () => {
      try {
        const token = localStorage.getItem('token');
        // Update items from the keranjang 
        await Promise.all(keranjangs.value.map(async (item: any) => {
          await updateKeranjang(item.id_keranjang, item.jumlah_barang);
        }));
  
        const requestData = {
          nama_matakuliah: pesan.value.nama_matakuliah,
          prasat: pesan.value.prasat,
          jam_praktek: pesan.value.jam_praktek,
          tanggal_praktek: pesan.value.tanggal_praktek,
          keranjangs: keranjangs.value.map(item => ({ 
            id_keranjang: item.id_keranjang, 
            jumlah_barang: item.jumlah_barang 
          }))
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
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(`${apiUrl}/keranjang`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
  