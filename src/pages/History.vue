<script setup lang="ts">
  import { ref } from 'vue';
  
  // Dummy data, you should replace this with your actual data
  const itemList = ref([
    { kodeBarang: 'A001', namaBarang: '3 way stop cock', hematologi: '...', kardio: '...', respiratory: '...', integumen: '...', muskulo: '...', persepsi: '...', kritis: '...', paliatif: '...', biomedik: '...', kdp: '...', jumlah: '...' },
    { kodeBarang: 'A002', namaBarang: 'Alkohol 70 % 100 ml', hematologi: '...', kardio: '...', respiratory: '...', integumen: '...', muskulo: '...', persepsi: '...', kritis: '...', paliatif: '...', biomedik: '...', kdp: '...', jumlah: '...' },
    { kodeBarang: 'GHI789', namaBarang: 'Barang 3', hematologi: '...', kardio: '...', respiratory: '...', integumen: '...', muskulo: '...', persepsi: '...', kritis: '...', paliatif: '...', biomedik: '...', kdp: '...', jumlah: '...' },
  ]);
</script>

<template>
    <div class="mx-auto max-w-6xl mr-20 min-w-3.5 h-fit overflow-x-auto pt-20">
      <table class="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead class="bg-gray-100 text-gray-800 uppercase text-sm font-semibold text-left">
          <tr>
            <th class="px-30 py-30 md:px-6 md:py-3">Kode Barang</th>
            <th class="px-40 py-30 md:px-6 md:py-3">Nama Barang</th>
            <th class="px-4 py-3 md:px-6 md:py-3">Hematologi</th>
            <th class="px-4 py-3 md:px-6 md:py-3">Kardio</th>
            <th class="px-4 py-3 md:px-6 md:py-3">Respiratory</th>
            <th class="px-4 py-3 md:px-6 md:py-3">Integumen</th>
            <th class="px-4 py-3 md:px-6 md:py-3">Muskulo</th>
            <th class="px-4 py-3 md:px-6 md:py-3">Persepsi</th>
            <th class="px-4 py-3 md:px-6 md:py-3">Kritis</th>
            <th class="px-4 py-3 md:px-6 md:py-3">Paliatif</th>
            <th class="px-4 py-3 md:px-6 md:py-3">Biomedik</th>
            <th class="px-4 py-3 md:px-6 md:py-3">KDP</th>
            <th class="px-4 py-3 md:px-6 md:py-3">Jumlah</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <!-- Dummy data, you should replace this with dynamic data -->
          <tr v-for="(item, index) in itemList" :key="index">
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.kodeBarang }}</td>
            <td class="px-40 py-20 md:px-6 md:py-3">{{ item.namaBarang }}</td>
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.hematologi }}</td>
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.kardio }}</td>
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.respiratory }}</td>
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.integumen }}</td>
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.muskulo }}</td>
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.persepsi }}</td>
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.kritis }}</td>
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.paliatif }}</td>
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.biomedik }}</td>
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.kdp }}</td>
            <td class="px-4 py-2 md:px-6 md:py-3">{{ item.jumlah }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <RouterView />
  </template>
  
  

  