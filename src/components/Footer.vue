<template>
    <footer>
        <div class="footer-col">
            <Logo reverse="reverse" />
        </div>

        <div class="footer-col">
            <nav aria-label="footer" class="footer-nav">
                <ul>
                    <li>
                        <router-link to="/">Home</router-link>
                    </li>
                    <li>
                        <a href="https://forms.gle/i17wyD3WCiAghkhz6">Survey</a>
                    </li>
                    <li>
                        <router-link to="/components">Components</router-link>
                    </li>
                    <li>
                        <router-link to="/roadmap">Roadmap</router-link>
                    </li>
                    <li>
                        <a href="https://github.com/darzouras/open-rp">Github</a>
                    </li>
                </ul>
            </nav>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    footer {
        margin: 5rem 0 0;
        padding: 3rem 5% 7rem;
        width: 90%;
        background: $green;
        color: white;

        .footer-nav {
            margin: 1.5rem 0;
            ul {
                list-style: none;
                padding: 0;
                margin: 0;

                li {
                    padding: 0;
                    margin: 0 0 .25rem;
                    
                    a {
                        text-decoration: none;
                        font-weight: 250;
                    }
                }
            }
        }

        a {
            color: white;
        }
    }

    @media (min-width: 768px) {
        footer {
            display: flex;
            justify-content: space-between;

            .footer-col:nth-child(2) {
                text-align: right;

                .footer-nav {
                    margin: 0;
                }
            }
        }
    }
</style>

<script>
import Logo from './Logo.vue'

export default {
    name: 'Footer',
    components: {
        Logo
    }
}
</script>