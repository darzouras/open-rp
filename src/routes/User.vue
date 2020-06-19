<template>
    <div class="user-wrapper">
        <Title type="h1" :title="$route.params.user" />

        <section>
            <TitleMed type="h2">Characters</TitleMed>

            <CharacterList v-if="characters.length > 0" :data="characters" />
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
            characters: []
        }
    },
    firestore() {
        return {
            characters: db.collection('characters').where('user', '==', this.$route.params.user)
        }
    }
}
</script>