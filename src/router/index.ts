import { createRouter, createWebHistory } from 'vue-router';
import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';

const isAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  let authFlag = false;

  onAuthStateChanged(getAuth(), (user) => {
    if (user && !authFlag) {
      authFlag = true;
      next();
    } else if (!user && !authFlag) {
      authFlag = true;
      next('/auth');
    }
  })
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/PageHome.vue'),
    beforeEnter: isAuth
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/pages/PageAuth.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/pages/PageList.vue'),
    beforeEnter: isAuth
  },
  {
    path: '/interview:id',
    name: 'Interview',
    component: () => import('@/pages/PageInterview.vue'),
    beforeEnter: isAuth
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('@/pages/PageStatistic.vue'),
    beforeEnter: isAuth
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

export default router;
