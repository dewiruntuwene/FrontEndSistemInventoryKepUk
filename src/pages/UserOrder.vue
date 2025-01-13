<style scoped>
/* Desktop styles */
.container {
  max-width: 1200px;
  margin: 40px auto;
}

.grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.table {
  min-width: 768px;
}

/* Tablet styles (max-width: 1024px) */
@media (max-width: 1024px) {
  .container {
    max-width: 900px;
    margin: 20px auto;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .table {
    min-width: 600px;
  }
}

/* Mobile styles (max-width: 768px) */
@media (max-width: 768px) {
  .container {
    max-width: 50px;
    padding-right: 0px;
    margin-left: 0px;
  }

  .grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 5px;
    flex-direction: row-reverse;
  }

  .table {
    min-width: 250px;
  }

  .form {
    min-width: 200px;
    min-height: 50px;
    font-size: 12px;
    padding: 7px;
  }

  .form {
    font-size: 12px;
    padding: 7px;
    margin: 50px;
  }

  .form label {
    font-weight: normal;
    margin-bottom: 10px;
  }

  .form input,
  .form select,
  .form textarea {
    padding: 0.1rem;
    height: 1.5rem;
    font-size: 0.7rem;
  }

  .form button {
    padding: 0.1rem 0.25rem;
    font-size: 0.75rem;
  }

  .keranjang table {
    border-spacing: 0;
    border: 1px solid #ddd;
    border-width: 1px 0;
  }

  .keranjang table td {
    font-size: 8px;
    padding: 6px;
  }
  .keranjang table th {
    font-size: 9px;
    padding: 6px;
    border-width: 0 1px;
  }
}

.keranjang table td img {
  width: 80px;
  height: 30px;
}
</style>

