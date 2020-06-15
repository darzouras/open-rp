<template>
    <div class="dashboard-wrapper">
        <Title type="h1" title="Your Dashboard" />

        <p v-if="user.loggedIn">{{user.data.displayName}} logged in!</p>

        <Title type="h2" title="Your Characters" />

        <router-link to="/new-character">Add a new character</router-link>

        <CharacterList :data="characters" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex' 
import { db } from '../main'

import Title from '@/components/Title.vue'
import CharacterList from '@/components/CharacterList.vue'

export default {
    name: 'Dashboard',
    components: {
        Title,
        CharacterList
    },
    data() {
        return {
            characters: [],
            newCharacter: ''
        }
    },
    firestore() {
        return{
            characters: db.collection('characters').where('user', '==', this.user.data.displayName)
        }
    },
    computed: {
        ...mapGetters({
            user: 'user'
        })
    }
}
</script>