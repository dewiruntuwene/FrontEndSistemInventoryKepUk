import { createRouter, createWebHistory } from "vue-router"
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

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

const routes = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/Login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/Register',
    component: () => import('../pages/register.vue'),
  },
  {
    children: [
      {
        path: '/BarangKeluar',
        component: () => import('../pages/BarangKeluar.vue'),
      },
      
      {
        path: '/BarangMasuk',
        component: () => import('../pages/BarangMasuk.vue'),
      },
      {
        path: '/DataBarang',
        component: () => import('../pages/DataBarang.vue'),
      },
      {
        path: '/DataPeminjaman',
        component: () => import('../pages/DataPeminjaman.vue'),
      },
      {
        path: '/History',
        component: () => import('../pages/History.vue'),
      },
      {
        path: '/Dashboard',
        component: () => import('../pages/Dashboard.vue'),
      },
      {
        path: '/LandingPage',
        component: () => import('../pages/LandingPage.vue'),
      },
      {
        path: '/Login',
        component: () => import('../pages/Login.vue'),
      },
      {
        path: '/UserCatalog',
        component: () => import('../pages/UserCatalog.vue'),
      },
      {
        path: '/UserOrder',
        component: () => import('../pages/UserOrder.vue'),
      },
      {
        path: '/UserTransaction',
        component: () => import('../pages/UserTransaction.vue'),
      },
      {
        path: '/CardBarang',
        component: () => import('../components/CardBarang.vue')
      },
      {
        path: '/Layout',
        component: () => import('../components/layout.vue')
      },

    ]
  }
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/Login');
    } else {
      // Check if user has the required role
      if (to.meta.role !== userRole) {
        // Redirect to appropriate page based on role
        if (userRole === 'user') {
          next('/User/Catalog');
        } else if (userRole === 'admin') {
          next('/Admin/Dashboard');
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});


  
export default router