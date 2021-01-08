<template>
    <div class="user-info-panel">
        <p>FirstName: {{ user.firstName }}</p>
        <p>LastName: {{ user.lastName }}</p>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            require: true,
            type: Object
        }
    }
};
</script>

<style lang="scss" scoped></style>
