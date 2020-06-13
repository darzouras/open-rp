<template>
    <header>
        <router-link to="/">
            <Logo />
        </router-link>
        

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
    }
</style>

<script>
import Logo from './Logo.vue'
import Nav from './Nav.vue'

export default {
    name: 'Header',
    components: {
        Nav,
        Logo
    }
}
</script>