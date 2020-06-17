<template>
    <nav class="roboto">
        <div v-if="user.loggedIn">

            <button id="nav-dropdown" @click="navActive = !navActive" v-bind:class="{ active : navActive }" aria-label="Display navigation">
                <span></span>
            </button>

            <ul id="nav-links" v-if='user.loggedIn' v-bind:class="{ active : navActive }" @click="closeDropdown">
                <li>
                    <i class="ri-user-smile-line"></i> {{ user.data.displayName }}
                </li>
                <li>
                    <i class="ri-account-pin-box-line"></i> ACTIVECHAR
                </li>
                <li v-for="link in links" :key="link.name">
                    <router-link :to="link.link">{{link.name}}</router-link>
                </li>
                <li>
                    <a href="#" @click="signOut" tabindex="0">Logout</a>
                </li>
            </ul>
        </div>
        <div v-else>
            <ul>
                <li>
                    <router-link to="/login">Login</router-link>
                </li>
                <!--li>
                    <router-link to="/register">Register</router-link>
                </li -->
            </ul>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    nav {
        display: flex;
        align-items: center;
        font-weight: 250;

        > div {
            display: flex;
            align-items: center;

            #nav-dropdown {
                position: relative;
                background: transparent;
                border: 0;
                height: 25px;
                width: 25px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                padding: 0;

                span {
                    height: 2px;
                    width: 25px;
                    background: $green;
                    display: block;
                }

                &::after{
                    content: '';
                    height: 2px;
                    width: 25px;
                    transform: rotate(90deg);
                    background: $green;
                    display: block;
                    position: absolute;
                    transition: .5s all ease-in-out;
                }

                &.active {
                    &::after {
                        transform: rotate(540deg);
                    }
                }
            }

            #nav-links {
                li {
                    display: flex;
                    align-items: center;
                }
                i {
                    font-size: 1.2rem;
                    margin-right: .25rem;
                }
            }

            @media (max-width: 767px) {
                #nav-links {
                    display: none;
                    position: fixed;
                    bottom: $nav-height;
                    right: 0;
                    left: 0;
                    background: white;
                    text-align: right;
                    margin: 0;
                    box-shadow: 0px -5px 5px $shadow;

                    li {
                        width: 90%;
                        margin: 1rem auto;
                        font-size: 1.2rem;
                    }

                    &.active {
                        display: block;
                    }
                }
            }

            @media (min-width: 768px) {
                #nav-dropdown {
                    display: none;
                }

                #nav-links {
                    display: flex;
                    position: relative;
                }
            }
        }

        ul {
            list-style: none;
            display: flex;
            align-items: center;

            li {
                margin: 0 5px;
                padding: 0;
                
                a {
                    cursor: pointer;
                    text-decoration: none;
                    color: $darkblue;
                    text-transform: lowercase;
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
                ],
                navActive: false
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
            },
            closeDropdown() {
                if (this.navActive) this.navActive = false
            }
        }
    }
</script>