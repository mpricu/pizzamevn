<template>
  <div id="home">
    <div class="content">
      <div class="welcome">
        <h2>
          Welcome to our website! We want you to have the best experience
          possible!
        </h2>
        <h3>ARE YOU READY TO PIZZA?</h3>
        <h4>
          {{
            "Try not to get too attached " + (userName != "" ? userName : "")
          }}
        </h4>
        <button class="button" @click="goToMenu">Let's order!</button>
      </div>
      <div class="content-background"></div>
      <div class="about">
        <h2>So.. you wanna knwo more about us?</h2>
        <h3>We REEEEEEAAAAALLYYY LOVE PIZZA!</h3>
        <h4>
          If you are so passionate about pizza, give us a call for the first
          order!
        </h4>
        <button class="button">About us</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const userName = "Arabela";

    function goToMenu() {
      router.push("pizza-menu");
    }

    return {
      userName,
      goToMenu,
      router,
    };
  },
};
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.content {
  width: 100%;
  height: 80%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 2fr 3fr 2fr 3fr 2fr;
}
.content-background {
  background: url("../../../assets/home.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  grid-column: 1/-1;
  grid-row: 2 / span 3;
}
.welcome {
  background: #eee;
  opacity: 0.8;
  padding: 30px 20px;
  grid-column: 2 / span 1;
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.about {
  background: #eee;
  opacity: 0.8;
  padding: 30px 20px;
  grid-column: 2 / span 1;
  grid-row: 4 / span 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.button {
  display: inline-block;
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  font-weight: 700;
  font-size: 1.2rem;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  color: #fff;
  background-color: #a0a0a0;
}
</style>
