import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import DataTree from '@/components/dataTree.vue'
import Coach from '@/components/coach.vue'
import Athlete from '@/components/athlete.vue'
import Password from '@/components/password.vue'

Vue.use(Router)

var router =  new Router({
  routes: [
    {
      path: '/',
      redirect:'/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/DataTree',
      name: 'DataTree',
      component: DataTree
    },
    {
      path: '/Coach',
      name: 'Coach',
      component: Coach
    },
    {
      path: '/Athlete',
      name: 'Athlete',
      component: Athlete
    },
    {
      path: '/Password',
      name: 'Password',
      component: Password
    }
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/Login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === null || token == '') {
      next('/Login');
    } else {
      next();
    }
  }
});

export default router;
