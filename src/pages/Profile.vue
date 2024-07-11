<template>
  <Layout />
  <div>
    <div class="profile-container">
      <div class="profile-picture">
        <img :src="profilePicture" alt="" />
        <input type="file" @change="onFileChange" />
      </div>
      <div class="profile-info">
        <h2>Profil Pengguna</h2>
        <div class="info-item">
          <span>Nama</span>
          <a href="#">{{ userName }}</a>
        </div>
        <div class="info-item">
          <span>Email</span>
          <a href="#">{{ email ? email : "Tambah Email" }}</a>
        </div>
      </div>
      <div class="logout-button">
        <button @click="logout">Keluar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout.vue";

interface DecodedToken {
  name: string;
  email: string;
  picture: string; // tambahkan properti untuk gambar profil
}

export default defineComponent({
  name: "UserProfile",
  setup() {
    const profilePicture = ref(""); // inisialisasi dengan string kosong
    const userName = ref("");
    const email = ref("");

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

    return {
      profilePicture,
      userName,
      email,
      onFileChange,
      logout,
      Layout
    };
  },
});
</script>

<style scoped>
/* .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  } */

/* .nav-icons {
    display: flex;
  }
  
  .nav-icon {
    position: relative;
    margin-right: 20px;
  }
  
  .nav-icon img {
    width: 30px;
    height: 30px;
  } */

/* .badge {
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 5px;
    font-size: 10px;
  } */

/* .nav-profile {
    display: flex;
    align-items: center;
  } */

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
</style>
