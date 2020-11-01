import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Start from '@/components/pages/Start.vue';
import Main from '@/components/pages/Main.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/start',
  },
  {
    path: '/start',
    name: 'Start',
    component: Start,
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
