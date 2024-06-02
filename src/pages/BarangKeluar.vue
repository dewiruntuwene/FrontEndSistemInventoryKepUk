<template>

      </div>
    </div>
  </div>

  <div class="max-w-6xl mx-auto">
    <div class="bg-white max-w-5xl mt-7 ml-20 pl-28">
      <table class="min-w-max w-full table-auto">
        <thead>
          <tr class="bg-slate-400 text-gray-900 uppercase text-sm leading-normal">
            <th class="py-3 px-2 text-left border">No</th>
            <th class="py-3 px-2 text-left border">Tanggal Barang Keluar</th>
            <th class="py-3 px-2 text-left border">Nama Barang</th>
            <th class="py-3 px-2 text-left border">Kode Barang</th>
            <th class="py-3 px-2 text-left border">Total Stok</th>
            <th class="py-3 px-2 text-left border">Jenis Barang</th>
            <th class="py-3 px-2 text-left border">Harga Barang</th>
            <th class="py-3 px-2 text-left border">Gambar Barang</th>
            <th class="py-3 px-2 text-left border"></th>
          </tr>
        </thead>
        <tbody class="text-black text-sm font-light-bolt">
          <tr v-if="filteredData.length === 0">
            <td colspan="9" class="text-center py-3">Not found</td>
          </tr>
          <tr v-for="(item, index) in filteredData" :key="index">
            <td class="py-3 px-2 text-left border">{{ index + 1 }}</td>
            <td class="py-3 px-2 text-left border">{{ formatDate(item.tanggal_keluar) }}</td>
            <td class="py-3 px-2 text-left border">{{ item.nama_barang }}</td>
            <td class="py-3 px-2 text-left border">{{ item.barangs.kode_barang }}</td>
            <td class="py-3 px-2 text-left border">{{ item.barangs.total_stock }}</td>
            <td class="py-3 px-2 text-left border">{{ item.barangs.jenis_barang }}</td>
            <td class="py-3 px-2 text-left border">{{ item.barangs.harga_barang }}</td>
            <td class="py-3 px-2 text-left border">
              <img :src="`http://localhost:5000/uploads/${item.barangs.gambar_barang}`"
              alt="Gambar Barang"
              class="h-10 w-25 object-cover rounded-md shadow-md">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  }
}

function searchItems() {
  if (searchQuery.value.trim() === '') {
    filteredData.value = data.value;
  } else {
    filteredData.value = data.value.filter(item => 
      item.nama_barang.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.barangs.kode_barang.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
}

function deleteItem(index: number) {
  data.value.splice(index, 1);
  searchItems();
}

function editItem(index: number) {
  const item = data.value[index];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tambahkan 1 karena getMonth() mengembalikan bulan dari 0-11
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

onMounted(() => {
  fetchData();
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

