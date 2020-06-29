<template>
    <div class="roboto">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    div {
        background: $gray;
        padding: 1rem;
        width: calc(100% - 2rem);
        margin: .5rem 0;
        border-radius: 15px;
    }
</style>

<script>
export default {
    name: 'SmallMessage'
}
</script>