<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const emits = defineEmits(["tambahKeKeranjang"]);

const props = defineProps<{
  prasat: {
    id_prasat: number;
    nama_prasat: string;
    deskripsi: string;
    barangDalamPrasat: Array<any>;
  };
}>();

const tambahKeKeranjangHandler = () => {
  emits("tambahKeKeranjang", props.prasat);
};
</script>

<template>
  <div class="card-wrapper p-18 mb-2">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
      <!-- Header -->
      <header class="text-center py-4 bg-blue-100">
        <h4 class="uppercase tracking-wide text-sm font-bold text-gray-700">
          {{ prasat.nama_prasat }}
        </h4>
      </header>

      <!-- Content -->
      <div class="p-4 bg-gray-100 flex-grow">
        <div
          v-for="barang in prasat.barangDalamPrasat"
          :key="barang.barang.kode_barang"
          class="flex items-center mb-4"
        >
          <div class="bg-green-300 p-1 rounded-full mr-3">
            <svg
              class="h-2 w-2 text-green-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <polygon points="0 11 2 9 7 14 18 3 20 5 7 18" />
            </svg>
          </div>
          <p class="text-sm text-gray-700">
            {{ barang.barang.nama_barang }} - {{ barang.barang.kode_barang }}
          </p>
        </div>
      </div>

      <!-- Button -->
      <div class="p-2">
        <button
          @click="tambahKeKeranjangHandler"
          class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-3 py-2 p-2"
        >
          + Keranjang
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

@media (min-width: 640px) {
  .card-wrapper {
    max-width: 100%;
  }
}

@media (min-width: 1024px) {
  .card-wrapper {
    max-width: 100%;
  }
}
</style>
