<template>
    <div class="dashboard-wrapper">
        <Title type="h1" title="Your Dashboard" />

        <p v-if="user.loggedIn">{{user.data.displayName}} logged in!</p>

        <form>
            <Input label="Add character" type="text" name="character" v-model="newCharacter" />

            <button @click="addCharacter">Add Character</button>
        </form>

        <ul>
            <li v-for="character in characters" :key="character.name">
                {{ character.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex' 
import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import { db } from '../main'

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
        }
    },
    computed: {
        ...mapGetters({
            user: 'user'
        })
    }
}
</script>