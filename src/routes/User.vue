<template>
    <div class="user-wrapper">
        <Title type="h1" :title="player" />

        <transition name="slide-fade">
            <section v-if="playerData">
                <div class="top-flex">
                    <TitleMed type="h2">Player Info</TitleMed>

                    <div class="icon-wrapper" v-if="playerData">
                        <img :src="playerData.icon" :key="playerData.icon" />
                    </div>
                </div>

                <PlayerInfo :data="playerData" />

                <pre class="info" v-if="playerData.extra" v-html="playerData.extra"></pre>
            </section>
        </transition>

        <section v-if="playerData">
            <TitleMed type="h2">Characters</TitleMed>

            <CharacterList v-if="userChars.length > 0" :data="userChars" />
            <BigMessage v-else>This user hasn't created any characters yet</BigMessage>
        </section>

        <Friends v-if="playerData && (playerData.friends || playerData.friended)" :friends="playerData.friends" :friended="playerData.friended" />
    </div>
</template>

<style lang="scss" scoped>
    .top-flex {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .icon-wrapper {
            width: 100px;
        }

        h2 {
            margin: 0;
        }
    }

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
import Friends from '@/components/Friends.vue'

export default {
    name: 'User',
    components: {
        Title,
        TitleMed,
        CharacterList,
        BigMessage,
        PlayerInfo,
        Friends
    },
    data() {
        return {
            characters: [],
            userChars: [],
            friends: [],
            player: this.$route.params.user.toLowerCase(),
            playerData: null,
        }
    },
    firestore() {
        return {
            userChars: db.collection('characters').where('user', '==', this.player),
            characters: db.collection('characters'),
            users: db.collection('users'),
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
                if (snapshot.exists)
                    this.playerData = snapshot.data()
                else this.$router.replace('/404')
            })
        }
    },
    created() {
        this.getPlayerInfo()
    }
}
</script>