import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import UserList from '@/components/userlist/userlist.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/users',
          name: 'userlist',
          component: UserList
        }
      ]
    }


  ]
})
