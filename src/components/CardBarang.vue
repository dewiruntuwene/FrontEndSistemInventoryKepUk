<script setup lang="ts">
import { Barang } from '../pages/UserCatalog.vue';
import { defineProps, defineEmits } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import {useToast} from 'vue-toast-notification';
import axios from "axios";
import { onMounted, ref } from 'vue';
import keranjang from '@/assets/keranjang.png';


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
        <div class=" md:flex items-center justify-between p-6">
            <div class="mt-6">
                <div class=" card w-40">
                    <div class="bg-white border border-gray-200 shadow rounded-lg shadow  p-2">
                            <img v-if="barang" :src="barang.path" alt="..." class="rounded-t-lg w-56 -60" />
                        <div class="p-2 flex justify-between items-center">
                            <div v-if="barang">
                                <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-black">{{barang.nama_barang}}</h5>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{{ barang.kode_barang }}</p>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{{ barang.jenis_barang }}</p>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{{ barang.total_stock }}</p>
                            </div>
                                <button v-if="barang" class="focus:outline-none" @click="tambahKeKeranjangHandler()">
                                    <img src="../assets/keranjang.png" alt="Add to Cart" class="outline-color: #000 w-6 h-6 mr-3" />
                                </button>
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <RouterView />
</template>

<style>
        .card {
            @apply border-none;
        }
        .card-body h4 {
            @apply text-black font-semibold text-2xl;
        }
        .card-body p {
            @apply text-black font-semibold text-2xl text-right;
        }
        .card-footer span {
            @apply font-medium text-black;
        }
        .card:hover {
            background: linear-gradient(170deg, var(--pr-color), #FC3024, #FC3024);
            box-shadow: 0 10px 20px rgba(0, 0, 0, .25);
        }
        .card:hover .card-body a {
            @apply text-white;
            transition: all ease-in-out .3s;
        }
        .card:hover .card-footer p {
            @apply text-white;
            transition: all ease-in-out .3s;
        }
    </style>