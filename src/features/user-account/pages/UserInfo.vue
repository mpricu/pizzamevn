<template>
  <div>
    <div v-if="!isError">
      <PersonalInfo :user="user" />
      <div v-for="address in user.addresses" :key="address.id">
        <UserAddress :address="address" />
      </div>
    </div>
    <div v-else>
      <p>Error getting data</p>
    </div>
  </div>
</template>

<script>
import PersonalInfo from "../components/PersonalInfo";
import UserAddress from "../components/UserAddress";

import UserService from "../services/user.service";
import { ref, onMounted } from "vue";

export default {
  components: { PersonalInfo, UserAddress },
  //   data() {
  setup() {
    let user = ref([]);
    const isError = false;

    onMounted(async () => {
      user.value = JSON.parse(localStorage.getItem("user"));
      let userId = user.value._id;
      const response = await UserService.getUser(userId);
      if (response.isError) {
        this.isError = true;
      } else {
        user = response;
      }
    });

    return {
      user,
      isError,
    };
  },
  //   async created() {
  //     this.user = JSON.parse(localStorage.getItem("user"));
  //     this.userId = this.user._id;

  //     const response = await UserService.getUser(this.userId);
  //     if (response.isError) {
  //       this.isError = true;
  //     } else {
  //       this.user = response;
  //     }
  //   },
};
</script>

<style lang="scss" scoped></style>
