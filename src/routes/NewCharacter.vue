<template>
    <div class="newchar-wrapper">
        <Title type="h1" title="Create a Character" />

        <form v-on:submit.prevent="createCharacter">
            <Input label="Character Profile Name *" type="text" name="profilename" placeholder="Identifies your character profile" required="required" v-model="character.profilename" />

            <Input label="Character Name *" type="text" name="character" placeholder="The name of your character" required="required" v-model="character.name" />

            <Input label="Character Info URL" type="text" name="charWiki" placeholder="Link to a wiki or other source with character info" v-model="character.charWiki" />

            <Input label="Character Fandom" type="text" name="fandom" v-model="character.fandom" />

            <Input label="Fandom Info URL" type="text" name="fandomWiki" placeholder="Link to a wiki or other source with fandom info" v-model="character.fandomWiki" />

            <Button>Create Character</Button>
        </form>

        <p v-if="success">
            Character has successfully been created, redirecting to dashboard
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
                    user: this.$firestore.users.doc(this.user.data.displayName),
                    created: new Date(),
                    name: this.character.name,
                    charWiki: this.character.charWiki || '',
                    fandom: this.character.fandom || '',
                    fandomWiki: this.character.fandomWiki || ''
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

                            this.$router.replace({ name: "dashboard" });
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