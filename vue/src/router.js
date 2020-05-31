import Vue from 'vue'
import Router from 'vue-router'
import MessageBox from './views/Inbox.vue'
import MessageView from './views/MessageView.vue'
import NewMessage from './views/NewMessage.vue'
import Login from "./views/Login";
import auth from './middleware/auth';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MessageBox,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/message/:id',
      name: 'ViewMessage',
      component: MessageView,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/compose',
      name: 'NewMessage',
      component: NewMessage,
      meta: {
        middleware: auth
      }
    },

  ]
});

//Handling middleware

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({...context, next: nextMiddleware});
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

    const context = {from, next, router, to,};
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({...context, next: nextMiddleware});
  }

  return next();
});


export default router;