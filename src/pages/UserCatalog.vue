<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref, Ref, computed,ComputedRef, defineProps } from 'vue';
import CardBarang  from '../components/CardBarang.vue';
import Layout  from '../components/Layout.vue';
import axios from 'axios';
import {useToast} from 'vue-toast-notification';
import Navbar from "../components/Navbar.vue";


// Definisikan props dengan tipe Barang
// expor const props = defineProps({
//   barangs: {
//     type: Array as () => Barang[],
//     required: true
//   }

// });
const apiUrl = import.meta.env.VITE_API_URL;

const router = useRouter();
const toast = useToast();

const searchQuery = ref('');


export interface Barang {
  kode_barang: string,
  nama_barang: string,
  jenis_barang: string,
  total_stock: string,
  gambar_barang: string,
  harga_barang: Number,
  path: string
}



export interface Keranjang {
  id_keranjang: Number;
  barangs: Barang;
  jumlah_barang: Number;
  barangId: String;
}

const pesan = ref({
  jumlah_barang: 0, 
});



const transaksiBarang = ref<Keranjang[]>();
const barang = ref<Barang[]>();

console.log(barang)

// Filtered barangs based on search query
const filteredBarangs = computed(() => {
  // Check if barang.value is defined before accessing its value
  if (barang.value) {
    return barang.value.filter(item =>
      item.nama_barang.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  } else {
    // Return empty array if barang.value is undefined
    return [];
  }
});

// Langkah 2 dan 3: Isi objek Barang dengan data respons
const normalizeResponseToBarang = (response: any): Barang[] => {
  const baseUrl = 'http://localhost:5000';
  return response.map((item: any) => ({
    path: `${baseUrl}/uploads/${item.gambar_barang}`,
    nama_barang: item.nama_barang,
    jenis_barang: item.jenis_barang,
    total_stock: item.total_stock,
    gambar_barang: item.gambar_barang,
    kode_barang: item.kode_barang
  }));
};


// Langkah 4: Panggil fungsi normalizeResponseToBarang dengan respons yang diterima
onMounted(async () => {
  try {
    const response = await axios.get('https://vjk2k0f5-5000.asse.devtunnels.ms/barang');
    barang.value = normalizeResponseToBarang(response.data);

    // console.log(response)

    // Pastikan bahwa barangs sudah terisi dengan nilai yang valid sebelum mengaksesnya
    if (barang.value) {
      barang.value.forEach((barang) => {
        console.log(barang.kode_barang);
      });
    } else {
      console.error("Data barang belum tersedia");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

});



// if (barangs.value) {
//     barangs.value.forEach((barang) => {
//         console.log(barang.id_barang);
//     });
// } else {
//     console.error("Data barang belum tersedia");
// }



// Fungsi untuk menambahkan barang ke keranjang
const tambahKeKeranjang = async (barang: Barang) => {
  const token = localStorage.getItem('token');
  console.log(token)
  if (!token) {
    console.error('No token found');
    return;
  }
  const baseUrl = 'http://localhost:5000';
    try {
       // Pastikan barang adalah objek yang valid
         // Pastikan barang adalah objek yang valid dan memiliki properti 'id_barang'
         if (!barang || typeof barang !== 'object' || !barang.kode_barang) {
            console.error('Barang tidak valid atau tidak memiliki id_barang');
            return;
        } else{
          console.log('barang valid')
        }

        // Pastikan id_barang pada barang yang akan ditambahkan tidak kosong
        if (!barang.kode_barang) {
            console.error('id_barang tidak valid');
            return;
        } else {
          console.log('id_barang valid')
        }

       
        console.log('Data Barang', barang);
        const response = await axios.post(`${apiUrl}/keranjang`, {
            jumlah_barang: pesan.value.jumlah_barang,
            barang: {
                kode_barang: barang.kode_barang,
                nama_barang: barang.nama_barang,
                total_stock: barang.total_stock,
                jenis_barang: barang.jenis_barang,
                gambar_barang: `http://localhost:5000/uploads/${barang.gambar_barang}`,
                harga_barang: barang.harga_barang,
            }, 
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
      });
          
        router.push({path: "/UserOrder"})
        toast.success("Sukses Masuk Keranjang", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        // Tangani respons untuk mendapatkan id_keranjang yang baru dibuat
        const idKeranjangBaru = response.data.id_keranjang;
    } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error("Gagal Masuk Keranjang", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
    }
};

const searchBarang = async () => {
  try {
    const response = await axios.get("https://vjk2k0f5-5000.asse.devtunnels.ms/barang?q=" + searchQuery.value);
    barang.value = normalizeResponseToBarang(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
  

// export interface CartItem {
//     nama: string;
//     kode: string;
//     jumlah: number;
// }

// const cartItems = ref<CartItem[]>([]);
// const router = useRouter();


</script>

<template>
  <Navbar :updateKeranjang="barang" />
    <!-- Input Search -->
    <div class="row mt-3">
    <div class="col">
      <div class="input-group mb-3">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Cari Barang..."
          aria-label="Cari"
          aria-describedby="basic-addon1"
          @input="searchBarang"
        />
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <b-icon-search></b-icon-search>
          </span>
        </div>
      </div>
    </div>
  </div>

    
    <div class="mt-20 sm:ml-5 h-full "> 
      
      <section id="hero" class="relative">
        <div class="container h-full mx-auto">
          <div class="flex h-full items-center">
            <div class="w-full md:w-1/2 my-auto">
              <h1 class="text-4xl font-bold"> Sistem Inventory Fakultas Keperawatan</h1>
              <p class="mt-4 text-4xl">Universitas Klabat</p>
              
           
              <a href="" class="inline-block mt-4">
                <img src="" alt="">
              </a>
            </div>
          </div>
        </div>
      </section>
    
    
        <!-- Card -->
        <div class="grid grid-cols-1 md:grid-cols-8  mb-4 items-center justify-between p-6 ">
          <div class="md:container md:mx-auto columns-xs sticky mt-2" v-for="item in filteredBarangs" :key="item.kode_barang" >
            <CardBarang :barang= "item"  @tambahKeKeranjang="tambahKeKeranjang" /> 
          </div> 
        </div>
      
    </div>
  <RouterView />
</template>