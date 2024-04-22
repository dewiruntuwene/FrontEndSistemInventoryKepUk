import { createRouter, createWebHistory } from "vue-router"


const routes = {

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
      path: '/register',
      component: () => import('../pages/register.vue'),
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
      path: '/CardBarang',
      component: () => import('../components/CardBarang.vue')
    },
    {
      path: '/Layout',
      component: () => import('../components/Layout.vue')
    },
    {
      path: '/NavBar',
      component: () => import('../components/NavBar.vue')
    },
  ]
}


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [ routes ], 
  })
  
export default router