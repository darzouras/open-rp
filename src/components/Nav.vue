<template>
    <nav>
        <ul id="nav-links" v-if='user.loggedIn'>
            <li v-for="link in links" :key="link.name">
                <router-link :to="link.link">{{link.name}}</router-link>
            </li>
            <li>
                <a @click="signOut">Logout</a>
            </li>
        </ul>
        <ul v-else>
            <li>
                <router-link to="/login">Login</router-link>
            </li>
            <li>
                <router-link to="/register">Register</router-link>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
    nav {
        display: flex;
        align-items: center;

        ul {
            list-style: none;
            display: flex;
            align-items: center;

            li {
                margin: 0 5px;
                padding: 0;
                
                a {
                    cursor: pointer;
                }
            }
        }
    }
</style>

<script>
    import { mapGetters } from 'vuex'
    import firebase from 'firebase'

    export default {
        name: 'Nav',
        data() {
            return {
                links: [
                    {
                        name: 'Dashboard',
                        link: '/dashboard'
                    }
                ]
            }
        },
        computed: {
            ...mapGetters({
                user: 'user'
            })
        },
        methods: {
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$router.replace({
                            name: 'login'
                        })
                    })
            }
        }
    }
</script>