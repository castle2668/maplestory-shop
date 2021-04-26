import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    name: 'Dashboard',
    path: '/admin',
    component: () => import('@/components/admin/Dashboard.vue'),
    children: [
      {
        name: 'Products',
        path: 'products',
        component: () => import('@/views/admin/Products.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: 'Coupons',
        path: 'coupons',
        component: () => import('@/views/admin/Coupons.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: 'Orders',
        path: 'orders',
        component: () => import('@/views/admin/Orders.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    name: 'Base',
    path: '/',
    redirect: '/',
    component: () => import('@/components/Base.vue'),
    children: [
      {
        name: 'Index',
        path: '/',
        component: () => import('@/views/Index.vue'),
      },
      {
        name: 'Category',
        path: 'category',
        component: () => import('@/views/Category.vue'),
      },
      {
        name: 'Detail',
        path: 'detail/:id',
        component: () => import('@/views/Detail.vue'),
      },
      {
        name: 'CustomerOrder',
        path: 'customerOrder',
        component: () => import('@/views/CustomerOrder.vue'),
      },
      {
        name: 'CustomerCheckout',
        path: 'customerCheckout/:orderId',
        component: () => import('@/views/CustomerCheckout.vue'),
      },
      {
        name: 'Login',
        path: 'login',
        component: () => import('@/views/Login.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
