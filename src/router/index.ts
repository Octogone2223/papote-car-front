import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'board',
    component: () => import('../views/board/Index.vue'),
    children: [
      {
        path: '/messages',
        name: 'board-messages',
        component: () => import('../views/board/Messages.vue'),
      },
      {
        path: '/messages/:id',
        name: 'board-messages-id',
        component: () => import('../views/board/Message.vue'),
      },
      {
        path: '/publier',
        name: 'board-publish',
        component: () => import('../views/board/AddTravel.vue'),
      },
      {
        path: '/board-research',
        name: 'board-research',
        component: () => import('../views/board/Research.vue'),
      },
    ],
  },
  {
    path: "/s'enregistrer",
    name: 'register',
    component: () => import('../views/auth/SignUp.vue'),
  },
  {
    path: '/se-connecter',
    name: 'login',
    component: () => import('../views/auth/SignIn.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
