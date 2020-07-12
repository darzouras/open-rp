<template>
    <div class="dashboard-wrapper">
        <Title type="h1" title="Dashboard" />

        <transition name="slide-fade">
            <section v-if="playerData">
                <div class="center">
                    <div class="button-row">
                        <RouteButton route="/update-email">Update email address</RouteButton>
                        <RouteButton route="/update-password">Update password</RouteButton>
                        <RouteButton route="/update-profile">Update Your Profile</RouteButton>
                    </div>
                </div>

                <div class="top-flex">
                    <div class="loggedin-as">
                        <BigMessage v-if="user.loggedIn">You are currently logged in as {{user.data.displayName}}</BigMessage>

                        <p><router-link :to="{ path: '/user/' + user.data.displayName }">See your public profile</router-link></p>

                        <TitleMed type="h2">Your Info</TitleMed>
                    </div>
                    <div v-if="playerData" class="icon-wrapper">
                        <img :src="playerData.icon" :key="playerData.icon" />
                    </div>
                </div>
                
                <PlayerInfo :data="playerData" />

                <pre class="info" v-if="playerData.extra" v-html="playerData.extra"></pre>
            </section>
        </transition>

        <section>
            <TitleMed type="h2">Your Characters</TitleMed>

            <CharacterList v-if="characters.length > 0" :data="characters" :activeChar="activeChar" :selectActive=true />

            <BigMessage v-else>
                There's nothing here, try making a character!
            </BigMessage>

            <div class="center">
                <RouteButton route="/new-character" full=true v-if="characters.length < 4">Add a new character</RouteButton>
                <p v-else>At this moment players are limited to four characters each. You will have to delete an old character if you would like to make a new one.</p>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    .button-row {
        padding-top: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;

        a {
            margin: .25rem;
            display: block;
        }

        @media (min-width: 768px) {
            flex-direction: row;
        }
    }

    .top-flex {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .loggedin-as {
            width: calc(100% - 110px);

            h2{
                margin-bottom: 0;
            }
        }

        .icon-wrapper {
            width: 100px;
            img {
                width: 100px;
            }
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