<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref, Ref, computed,ComputedRef, defineProps } from 'vue';
import CardBarang  from '@components/CardBarang.vue';
import layout  from '@components/layout.vue';
import axios from 'axios';


// Definisikan props dengan tipe Barang
// expor const props = defineProps({
//   barangs: {
//     type: Array as () => Barang[],
//     required: true
//   }
// });
const router = useRouter();
const barangs = ref<Barang[]>([]);

export interface Barang {
  id_barang: string,
  nama_barang: string,
  jenis_barang: string,
  total_stock: number,
  gambar_barang: string,
  harga_barang: number,
  path: string
}

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
    harga_barang: item.harga_barang
  }));
};



// Langkah 4: Panggil fungsi normalizeResponseToBarang dengan respons yang diterima
onMounted(async () => {
  try {
    const response = await axios.get('https://vjk2k0f5-5000.asse.devtunnels.ms/barang');
    barangs.value = normalizeResponseToBarang(response.data);

    console.log(response)
    console.log(barangs.value)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const filteredBarangs = computed(() => barangs.value);


console.log(filteredBarangs)
  
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
    <div class="mt-20 sm:ml-5 h-full ">   
        <!-- Card -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4 items-center justify-between p-6 ">
          <div class="md:container md:mx-auto columns-xs sticky mt-2" v-for="item in filteredBarangs" :key="item.id_barang">
            <CardBarang :barang= "item" /> 
          </div> 
        </div>
      
    </div>
  <RouterView />
</template>