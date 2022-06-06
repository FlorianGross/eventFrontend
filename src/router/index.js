import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CalendarView from '../views/CalendarView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landingpage',
    component: () => import('../views/LandingView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/events',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView
  },
  {
    path: '/datenschutz',
    name: 'datenschutz',
    component: () => import('../views/DatenschutzView.vue')
  },
  {
    path: '/impressum',
    name: 'impressum',
    component: () => import('../views/ImpressumView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../components/LogoutComponent.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue')
  },
  {
    path: '/event/:id',
    name: 'event',
    component: () => import('../views/DetailView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../components/UserManagementPart.vue')
  },
  {
    path: '/:catchall(.*)*',
    name: "PageNotFound",
    component: () => import('../views/PageNotFoundView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/home', '/datenschutz', '/impressum']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (authRequired && !loggedIn) {
    return next('/');
  }
  else {
    next();
  }
});

export default router
