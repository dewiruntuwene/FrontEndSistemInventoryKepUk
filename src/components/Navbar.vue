<template>
  <div>
    <nav class="bg-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Hamburger Button -->
          <div class="p-4 sm:hidden">
            <button
              @click="toggleSidebar"
              id="hamburgerButton"
              class="text-blue-500 focus:outline-none"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Sidebar -->
          <div
            :class="[
              'fixed top-0 left-0 h-full w-64 bg-white  transform transition-transform',
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            ]"
          >
            <div class="p-4">
              <button
                @click="toggleSidebar"
                class="text-red-500 focus:outline-none mb-4"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <nav aria-label="breadcrumb">
                <ol
                  class="bg-white p-2 rounded-md shadow-md flex flex-col space-y-2"
                >
                  <li>
                    <router-link
                      to="/UserTransaction"
                      class="text-blue-500 hover:underline"
                      >Transaksi</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      to="/UserCatalog"
                      class="text-blue-500 hover:underline"
                      >User Catalog</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      to="/Profile"
                      class="text-blue-500 hover:underline"
                      >Account</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      to="/UserTransaction"
                      class="text-blue-500 hover:underline"
                      >Transaksi</router-link
                    >
                  </li>
                  <li>
                    <button
                      class="text-blue-500 hover:underline"
                      @click="logout"
                    >
                      Logout
                    </button>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div class="flex-shrink-0">
            <router-link to="/" class="text-xl font-bold text-gray-800"
              >Sistem Inventory</router-link
            >
          </div>

          <!-- Input Search -->
          <!-- <div class="row mt-3">
          <div class="col">
            <div class="input-group mb-3">
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Cari Barang..."
                aria-label="Cari"
                aria-describedby="basic-addon1"
                @input="searchBarang"
              />
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  <b-icon-search></b-icon-search>
                </span>
              </div>
            </div>
          </div>
        </div> -->

          <!-- Menampilkan daftar barang -->
          <!-- <div v-if="searchResults.length > 0">
          <h2>Hasil Pencarian:</h2>
          <ul>
            <li v-for="barang in searchResults" :key="barang.kode_barang">{{ barang.nama_barang }}</li>
          </ul>
        </div>
        <div v-else>
          <p>Tidak ada barang ditemukan.</p>
        </div> -->

          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link
                to="/UserTransaction"
                class="text-gray-800 hover:text-gray-600"
                >Transaksi</router-link
              >
              <router-link
                to="/UserCatalog"
                class="text-gray-800 hover:text-gray-600"
                >Catalog Barang</router-link
              >

              <router-link
                to="/Profile"
                class="text-gray-800 hover:text-gray-600"
                >Account</router-link
              >

              <div class="flex-row relative">
                <a
                  href="#"
                  class="inline-block text-sm px-4 py-2 leading-none border-black rounded text-black border-white hover:border-transparent hover:text-natural-900 hover:bg-blue mt-4 lg:mt-0"
                  @click="logout"
                  >Logout</a
                >
              </div>
            </div>
          </div>

          <!-- component -->
          <div class="flex items-center">
            <div class="relative py-2">
              <div class="t-0 absolute left-3">
                <p
                  class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white"
                >
                  {{ totalJumlahBarang }}
                </p>
              </div>
              <router-link
                to="/UserOrder"
                class="relative text-gray-800 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="file: mt-4 h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed,  } from "vue";
import axios from "axios";
import { Keranjang, Barang } from "../pages/UserCatalog.vue";

interface BarangHabisPakai {
  kode_barang: string;
  jumlah_barang: number;
  nama_barang: string;
  jenis_barang: string;
}

// const props = defineProps({
//   keranjang: {
//     type: Object as () => Keranjang,
//     required: true,
//   },
// });


const barang = ref<Barang[]>();

const searchQuery = ref("");
const searchResults = ref<Barang[]>([]);

const apiUrl = import.meta.env.VITE_API_URL;

const keranjangs = ref<Array<{ jumlah_barang: number }>>([]);

const updateKeranjang = ref([]);
const isSidebarOpen = ref(false);


const setJumlah = (data: any[]) => {
  keranjangs.value = data;
};

// const totalJumlahBarang = computed(() => {
//   return keranjangs.value.reduce((total, item) => total + item.jumlah_barang, 0);
// });

onMounted(() => {
  const token = localStorage.getItem("token");
  axios
    .get(`${apiUrl}/keranjang`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      keranjangs.value = response.data;
      // Update totalJumlahBarang when data is loaded
      totalJumlahBarang.value = keranjangs.value.reduce((total, item) => total + item.jumlah_barang, 0);
    })
    .catch((error) => console.log(error));
});

const totalJumlahBarang = ref(0);

// Update totalJumlahBarang whenever keranjangs changes
keranjangs.value.forEach((item) => {
  totalJumlahBarang.value += item.jumlah_barang;
});

// watch(keranjangs, (newKeranjangs) => {
//   totalJumlahBarang.value = newKeranjangs.reduce((total, item) => total + item.jumlah_barang, 0);
// });

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const logout = async () => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token); // Debugging tambahan
  if (!token) {
    console.error("No token found");
    return;
  }
  try {
    const response = await axios.delete(`${apiUrl}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      // Memeriksa respons status
      localStorage.removeItem("token");
      // Redirect to login page or perform any other action
      window.location.href = "/";
    } else {
      console.error("Logout failed", response.data);
      // Handle logout failure
    }
  } catch (error) {
    console.error("Logout error:", error);
    // Handle error
  }
};

const searchBarang = async () => {
  try {
    const response = await axios.get(`${apiUrl}/barang?q=${searchQuery.value}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

</script>
