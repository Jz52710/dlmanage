import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //登录
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue' )
  },
  //主页
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index/index.vue' ),
    redirect: {name: 'list'},
    children:[
        //菜单
      {
        path: 'list',
        name: 'list',
        component: () => import('../views/list/Listindex.vue')
      },
        //用户
      {
        path: 'user',
        name: 'user',
        component: () => import('../views/user/Userindex.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
