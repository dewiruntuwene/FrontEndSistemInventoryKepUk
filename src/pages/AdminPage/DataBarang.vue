<template>
  <Layout />
  <!-- <div class="mt-0 pl-60 sticky top-0 z-50">
    <div
      class="border-b-2 border-black flex flex-row justify-between items-center p-3"
    >
      <h4 class="pa-3 text-2xl font-bold">Data Barang</h4>
    </div>
  </div> -->

  <div class="mt-0 pl-[15rem] pr-4 ml-8">
    <div class="flex flex-row mt-4">
      <!-- Tabel dengan data dari API -->
      <div
        class="max-w-4xl mr-8 bg-white border-y-2 border-b-4 p-5 overflow-x-auto"
      >
        <table class="text-left w-full border-collapse">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-1/8 text-left py-2 px-4 uppercase font-semibold text-sm">Kode Barang</th>
              <th class="w-1/2 text-left py-2 px-4 uppercase font-semibold text-sm">Nama Barang</th>
              <th class="w-1/3 text-left py-2 px-4 uppercase font-semibold text-sm">Total Stok</th>
              <th class="w-1/3 text-left py-2 px-4 uppercase font-semibold text-sm">Jenis Barang</th>
              <th class="w-1/3 text-left py-2 px-4 uppercase font-semibold text-sm">Harga Barang</th>
              <th class="w-1/3 text-left py-2 px-4 uppercase font-semibold text-sm">Gambar</th>
              <th class="w-1/3 text-left py-2 px-4 uppercase font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr
              v-for="(item, index) in barangs"
              :key="index"
              class="border-b hover:bg-gray-100"
            >
              <td class="py-2 px-4 text-left border">{{ item.kode_barang }}</td>
              <td class="py-2 px-4 text-left border">
                <input
                  type="text"
                  :value="item.nama_barang"
                  class="border border-gray-300 rounded px-2 py-1 w-full"
                  disabled
                />
              </td>
              <td class="py-2 px-2 text-center border">
                <input
                  type="number"
                  :value="item.total_stock"
                  class="border border-gray-300 rounded px-2 py-1 w-full font-bold"
                  disabled
                />
              </td>
              <td class="py-2 px-4 text-left border">
                <input
                  type="text"
                  :value="item.jenis_barang"
                  class="border border-gray-300 rounded px-2 py-1 w-full"
                  disabled
                />
              </td>
              <td class="py-2 px-2 text-left border">
                <input
                  type="number"
                  :value="item.harga_barang"
                  class="border border-gray-300 rounded px-2 py-1 w-full"
                  disabled
                />
              </td>
              <td class="py-2 px-4 text-left border">
                <img
                  v-if="item.gambar_barang"
                  :src="`https://inventoryfkepunklab.site/uploads/${item.gambar_barang}`"
                  alt="Gambar Barang"
                  class="h-12 w-12 object-cover"
                />
              </td>
              <td class="py-2 px-4 text-left border">
                <button
                  @click="deleteBarang(Number(item.id_barang))"
                  type="button"
                  class="focus:outline-none"
                  aria-label="remove Item"
                >
                  <img src="/delete.png" alt="remove" class="h-6 w-6" />
                </button>
                <button @click="editBarang(item)" type="button" class="focus:outline-none" aria-label="Edit Item">
                  <img src="/edit.png" alt="Edit" class="h-6 w-6">
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Modal -->
        <div v-if="showModal && selectedBarang" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div class="bg-white p-6 rounded shadow-md w-1/3">
            <h2 class="text-xl font-bold mb-4">Edit User</h2>
            <div class="mb-4">
              <label class="block text-gray-700">Kode Barang:</label>
              <input
                v-model="selectedBarang.kode_barang"
                type="text"
                class="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Nama Barang:</label>
              <input
                v-model="selectedBarang.nama_barang"
                type="email"
                class="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Total Stock:</label>
              <input
                v-model="selectedBarang.total_stock"
                type="text"
                class="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Jenis Barang:</label>
              <input
                v-model="selectedBarang.jenis_barang"
                type="text"
                class="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Harga Barang:</label>
              <input
                v-model="selectedBarang.harga_barang"
                type="text"
                class="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <!-- <div class="mb-4">
              <label class="block text-gray-700">Gambar Barang:</label>
              <input
                v-on="selectedBarang.gambar_barang"
                type="file"
                class="w-full border border-gray-300 p-2 rounded"
                accept="image/*"
              />
            </div> -->
            <div class="flex justify-end space-x-6 py-3 px-2 text-left border">
              <button @click="showModal = false" class="bg-gray-300 px-4 py-2 rounded mr-2">
                Cancel
              </button>
              <button @click="updateBarang" class="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Kolom baru di bagian kanan untuk menambahkan barang -->
      <div class="max-w-xs bg-white border-y-2 border-b-4 p-5">
        <h2 class="text-2xl font-bold mb-4">Tambah Barang</h2>
        <div class="flex flex-col">
          <input
            type="text"
            v-model="newItem.kode"
            class="border border-gray-300 rounded px-2 py-1 mb-2"
            placeholder="Kode Barang"
          />
          <input
            type="text"
            v-model="newItem.nama"
            class="border border-gray-300 rounded px-2 py-1 mb-2"
            placeholder="Nama Barang"
          />
          <input
            type="text"
            v-model="newItem.totalStok"
            class="border border-gray-300 rounded px-2 py-1 mb-2"
            placeholder="Total Stok"
          />
          <input
            type="number"
            v-model="newItem.harga"
            class="border border-gray-300 rounded px-2 py-1 mb-2"
            placeholder="Harga"
          />
          <select
            v-model="newItem.jenis"
            class="border border-gray-300 rounded px-2 py-1 mb-2"
          >
            <option value="" disabled selected>Pilih Jenis Barang</option>
            <option value="Barang Habis Pakai">Barang Habis Pakai</option>
            <option value="Alat Kesehatan">Alat Kesehatan</option>
          </select>
          <input
            type="file"
            @change="handleImageUpload"
            class="border border-gray-300 rounded px-2 py-1 mb-2"
            accept="image/*"
          />
          <button
            @click="validateAndAddItem"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
          >
            Add
          </button>
          <p v-if="errorMessage" class="text-red-500 mt-2">
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </div>

    <!-- Komponen router-view untuk menampilkan halaman yang diarahkan -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import Layout from "../../components/layout.vue";
