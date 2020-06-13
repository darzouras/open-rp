<template>
    <header>
        <router-link to="/"><div class="header-title">
            Open-RP
        </div></router-link>

        <Nav />
    </header>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    header {
        box-shadow: 0px 5px 10px $shadow;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 5%;
        width: 90%;

        .header-title {
            font-weight: 150;
            text-transform: lowercase;
            font-size: 1.5rem;
            padding: .5rem 1rem;
            background: $green;
            color: white;

            a {
                color: white;
                text-decoration: none;
            }
        }
    }
</style>

<script>
import Nav from './Nav.vue'
export default {
    name: 'Header',
    components: {
        Nav
    }
}
</script>