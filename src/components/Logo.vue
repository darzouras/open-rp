<template>
    <div v-bind:class="{ reverse: reverse }" class="roboto">
        Open-RP
    </div>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    div {
        font-weight: 300;
        text-transform: lowercase;
        font-size: 1.5rem;
        padding: .5rem 1rem;
        background: $green;
        color: white;
        width: max-content;

        &.reverse {
            background: white;
            color: $darkblue;
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