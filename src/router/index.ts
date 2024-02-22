import { createRouter, createWebHistory } from "vue-router"


const routes = {
  children: [
    {
      path: '/logout',
      component: () => import('../pages/logout.vue'),
    },
    
    {
      path: '/account',
      component: () => import('../pages/account.vue'),
    },
    {
      path: '/chating',
      component: () => import('../pages/chating.vue'),
    },
    {
      path: '/mycourse',
      component: () => import('../pages/mycourse.vue'),
    },
    {
      path: '/materialcourse',
      component: () => import('../pages/materialcourse.vue'),
    },
    {
      path: '/course',
      component: () => import('../pages/course.vue'),
    },
<<<<<<< Updated upstream
    {
      path: '/addcoursedesc',
      component: () => import('../pages/addcoursedesc.vue'),
    },
    {
      path: '/addcoursematerial',
      component: () => import('../pages/addcoursematerial.vue'),
    },
    {
      path: '/addcoursepublish',
      component: () => import('../pages/addcoursepublish.vue'),
    },
    {
      path: '/desc',
      component: () => import('../pages/desc.vue'),
    },
    {
      path: '/annoucement',
      component: () => import('../pages/annoucement.vue'),
    },
    {
      path: '/assignment',
      component: () => import('../pages/assignment.vue'),
    },
    {
      path: '/assigninstruction',
      component: () => import('../pages/assigninstruction.vue'),
    },
    {
      path: '/assignparticipant',
      component: () => import('../pages/assignparticipant.vue'),
    },
    {
      path: '/assignreport',
      component: () => import('../pages/assignreport.vue'),
    },
    {
      path: '/addassignment',
      component: () => import('../pages/addassignment.vue'),
    },
    {
      path: '/assignsubreport',
      component: () => import('../pages/assignsubreport.vue'),
    },
=======

>>>>>>> Stashed changes
  ]
}


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [ routes ], 
  })

export default router