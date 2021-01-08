<template>
  <w-notification
    v-model="snackbar.show"
    :timeout="snackbar.timeout"
    :bg-color="snackbar.color"
    color="white"
    plain
    round
    shadow
    bottom
    right
  >
    {{ snackbar.message }}
    <w-button bg-color="error" icon="wi-cross" @click="snackbar.show = false"></w-button>
  </w-notification>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const color = "white";
    const store = useStore();
    let snackbar = computed(() => store.getters["snackbarModule/getSnackbar"]);

    onMounted(() => {
      store.dispatch("snackbarModule/showSuccess", {
        message: "Hello! Welcome to ower pizza store",
      });
      // console.log("timeout", snackbar.value.timeout);
    });

    return {
      snackbar,
      color,
    };
  },
};
</script>

<style></style>