import { useToast } from "vue-toast-notification";

const apiUrl = import.meta.env.VITE_API_URL;

const toast = useToast();

const showModal = ref(false);
const selectedBarang = ref<Barang | null>(null);

interface Barang {
  kode_barang: number;
  nama_barang: string;
  total_stock: number;
  jenis_barang: string;
  harga_barang: number;
  gambar_barang: string;
  id_barang: number;
}

export default defineComponent({
  components: {
    Layout,
  },
  setup() {
    const barangs = ref<Barang[]>([]);
    const newItem = ref({
      kode: "",
      nama: "",
      totalStok: "",
      harga: "",
      jenis: "",
      image: "",
    });
    const errorMessage = ref("");

    const loadDataFromAPI = async () => {
      try {
        const response = await axios.get(`${apiUrl}/barang`);
        barangs.value = response.data;
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    const validateAndAddItem = async () => {
      if (
        !newItem.value.kode ||
        !newItem.value.nama ||
        !newItem.value.totalStok ||
        !newItem.value.harga ||
        !newItem.value.jenis ||
        !newItem.value.image
      ) {
        errorMessage.value = "Harap isi semua kolom sebelum menambahkan!";
      } else if (checkDuplicateKode(newItem.value.kode)) {
        errorMessage.value = "Kode barang sudah ada!";
      } else {
        await addItem();
        errorMessage.value = "";
      }
    };

    const addItem = async () => {
      const formData = new FormData();
      formData.append("kode_barang", newItem.value.kode);
      formData.append("nama_barang", newItem.value.nama);
      formData.append("total_stock", newItem.value.totalStok);
      formData.append("harga_barang", newItem.value.harga);
      formData.append("jenis_barang", newItem.value.jenis);
      formData.append("gambar_barang", newItem.value.image);
      // formData.append('gambar_barang', newItem.value.image);

      try {
        await axios.post(`${apiUrl}/barang`, formData);
        newItem.value = {
          kode: "",
          nama: "",
          totalStok: "",
          harga: "",
          jenis: "",
          image: "",
        };
        await loadDataFromAPI();
        toast.success("Barang Berhasil Ditambahkan", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      } catch (error) {
        console.error("Error adding item:", error);
        toast.error("Barang Sudah Ada", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    };

    const deleteBarang = async (id_barang: number) => {
      try {
        await axios.delete(`${apiUrl}/barang/${id_barang}`);
        barangs.value = barangs.value.filter(
          (item) => item.id_barang !== id_barang
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

    const checkDuplicateKode = (kode: string) => {
      return barangs.value.some((item) => item.kode_barang.toString() === kode);
    };

    const handleImageUpload = (event: any) => {
      newItem.value.image = event.target.files[0];
    };

    loadDataFromAPI();

    const editBarang = (item: Barang) => {
      selectedBarang.value = { ...item };
      showModal.value = true;
    };

    const updateBarang = async () => {
      if (selectedBarang.value) {
        try {
          const { id_barang, kode_barang, nama_barang, total_stock, harga_barang, jenis_barang, gambar_barang } = selectedBarang.value;
          await axios.patch(`${apiUrl}/barang/${id_barang}`, { kode_barang, nama_barang, total_stock, harga_barang, jenis_barang, gambar_barang });
          alert("Barang updated successfully!");
          showModal.value = false;
          await loadDataFromAPI();
        } catch (error) {
          console.error("Error updating user:", error);
          alert("Failed to update user.");
        }
      }
    };

    return {
      barangs,
      newItem,
      errorMessage,
      validateAndAddItem,
      handleImageUpload,
      deleteBarang,
      updateBarang,
      editBarang,
      selectedBarang,
      showModal
    };
  },
});
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  text-align: left;
}

th {
  /* background-color: #f2f2f2; */
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

img {
  display: block;
  margin: 0 auto;
}

button {
  transition: background-color 0.3s ease;
}
</style>
