<template>
    <div v-bind:class="{ reverse: reverse }">
        Open-RP
    </div>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    div {
        font-weight: 150;
        text-transform: lowercase;
        font-size: 1.5rem;
        padding: .5rem 1rem;
        background: $green;
        color: white;
        width: max-content;

        &.reverse {
            background: white;
            color: $green;
        }
    }
</style>

<script>
export default {
    name: 'Logo',
    props: {
        reverse: null
    }
}
</script>