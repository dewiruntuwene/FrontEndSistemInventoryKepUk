<script setup lang="ts">
import { Barang } from 'src/pages/UserCatalog.vue';
import { defineProps, defineEmits } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import {useToast} from 'vue-toast-notification';
import axios from "axios";
import { onMounted, ref } from 'vue';


const toast = useToast();
const router =  useRouter();
const emits = defineEmits(['tambahKeKeranjang']);

const props = defineProps({
    barang: {
        type: Object as () => Barang,
        required: true
    }
});

console.log(props)


const tambahKeKeranjangHandler = () => {
    emits('tambahKeKeranjang', props.barang);
};


</script>


<template>
        <div class="md:flex items-center justify-between p-6">
            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img v-if="barang" :src="barang.path" alt="..." class="rounded-t-lg w-56 -60" />
                        <div class="p-2 flex justify-between items-center">
                            <div v-if="barang">
                                <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{{barang.nama_barang}}</h5>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{{ barang.id_barang }}</p>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{{ barang.jenis_barang }}</p>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{{ barang.total_stock }}</p>
                            </div>
                                <button v-if="barang" class="focus:outline-none" @click="tambahKeKeranjangHandler()">
                                    <img src="keranjang.png" alt="Add to Cart" class="w-6 h-6 mr-3" />
                                </button>
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <RouterView />
</template>