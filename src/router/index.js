import { createRouter, createWebHistory } from "vue-router";
import SignUp from "@/components/SignUp.vue";
import SignIn from "@/components/SignIn.vue";
import LoanApplication from "@/components/LoanApplication.vue";
import LoanHistory from "@/components/LoanHistory.vue";

const routes = [
  { path: "/signup", component: SignUp },
  { path: "/signin", component: SignIn },
  {
    path: "/loan-application",
    component: LoanApplication,
    meta: { requiresAuth: true },
  },
  {
    path: "/loan-history",
    component: LoanHistory,
    meta: { requiresAuth: true },
  },
  { path: "/", redirect: "/signin" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (requiresAuth) {
    if (storedUser) {
      const now = Date.now();
      if (storedUser.expiryTime > now) {
        next();
      } else {
        localStorage.removeItem("user");
        next("/signin");
      }
    } else {
      next("/signin");
    }
  } else {
    next();
  }
});

export default router;
