<template>
    <div class="char-wrapper">
        <Title type="h1">{{ charID }}</Title>

        <transition name="fade">
            <BigMessage v-if="character">
                <a v-if="character.charWiki" :href="character.charWiki">{{ character.name }}</a><span v-else>{{ character.name }}</span> <span v-if="character.fandom">of <a v-if="character.fandomWiki" :href="character.fandomWiki">{{ character.fandom }}</a><span v-else>{{ character.fandom }}</span></span>
            </BigMessage>
        </transition>

        <p v-if="player">Played by <router-link :to="{ path: '/user/' + player }">{{ player }}</router-link></p>

        <transition name="fade">
            <div class="center" v-if="user.loggedIn">
                <Button v-if="user.data.displayName === player" @click="initRemove = true" alert=true>Delete Character</Button>

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
        </transition>

    </div>
</template>

<style lang="scss" scoped>
    @import '../../public/scss/global.scss';

</style>

<script>
import { mapGetters } from 'vuex'
import { db } from '../firebase'
import firebase from '../firebase'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import BigMessage from '@/components/BigMessage.vue'

export default {
    name: 'Character',
    components: {
        Title,
        Button,
        BigMessage
    },
    data() {
        return {
            charID: this.$route.params.char,
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
                this.character = snapshot.data()
            })
        },
        getPlayer: function() {
            this.$firestore.characters.doc(this.charID).get().then(snapshot =>{
                this.player = snapshot.data().user
            })
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
            this.charID = to.params.char
            this.getCharacter()
            this.getPlayer()
        }
    }
}
</script>