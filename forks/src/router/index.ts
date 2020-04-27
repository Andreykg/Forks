import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
];

const router = new VueRouter({routes});

router.beforeEach(async (to, from, next) => {
  if (to.path === '/') {
      next({
          path: '/Home',
      });
      return;
  }
  next();
});

export default router;