<template>
  <div class="keranjang bg-gray-100 min-h-screen mb-0">
    <Navbar :updateKeranjang="keranjangs" />

    <div class="container mx-10 py-8 md:mr-3">
      <div class="grid grid-cols-3 lg:grid-cols-5 gap-8">
        <!-- Card -->
        <!-- <div class="w-1/5 mr-12 bg-gray-200 rounded-lg shadow-lg p-4  min-h-screen">
          <h2 class="text-xl font-bold mb-2">Transaction Details</h2>
          <p class="text-gray-600 mb-4">Transaction Dashboard</p>
          <div class="flex flex-col">
            <div v-for="(prasat, index) in transactionssisa" class="bg-white rounded-lg shadow-lg p-4 mb-4">
              <h3 class="text-lg font-bold mb-2">{{ prasat[0].nama_prasat }}</h3>
              <div v-for="(barang, index) in prasat" class="flex justify-between py-1 border-b border-gray-300">
                <span>{{ barang.nama_barang }}</span>
                <span>{{ barang.jumlah_barang_po }}</span>
              </div>
            </div>
          </div>
        </div> -->

        <!-- Tabel Keranjang -->
        <div class="table lg:col-span-2 pl-8">
          <h2 class="text-3xl font-bold mb-4">
            Keranjang <span class="font-semibold">Saya</span>
          </h2>
          <div class="overflow-x-auto">
            <table
              class="min-w-full bg-white shadow-md rounded-md overflow-hidden"
            >
              <!-- Table Header -->
              <thead class="bg-gray-200">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Foto
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID BARANG
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    NAMA BARANG
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    JENIS BARANG
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    JUMLAH BARANG
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Hapus
                  </th>
                </tr>
              </thead>
              <!-- Table Body -->
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="(keranjang, index) in keranjangs"
                  :key="keranjang.barangs.kode_barang"
                  class="bg-white"
                >
                  <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <img
                      :src="`https://inventory-order-kep-uk.vercel.app/uploads/${keranjang.barangs.gambar_barang}`"
                      class="w-24 h-24 object-cover rounded-md shadow-md"
                      alt="Product"
                    />
                  </td>
                  <td
                    v-if="keranjang.barangs && keranjang.barangs"
                    class="px-6 py-4 whitespace-nowrap text-gray"
                  >
                    <strong>{{ keranjang.barangs.kode_barang }}</strong>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ keranjang.barangs.nama_barang }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ keranjang.barangs.jenis_barang }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      class="form-input mt-1 block w-full border border-gray-300 rounded"
                      v-model="keranjang.jumlah_barang"
                      @change="
                        updateKeranjang(
                          Number(keranjang.id_keranjang),
                          Number(keranjang.jumlah_barang)
                        )
                      "
                    />
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-red-500 cursor-pointer"
                  >
                    <button
                      @click="
                        removeItemFromKeranjang(Number(keranjang.id_keranjang))
                      "
                      class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Form Checkout -->
        <div class="mt-8 md:w-full lg:w-1/3 ml-20 form">
          <div class="w-full md:w-56 md:ml-10 lg:w-56 sm:w-28s">
            <form
              @submit.prevent="checkout"
              class="bg-white shadow-md rounded-md p-6"
            >
              <div class="mb-4">
                <label for="namaMatakuliah" class="text-gray-600"
                  >Nama Matakuliah :</label
                >
                <select
                  v-model="pesan.nama_matakuliah"
                  class="form-select mt-1 block w-full border rounded border-gray-300"
                  :class="{
                    'border-red-500':
                      isFormIncomplete && !pesan.nama_matakuliah,
                  }"
                >
                  <option value="" disabled selected>Pilih Matakuliah</option>
                  <option v-for="mk in matakuliah" :key="mk" :value="mk">
                    {{ mk }}
                  </option>
                </select>
              </div>

              <div class="mb-4">
                <label for="prasat" class="text-gray-600">Prasat :</label>
                <select
                  class="form-input mt-1 block w-full border rounded border-gray-300"
                  v-model="pesan.prasat"
                  @change="fetchPrasatItems"
                  
                >
                  <option value="" disabled>Pilih Prasat</option>
                  <option v-for="prasatitem in prasat" :key="prasatitem.id_preorder_prasat" :value="prasatitem.nama_prasat">
                    {{ prasatitem.nama_prasat }}
                  </option>
                </select>
              </div>


              <div class="mb-4">
                <label for="prasat" class="text-gray-600">Ruangan Lab :</label>
                <input
                  type="text"
                  class="form-input mt-1 block w-full border rounded border-gray-300"
                  v-model="pesan.ruangan_lab"
                  :class="{
                    'border-red-500': isFormIncomplete && !pesan.ruangan_lab,
                  }"
                />
              </div>
              <div class="mb-4">
                <label for="jamPraktek" class="text-gray-600"
                  >Jam Praktek :</label
                >
                <input
                  type="time"
                  id="time"
                  class="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500 form-input mt-1 block w-full border rounded border-gray-300"
                  min="05:00"
                  max="20:00"
                  value="00:00"
                  required
                  v-model="pesan.jam_praktek"
                  :class="{
                    'border-red-500': isFormIncomplete && !pesan.jam_praktek,
                  }"
                />
              </div>
              <div class="mb-4">
                <label type="Date" for="tanggalPraktek" class="text-gray-600"
                  >Tanggal Praktek :</label
                >
                <input
                  datepicker
                  type="Date"
                  class="form-input mt-1 block w-full border rounded border-gray-300"
                  v-model="pesan.tanggal_praktek"
                  :class="{
                    'border-red-500':
                      isFormIncomplete && !pesan.tanggal_praktek,
                  }"
                />
              </div>
              <div class="mb-4">
                <label type="Date" for="tanggalPraktek" class="text-gray-600"
                  >Tanggal Kembali Alat (Khusus Alat Kesehatan) :</label
                >
                <input
                  datepicker
                  type="Date"
                  class="form-input mt-1 block w-full border rounded border-gray-300"
                  v-model="pesan.tanggal_kembali_alat"
                />
              </div>
              
              <div class="mb-4">
                <label for="prasat" class="text-gray-600">Keterangan :</label>
                <input
                  type="text"
                  class="form-input mt-1 block w-full border rounded border-gray-300"
                  v-model="pesan.keterangan"
                  :class="{
                    'border-red-500': isFormIncomplete && !pesan.keterangan,
                  }"
                />
              </div>

              <!-- Error message for incomplete form -->
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

              <!-- Modal for submission confirmation -->
              <div
                v-if="isSubmitOpen && !isFormIncomplete"
                class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
              >
                <!-- <div class="bg-white p-8 rounded-lg">
                  <p>Pesanan Anda Akan di Proses</p>
                  <button
                    @click="toggleSubmitModal"
                    class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Close
                  </button>
                </div> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import { Barang, Keranjang } from "../pages/UserCatalog.vue";

const apiUrl = import.meta.env.VITE_API_URL;


