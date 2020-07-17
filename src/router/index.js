import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/Auth.vue'
import Profile from '../components/Profile.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Auth', component: Auth },
  { path: '/profile', name: 'Profile', component: Profile }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.getters.isLogIn && to.name != 'Auth'){
    next({ path: '/' })
  }
  else next()
})

export default router
