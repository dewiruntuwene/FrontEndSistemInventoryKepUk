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
        component: () => import('../pages/AdminPage/BuatAkun.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'BarangKeluar',
        component: () => import('../pages/AdminPage/BarangKeluar.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'BarangMasuk',
        component: () => import('../pages/AdminPage/BarangMasuk.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'BarangPinjam',
        component: () => import('../pages/AdminPage/BarangPinjam.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataBarang',
        component: () => import('../pages/AdminPage/DataBarang.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataOrder',
        component: () => import('../pages/AdminPage/DataOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'History',
        component: () => import('../pages/AdminPage/History.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'Dashboard',
        component: () => import('../pages/AdminPage/Dashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'Profile',
        component: () => import('../pages/DosenPage/Profile.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'UserCatalog',
        component: () => import('../pages/DosenPage/UserCatalog.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'UserOrder',
        component: () => import('../pages/DosenPage/UserOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'UserTransaction',
        component: () => import('../pages/DosenPage/UserTransaction.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'BuatPrasat',
        component: () => import('../pages/KaprodiPage/BuatPrasat.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'BuatPrasatDekan',
        component: () => import('../pages/DekanPage/BuatPrasatDekan.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'BuatPrasatAdmin',
        component: () => import('../pages/AdminPage/BuatPrasatAdmin.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataBarangOnly',
        component: () => import('../pages/KaprodiPage/DataBarangOnly.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataBarangOnlyDekan',
        component: () => import('../pages/DekanPage/DataBarangOnlyDekan.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataPreOrder',
        component: () => import('../pages/KaprodiPage/DataPreOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataPreOrderDekan',
        component: () => import('../pages/DekanPage/DataPreOrderDekan.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DataPreOrderAdmin',
        component: () => import('../pages/AdminPage/DataPreOrderAdmin.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'UserCatalogPrasat',
        component: () => import('../pages/DosenPage/UserCatalogPrasat.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'UserPreOrder',
        component: () => import('../pages/DosenPage/UserPreOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'UserTransactionPreOrder',
        component: () => import('../pages/DosenPage/UserTransactionPreOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'AllTransaction',
        component: () => import('../pages/AdminPage/AllTransaction.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'AllUserTransaction',
        component: () => import('../pages/KaprodiPage/AllUserTransaction.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'TrackTransaction',
        component: () => import('../pages/AdminPage/TrackTransaction.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'TrackTransactionKaprodi',
        component: () => import('../pages/KaprodiPage/TrackTransactionKaprodi.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'TrackTransactionDekan',
        component: () => import('../pages/DekanPage/TrackTransactionDekan.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'TrackTransactionWarek1',
        component: () => import('../pages/Warek1Page/TrackTransactionWarek1.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'TrackTransactionWarek2',
        component: () => import('../pages/Warek2Page/TrackTransactionWarek2.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'TrackTransactionPm',
        component: () => import('../pages/PurchaseManagerPage/TrackTransactionPm.vue'),
        meta: { requiresAuth: true },
      },

      {
        path: 'DetailPreOrderBarang',
        component: () => import('../pages/AdminPage/DetailPreOrderBarang.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DetailPreOrderBarangKaprodi',
        component: () => import('../pages/KaprodiPage/DetailPreOrderBarangKaprodi.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DetailPreOrderBarangDekan',
        component: () => import('../pages/DekanPage/DetailPreOrderBarangDekan.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DetailPreOrderBarangWarek1',
        component: () => import('../pages/Warek1Page/DetailPreOrderBarangWarek1.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DetailPreOrderBarangWarek2',
        component: () => import('../pages/Warek2Page/DetailPreOrderBarangWarek2.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'DetailPreOrderBarangPm',
        component: () => import('../pages/PurchaseManagerPage/DetailPreOrderBarangPm.vue'),
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
        component: () => import('../pages/AdminPage/BuatMatkul.vue'),
      },
      {
        path: 'BuatRuangan',
        component: () => import('../pages/AdminPage/BuatRuangan.vue'),
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
