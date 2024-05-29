<script setup lang="ts">
import { Barang } from '../pages/UserCatalog.vue';
import { defineProps, defineEmits } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import {useToast} from 'vue-toast-notification';
import axios from "axios";
import { onMounted, ref } from 'vue';
import keranjang from '../assets/keranjang.png';


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
     <!-- <div class="md:flex flex flex-col items-center justify-between p-6">
    <div class="mt-6">
      <div class="card-wrapper">
        <div class="card">
          <div class="bg-white border border-gray-200 shadow rounded-lg p-2">
            <img v-if="barang" :src="barang.path" alt="..." class="rounded-t-lg w-full sm:h-32 h-24 object-cover" />
            <div class="p-2 flex justify-between items-center">
              <div v-if="barang">
                <h5 class="mb-1 text-sm sm:text-lg font-bold tracking-tight text-gray-900 dark:text-black">{{barang.nama_barang}}</h5>
                <p class="mb-1 text-xs sm:text-sm font-normal text-gray-700 dark:text-gray-400">{{ barang.kode_barang }}</p>
                <p class="mb-1 text-xs sm:text-sm font-normal text-gray-700 dark:text-gray-400">{{ barang.jenis_barang }}</p>
                <p class="mb-1 text-xs sm:text-sm font-normal text-gray-700 dark:text-gray-400">{{ barang.total_stock }}</p>
              </div>
              <button v-if="barang" class="focus:outline-none" @click="tambahKeKeranjangHandler()">
                <img src="../assets/keranjang.png" alt="Add to Cart" class="w-6 h-6 mr-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->


        <div class=" md:flex flex flex-col items-center justify-between p-6 ">
            <div class="mt-6">
                <div class=" card w-40">
                    <div class="bg-white border border-gray-200 shadow rounded-lg shadow">
                        <img v-if="barang" :src="barang.path" alt="..." class="rounded-t-lg w-56 -60" />
                        <div class="p-2 flex justify-between items-center">
                            <div v-if="barang" class="p-1">
                                <div class="flex space-x-4 ">
                                    <p class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-black">{{barang.nama_barang}}</p>
                                    <p class="mb-1 text-xs font-normal text-gray-700 dark:text-gray-400">{{ barang.total_stock }}</p>
                                </div>
                                
                                <p class="mb-1 text-xs font-normal text-gray-700 dark:text-gray-400 ">{{ barang.kode_barang }}</p>
                                <p class="mb-1 text-xs font-normal text-gray-700 dark:text-gray-400">{{ barang.jenis_barang }}</p>
                                <button @click="tambahKeKeranjangHandler" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs md:text-xs lg:text-xs px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                                    +Keranjang
                                </button>
                            </div>
                            
                    
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

        .card-wrapper {
  max-width: 100%;
}

.card {
  width: 100%;

}

/* Media query untuk perangkat mobile */
@media (min-width: 640px) {
  .card-wrapper {
    max-width: 25%;
  }
  .card img {
    max-height: 120px;
  }
}

/* Media query untuk iPad */
@media (min-width: 768px) {
  .card-wrapper {
    max-width: 33.3333%;
  }
}

/* Media query untuk perangkat yang lebih besar */
@media (min-width: 1024px) {
  .card-wrapper {
    max-width: 100%;
  }
}

.card img {
  max-height: 150px;
}

.card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
    </style>