import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'CountryList',
    component: () => {
      return import("@/views/CountryList.vue")
    },
  },
  {
    path: '/:alpha3Code',
    name: 'CountryDetails',
    component: () => {
      return import("@/views/CountryDetails.vue")
    },
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router