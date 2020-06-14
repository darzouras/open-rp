<template>
    <div class="dashboard-wrapper">
        <Title type="h1" title="Your Dashboard" />

        <p v-if="user.loggedIn">{{user.data.displayName}} logged in!</p>

        <router-link to="/new-character">Add a new character</router-link>

        <ul>
            <li v-for="character in characters" :key="character.name">
                <p>{{ character['.key'] }}</p>
                <button @click="deleteCharacter(character)">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex' 
import { db } from '../main'
import * as firebase from 'firebase'

import Title from '@/components/Title.vue'

export default {
    name: 'Dashboard',
    components: {
        Title
    },
    data() {
        return {
            characters: [],
            newCharacter: ''
        }
    },
    firestore() {
        return {
            characters: db.collection('characters'),
            users: db.collection('users')
        }
    },
    methods: {
        deleteCharacter: function(character) {
            this.$firestore.users.doc(this.user.data.displayName).update(
                {
                    characters: firebase.firestore.FieldValue.arrayRemove(this.$firestore.characters.doc(character['.key']))
                }
            )
            this.$firestore.characters.doc(character['.key']).delete();
        }
    },
    computed: {
        ...mapGetters({
            user: 'user'
        })
    }
}
</script>