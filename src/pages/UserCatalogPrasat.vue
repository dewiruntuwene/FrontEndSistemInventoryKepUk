<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref, Ref, computed, ComputedRef, defineProps } from "vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import Navbar from "../components/Navbar.vue";
import { jwtDecode, JwtPayload } from "jwt-decode";
import CardPrasat from "../components/CardPrasat.vue";


const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter();
const toast = useToast();
const searchQuery = ref("");
const data = ref<any[]>([]);
const isFormIncomplete = ref(false);
const showError = ref(false);
const isSubmitOpen = ref(false);

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const pesanPrasat = ref({
  rencana_pemakaian: "",
});

export interface Prasat {
  id_prasat: number;
  nama_prasat: string;
  deskripsi: string;
  barangDalamPrasat: [];
}

export interface BarangDalamPrasat {
    barangId: Number;
    jumlah_barang: Number;
    barang: [];
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

const barangDalamPrasat = ref<BarangDalamPrasat[]>([]);

const barang = ref<Barang[]>([]);


const props = defineProps<{ prasat: Prasat }>();

export interface Keranjang {
  prasats: Prasat;
}

const keranjangs = ref<Keranjang[]>([]);

const pesan = ref({ jumlah_prasat: 0 });
const transaksiPrasat = ref<Keranjang[]>();
const prasat = ref<Prasat[]>();

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
        // Stay on the UserCatalog page
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

// Filtered prasats based on search query
const filteredPrasats = computed(() => {
  if (prasat.value) {
    return prasat.value.filter((item) =>
      item.nama_prasat.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  } else {
    return [];
  }
});

// Normalize response data to Prasat objects
const normalizeResponseToPrasat = (response: any): Prasat[] => {
  return response.map((item: any) => ({
    id_prasat: item.id_prasat,
    nama_prasat: item.nama_prasat,
    deskripsi: item.deskripsi,
    barangDalamPrasat: item.barangDalamPrasat.map((barang: any) => ({
      barangId: barang.barangId,
      jumlah_barang: barang.jumlah_barang,
      barang: {
        kode_barang: barang.barang.kode_barang,
        nama_barang: barang.barang.nama_barang,
        jenis_barang: barang.barang.jenis_barang,
        total_stock: barang.barang.total_stock,
        gambar_barang: barang.barang.gambar_barang,
        harga_barang: barang.barang.harga_barang,
        path: barang.barang.path,
      },
    })),
  }));
};



// Fetch data from Prasat endpoint
onMounted(async () => {
 const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/prasat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    prasat.value = normalizeResponseToPrasat(response.data);
    if (prasat.value) {
      prasat.value.forEach((prasat) => {
        console.log(prasat.nama_prasat);
      });
    } else {
      console.error("Data prasat belum tersedia");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Add prasat to cart
const tambahKeKeranjang = async (prasat: Prasat) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    const response = await axios.post(
      `${apiUrl}/preorderkeranjang`,
      {
        prasat: [
          {
            id_prasat: prasat.id_prasat, // Bungkus prasat sebagai array
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Sukses Masuk Keranjang", {
      type: "success",
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });

    // Panggil ulang loadPrasatFromCart untuk memuat data terbaru
    await loadPrasatFromCart();

    // const idKeranjangBaru = response.data.id_keranjang;
    // console.log(`ID Keranjang Baru: ${idKeranjangBaru}`);
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

// Fungsi untuk memuat data prasat dari keranjang
const loadPrasatFromCart = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    const response = await axios.get(`${apiUrl}/preorderkeranjang`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Normalisasi data berdasarkan struktur API
    data.value = response.data.map((item: any) => ({
      id_preorder_keranjang: item.id_preorder_keranjang,
      id_prasat: item.prasat.id_prasat,
      nama_prasat: item.prasat.nama_prasat,
    }));

    console.log("Loaded data:", data.value);
  } catch (error) {
    console.error("Error loading prasat from cart:", error);
  }
};

onMounted(() => {
  loadPrasatFromCart();
});

const checkout = async () => {
    const token = localStorage.getItem("token");
    try {
      const newPreOrder = {
        rencana_pemakaian: pesanPrasat.value.rencana_pemakaian,
      };
  
      await axios.post(`${apiUrl}/preorder`, newPreOrder,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Pre-Order Anda Akan di Proses');
      reloadPage();
    //   showForm.value = false;
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item');
    }
  };

  const reloadPage = () => {
    location.reload();
};

const toggleSubmitModal = () => {
  // Check if all fields in the form are filled
  isFormIncomplete.value =
    !pesanPrasat.value.rencana_pemakaian 

  if (isFormIncomplete.value) {
    showError.value = true;
    throw new Error("Mohon lengkapi semua field sebelum melakukan checkout");
  }

  // isSubmitOpen.value = !isSubmitOpen.value;
};

// Fungsi delete prasat
const deletePrasat = async (id_preorder_keranjang: number) => {
  try {
    await axios.delete(`${apiUrl}/preorderkeranjang/${id_preorder_keranjang}`);
    toast.success("Sukses di Hapus", {
      type: "success",
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });

    // Filter data setelah delete
    data.value = data.value.filter(
      (item) => item.id_preorder_keranjang !== id_preorder_keranjang
    );
    // Muat ulang data dari keranjang
    await loadPrasatFromCart();
  } catch (error) {
    console.error("Error deleting prasat:", error);
  }
};



</script>


<template>
    <Navbar :prasat="prasat" />
    <div class="container mx-auto mt-8">
      <!-- Heading -->
      <div
        class="w-128 md:w-128 h-40 md:h-48 mx-4 my-4 md:mx-12 text-left bg-black bg-opacity-80 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:bg-opacity-70 dark:border-gray-700 items-center relative justify-center mt-24"
      >
        <div class="relative z-10 p-4 md:p-8">
          <h5 class="mb-2 text-xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Central Supply Laboratorium
          </h5>
          <p class="mb-3 mr-10 text-sm md:text-4xl font-bold text-white-500 sm:text-lg dark:text-white">
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
      <!-- <form class="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <label for="default-search" class="sr-only">Search</label>
        <div class="relative">
          <input
            v-model="searchQuery"
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cari barang..."
          />
        </div>
      </form> -->
  
      <div class="container mx-10 py-8 md:mr-3 flex">
            <!-- Card List -->
            <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-6 gap-2 mt-8 w-88 mr-4">
                <CardPrasat 
                v-for="prasat in filteredPrasats" 
                :key="prasat.id_prasat" 
                :prasat="prasat" 
                @tambahKeKeranjang="tambahKeKeranjang"
                />

            </div>

                    <!-- Form Checkout -->
            <div class="mt-8 md:w-full lg:w-1/3 form"> 
                <!-- <div class="w-full md:w-56 md:ml-10 lg:w-56 sm:w-28s"> -->
                    <form @submit.prevent="checkout" class="bg-white shadow-md rounded-md p-4 w-48">
                        <!-- Daftar Prasat -->
                        <div class="mb-4">
                          <label for="prasat" class="text-gray-600 text-lg font-semibold">Daftar Prasat:</label>
                          <ul class="bg-gray-100 p-2 rounded-md shadow-md space-y-4">
                            <li
                              v-for="(item, index) in data"
                              :key="item.id_prasat"
                              class="bg-white p-2 rounded-md flex justify-between items-center shadow-sm"
                            >
                              <!-- Prasat Info -->
                              <div>
                                <p class="text-sm font-medium text-gray-800">{{ item.nama_prasat }}</p>
                                <!-- <p class="text-xs text-gray-500">ID: {{ item.id_prasat }}</p> -->
                              </div>

                              <!-- Delete Icon -->
                              <button
                                @click="deletePrasat(Number(item.id_preorder_keranjang))"
                                class="text-red-500 hover:text-red-700"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </li>
                          </ul>
                        </div>



                        <!-- Input Rencana Pemakaian -->
                        <div class="mb-4">
                            <label for="rencana_pemakaian" class="text-gray-600">Rencana Pemakaian:</label>
                            <select
                                type="text"
                                class="form-input mt-1 block w-full border rounded border-gray-300"
                                v-model="pesanPrasat.rencana_pemakaian"
                                :class="{ 'border-red-500': isFormIncomplete && !pesanPrasat.rencana_pemakaian }"
                            >
                            <option value="Beginning to Mid">Beginning to End</option>
                            <option value="Mid to End">Mid to End</option>
                            <option value="End to Beginning">End to Beginning</option>
                          </select>
                        </div>

                        <!-- Error Message -->
                        <div>
                            <p v-show="showError" class="text-red-500 text-xs italic mb-4">
                                Mohon lengkapi semua field sebelum melakukan checkout
                            </p>
                        </div>

                        <!-- Button "Pesan" -->
                        <button
                            @click="toggleSubmitModal"
                            type="submit"
                            class="btn btn-success w-full bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2"
                            >
                            Pesan
                        </button>

                        <!-- Modal -->
                        <div v-if="isSubmitOpen && !isFormIncomplete" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                            <div class="bg-white p-8 rounded-lg">
                                <p>Pesanan Anda Akan di Proses</p>
                                <button @click="toggleSubmitModal" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
                            </div>
                        </div>
                    </form>
                <!-- </div> -->
            </div>
      </div>
    </div>

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
