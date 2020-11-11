import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'InicioSesion',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
  },
  {
    path: '/inicio',
    name: 'AgregarCliente',
    component: () => import(/* webpackChunkName: "about" */ '../views/inicio.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "about" */ '../views/logout.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
