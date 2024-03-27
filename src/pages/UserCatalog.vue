<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref, Ref, computed,ComputedRef, defineProps } from 'vue';
import CardBarang  from '@components/CardBarang.vue';
import layout  from '@components/layout.vue';
import axios from 'axios';
import {useToast} from 'vue-toast-notification';
import Navbar from "@components/Navbar.vue";
import { BarangKeluar } from './BarangKeluar.vue';

// Definisikan props dengan tipe Barang
// expor const props = defineProps({
//   barangs: {
//     type: Array as () => Barang[],
//     required: true
//   }
// });
const router = useRouter();
const toast = useToast();

export interface Barang {
  id_barang: string,
  nama_barang: string,
  jenis_barang: string,
  total_stock: string,
  gambar_barang: string,
  path: string
}

export interface TransaksiBarang {
  barangId: string;
  type: 'BarangKeluar';
  barang: Barang;
}
const transaksiBarang = ref<TransaksiBarang[]>();
const barangs = ref<Barang[]>();

// Langkah 2 dan 3: Isi objek Barang dengan data respons
const normalizeResponseToBarang = (response: any): Barang[] => {
  const baseUrl = 'http://localhost:5000';
  return response.map((item: any) => ({
    path: `${baseUrl}/uploads/${item.gambar_barang}`,
    id_barang: item.id_barang,
    nama_barang: item.nama_barang,
    jenis_barang: item.jenis_barang,
    total_stock: item.total_stock,
    gambar_barang: item.gambar_barang,
  }));
};


// Langkah 4: Panggil fungsi normalizeResponseToBarang dengan respons yang diterima
onMounted(async () => {
  try {
    const response = await axios.get('https://vjk2k0f5-5000.asse.devtunnels.ms/barang');
    barangs.value = normalizeResponseToBarang(response.data);

    // console.log(response)

    // Pastikan bahwa barangs sudah terisi dengan nilai yang valid sebelum mengaksesnya
    if (barangs.value) {
      barangs.value.forEach((barang) => {
        console.log(barang.id_barang);
      });
    } else {
      console.error("Data barang belum tersedia");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

});

const filteredBarangs = computed(() => barangs.value);



// if (barangs.value) {
//     barangs.value.forEach((barang) => {
//         console.log(barang.id_barang);
//     });
// } else {
//     console.error("Data barang belum tersedia");
// }



// Fungsi untuk menambahkan barang ke keranjang
const tambahKeKeranjang = async (barang: Barang) => {
    try {
       // Pastikan barang adalah objek yang valid
       if (!barang || typeof barang !== 'object') {
            console.error('Barang tidak valid');
            return;
        } else{
          console.log('barang valid')
        }

        // Pastikan id_barang pada barang yang akan ditambahkan tidak kosong
        if (!barang.id_barang) {
            console.error('id_barang tidak valid');
            return;
        } else {
          console.log('id_barang valid')
        }

        const transaksiBarang: TransaksiBarang = {
          barangId: barang.id_barang,
          type: 'BarangKeluar',
          barang: {
            id_barang: barang.id_barang,
            nama_barang: barang.nama_barang,
            jenis_barang: barang.jenis_barang,
            total_stock: barang.total_stock,
            gambar_barang: barang.path,
            path: barang.path
          },
        };


        console.log('Data Barang', barang);
        const response = await axios.post('https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang', {
          transaksiBarang
              
        });
        router.push({path: "/UserOrder"})
        toast.success("Sukses Masuk Keranjang", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
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

  
// // Fungsi untuk melakukan pencarian barang
// const searchBarang = () => {
//   axios.get('' + search)
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(err => console.log(err));
// }

// export interface CartItem {
//     nama: string;
//     kode: string;
//     jumlah: number;
// }

// const cartItems = ref<CartItem[]>([]);
// const router = useRouter();


</script>

<template>
  <Navbar :updateKeranjang="barangs" />
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
    <div class="mt-20 sm:ml-5 h-full ">   
        <!-- Card -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4 items-center justify-between p-6 ">
          <div class="md:container md:mx-auto columns-xs sticky mt-2" v-for="item in filteredBarangs" :key="item.id_barang" >
            <CardBarang :barang= "item"  @tambahKeKeranjang="tambahKeKeranjang" /> 
          </div> 
        </div>
      
    </div>
  <RouterView />
</template>