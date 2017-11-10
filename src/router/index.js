import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Signup2 from '@/components/SignupValidate'
import BookMarker from '@/components/BookMarker'
import User from '@/components/User.vue';
import About from '@/components/About.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: './home',
      component: User,
      children: [ 
        {
          path: '',
          component: Home,
          name: 'Home',
          meta: {
            requiresAuth: true
          },
        },
        {
          path: '/bookmarker',
          component: BookMarker,
          name: 'BookMarker',
          meta: {
            requiresAuth: true
          },
        } ,
        {
          path: '/about',
          component: About,
          name: 'About',
          meta: {
            requiresAuth: true
          },
        } 
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signup2',
      name: 'Signup2',
      component: Signup2
    },
    {
      path: '*', 
      redirect: { name: 'Login'}
    },
  ],
  // mode: 'history'
})



