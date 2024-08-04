<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref, Ref, computed, ComputedRef, defineProps } from "vue";
import CardBarang from "../components/CardBarang.vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import Navbar from "../components/Navbar.vue";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Definisikan props dengan tipe Barang
// expor const props = defineProps({
//   barangs: {
//     type: Array as () => Barang[],
//     required: true
//   }

// });
const apiUrl = import.meta.env.VITE_API_URL;

const router = useRouter();
const toast = useToast();

const searchQuery = ref("");
interface CustomJwtPayload extends JwtPayload {
  role: string;
}

export interface Barang {
  kode_barang: string;
  nama_barang: string;
  jenis_barang: string;
  total_stock: string;
  gambar_barang: string;
  harga_barang: Number;
  path: string;
}

const props = defineProps<{
  barang: Barang;
}>();

export interface Keranjang {
  id_keranjang: Number;
  barangs: Barang;
  jumlah_barang: Number;
  barangId: String;
}

const pesan = ref({
  jumlah_barang: 0,
});

const transaksiBarang = ref<Keranjang[]>();
const barang = ref<Barang[]>();

console.log(barang);

// Handle token in URL
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (token) {
    try {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const decodedToken: CustomJwtPayload = jwtDecode(token);

      const userRole = decodedToken.role;
      console.log(decodedToken);

      if (userRole === "USER") {
        // Already on UserCatalog page
      } else if (userRole === "ADMIN") {
        router.push("/Dashboard");
      } else {
        console.error("Unknown role:", userRole);
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  } else {
    console.error("No token found in URL");
  }
});

// Filtered barangs based on search query
const filteredBarangs = computed(() => {
  // Check if barang.value is defined before accessing its value
  if (barang.value) {
    return barang.value.filter((item) =>
      item.nama_barang.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  } else {
    // Return empty array if barang.value is undefined
    return [];
  }
});

// Langkah 2 dan 3: Isi objek Barang dengan data respons
const normalizeResponseToBarang = (response: any): Barang[] => {
  const baseUrl = "https://inventory-order-kep-uk.vercel.app/";
  return response.map((item: any) => ({
    path: `${baseUrl}/uploads/${item.gambar_barang}`,
    nama_barang: item.nama_barang,
    jenis_barang: item.jenis_barang,
    total_stock: item.total_stock,
    gambar_barang: item.gambar_barang,
    kode_barang: item.kode_barang,
  }));
};

// Langkah 4: Panggil fungsi normalizeResponseToBarang dengan respons yang diterima
onMounted(async () => {
  try {
    const response = await axios.get(`${apiUrl}/barang`);
    barang.value = normalizeResponseToBarang(response.data);

    // console.log(response)

    // Pastikan bahwa barangs sudah terisi dengan nilai yang valid sebelum mengaksesnya
    if (barang.value) {
      barang.value.forEach((barang) => {
        console.log(barang.kode_barang);
      });
    } else {
      console.error("Data barang belum tersedia");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Fungsi untuk menambahkan barang ke keranjang
const tambahKeKeranjang = async (barang: Barang) => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    console.error("No token found");
    return;
  }
  // const baseUrl = "http://localhost:5000";
  try {
    // Pastikan barang adalah objek yang valid
    // Pastikan barang adalah objek yang valid dan memiliki properti 'id_barang'
    if (!barang || typeof barang !== "object" || !barang.kode_barang) {
      console.error("Barang tidak valid atau tidak memiliki id_barang");
      return;
    } else {
      console.log("barang valid");
    }

    // Pastikan id_barang pada barang yang akan ditambahkan tidak kosong
    if (!barang.kode_barang) {
      console.error("id_barang tidak valid");
      return;
    } else {
      console.log("id_barang valid");
    }

    console.log("Data Barang", barang);
    const response = await axios.post(
      `${apiUrl}/keranjang`,
      {
        jumlah_barang: pesan.value.jumlah_barang,
        barang: {
          kode_barang: barang.kode_barang,
          nama_barang: barang.nama_barang,
          total_stock: barang.total_stock,
          jenis_barang: barang.jenis_barang,
          gambar_barang: `https://inventory-order-kep-uk.vercel.app/uploads/${barang.gambar_barang}`,
          harga_barang: barang.harga_barang,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // router.push({ path: "/UserOrder" });
    toast.success("Sukses Masuk Keranjang", {
      type: "success",
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });

    // Tangani respons untuk mendapatkan id_keranjang yang baru dibuat
    const idKeranjangBaru = response.data.id_keranjang;
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Gagal Masuk Keranjang", {
      type: "error",
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};

const searchBarang = async () => {
  try {
    const response = await axios.get(`${apiUrl}/barang?q=` + searchQuery.value);
    barang.value = normalizeResponseToBarang(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// export interface CartItem {
//     nama: string;
//     kode: string;
//     jumlah: number;
// }

// const cartItems = ref<CartItem[]>([]);
// const router = useRouter();
</script>

<template>
  <Navbar :barang="barang" />

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

  <div class="mt-8 sm:ml-5 h-full px-12">
    <div
      class="w-128 md:w-128 h-40 md:h-48 mx-4 my-4 md:mx-12 text-left bg-black bg-opacity-80 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:bg-opacity-70 dark:border-gray-700 items-center relative justify-center mt-24"
    >
      <div class="relative z-10 p-4 md:p-8">
        <h5
          class="mb-2 text-xl md:text-5xl font-bold text-gray-900 dark:text-white"
        >
          Central Supply Laboratorium
        </h5>
        <p
          class="mb-3 mr-10 text-sm md:text-4xl font-bold text-white-500 sm:text-lg dark:text-white"
        >
          Fakultas Keperawatan Universitas Klabat
        </p>
      </div>

      <img
        src="../assets/gambar2.jpg"
        alt=""
        class="absolute inset-0 w-full h-full object-cover opacity-50"
      />
    </div>

    <!-- Input Search -->
    <form class="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          @input="searchBarang"
          v-model="searchQuery"
          type="text"
          id="default-search"
          class="block w-full p-4 pl-10 text-sm md:text-base lg:text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Barang..."
          required
        />
        <!-- <button type="submit" class="form-control text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> -->
      </div>
    </form>

    <!-- Card -->
    <div
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4 items-center justify-between p-6"
    >
      <div
        class="md:container md:mx-auto"
        v-for="item in filteredBarangs"
        :key="item.kode_barang"
      >
        <CardBarang :barang="item" @tambahKeKeranjang="tambahKeKeranjang" />
      </div>
    </div>
  </div>
  <RouterView />
</template>

<style>
#hero {
  background: linear-gradient(200deg, var(--pr-color), #ca170c);
  height: 50vh;
  width: 100%;
}

.img-hero {
  height: 100%;
}

.hero-tagline h1 {
  color: #fff;
  font-weight: 700;
  font-size: 50px;
  line-height: 72px;
}

.hero-tagline p {
  font-size: 16px;
  color: #fff;
  margin-bottom: 60px;
  margin-top: 20px;
  line-height: 30px;
  width: 85%;
}

.button-lg-primary {
  width: 237px;
  height: 70px;
  background-color: #fff;
  color: var(--pr-color);
  border: none;
  font-size: 20px;
  font-weight: 700;
}
</style>
