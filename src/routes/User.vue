<template>
    <div class="user-wrapper">
        <Title type="h1" :title="player" />

        <section>
            <TitleMed type="h2">Characters</TitleMed>

            <CharacterList v-if="userChars.length > 0" :data="userChars" />
        </section>
    </div>
</template>

<script>
import { db } from '../firebase'

import Title from '@/components/Title.vue'
import TitleMed from '@/components/TitleMed.vue'
import CharacterList from '@/components/CharacterList.vue'

export default {
    name: 'User',
    components: {
        Title,
        TitleMed,
        CharacterList
    },
    data() {
        return {
            characters: [],
            userChars: [],
            player: this.$route.params.user
        }
    },
    firestore() {
        return {
            userChars: db.collection('characters').where('user', '==', this.player),
            characters: db.collection('characters')
        }
    },
    watch: {
        $route(to) {
            this.player = to.params.user

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
    }
}
</script>