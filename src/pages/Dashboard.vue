<script>
import { ref } from "vue";
import axios from "axios";
import Layout from "../components/Layout.vue";

export default {
  components: {
    Layout, // Menambahkan Layout sebagai komponen yang digunakan
  },
  data() {
    return {
      data: [],
    };
  },
  methods: {
    async updateItem() {
      try {
        const response = await axios.get(
          "https://vjk2k0f5-5000.asse.devtunnels.ms/dashboardNotif"
        );
        this.data = response.data;
        this.clearTable();
        this.addRowsToTable();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    clearTable() {
      const tableBody = this.$refs.tableBody;
      tableBody.innerHTML = "";
    },
    addRowsToTable() {
      const tableBody = this.$refs.tableBody;
      this.data.forEach((item) => {
        const row = document.createElement("tr");
        Object.values(item).forEach((value) => {
          const cell = document.createElement("td");
          const text = document.createTextNode(value);
          cell.appendChild(text);
          row.appendChild(cell);
        });
        tableBody.appendChild(row);
      });
    },
    printTable() {
      window.print();
    },
  },
};
</script>

<template>
  <Layout />
  <div class="mt-0 pl-60 sticky top-0 z-50">
      <div class="border-b-2 border-black flex flex-row justify-between items-center p-3">
        <h4 class="pa-3 text-2xl font-bold">Dashboard</h4>
        
      </div>
    </div>
  <div class="mt-16 pl-[15rem]">
    <div class="max-w-6xl mr-16">
      <!-- Tabel kosong -->
      <div class="bg-white max-w-5xl ml-30 pl-28 pe-8">
        <table class="min-w-max w-full table-auto px-1">
          <thead>
            <tr
              class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
            >
              <th class="py-3 px-2 text-left border" style="text-align: center">
                Id Barang
              </th>
              <th class="py-3 px-2 text-left border" style="text-align: center">
                Nama Barang
              </th>
              <th class="py-3 px-2 text-left border" style="text-align: center">
                Jenis Stok
              </th>
              <th class="py-3 px-2 text-left border" style="text-align: center">
                Jumlah Barang
              </th>
              <th
                class="py-3 px-2 text-left border"
                style="text-align: center"
              ></th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light" ref="tableBody">
            <!-- Data dari array -->
            <tr v-for="(item, index) in data" :key="index">
              <td class="py-3 px-2 text-left border">
                <span>{{ item.id }}</span>
              </td>
              <td class="py-3 px-2 text-left border">
                <span>{{ item.nama }}</span>
              </td>
              <td class="py-3 px-2 text-left border">
                <span>{{ item.jenisBarang }}</span>
              </td>
              <td class="py-3 px-2 text-left border">
                <span>{{ item.kode }}</span>
              </td>
              <td class="py-3 px-2 text-left border"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Kolom baru di bagian bawah -->
    <div class="max-w-5xl ml-10 pl-28 mt-4 flex justify-end">
      <div class="flex flex-col">
        <button
          @click="updateItem()"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2"
        >
          Update
        </button>
        <button
          @click="printTable()"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mt-2"
        >
          Print
        </button>
      </div>
    </div>
  </div>
  <RouterView />
</template>