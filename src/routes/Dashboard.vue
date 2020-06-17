<template>
    <div class="dashboard-wrapper">
        <Title type="h1" title="Dashboard" />

        <p v-if="user.loggedIn">{{user.data.displayName}} logged in</p>

        <section>
            <Title type="h2" title="Your Characters" />

            <CharacterList v-if="characters.length > 0" :data="characters" :activeChar="activeChar"/>

            <BigMessage v-else>
                There's nothing here, try making a character!
            </BigMessage>

            <div class="center">
                <RouteButton route="/new-character">Add a new character</RouteButton>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex' 
import { db } from '../firebase'

import Title from '@/components/Title.vue'
import CharacterList from '@/components/CharacterList.vue'
import BigMessage from '@/components/BigMessage.vue'
import RouteButton from '@/components/RouteButton.vue'

export default {
    name: 'Dashboard',
    components: {
        Title,
        CharacterList,
        BigMessage,
        RouteButton
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
            user: 'user',
            activeChar: 'activeChar'
        })
    }
}
</script>