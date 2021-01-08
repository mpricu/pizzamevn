import { createRouter, createWebHistory } from "vue-router";
import Home from "../features/store/pages/Home";
import AddPizza from "../features/store/pages/AddPizza";
import EditPizza from "../features/store/pages/EditPizza";
import ShoppingCart from "../features/shopping-cart/pages/ShoppingCart";

import AuthenticateUser from "../features/user-account/pages/AuthenticateUser";
import UserRouter from "../features/user-account/router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pizza-menu",
    name: "Menu",
    component: () =>
      import(/* webpackChunkName: "menu" */ "../features/store/pages/Menu"),
  },
  {
    path: "/add-pizza",
    name: "AddPizza",
    component: AddPizza,
  },
  {
    path: "/edit-pizza/:id",
    name: "EditPizza",
    component: EditPizza,
  },
  {
    path: "/cart",
    name: "Cart",
    component: ShoppingCart,
  },
  {
    path: "/authenticate",
    name: "Login",
    component: AuthenticateUser,
  },
  {
    path: "/user/:id",
    ...UserRouter,
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
