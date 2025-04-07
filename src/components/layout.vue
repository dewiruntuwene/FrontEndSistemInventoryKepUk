<script  lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface DecodedToken {
  name: string;
  email: string;
  role: string; 
}

export default defineComponent({
  name: "UserProfile",
  setup() {
    const userName = ref("");
    const userRole = ref("");
    const pendingOrdersCount = ref(0);
    let intervalId: any = null;

    const router = useRouter();

    const apiUrl = import.meta.env.VITE_API_URL;

    const decodeToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          userName.value = decoded.name;
          userRole.value = decoded.role;
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

    const fetchPendingOrdersCount = async () => {
      try {
        const response = await axios.get(`${apiUrl}/countorder`); // Sesuaikan URL API Anda
        pendingOrdersCount.value = response.data.pendingOrdersCount;
      } catch (error) {
        console.error("Error fetching pending orders count:", error);
      }
    };

    onMounted(() => {
      decodeToken();
      fetchPendingOrdersCount(); // Fetch pertama kali
      intervalId = setInterval(fetchPendingOrdersCount, 5000); // Cek setiap 5 detik
    });

    onUnmounted(() => {
      if (intervalId) clearInterval(intervalId);
    });

    return {
      userRole,
      userName,
      onFileChange,
      fetchPendingOrdersCount,
      pendingOrdersCount,
    };
  },
});
</script>

<template>
  <div class="mx-auto max-w-1400 h-1531">
    <div class="sm:flex sm:w-full flex-col p-4">
      <!-- Header -->

      <div class="flex md:hidden">
        <button id="hamburger">
          <img
            class="toggle block"
            src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
            width="40"
            height="40"
          />
          <img
            class="toggle hidden"
            src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
            width="40"
            height="40"
          />
        </button>
      </div>

      <div class="p-6">
        <!-- Sidenav -->
        
          <nav
            id="sidenav-8"
            class="lg:left-0 left-[-300px] fixed top-0 h-full w-60 -translate-x-full overflow-hidden bg-sidebar shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-slate-200 text-white text-base font-semibold pt-3"
            data-te-sidenav-init
            data-te-sidenav-hidden="false"
            data-te-sidenav-position="absolute"
            data-te-sidenav-accordion="true"
            text-white text-base font-semibold pt-3
            
          >
            <a
              class="mb-3 flex space-x-3 ml-7 border-b-2 border-solid border-gray-100 py-6 outline-none "
              href="#!"
            >
              <div
                class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 "
              >
                <svg
                  class="absolute w-12 h-12 text-white -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>

              <div class="">
                <span>{{ userName }}</span>
                <p class="text-xs text-white">{{ userRole }}</p>
              </div>

              <div class="active:shadow-lg hidden" onclick="Open()">
                <svg
                  class="h-7 w-7 text-black"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </a>
            <ul
              class="relative m-0 list-none px-[0.2rem] pb-12 overflow-y-auto max-h-[calc(100vh-100px)]"
              data-te-sidenav-menu-ref
            >
              <li class="relative pt-4">
                  <a
                    class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                    data-te-sidenav-link-ref
                  >
                    <span class="mr-4">
                      <!-- Icon SVG yang ditambahkan -->
                      <svg
                        class="h-6 w-6 text-white"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="12" cy="13" r="2" />
                        <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                        <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                      </svg>
                      <!-- Akhir dari Icon SVG yang ditambahkan -->
                    </span>
                    <span>
                      <router-link to="/BuatAkun"> Buat Akun </router-link>
                    </span>
                  </a>
              </li>
              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx="12" cy="13" r="2" />
                      <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                      <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/dashboard"> Dashboard </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <router-link
                  to="/DataOrder"
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                >
                  <span class="mr-4">
                    <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 1 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                      <line x1="9" y1="9" x2="10" y2="9" />
                      <line x1="9" y1="13" x2="15" y2="13" />
                      <line x1="9" y1="17" x2="15" y2="17" />
                    </svg>
                  </span>
                  <span>
                    Orders
                    <span v-if="pendingOrdersCount > 0" class="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {{ pendingOrdersCount }}
                    </span>
                  </span>
                </router-link>
              </li>



              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <ellipse cx="12" cy="6" rx="8" ry="3"></ellipse>
                      <path d="M4 6v6a8 3 0 0 0 16 0v-6" />
                      <path d="M4 12v6a8 3 0 0 0 16 0v-6" />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/DataBarang"> Data Barang </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/BarangMasuk"> Barang Masuk </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path
                        d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
                      />
                      <path d="M7 12h14l-3 -3m0 6l3 -3" />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/BarangKeluar"> Barang Habis Pakai (BHP) </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path
                        d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
                      />
                      <path d="M7 12h14l-3 -3m0 6l3 -3" />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/BarangPinjam">Alat Kesehatan (ALKES) </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="12 8 12 12 14 14" />
                      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/History"> History </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      width="24"
                      hei ght="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx="12" cy="13" r="2" />
                      <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                      <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/BuatPrasatAdmin"> Buat Prasat </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      width="24"
                      hei ght="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx="12" cy="13" r="2" />
                      <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                      <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/DataPreOrderAdmin"> Data Pre-Order </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      width="24"
                      hei ght="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx="12" cy="13" r="2" />
                      <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                      <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/DetailPreOrderBarang"> Pre Order Barang </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx="12" cy="13" r="2" />
                      <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                      <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/TrackTransaction"> Track Transaction </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="12 8 12 12 14 14" />
                      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/UserCatalog"> User Catalog </router-link>
                  </span>
                </a>
              </li> 
              
              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="12 8 12 12 14 14" />
                      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/BuatMatkul"> Buat Matakuliah </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                  data-te-sidenav-link-ref
                >
                  <span class="mr-4">
                    <!-- Icon SVG yang ditambahkan -->
                    <svg
                      class="h-6 w-6 text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="12 8 12 12 14 14" />
                      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                    </svg>
                    <!-- Akhir dari Icon SVG yang ditambahkan -->
                  </span>
                  <span>
                    <router-link to="/BuatRuangan"> Buat Ruangan </router-link>
                  </span>
                </a>
              </li>
            </ul>
          </nav>   
      </div>

      
    </div>
  </div>
  <RouterView />
</template>

<style>
        @import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap');
        .font-family-karla { font-family: karla; }
        .bg-sidebar { background: #3d68ff; }
        .cta-btn { color: #3d68ff; }
        .upgrade-btn { background: #1947ee; }
        .upgrade-btn:hover { background: #0038fd; }
        .active-nav-link { background: #1947ee; }
        .nav-item:hover { background: #1947ee; }
        .account-link:hover { background: #3d68ff; }
    </style>
