<template>
  <div>
    <button @click="loginUser">Log In</button>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import userService from "../services/user.service";

export default {
  setup() {
    const { proxy } = getCurrentInstance();

    async function loginUser() {
      // console.log("loginUser");
      const user = await userService.authenticateUser("gianni@pizza-love.me");
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        proxy.emitter.emit("userLoggedIn");
      }
    }
    return {
      loginUser,
    };
  },
};
</script>

<style lang="scss" scoped></style>
