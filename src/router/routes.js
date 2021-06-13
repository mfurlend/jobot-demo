
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'dashboard/:symbol', component: () => import('pages/Index.vue'), meta: { skeleton: true }, props: true},
    ]
  },
  {path: '/test/:symbol', component: ()=> import('components/BinanceCandles.vue') , props: true },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
