<template>
    <router-link :to="route" class="cta-full roboto">
        <slot></slot>
    </router-link>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    .cta-full {
        background: white;
        color: $darkblue;
        border: 2px solid $darkblue;
        border-radius: 10px;
        text-decoration: none;
        padding: .5rem 1rem;
        text-align: center;
        font-weight: 400;
        font-size: 1.2rem;
        text-transform: lowercase;

        &:hover {
            color: white;
            background: $darkblue;
        }
    }

</style>

<script>
export default {
    name: 'RouteButton',
    props: {
        route: String
    }
}
</script>