const router = useRouter();
const toast = useToast();
const isSubmitOpen = ref(false);
const isFormIncomplete = ref(false); // New variable to track form completion
const showError = ref(false);



interface PreOrderDetail {
  id_preorder_detail: number;
  barangId: number;
  jumlah_barang: number;
  preOrderPrasatId: number;
  barang: Barang;
}

interface PreOrderPrasat {
  id_preorder_prasat: number;
  nama_prasat: string;
  deskripsi: string;
  createdAt: string;
  prasatId: number;
  PreOrderDetail: PreOrderDetail[];
}

interface PreOrderPaket {
  id_pre_order_paket: number;
  userId: number;
  rencana_pemakaian: string;
  tanggal_order: string;
  status: string;
  tanggal_disetujui: string;
  approvalId: number | null;
  PreOrderPrasat: PreOrderPrasat[];
}

interface PrasatDropdown {
  id: number;
  nama_prasat: string;
}

  // State untuk menyimpan data transaksi dan transaksi yang dipilih
  const transactionssisa = ref<{
    nama_barang: string;
    jumlah_barang_po: number;
    nama_prasat: string;
  }[][]>([]);

const prasatsDropdown = ref<PrasatDropdown[]>([]);

const prasat = ref<PreOrderPrasat[]>([]);

const matakuliah = [
  "Basic Nursing Skill",
  "IDK II",
  "Komunikasi",
  "K3",
  "KMB",
  "Maternitas II",
  "Pediatrik",
  "Mental",
  "KMB",
  "Maternitas Old",
  "Komplimenter",
  "Keperawatan Keluarga",
  "Lainnya",
];

const pesan = ref({
  nama_dosen: "",
  nama_matakuliah: "",
  prasat: "",
  jam_praktek: "",
  tanggal_praktek: "",
  jumlah_barang: "",
  tanggal_kembali_alat: "",
  ruangan_lab: "",
  keterangan: "",
  keranjangs: [],
});

const keranjangs = ref<Keranjang[]>([]);
console.log(keranjangs);
const prasats = ref([]); 

interface PesanKeranjang {
  jumlah_barang: number[];
  // Properti lain yang mungkin ada
}

const pesan_keranjang = ref({
  jumlah_barang: keranjangs.value.map((item) => item.jumlah_barang),
});

const setKeranjangs = (data: Keranjang[]) => {
  keranjangs.value = data.map((item) => ({
    ...item,
    id_keranjang: Number(item.id_keranjang), // Pastikan id_keranjang adalah number
  }));
};



