<template>
    <div class="char-wrapper">
        <Title type="h1">{{ $route.params.char }}</Title>
        <p v-if="player">Played by <router-link :to="{ path: '/user/' + player }">{{ player }}</router-link></p>

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
</template>

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
            player: null,
            initRemove: Boolean || false
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
        getPlayer: function() {
            this.$firestore.characters.doc(this.$route.params.char).get().then(snapshot =>{
                this.player = snapshot.data().user
            })
        },
        deleteCharacter: function() {
            if (this.user.loggedIn) {
                console.log(this.$route.params.char)
                this.$firestore.users.doc(this.user.data.displayName).update(
                    {
                        characters: firebase.firestore.FieldValue.arrayRemove(this.$route.params.char)
                    }
                )
                this.$firestore.characters.doc(this.$route.params.char).delete();
                this.$store.commit('setChar', null)
                this.$router.replace({ name: "dashboard" });
            }
        },
    },
    created() {
        this.getPlayer()
    }
}
</script>