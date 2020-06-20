<template>
    <div class="update-wrapper">
        <Title type="h1">Update character</Title>
        {{ $route.params.char }}
        <BigMessage>You are updating <strong>{{ char }}'s</strong> info.</BigMessage>
        <p>The name field is the only required field, all filled fields will be public on the character info page.</p>

        <form action="#" @submit.prevent="updateCharData">
            <Input label="Name" type="text" name="name" v-model="charData.name" required="required" />

            <Input label="Alternative Names" type="text" name="altNames" v-model="charData.altNames" />

            <Input label="Character info URL" note="include http(s)://" type="url" name="charWiki" v-model="charData.charWiki" />

            <Input label="Character Fandom" type="text" name="fandom" v-model="charData.fandom" />

            <Input label="Fandom Info URL" note="include http(s)://" type="url" name="fandomWiki" v-model="charData.fandomWiki" />

            <Input label="Age" type="text" name="age" v-model="charData.age" />

            <Input label="Gender/Pronouns" type="text" name="gender" v-model="charData.gender" />

            <Input label="Creature type" type="text" name="creature" v-model="charData.creature" />

            <Input label="Timeline info" type="text" name="timeline" v-model="charData.timeline" />

            <Button type="submit">Submit Update</Button>
        </form>

        <p v-if="error">{{ error }}</p>
        <p v-if="success === true">Your profile has been successfully updated</p>
    </div>
</template>

<script>
import { db } from '../firebase'
import Title from '@/components/Title.vue'
import BigMessage from '@/components/BigMessage.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
export default {
    name: 'CharUpdate',
    components: {
        Title,
        BigMessage,
        Button,
        Input
    },
    data() {
        return {
            charData: {
                name: '',
                altNames: '',
                charWiki: '',
                fandom: '',
                fandomWiki: '',
                age: '',
                gender: '',
                creature: '',
                timeline: '',
            },
            error: null,
            success: false,
            char: this.$route.params.char
        }
    },
    firestore() {
        return {
            characters: db.collection('characters')
        }
    },
    methods: {
        getCharData: function() {
            this.char = this.$route.params.char
            this.$firestore.characters.doc(this.char).get().then(snapshot => {
                this.charData = snapshot.data()
            })
        },
        updateCharData: function() {
            this.$firestore.characters.doc(this.char).update({
                name: this.charData.name || '',
                altNames: this.charData.altNames || '',
                charWiki: this.charData.charWiki || '',
                fandom: this.charData.fandom || '',
                fandomWiki: this.charData.fandomWiki || '',
                age: this.charData.age || '',
                gender: this.charData.gender || '',
                creature: this.charData.creature || '',
                timeline: this.charData.timeline || ''
            }).then(() => {
                this.success = true
                this.error = null
                this.$router.replace({ path: "/char/" + this.char });
            })
            .catch(err => {
                this.error = err.message
            })
        }
    },
    created() {
        this.getCharData()
    }
}
</script>