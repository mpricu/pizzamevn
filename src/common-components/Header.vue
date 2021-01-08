<template>
  <w-toolbar shadow>
    <div class="title2">Cuddly Octo Pizza Store</div>
    <div class="spacer"></div>

    <router-link class="actions" exact to="/">Home</router-link>
    <router-link class="actions" exact :to="{ path: '/pizza-menu' }">Menu</router-link>
    <router-link class="actions" exact :to="{ path: '/cart' }">
      <w-badge v-model="showBadge" bg-color="red" color="white">
        Shopping Cart</w-badge
      ></router-link
    >
    <div v-if="isLoggedIn">
      <router-link
        exact
        :to="{
          name: 'UserProfile',
          params: { id: user.id },
        }"
        >User Info</router-link
      >
    </div>
    <div class="actions" v-bind:title="actionsToolTip">
      <button v-if="isLoggedIn" class="signOut-link" @click="logOut">
        Welcome {{ userName }}
      </button>
      <router-link v-else to="/authenticate" class="signIn-link">Login</router-link>
    </div>
  </w-toolbar>
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  props: {
    user: Object,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { proxy } = getCurrentInstance();

    const actionsToolTip = "User's actions";

    const showBadge = computed(() => store.getters["menuModule/getCartItemsNumber"]);

    const userName = computed(() => {
      return `${props.user.firstName} ${props.user.lastName}`;
    });

    const isLoggedIn = computed(() => {
      return !!props.user;
    });

    function logOut() {
      localStorage.removeItem("user");
      proxy.emitter.emit("userLoggedOut");
      router.push("/pizza-menu");
    }
    return {
      actionsToolTip,
      userName,
      isLoggedIn,
      logOut,
      showBadge,
    };
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 10px 3px rgb(156, 156, 156);
}
header > nav {
  display: flex;
  flex-direction: row;
}
header > nav > .logo {
  font-size: 1.4rem;
  place-self: center;
  padding: 10px 20px;
}
header > nav > ul {
  display: flex;
  flex-direction: row;
  gap: 10px;
  list-style: none;
}
header > nav > ul > li:not(:first-of-type)::before {
  content: "|";
  opacity: 0.4;
  padding-right: 10px;
}
.site-nav {
  display: flex;
  margin: 0;
  padding: 0;
}
.actions {
  margin-left: auto;
  display: flex;
  margin-right: 20px;
}
.signIn-link {
  color: #bb4a4a;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 0 10px;
}
.router-link-active {
  border-bottom: 2px solid tomato;
}
.signOut-link {
  all: unset;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 0 10px;
  color: #4a4abb;
}
</style>
