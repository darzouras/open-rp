<template>
    <nav>
        <a v-if="!authenticated" @click="login">Login</a>

        <ul id="nav-links" v-if="authenticated">
            <li v-for="link in links" :key="link.name">
                <router-link :to="link.link">{{link.name}}</router-link>
            </li>
            <li>
                <a @click="logout">Logout</a>
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
            }
        }
    }
</style>

<script>
    import Firebase from '../firebase.js'

    export default {
        name: 'Nav',
        data() {
            return {
                user: {
                    loggedIn: false,
                    data: {}
                },
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
        },
        computed: {
            authenticated() {
                return this.user.loggedIn
            },
            firstName(){
                if (this.user.data.displayname) {
                    return this.user.data.displayName.split(' ')[0]
                }
                return null
            }
        },
        methods: {
            login() {
                Firebase.login();
            },
            logout() {
                Firebase.logout();
            }
        },
        mounted: function() {
            Firebase.auth.onAuthStateChanged( user => {
                if (user) {
                    this.user.loggedIn = true;
                    this.user.data = user;
                }
                else {
                    this.user.loggedIn = false;
                    this.user.data = {};
                }
            })
        }
    }
</script>