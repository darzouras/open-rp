<template>
    <div class="char-wrapper">
        <Title type="h1">{{ $route.params.char }}</Title>
        <p v-if="player">Played by <router-link :to="{ path: '/user/' + player }">{{ player }}</router-link></p>
    </div>
</template>

<script>
import { db } from '../firebase'
import Title from '@/components/Title.vue'

export default {
    name: 'Character',
    components: {
        Title
    },
    data() {
        return {
            player: null,
        }
    },
    firestore() {
        return {
            characters: db.collection('characters')
        }
    },
    methods: {
        getPlayer: function() {
            console.log(this.$route.params.char)
            this.$firestore.characters.doc(this.$route.params.char).get().then(snapshot =>{
                this.player = snapshot.data().user
                console.log(snapshot.data())
            })
        }
    },
    created() {
        this.getPlayer()
    }
}
</script>