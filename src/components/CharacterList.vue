<template>
    <ul class="roboto">
        <li v-for="character in orderBy(data, 'name')" :key="character.name" v-bind:class="{ active : activeChar == character['.key'] }">
            <SmallTitle type="h3">{{ character.name }}</SmallTitle>
            <p>@{{ character['.key'] }}</p>
            <p v-if="character.fandom">
                {{character.fandom}}
            </p>
            <button @click="deleteCharacter(character)">Remove</button>

            <button
                v-if="character.user == user.data.displayName && activeChar !== character['.key']"
                @click="setActive(character['.key'])">Set Active</button>
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

            &.active {
               border-color: $darkblue;
               box-shadow: 4px 4px $darkblue;
            }
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
import { mapGetters, mapMutations } from 'vuex'
import { db } from '../firebase'
import firebase from '../firebase'
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
            this.$store.commit('setChar', null)
        },
        setActive: function(character) {
            this.$firestore.users
                .doc(this.user.data.displayName)
                .update(
                    {
                        'activeChar': character
                    }
                ).then(() => {
                    this.$store.commit('setChar', character)
                }).catch(err => {
                    console.log(err.message)
                })
        },
        ...mapMutations([
            'setChar'
        ])
    },
    computed: {
        ...mapGetters({
            user: 'user',
            activeChar: 'activeChar'
        })
    },
    mixins: [Vue2Filters.mixin]
}
</script>