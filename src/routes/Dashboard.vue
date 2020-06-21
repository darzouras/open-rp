<template>
    <div class="dashboard-wrapper">
        <div class="top-flex">
            <div>
                <Title type="h1" title="Dashboard" />

                <BigMessage v-if="user.loggedIn">You are currently logged in as {{user.data.displayName}}</BigMessage>
            </div>
            <div v-if="playerData" class="icon-wrapper">
                <img :src="playerData.icon" />
            </div>
        </div>

        <transition name="slide-fade">
            <section v-if="playerData">
                <TitleMed type="h2">Your Info</TitleMed>
                
                <PlayerInfo :data="playerData" />

                <div class="info" v-if="playerData.extra" v-html="playerData.extra"></div>

                <div class="center">
                    <RouteButton route="/update-profile" full=true>Update Your Profile</RouteButton>
                </div>
            </section>
        </transition>

        <section>
            <TitleMed type="h2">Your Characters</TitleMed>

            <CharacterList v-if="characters.length > 0" :data="characters" :activeChar="activeChar" :selectActive=true />

            <BigMessage v-else>
                There's nothing here, try making a character!
            </BigMessage>

            <div class="center">
                <RouteButton route="/new-character" full=true>Add a new character</RouteButton>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    .top-flex {
        display: flex;
        justify-content: space-between;

        .icon-wrapper {
            margin: 1rem 0;
        }
    }
    .info {
        padding: 0 0 2rem;
    }
</style>

<script>
import { mapGetters } from 'vuex' 
import { db } from '../firebase'

import Title from '@/components/Title.vue'
import TitleMed from '@/components/TitleMed.vue'
import CharacterList from '@/components/CharacterList.vue'
import BigMessage from '@/components/BigMessage.vue'
import RouteButton from '@/components/RouteButton.vue'
import PlayerInfo from '@/components/PlayerInfo.vue'

export default {
    name: 'Dashboard',
    components: {
        Title,
        TitleMed,
        CharacterList,
        BigMessage,
        RouteButton,
        PlayerInfo
    },
    data() {
        return {
            characters: [],
            newCharacter: '',
            playerData: null
        }
    },
    firestore() {
        return{
            characters: db.collection('characters').where('user', '==', this.user.data.displayName),
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
        getPlayerInfo: function() {
            this.$firestore.users.doc(this.user.data.displayName).get().then(snapshot => {
                this.playerData = snapshot.data()
            })
        }
    },
    created() {
        this.getPlayerInfo()
    }
}
</script>