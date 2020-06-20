<template>
    <div class="user-wrapper">
        <Title type="h1" :title="player" />

        <transition name="slide-fade">
            <section v-if="playerData">
                <TitleMed type="h2">Player Info</TitleMed>

                <PlayerInfo :data="playerData" />

                <div class="info" v-if="playerData.extra" v-html="playerData.extra"></div>
            </section>
        </transition>

        <section>
            <TitleMed type="h2">Characters</TitleMed>

            <CharacterList v-if="userChars.length > 0" :data="userChars" />
            <BigMessage v-else>This user hasn't created any characters yet</BigMessage>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    .info {
        padding: 0 0 1rem;
    }
</style>

<script>
import { db } from '../firebase'

import Title from '@/components/Title.vue'
import TitleMed from '@/components/TitleMed.vue'
import CharacterList from '@/components/CharacterList.vue'
import BigMessage from '@/components/BigMessage.vue'
import PlayerInfo from '@/components/PlayerInfo.vue'

export default {
    name: 'User',
    components: {
        Title,
        TitleMed,
        CharacterList,
        BigMessage,
        PlayerInfo
    },
    data() {
        return {
            characters: [],
            userChars: [],
            player: this.$route.params.user.toLowerCase(),
            playerData: null
        }
    },
    firestore() {
        return {
            userChars: db.collection('characters').where('user', '==', this.player),
            characters: db.collection('characters'),
            users: db.collection('users')
        }
    },
    watch: {
        $route(to) {
            this.player = to.params.user.toLowerCase()
            this.getPlayerInfo()

            this.$firestore.characters.where('user', '==', this.player).get().then(snapshot => {
                this.userChars = [];
                snapshot.docs.forEach(val => {
                    // need to do some weird json rebuilding here since this doesn't include the id or [.key] by default
                    var charData = {}
                    charData['.key'] = val.id
                    charData = Object.assign({}, charData, val.data())
                    this.userChars.push(charData)
                })
            }).catch(err =>{
                console.log(err.message)
            })
        }
    },
    methods: {
        getPlayerInfo: function() {
            this.$firestore.users.doc(this.player).get().then(snapshot => {
                this.playerData = snapshot.data()
            })
        }
    },
    created() {
        this.getPlayerInfo()
    }
}
</script>