import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

const user = ref(null);
// Vue.use(VueToast);

// Interface untuk token yang didekode
interface DecodedToken {
  role: string;
  exp: number;
}

// Fungsi untuk mendekode token JWT
function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Login',
  },
  {
    path: '/Login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/Register',
    component: () => import('../pages/Register.vue'),
  },
  {
    path: '/',
    children: [
      {
        path: 'BuatAkun',
        component: () => import('../pages/BuatAkun.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'BarangKeluar',
        component: () => import('../pages/BarangKeluar.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'BarangMasuk',
        component: () => import('../pages/BarangMasuk.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'BarangPinjam',
        component: () => import('../pages/BarangPinjam.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataBarang',
        component: () => import('../pages/DataBarang.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataPeminjaman',
        component: () => import('../pages/DataPeminjaman.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'History',
        component: () => import('../pages/History.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'Dashboard',
        component: () => import('../pages/Dashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'Profile',
        component: () => import('../pages/Profile.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'UserCatalog',
        component: () => import('../pages/UserCatalog.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'UserOrder',
        component: () => import('../pages/UserOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'UserTransaction',
        component: () => import('../pages/UserTransaction.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'BuatPrasat',
        component: () => import('../pages/BuatPrasat.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'BuatPrasatDekan',
        component: () => import('../pages/BuatPrasatDekan.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'BuatPrasatAdmin',
        component: () => import('../pages/BuatPrasatAdmin.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataBarangOnly',
        component: () => import('../pages/DataBarangOnly.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataBarangOnly',
        component: () => import('../pages/DataBarangOnly.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataBarangOnlyDekan',
        component: () => import('../pages/DataBarangOnlyDekan.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataPreOrder',
        component: () => import('../pages/DataPreOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataPreOrderDekan',
        component: () => import('../pages/DataPreOrderDekan.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataPreOrderAdmin',
        component: () => import('../pages/DataPreOrderAdmin.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'UserCatalogPrasat',
        component: () => import('../pages/UserCatalogPrasat.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'UserPreOrder',
        component: () => import('../pages/UserPreOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'UserTransactionPreOrder',
        component: () => import('../pages/UserTransactionPreOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'AllTransaction',
        component: () => import('../pages/AllTransaction.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'AllUserTransaction',
        component: () => import('../pages/AllUserTransaction.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'TrackTransaction',
        component: () => import('../pages/TrackTransaction.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'TrackTransactionKaprodi',
        component: () => import('../pages/TrackTransactionKaprodi.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'TrackTransactionDekan',
        component: () => import('../pages/TrackTransactionDekan.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'TrackTransactionWarek1',
        component: () => import('../pages/TrackTransactionWarek1.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'TrackTransactionWarek2',
        component: () => import('../pages/TrackTransactionWarek2.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'TrackTransactionPm',
        component: () => import('../pages/TrackTransactionPm.vue'),
        meta: { requiresAuth: true },
      },

      {
        path: 'DetailPreOrderBarang',
        component: () => import('../pages/DetailPreOrderBarang.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DetailPreOrderBarangKaprodi',
        component: () => import('../pages/DetailPreOrderBarangKaprodi.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DetailPreOrderBarangDekan',
        component: () => import('../pages/DetailPreOrderBarangDekan.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DetailPreOrderBarangWarek1',
        component: () => import('../pages/DetailPreOrderBarangWarek1.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DetailPreOrderBarangWarek2',
        component: () => import('../pages/DetailPreOrderBarangWarek2.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DetailPreOrderBarangPm',
        component: () => import('../pages/DetailPreOrderBarangPm.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'ResetPass',
        component: () => import('../pages/ResetPass.vue'),
      },
      {
        path: 'EmailSendResetPass',
        component: () => import('../pages/EmailSendResetPass.vue'),
      },
      {
        path: 'BuatMatkul',
        component: () => import('../pages/BuatMatkul.vue'),
      },
      {
        path: 'BuatRuangan',
        component: () => import('../pages/BuatRuangan.vue'),
      },
    ],
  },
  {
    path: '/CardBarang',
    component: () => import('../components/CardBarang.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/CardPrasat',
    component: () => import('../components/CardPrasat.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/Navbar',
    component: () => import('../components/Navbar.vue'),
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/Notification',
  //   component: () => import('../components/Notification.vue'),
  // },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Middleware untuk autentikasi
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // Periksa apakah rute memerlukan autentikasi
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      // Jika token tidak ada, arahkan ke halaman Login
      next("/Login");
    } else {
      // Periksa validitas token
      const decodedToken = decodeToken(token);
      const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik

      if (decodedToken && decodedToken.exp > currentTime) {
        // Jika token valid dan belum kedaluwarsa, izinkan akses
        next();
      } else {
        // Jika token kedaluwarsa, hapus dari localStorage dan arahkan ke Login
        localStorage.removeItem("token");
        next("/Login");
      }
    }
  } else {
    // Jika rute tidak memerlukan autentikasi, izinkan akses
    next();
  }
});

export default router;
