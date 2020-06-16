<template>
    <ul>
        <li v-for="character in orderBy(data, 'name')" :key="character.name">
            <SmallTitle type="h3">{{ character.name }}</SmallTitle>
            <p>@{{ character['.key'] }}</p>
            <p v-if="character.fandom">
                {{character.fandom}}
            </p>
            <button @click="deleteCharacter(character)">Remove</button>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";
    ul {
        list-style: none;
        padding: 0;
        margin: 0 0 2rem;

        li {
            border: 2px solid $green;
            box-shadow: 4px 4px $green;
            border-radius: 15px;
            padding: 1rem;
            width: calc(100% - 2rem - 4pxe);
            margin: 1rem 0;
        }
    }

    @media (min-width: $breakpoint-tablet) {
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            li {
                width: calc((100% / 3) - 3rem - 4px);
                margin: .5rem;
            }
        }
    }
</style>

<script>
import { mapGetters } from 'vuex'
import { db } from '../main'
import firebase from 'firebase'
import Vue2Filters from 'vue2-filters'
import SmallTitle from '@/components/SmallTitle.vue'

export default {
    name: 'CharacterList',
    components: {
        SmallTitle
    },
    props: {
        data: Array
    },
    firestore() {
        return {
            characters: db.collection('characters'),
            users: db.collection('users')
        }
    },
    methods: {
        deleteCharacter: function(character) {
            this.$firestore.users.doc(this.user.data.displayName).update(
                {
                    characters: firebase.firestore.FieldValue.arrayRemove(this.$firestore.characters.doc(character['.key']))
                }
            )
            this.$firestore.characters.doc(character['.key']).delete();
        }
    },
    computed: {
        ...mapGetters({
            user: 'user'
        })
    },
    mixins: [Vue2Filters.mixin]
}
</script>