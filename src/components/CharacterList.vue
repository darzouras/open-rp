<template>
    <ul class="roboto">
        <li v-for="character in orderBy(data, 'name')" :key="character.name" v-bind:class="{ active : activeChar == character['.key'] }">
            <SmallTitle type="h3">{{ character.name }}</SmallTitle>
            <p><router-link :to="{ path: '/char/' + character['.key']}">@{{ character['.key'] }}</router-link></p>
            <p v-if="character.fandom">
                {{character.fandom}}
            </p>

            <Button
                v-if="selectActive && activeChar !== character['.key']"
                @click="setActive(character['.key'])"
                full=true>Set Active</Button>
            <Button v-else-if="selectActive && activeChar === character['.key']"
                full=true
                inactive=true
                tab-index='-1'>Currently Active</Button>
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
            border: 2px solid $darkblue;
            box-shadow: 4px 4px $darkblue;
            border-radius: 15px;
            padding: 1rem;
            width: calc(100% - 2rem - 4px);
            margin: 1rem 0;

            &.active button {
               background: $yellow;

               &:hover {
                   background: $yellow;
               }
            }

            a {
                color: $darkblue;
            }

            bottom: {
                margin: auto;
            };
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
import Button from '@/components/Button.vue'

export default {
    name: 'CharacterList',
    components: {
        SmallTitle,
        Button
    },
    props: {
        data: Array,
        selectActive: Boolean || false
    },
    firestore() {
        return {
            characters: db.collection('characters'),
            users: db.collection('users')
        }
    },
    methods: {
        deleteCharacter: function(character) {
            if (this.user.loggedIn) {
                this.$firestore.users.doc(this.user.data.displayName).update(
                    {
                        characters: firebase.firestore.FieldValue.arrayRemove(this.$firestore.characters.doc(character['.key']))
                    }
                )
                this.$firestore.characters.doc(character['.key']).delete();
                this.$store.commit('setChar', null)
            }
        },
        setActive: function(character) {
            if (this.user.loggedIn) {
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
            }
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