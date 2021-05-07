import router from './router';

// const whiteList = ['/login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  next();
});

router.afterEach(() => {
});
