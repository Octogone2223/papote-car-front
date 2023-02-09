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
        path: '/search',
        name: 'board-research',
        component: () => import('../views/board/Research.vue'),
      },
      {
        path: '/my-travels',
        name: 'my-travels',
        component: () => import('../views/board/MyTravels.vue'),
      },
      {
        path: '/mon-profil',
        name: 'board-profile',
        component: () => import('../views/board/Profile.vue'),
      },
    ],
  },
  {
    path: "/s'enregistrer",
    name: 'register',
    component: () => import('../views/auth/SignUp.vue'),
  },
  {
    path: '/user-validation/:token',
    name: 'user-validation',
    beforeEnter: (_to: any, _from: any, next: (route: string) => void) => {
      console.log('CALL API TO VALIDATE USER');
      next('/se-connecter');
    },
    // INVISIBLE COMPONENT BECAUSE WE WAIT & REDIRECT TO LOGIN
    component: () => ({ template: '<div>Validation en cours...</div>' }),
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
