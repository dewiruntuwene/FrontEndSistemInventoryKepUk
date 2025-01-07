<template>
  <Navbar />
  <div class="mt-48">
    <div class="profile-container mt-24">
      <div class="profile-info">
        <h2 class="text-center">Profil Pengguna</h2>
        <div class="info-item">
          <span>Nama</span>
          <a href="#">{{ userName }}</a>
        </div>
        <div class="info-item">
          <span>Email</span>
          <a href="#">{{ email ? email : "Tambah Email" }}</a>
        </div>
      </div>
      <div class="button-group">
        <button
          @click="showChangePasswordModal = true"
          class="bg-green-500 px-4 py-2 rounded mr-2 text-white"
        >
          Change Password
        </button>
        <button
          @click="logout"
          class="bg-red-500 px-4 py-2 rounded text-white"
        >
          Keluar
        </button>
      </div>
    </div>
  </div>

  <!-- Modal for Change Password -->
  <div v-if="showChangePasswordModal" class="modal">
    <div class="modal-content">
      <h3 class="text-xl font-bold mb-4">Change Password</h3>
      <form @submit.prevent="changePassword">
        <div>
          <label for="old-password" class="block text-gray-700">Old Password</label>
          <input class="w-full border border-gray-300 p-2 rounded" type="password" id="old-password" v-model="oldPassword" required />
        </div>
        <div>
          <label for="new-password" class="block text-gray-700">New Password</label>
          <input class="w-full border border-gray-300 p-2 rounded" type="password" id="new-password" v-model="newPassword" required />
        </div>
        <div>
          <label for="confirm-password" class="block text-gray-700">Confirm New Password</label>
          <input class="w-full border border-gray-300 p-2 rounded" type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Submit</button>
        <button class="bg-gray-300 px-4 py-2 rounded mr-2" @click="closeModal" type="button">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { JwtPayload, jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar.vue";
import axios from "axios";

interface DecodedToken extends JwtPayload {
  name: string;
  email: string;
  picture: string; // tambahkan properti untuk gambar profil
}

const apiUrl = import.meta.env.VITE_API_URL;

const profilePicture = ref<string>(""); // inisialisasi dengan string kosong
const userName = ref<string>("");
const email = ref<string>(""); // Menyimpan email user dari token
const showChangePasswordModal = ref(false);
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const router = useRouter();

const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      userName.value = decoded.name;
      email.value = decoded.email;
      profilePicture.value = decoded.picture; // atur gambar profil
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
};

const closeModal = () => {
  showChangePasswordModal.value = false;
  oldPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
};

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert("New password and confirm password do not match!");
    return;
  }

  try {
    const response = await axios.patch(`${apiUrl}/changepass`, {
      email: email.value, // Gunakan email dari token
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value,
    });

    alert("Password Changed");
    closeModal();
  } catch (error) {
    alert("An error occurred");
  }
};

const onFileChange = (event: Event) => {
  // kode untuk mengubah gambar profil dari file yang diunggah
};

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

onMounted(() => {
  decodeToken();
});
</script>

<style scoped>
.profile-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-container {
  background-color: white;
  border-radius: 50px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 500px;
  width: 100%;
  margin: 70px auto 0;
}

.profile-picture {
  text-align: center;
}

.profile-picture img {
  width: 100px;
  border-radius: 50%;
}

.profile-picture input {
  display: block;
  margin: 10px auto;
}

.profile-info {
  margin-top: 20px;
}

.profile-info h2 {
  font-size: 1.2em;
  margin-bottom: 30px;
  font-weight: bold;
}

.info-item {
  margin-bottom: 15px;
}

.info-item span {
  display: block;
  color: #555;
}

.info-item a {
  color: #007bff;
  text-decoration: none;
}

.logout-button {
  text-align: center;
  margin-top: 20px;
}

.logout-button button {
  padding: 10px 20px;
  background-color: #ff4b5c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button button:hover {
  background-color: #ff1c39;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 20px;
}

.modal-content form div {
  margin-bottom: 10px;
}

.modal-content button {
  margin: 5px;
}

.button-group {
  display: flex; /* Mengaktifkan flexbox */
  justify-content: center; /* Memusatkan tombol secara horizontal */
  align-items: center; /* Memusatkan tombol secara vertikal */
  margin-top: 20px;
}

.button-group button {
  padding: 10px 20px;
  cursor: pointer;
}

.bg-green-500:hover {
  background-color: #3b873f; /* Warna hijau saat hover */
}

.bg-red-500:hover {
  background-color: #d32f2f; /* Warna merah saat hover */
}

</style>
