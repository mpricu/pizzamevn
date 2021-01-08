<template>
    <div class="address-info">
        <p>Street {{ address.street }}, number {{ address.number }}</p>
    </div>
</template>

<script>
export default {
    props: {
        address: {
            required: true,
            type: Object
        }
    }
};
</script>

<style lang="scss" scoped></style>
