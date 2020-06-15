<template>
    <ul>
        <li v-for="character in data" :key="character.name">
            <p>{{ character.name }} || {{ character['.key'] }}</p>
            <button @click="deleteCharacter(character)">Remove</button>
        </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '../main'
import firebase from 'firebase'

export default {
    name: 'CharacterList',
    props: {
        data: Array
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