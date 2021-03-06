import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    //延迟加载
    path: '/example01',
    name: 'Example01',
    component: () => import('@/views/example01/Example01.vue'),
  },
  {
    path: '/example02',
    name: 'Example02',
    component: () => import('@/views/example02/Example02.vue'),
  },
  {
    props: true,
    name: 'Example03',
    path: '/example03/students/:sid/homeworks/:hid',
    component: () => import('@/views/example03/Example03.vue'),
  },
  {
    path: '/example04',
    name: 'directive',
    component: () => import('@/views/example04/Example04.vue'),
    children: [
      {
        path: '/example04/01',
        name: 'text-if-show',
        component: () => import('@/views/example04/Example04-01.vue'),
      },
      {
        path: '/example04/02',
        name: 'v-bind',
        component: () => import('@/views/example04/Example04-02.vue'),
      },
      {
        path: '/example04/03',
        name: 'v-for',
        component: () => import('@/views/example04/Example04-03.vue'),
      },
    ],
  },
  {
    name: 'Example05',
    path: '/example05',
    component: () => import('../views/example05/Example05.vue'),
    children: [
      {
        path: '/example05/01',
        name: 'bindings',
        component: () => import('@/views/example05/Example05-01.vue'),
      },
      {
        path: '/example05/02',
        name: 'v-model',
        component: () => import('@/views/example05/Example05-02.vue'),
      },
    ],
  },
  {
    name: 'Example06',
    path: '/example06',
    component: () => import('../views/example06/Example06.vue'),
    children: [
      {
        path: '/example06/01',
        name: 'Basic binding',
        component: () => import('@/views/example06/Example06-01.vue'),
      },
      {
        path: '/example06/02',
        name: 'Synchronous binding',
        component: () => import('@/views/example06/Example06-02.vue'),
      },
      {
        path: '/example06/03',
        name: 'Asynchronous binding',
        component: () => import('@/views/example06/Example06-03.vue'),
      },
    ],
  },
  {
    name: 'Example07',
    path: '/example07',
    component: () => import('../views/example07/Example07.vue'),
    children: [
      {
        path: '/example07/01',
        name: 'Axios basic request',
        component: () => import('@/views/example07/Example07-01.vue'),
      },
      {
        props: true,
        path: '/example07/02',
        component: () => import('@/views/example07/Example07-02.vue'),
      },
      {
        props: true,
        path: '/example07/03/:hid',
        component: () => import('@/views/example07/Example07-03.vue'),
      },
    ],
  },
  {
    name: 'Example08',
    path: '/example08',
    component: () => import('@/views/example08/example08-01.vue'),
  },
  {
    name: 'Example09',
    path: '/example09',
    component: () => import('@/views/example09/example09-01.vue'),
  },
  {
    name: 'Example10',
    path: '/example10',
    props: true,
    component: () => import('@/views/example10/example10-01.vue'),
    children: [
      {
        props: true,
        path: 'homeworks/:hid',
        component: () => import('@/views/example10/Homework.vue'),
      },
    ],
  },
  {
    name: 'Example11',
    path: '/example11',
    component: () => import('@/views/example11/example11-01.vue'),
  },
  /* {
    name: 'Example12',
    path: '/example12',
    component: () => import('@/views/example12/example12-01.vue'),
  }, */
]

const router = new VueRouter({
  routes,
})

export default router

//以上是默认路由
//以下是追加的路由

let adminRoutes = [
  {
    props: true,
    path: '/example11/welcome',
    component: () => import('@/views/example11/Welcome.vue'),
  },
]

//必须与后端提前约定。按角色，动态加载路由信息
//使其它角色即使知道路由路径，也无法加载对应组件

const teacherRole = '6983f953b49c88210cb9'
const studentRole = 'bb63e5f7e0f2ffae845c'

//暴露该方法登录后由vuex调用，通知更新信息

export function updateRoutes() {
  switch (sessionStorage.getItem('role')) {
    case teacherRole:
      router.addRoutes(adminRoutes)
      break
    case studentRole:
      //student的路由
      break
  }
}

//在此文件加载模块时，也执行。用户登陆后刷新页面时，按sessionStorage中数据初始化
//没有找到sessionStorage的监听事件

updateRoutes()
