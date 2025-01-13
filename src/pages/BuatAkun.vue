<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import Layout from "../components/layout.vue";

const username = ref("");
const email = ref("");
const password = ref("");
const confpassword = ref("");
const registrationSuccess = ref(false);
const userExists = ref(false); // Variabel untuk menampilkan pemberitahuan jika pengguna sudah terdaftar

const users = ref<Users[]>([]);
const showModal = ref(false);
const selectedUser = ref<Users | null>(null);

const apiUrl = import.meta.env.VITE_API_URL;


interface Users {
    user_id: number;
    username: string;
    email: string;
    password: string;
    role: string;
}

const register = async () => {
  try {
    const data = {
      username: username.value,
      email: email.value,
      password: password.value,
      confpassword: confpassword.value,
    };

    // Kirim permintaan pendaftaran ke server
    const response = await axios.post(
      `${apiUrl}/register`,
      data
    );
    console.log("Response:", response.data);

    // Tampilkan pemberitahuan bahwa registrasi berhasil
    registrationSuccess.value = true;
    userExists.value = false; // Reset variabel userExists

    // Tambahkan pemberitahuan bahwa registrasi berhasil
    alert("Registrasi berhasil! Silakan login.");
    loadDataFromAPI();
  } catch (error) {
    console.error("Error:", error);
    alert("Tejadi Kesalahan Saat Registrasi");
  }
};

const loadDataFromAPI = async () => {
    //const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${apiUrl}/users`);
      users.value = response.data;
    } catch (error) {
      console.error("Error loading data:", error);
    }
};

onMounted(async() => {
  loadDataFromAPI();
})

const editUser = (user: Users) => {
  selectedUser.value = { ...user };
  showModal.value = true;
};

