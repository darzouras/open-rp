<template>
    <div class="newchar-wrapper">
        <Title type="h1" title="Create a Character" />

        <form v-on:submit.prevent="createCharacter">
            <Input label="Character Profile Name" type="text" name="character" placeholder="Identifies your character profile" v-model="character.profilename" />

            <Button>Create Character</Button>
        </form>

        <p v-if="success">
            Character has successfully been created
        </p>

        <p v-if="error">{{ error }}</p>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import { mapGetters } from 'vuex' 
import { db } from '../main'
import * as firebase from 'firebase'

import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

export default {
    name: 'NewCharacter',
    components: { 
        Title,
        Input,
        Button
    },
    data() {
        return {
            character: [],
            error: null,
            success: null
        }
    },
    firestore() {
        return {
            users: db.collection('users'),
            characters: db.collection('characters')
        }
    },
    methods: {
        createCharacter: function() {
            this.$firestore.characters
                .doc(this.character.profilename)
                .set({
                    user: this.user.data.displayName,
                    created: new Date()
                })
                .then(() => {
                    
                    this.$firestore.users
                        .doc(this.user.data.displayName)
                        .update(
                            {
                                characters: firebase.firestore.FieldValue.arrayUnion(this.$firestore.characters.doc(this.character.profilename))
                            }
                        ).then(() => {
                            this.success = true
                            this.error = null
                        })
                        .catch(err => {
                            this.error = err.message
                        })
                })
                .catch(err => {
                    this.error = err.message
                })
        }
    },
    computed: {
        ...mapGetters({
            user: 'user'
        })
    }
}
</script>