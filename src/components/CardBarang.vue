<script setup lang="ts">
import { Barang } from 'src/pages/UserCatalog.vue';
import { defineProps } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import {useToast} from 'vue-toast-notification';
import axios from "axios";
import { onMounted, ref } from 'vue';

const toast = useToast();
const router =  useRouter();


const props = defineProps({
    barang: Object as () => Barang // Menetapkan tipe prop barang
});

// Fungsi untuk menambahkan barang ke keranjang
const tambahKeKeranjang = async (id_barang: string) => {
    // Memeriksa apakah props.barang terdefinisi
    if (props.barang) {
        // Mengambil data barang dari props.barang
        const barangToAdd = {
            create: {
                id_barang: props.barang.id_barang,
                nama_barang: props.barang.nama_barang,
                jenis_barang: props.barang.jenis_barang,
                total_stock: props.barang.total_stock,
                gambar_barang: props.barang.gambar_barang
            }
        };


        try {
            const response = await axios.post('https://vjk2k0f5-5000.asse.devtunnels.ms/keranjang', {barangToAdd});
            console.log(response)
            // Memberikan notifikasi bahwa barang berhasil ditambahkan ke keranjang
            toast.success("Sukses Masuk Keranjang", {
                type: "success",
                position: "top-right",
                duration: 3000,
                dismissible: true,
            });
            router.push({ path: '/UserOrder' });
        } catch (error) {
            console.error('Error adding to cart:', error);
            // Menampilkan notifikasi jika terjadi kesalahan
            toast.error("Gagal Menambahkan ke Keranjang", {
                type: "error",
                position: "top-right",
                duration: 3000,
                dismissible: true,
            });
        }
    } else {
        // Menampilkan pesan kesalahan jika props.barang tidak terdefinisi
        console.error('Props barang tidak terdefinisi');
        toast.error("Props barang tidak terdefinisi", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
        });
    }
};

</script>


<template>
        <div class="md:flex items-center justify-between p-6">
            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img v-if="props.barang" :src="props.barang.path" alt="..." class="rounded-t-lg w-56 -60" />
                        <div class="p-2 flex justify-between items-center">
                            <div v-if="props.barang">
                                <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{{props.barang.nama_barang}}</h5>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{{ props.barang.id_barang }}</p>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{{ props.barang.jenis_barang }}</p>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{{ props.barang.total_stock }}</p>
                            </div>
                                <button v-if="props.barang" class="focus:outline-none" @click="tambahKeKeranjang(props.barang.id_barang)">
                                    <img src="keranjang.png" alt="Add to Cart" class="w-6 h-6 mr-3" />
                                </button>
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <RouterView />
</template>