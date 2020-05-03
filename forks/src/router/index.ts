import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Forks from '../views/Forks.vue';

Vue.use(Router);

const routes = [
    { path: '*', redirect: '/Home' },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        meta: {
            name: 'Login',
        },
    },
    {
      path: '/search/:repository',
      name: 'Forks',
      component: Forks,
      meta: {
        name: 'Forks',
      },
    },
    {
      path: '/search/:page/:repository',
      name: 'ForksPage',
      component: Forks,
      meta: {
        name: 'Forks',
      },
    },
];

const router = new Router({ routes });

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

