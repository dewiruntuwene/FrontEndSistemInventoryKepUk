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

// Definisikan tipe untuk data token yang didekode
interface DecodedToken {
  role: string;
  // Tambahkan properti lain dari token jika diperlukan
}

//Fungsi untuk mendekode token
function decodeToken(token: string): DecodedToken {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return { role: "" }; // Return empty role jika terjadi kesalahan
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
        path: 'BarangKeluar',
        component: () => import('../pages/BarangKeluar.vue'),
      },
      {
        path: 'BarangMasuk',
        component: () => import('../pages/BarangMasuk.vue'),
      },
      {
        path: 'BarangPinjam',
        component: () => import('../pages/BarangPinjam.vue'),
      },
      {
        path: 'DataBarang',
        component: () => import('../pages/DataBarang.vue'),
      },
      {
        path: 'DataPeminjaman',
        component: () => import('../pages/DataPeminjaman.vue'),
      },
      {
        path: 'History',
        component: () => import('../pages/History.vue'),
      },
      {
        path: 'Dashboard',
        component: () => import('../pages/Dashboard.vue'),
      },
      {
        path: 'Profile',
        component: () => import('../pages/Profile.vue'),
      },
      {
        path: 'UserCatalog',
        component: () => import('../pages/UserCatalog.vue'),
      },
      {
        path: 'UserOrder',
        component: () => import('../pages/UserOrder.vue'),
      },
      {
        path: 'UserTransaction',
        component: () => import('../pages/UserTransaction.vue'),
      },
      {
        path: 'BuatPrasat',
        component: () => import('../pages/BuatPrasat.vue'),
      },
      {
        path: 'BuatPrasatDekan',
        component: () => import('../pages/BuatPrasatDekan.vue'),
      },
      {
        path: 'BuatPrasatAdmin',
        component: () => import('../pages/BuatPrasatAdmin.vue'),
      },
      {
        path: 'DataBarangOnly',
        component: () => import('../pages/DataBarangOnly.vue'),
      },
      {
        path: 'DataBarangOnly',
        component: () => import('../pages/DataBarangOnly.vue'),
      },
      {
        path: 'DataBarangOnlyDekan',
        component: () => import('../pages/DataBarangOnlyDekan.vue'),
      },
      {
        path: 'DataPreOrder',
        component: () => import('../pages/DataPreOrder.vue'),
      },
      {
        path: 'DataPreOrderDekan',
        component: () => import('../pages/DataPreOrderDekan.vue'),
      },
      {
        path: 'DataPreOrderAdmin',
        component: () => import('../pages/DataPreOrderAdmin.vue'),
      },
      {
        path: 'UserCatalogPrasat',
        component: () => import('../pages/UserCatalogPrasat.vue'),
      },
      {
        path: 'UserPreOrder',
        component: () => import('../pages/UserPreOrder.vue'),
      },
      {
        path: 'UserTransactionPreOrder',
        component: () => import('../pages/UserTransactionPreOrder.vue'),
      },
      {
        path: 'AllTransaction',
        component: () => import('../pages/AllTransaction.vue'),
      },
      {
        path: 'TrackTransaction',
        component: () => import('../pages/TrackTransaction.vue'),
      },
      {
        path: 'TrackTransactionKaprodi',
        component: () => import('../pages/TrackTransactionKaprodi.vue'),
      },
      {
        path: 'TrackTransactionDekan',
        component: () => import('../pages/TrackTransactionDekan.vue'),
      },
      {
        path: 'TrackTransactionWarek1',
        component: () => import('../pages/TrackTransactionWarek1.vue'),
      },
      {
        path: 'TrackTransactionWarek2',
        component: () => import('../pages/TrackTransactionWarek2.vue'),
      },
      {
        path: 'TrackTransactionPm',
        component: () => import('../pages/TrackTransactionPm.vue'),
      },

      {
        path: 'DetailPreOrderBarang',
        component: () => import('../pages/DetailPreOrderBarang.vue'),
      },
      {
        path: 'DetailPreOrderBarangKaprodi',
        component: () => import('../pages/DetailPreOrderBarangKaprodi.vue'),
      },
      {
        path: 'DetailPreOrderBarangDekan',
        component: () => import('../pages/DetailPreOrderBarangDekan.vue'),
      },
      {
        path: 'DetailPreOrderBarangWarek1',
        component: () => import('../pages/DetailPreOrderBarangWarek1.vue'),
      },
      {
        path: 'DetailPreOrderBarangWarek2',
        component: () => import('../pages/DetailPreOrderBarangWarek2.vue'),
      },
      {
        path: 'DetailPreOrderBarangPm',
        component: () => import('../pages/DetailPreOrderBarangPm.vue'),
      },
    ],
  },
  {
    path: '/CardBarang',
    component: () => import('../components/CardBarang.vue'),
  },
  {
    path: '/CardPrasat',
    component: () => import('../components/CardPrasat.vue'),
  },
  {
    path: '/Navbar',
    component: () => import('../components/Navbar.vue'),
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/Login");
    } else {
      // Check if user has the required role
      if (to.meta.role !== userRole) {
        // Redirect to appropriate page based on role
        if (userRole === "user") {
          next("/User/Catalog");
        } else if (userRole === "admin") {
          next("/Admin/Dashboard");
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