const removeItemFromKeranjang = async (id_keranjang: number) => {
  try {
    await axios.delete(
      `${apiUrl}/keranjang/${id_keranjang}`
    );
    keranjangs.value = keranjangs.value.filter(
      (item) => item.id_keranjang !== id_keranjang
    );
    toast.success("Sukses Hapus Keranjang", {
      type: "success",
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } catch (error) {
    console.log(error);
    toast.error("Gagal Hapus Keranjang", {
      type: "error",
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};

// const updateJumlahBarang = (index:number, newValue:number) => {
//   pesan.value.jumlah_barang = newValue;
// };

const updateKeranjang = async (id_keranjang: number, jumlah_barang: number) => {
  try {
    const updateData = { jumlah_barang };
    await axios.patch(`${apiUrl}/keranjang/${id_keranjang}`, updateData);
  } catch (error) {
    console.log(error);
  }
};

const checkout = async () => {
  try {
    const token = localStorage.getItem("token");
    // Update items from the keranjang
    await Promise.all(
      keranjangs.value.map(async (item: any) => {
        await updateKeranjang(item.id_keranjang, item.jumlah_barang);
      })
    );

    const requestData = {
      nama_matakuliah: pesan.value.nama_matakuliah,
      prasat: pesan.value.prasat,
      jam_praktek: pesan.value.jam_praktek,
      tanggal_praktek: pesan.value.tanggal_praktek,
      tanggal_kembali_alat: pesan.value.tanggal_kembali_alat,
      ruangan_lab: pesan.value.ruangan_lab,
      keterangan: pesan.value.keterangan,
      keranjangs: keranjangs.value.map((item) => ({
        id_keranjang: item.id_keranjang,
        jumlah_barang: item.jumlah_barang,
      })),
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(`${apiUrl}/orderBarang`, requestData, config);
    alert("Barang akan di proses!");
    reloadPage();

    // isSubmitOpen.value = true;
  } catch (err) {
    console.log(err);
    alert("Terjadi Kesalahan Ketika Di Proses");
  }
};

const reloadPage = () => {
  location.reload();
};

const getKeranjang = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/keranjang`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setKeranjangs(response.data); // Perbarui state keranjangs
    console.log("Keranjang diperbarui:", keranjangs.value);
  } catch (error) {
    console.error("Gagal mengambil keranjang:", error);
  }
};


onMounted(async () => {
  getKeranjang();
});

const toggleSubmitModal = () => {
  // Check if all fields in the form are filled
  isFormIncomplete.value =
    !pesan.value.nama_matakuliah ||
    !pesan.value.jam_praktek ||
    !pesan.value.tanggal_praktek ||
    !pesan_keranjang.value.jumlah_barang;

  if (isFormIncomplete.value) {
    showError.value = true;
    throw new Error("Mohon lengkapi semua field sebelum melakukan checkout");
  }

  // isSubmitOpen.value = !isSubmitOpen.value;
};

// Fetch daftar prasat untuk dropdown
const fetchPrasatList = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/preorderdetailbyprasat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Ekstrak hanya data yang diperlukan untuk dropdown
    prasat.value = response.data
      .flatMap((item: { PreOrderPrasat: any; }) => item.PreOrderPrasat)
      .map((prasat: { id_preorder_prasat: any; nama_prasat: any; }) => ({
        id: prasat.id_preorder_prasat,
        nama_prasat: prasat.nama_prasat,
      }));
  } catch (error) {
    console.error("Gagal mendapatkan daftar prasat:", error);
    toast.error("Gagal mendapatkan daftar prasat", {
      type: "error",
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};




// Fetch barang berdasarkan prasat yang dipilih
const fetchPrasatItems = async () => {
  const token = localStorage.getItem("token");

  try {
    if (pesan.value.prasat) {
      // Fetch data berdasarkan prasat
      const response = await axios.get(`${apiUrl}/preorderdetailbyprasat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      const selectedPrasat = data
        .flatMap((peminjam: { PreOrderPrasat: any[] }) => peminjam.PreOrderPrasat)
        .find((prasat: { nama_prasat: string }) => prasat.nama_prasat === pesan.value.prasat);

      if (selectedPrasat && selectedPrasat.PreOrderDetail) {
        // Loop melalui setiap barang dalam PreOrderDetail
        for (const detail of selectedPrasat.PreOrderDetail) {
          const barang = {
            kode_barang: detail.barang.kode_barang,
            nama_barang: detail.barang.nama_barang,
            total_stock: detail.barang.total_stock,
            jenis_barang: detail.barang.jenis_barang,
            gambar_barang: `https://inventory-order-kep-uk.vercel.app/uploads/${detail.barang.gambar_barang}`,
            harga_barang: detail.barang.harga_barang,
          };

          try {
            // API untuk membuat keranjang baru
            const response = await axios.post(
              `${apiUrl}/keranjang`,
              {
                jumlah_barang: detail.jumlah_barang,
                barang,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            // Perbarui keranjang setiap kali barang berhasil ditambahkan
            await getKeranjang();


            // Tampilkan notifikasi untuk setiap barang yang berhasil ditambahkan
            toast.success(`Barang ${barang.nama_barang} berhasil masuk keranjang`, {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          } catch (error) {
            console.error(`Gagal menambahkan barang ${barang.nama_barang} ke keranjang:`, error);
            toast.error(`Gagal menambahkan barang ${barang.nama_barang} ke keranjang`, {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          }
        }
      } else {
        console.warn("PreOrderDetail tidak ditemukan untuk prasat yang dipilih.");
      }
    }
  } catch (error) {
    console.error("Gagal mendapatkan barang dari prasat:", error);
    toast.error("Gagal mendapatkan barang dari prasat", {
      type: "error",
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};

// Fungsi untuk mengambil data dari API dan memformat data
const fetchSisaTransactions = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/sisabarang`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;

    // Ubah data menjadi array
    const dataArray = Object.values(data) as {
      nama_barang: string;
      jumlah_barang_po: number;
      nama_prasat: string;
    }[][];

    transactionssisa.value = dataArray;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};




// Panggil fetchPrasatList saat komponen di-mount
onMounted(() => {
  fetchPrasatList();
  fetchPrasatItems();
  fetchSisaTransactions()
});

</script>
