import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Forks from '../views/Forks.vue';
import AppLayout from '@/AppLayout.vue';

Vue.use(Router);

const routes = [
  { path: '*', redirect: '/Home' },
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Home',
        },
      },
      {
        path: '/search/:repository',
        name: 'Forks',
        component: Forks,
        meta: {
          title: 'Forks',
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
    ]
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

