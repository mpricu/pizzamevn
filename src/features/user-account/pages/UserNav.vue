<template>
    <div>
        <router-link :to="{ name: 'UserProfile', params: { id: userId } }"
            >Profile</router-link
        >
        <router-link :to="{ name: 'UserOrders', params: { id: userId } }"
            >Orders</router-link
        >
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: 0
        };
    },
    created() {
        this.userId = this.$route.params.id;
    }
};
</script>

<style lang="scss" scoped></style>
