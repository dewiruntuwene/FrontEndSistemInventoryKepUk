<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps <{
    barang: {
        nama_barang: string;
        id_barang: string;
        jenis_barang: string;
        total_stock: number;
        gambar_barang: string;
    }
}>();
const tambahKeKeranjang = () => {
  const router = useRouter();
  router.push('/UserOrder');
};
</script>

<template>
        <div class="md:flex items-center justify-between p-6">
            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/keranjang">
                            <img src=" 'barang.gambar_barang " alt="..." class="rounded-t-lg" />
                        </router-link>
                        <div class="p-2 flex justify-between items-center">
                            <div>
                                <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{{barang.nama_barang}}</h5>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{{ barang.id_barang }}</p>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{{ barang.jenis_barang }}</p>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{{ barang.total_stock }}</p>
                            </div>
                            <router-link to="/keranjang">
                                <button class="focus:outline-none" @click="tambahKeKeranjang()">
                                    <img src="keranjang.png" alt="Add to Cart" class="w-6 h-6 mr-3" />
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <RouterView />
</template>