<template>
    <div class="char-wrapper">
        <Title type="h1">{{ charID }}</Title>

        <transition name="fade-slide">
            <div v-if="character">
                <div class="top-flex">
                    <div>
                        <BigMessage>
                            <a v-if="character.charWiki" :href="character.charWiki">{{ character.name }}</a><span v-else>{{ character.name }}</span> <span v-if="character.fandom">of <a v-if="character.fandomWiki" :href="character.fandomWiki">{{ character.fandom }}</a><span v-else>{{ character.fandom }}</span></span>
                        </BigMessage>

                        <p v-if="player" class="playedby">Played by <router-link :to="{ path: '/user/' + player }">{{ player }}</router-link></p>
                    </div>

                    <div class="icon-wrapper" v-if="character">
                        <img :src="character.icon" :key="character.icon" />
                    </div>
                </div>

                <transition name="fade-slide">
                    <div class="center" v-if="user.loggedIn">
                        <div class="button-row" v-if="user.data.displayName === player">
                            <Button
                                v-if="activeChar !== charID"
                                @click="setActive(charID)">Set Active</Button>
                            <Button v-else-if="activeChar === charID"
                                inactive=true
                                tab-index='-1'>Currently Active</Button>

                            <RouteButton
                                :route="'/update-character/' + charID">Update Character Info</RouteButton>

                            <Button @click="initRemove = true" alert=true class="button-delete">Delete Character</Button>

                            <transition name="slide-fade">
                                <div v-if="initRemove === true">
                                    <BigMessage alert="true">
                                        Deleting this character cannot be reversed. All history and data will be lost.<br />Do you want to proceed?
                                    </BigMessage>

                                    <Button alert="true" @click="deleteCharacter()">
                                        Confirm Delete
                                    </Button>
                                </div>
                            </transition>
                        </div>
                    </div>
                </transition>

                <BoxShadow>
                    <nav class="char-nav roboto" aria-label="Character links">
                        <ul>
                            <li>
                                <router-link :to="{ path: '/char/' + charID + '/open' }">Open RP</router-link>
                            </li>
                        </ul>
                    </nav>
                </BoxShadow>

                <div class="info top-info" v-if="character.intro">
                    <pre v-html="character.intro"></pre>
                </div>

                <CharInfo :data="character" :key="character.name" />

                <div class="info readable" v-if="character.background">
                    <TitleMed type="h2">Background info</TitleMed>
                    <pre v-html="character.background"></pre>
                </div>

                <div class="info readable" v-if="character.personality">
                    <TitleMed type="h2">Personality info</TitleMed>
                    <pre v-html="character.personality"></pre>
                </div>
            </div>
        </transition>

    </div>
</template>

<style lang="scss" scoped>
    @import '../../public/scss/global.scss';
    .top-flex {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .icon-wrapper {
            width: 100px;
        }

        div:first-child {
            width: calc(100% - 100px - 1rem);

            .playedby {
                margin-bottom: 0;
            }
        }
    }

    .button-row {
        .button-delete {
            margin-top: 1.5rem;
        }

        a, button {
            margin-right: .25rem;
            margin-left: .25rem;
        }
    }

    .top-info {
        padding: 2rem 0 1rem;
    }

    .char-nav {

        ul {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            justify-content: center;
            margin: 0;
            padding: 0;
            text-transform: lowercase;

            li {
                margin: 0 .25em;
                padding: 0;

                a {
                    color: $darkblue;
                }
            }
        }
    }
</style>

<script>
import { mapGetters } from 'vuex'
import { db } from '../firebase'
import firebase from '../firebase'
import Title from '@/components/Title.vue'
import TitleMed from '@/components/TitleMed.vue'
import Button from '@/components/Button.vue'
import RouteButton from '@/components/RouteButton.vue'
import BigMessage from '@/components/BigMessage.vue'
import CharInfo from '@/components/CharInfo.vue'
import BoxShadow from '@/components/BoxShadow.vue'

export default {
    name: 'Character',
    components: {
        Title,
        TitleMed,
        Button,
        RouteButton,
        BigMessage,
        CharInfo,
        BoxShadow
    },
    data() {
        return {
            charID: this.$route.params.char.toLowerCase(),
            player: null,
            initRemove: Boolean || false,
            character: null
        }
    },
    firestore() {
        return {
            characters: db.collection('characters'),
            users: db.collection('users')
        }
    },
    computed: {
        ...mapGetters({
            user: 'user',
            activeChar: 'activeChar'
        })
    },
    methods: {
        getCharacter: function() {
            this.$firestore.characters.doc(this.charID).get().then(snapshot => {
                if (snapshot.exists)
                    this.character = snapshot.data()
                else this.$router.replace('/404')
            })
        },
        getPlayer: function() {
            this.$firestore.characters.doc(this.charID).get().then(snapshot =>{
                this.player = snapshot.data().user
            })
        },
        setActive: function(character) {
            if (this.user.loggedIn) {
                this.$firestore.users
                    .doc(this.user.data.displayName)
                    .update(
                        {
                            'activeChar': character
                        }
                    ).then(() => {
                        this.$store.commit('setChar', character)
                    }).catch(err => {
                        console.log(err.message)
                    })
            }
        },
        deleteCharacter: function() {
            if (this.user.loggedIn) {
                this.$firestore.users.doc(this.user.data.displayName).update(
                    {
                        characters: firebase.firestore.FieldValue.arrayRemove(this.charID)
                    }
                )
                this.$firestore.characters.doc(this.charID).delete();
                this.$store.commit('setChar', null)
                this.$router.replace({ name: "dashboard" });
            }
        },
    },
    created() {
        this.getCharacter()
        this.getPlayer()
    },
    watch: {
        $route(to) {
            this.charID = to.params.char.toLowerCase()
            this.getCharacter()
            this.getPlayer()
        }
    }
}
</script>