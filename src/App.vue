<template>
  <w-app>
    <div id="app">
      <div class="header">
        <Header :user="users" />
      </div>
      <div>
        <!-- <h1>Main Router View</h1> -->
        <router-view></router-view>
      </div>
      <SnackBar />
    </div>
  </w-app>
</template>

<script>
import Header from "./common-components/Header";
import SnackBar from "./common-components/SnackBar";
import { getCurrentInstance, ref } from "vue";

export default {
  name: "App",
  components: {
    Header,
    SnackBar,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    let users = ref(null);

    proxy.emitter.on("userLoggedIn", () => {
      users.value = JSON.parse(localStorage.getItem("user"));
    });

    proxy.emitter.on("userLoggedOut", () => {
      users.value = JSON.parse(localStorage.getItem("user"));
    });

    return {
      users,
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body,
html {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
* {
  font-family: "Nunito", sans-serif;
}
#app {
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  flex: 0 0 60px;
}
.container {
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-y: auto;
  margin-top: 3%;
}
.item {
  font-weight: bold;
  text-align: center;
}
</style>
