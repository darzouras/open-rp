<template>
    <div class="dashboard-wrapper">
        <Title type="h1" title="Your Dashboard" />

        <p v-if="user.loggedIn">{{user.data.displayName}} logged in!</p>

        <Input label="Add character" type="text" name="character" v-model="newCharacter" />

        <button @click="addCharacter">Add Character</button>

        <ul>
            <li v-for="character in characters" :key="character.name">
                <p>{{ character.name }}</p>
                <button @click="deleteCharacter(character)">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex' 
import { db } from '../main'

import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'

export default {
    name: 'Dashboard',
    components: {
        Title,
        Input
    },
    data() {
        return {
            characters: [],
            newCharacter: ''
        }
    },
    firestore() {
        return {
            characters: db.collection('characters')
        }
    },
    methods: {
        addCharacter: function() {
            this.$firestore.characters.add(
                {
                    name: this.newCharacter,
                    timestamp: new Date()
                }
            );
            this.newCharacter = ''
        },
        deleteCharacter: function(character) {
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