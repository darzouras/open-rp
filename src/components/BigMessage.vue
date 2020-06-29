<template>
    <p v-bind:class="{ alert: alert }" class="roboto">
        <slot></slot>
    </p>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";
    
    p {
        font-size: 1.5rem;
        font-weight: 150;
        line-height: 1.25 !important;

        &.alert {
            color: $red;
        }
    }
</style>

<script>
export default {
    name: 'BigMessage',
    props: {
        alert: null
    }
}
</script>