const updateUser = async () => {
  if (selectedUser.value) {
    try {
      const { user_id, username, email, role } = selectedUser.value;
      await axios.put(`${apiUrl}/users/${user_id}`, { username, email, role });
      alert("User updated successfully!");
      showModal.value = false;
      await loadDataFromAPI();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  }
};

</script>

<template>
  <Layout />
  <div class="flex flex-col lg:flex-row justify-between p-3 gap-6 max-h-[calc(100vh-100px)]">
    <table class="ml-40 text-left w-full border-collapse">
        <thead class="bg-gray-800 text-white">
        <tr>
            <th class="w-1/3 text-left py-2 px-4 uppercase font-semibold text-sm">Username</th>
            <th class="w-1/3 text-left py-2 px-4 uppercase font-semibold text-sm">Email</th>
            <th class="w-1/3 text-left py-2 px-4 uppercase font-semibold text-sm">Password</th>
            <th class="w-1/3 text-left py-2 px-4 uppercase font-semibold text-sm">Role</th>
            <th class="w-1/3 text-left py-2 px-4 uppercase font-semibold text-sm">Action</th>
            <!-- <th class="py-2 px-4 text-left border">Harga Barang</th>
            <th class="py-2 px-4 text-left border">Gambar</th>
            <th class="py-2 px-4 text-left border">Action</th> -->
        </tr>
        </thead>
        <tbody class="text-gray-700 text-sm font-light">
          <tr
              v-for="(user, index) in users"
              :key="user.user_id"
              class="hover:bg-lighter overflow-auto max-h-[calc(100vh-100px)]"
          >
              <td class="py-2 px-4 border-b border-grey-light">{{ user.username }}</td>
              <td class="py-2 px-4 border-b border-grey-light">
              <input
                  type="text"
                  :value="user.email"
                  class="py-2 px-4 border-b border-grey-light"
                  disabled
              />
              </td>
              <td class="py-2 px-4 border-b border-grey-light">
              <input
                  type="text"
                  :value="user.password"
                  class="py-2 px-4 border-b border-grey-light"
                  disabled
              />
              </td>
              <td class="py-2 px-4 border-b border-grey-light">
              <input
                  type="text"
                  :value="user.role"
                  class="py-2 px-4 border-b border-grey-light"
                  disabled
              />
              </td>
              <td class="py-3 px-2 text-left border flex space-x-2">
                <button @click="editUser(user)" class="bg-blue-500 text-white px-4 py-2 rounded">
                  Edit
                </button>
                <!-- <button @click="deleteUser(Number(item.user_id))" type="button" class="focus:outline-none" aria-label="remove Item">
                  <img src="/delete.png" alt="remove" class="h-6 w-6">
                </button> -->
              </td>
          </tr>
        </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal && selectedUser" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div class="bg-white p-6 rounded shadow-md w-1/3">
        <h2 class="text-xl font-bold mb-4">Edit User</h2>
        <div class="mb-4">
          <label class="block text-gray-700">Username:</label>
          <input
            v-model="selectedUser.username"
            type="text"
            class="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Email:</label>
          <input
            v-model="selectedUser.email"
            type="email"
            class="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Role:</label>
          <select
            v-model="selectedUser.role"
            type="text"
            class="w-full border border-gray-300 p-2 rounded"
          >
          <option value="" disabled selected>Pilih Role</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
            <option value="KAPRODI">Kaprodi</option>
            <option value="DEKAN">Dekan</option>
            <option value="WAREK1">Warek 1</option>
            <option value="WAREK2">Warek 2</option>
            <option value="PURCHASEMANAGER">Purchase Manager</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button @click="showModal = false" class="bg-gray-300 px-4 py-2 rounded mr-2">
            Cancel
          </button>
          <button @click="updateUser" class="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>

    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 items-center justify-content-center">
        <form class="space-y-6" action="#" @submit.prevent="register">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Buat Akun
        </h5>
        <div>
            <label
            for="username"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Username</label
            >
            <input
            type="text"
            name="username"
            id="email"
            v-model="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name"
            required
            />
        </div>
        <div>
            <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
            >
            <input
            type="email"
            name="email"
            id="email"
            v-model="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
            />
        </div>
        <div>
            <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label
            >
            <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            v-model="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            />
        </div>
        <div>
            <label
            for="confpassword"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Confirm the password</label
            >
            <input
            type="password"
            name="password"
            id="confpassword"
            placeholder="••••••••"
            v-model="confpassword"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            />
        </div>

        <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            Buat Akun
        </button>
        <!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Have an account?
            <router-link to="/login" class="underline">Login</router-link>
        </div> -->
        <!-- Pemberitahuan registrasi berhasil -->
        <div v-if="registrationSuccess" class="mt-4 text-green-600">
            Pembuatan Akun berhasil!
            <!-- <router-link to="/login" class="underline">login</router-link>. -->
        </div>
        <!-- Pemberitahuan jika pengguna sudah terdaftar -->
        <div v-if="userExists" class="mt-4 text-red-600">
            Pengguna dengan email atau username ini sudah terdaftar.
        </div>
        </form>
    </div>
  </div>


  <!-- <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-80">
      <h2 class="text-2xl font-semibold mb-4 text-center">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" v-model="username" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="confpassword" class="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
          <input type="password" id="confpassword" v-model="confpassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div  class="mt-4 text-gray-600 text-center">Sudah Punya Account Silahkan <router-link to="/login" class="underline">Login</router-link>.</div>
        <div class="flex flex-col items-center justify-between">
          <button type="submit" class="mt-5 items-center bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600">Daftar</button>
        </div>
    
        <div v-if="registrationSuccess" class="mt-4 text-green-600">Registrasi berhasil! Silakan <router-link to="/login" class="underline">login</router-link>.</div>
       
        <div v-if="userExists" class="mt-4 text-red-600">Pengguna dengan email atau username ini sudah terdaftar.</div>
      </form>
    </div>  
  </div> -->
  
</template>


<style>
body,
html {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 400px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
}
       .font-family-karla { font-family: karla; }
        .bg-sidebar { background: #3d68ff; }
        .cta-btn { color: #3d68ff; }
        .upgrade-btn { background: #1947ee; }
        .upgrade-btn:hover { background: #0038fd; }
        .active-nav-link { background: #1947ee; }
        .nav-item:hover { background: #1947ee; }
        .account-link:hover { background: #3d68ff; }
</style>
