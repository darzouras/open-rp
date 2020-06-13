<template>
    <nav>
        <ul id="nav-links">
            <li v-for="link in links" :key="link.name">
                <router-link :to="link.link">{{link.name}}</router-link>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
    nav {
        ul {
            list-style: none;
            display: flex;
            align-items: center;

            li {
                margin: 0 5px;
                padding: 0;
            }
        }
    }
</style>

<script>
    export default {
        name: 'Nav',
        data() {
            return {
                links: [
                    {       
                        name: 'Home',
                        link: '/'
                    },
                    {
                        name: 'Components',
                        link: '/components'
                    }
                ]
            }
        }
    }
</script>