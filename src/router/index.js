import { createRouter, createWebHistory } from 'vue-router';
import { useAccountStore } from '@/stores/account';

import HomeView from '../views/user/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/user/RegisterView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/user/CartView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/user/CheckoutView.vue'),
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('@/views/user/SuccessView.vue'),
    },
    {
      path: '/user/account',
      name: 'user-profile',
      component: () => import('@/views/user/UserProfileView.vue'),
    },
    {
      path: '/user/purchase',
      name: 'purchase-history',
      component: () => import('@/views/user/UserPurchaseHistoryView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/user/SearchView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  console.log('from', from);
  console.log('to', to);

  const accountStore = useAccountStore();
  await accountStore.checkAuth();
  next();
});

export default router;
