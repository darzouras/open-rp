<template>
    <div class="update-wrapper">
        <Title type="h1">Update character</Title>
        {{ $route.params.char }}
        <BigMessage>You are updating <strong>{{ char }}'s</strong> info.</BigMessage>
        <p>The name field is the only required field, all filled fields will be public on the character info page.</p>

        <form action="#" @submit.prevent="uploadIcon" class="icon-upload">
            <Input label="User Icon" note="Images that are not 100 x 100 pixels will be automatically resized" name="icon" type="file" ref="icon"  v-on:change="fileChange"/>

            <Button type="submit">Upload new icon</Button>

            <p v-if="iconError">{{ error }}</p>
            <p v-if="iconSuccess === true">Your icon has been successfully updated. Next time you're on your user page or dashboard you might need to refresh the page to see the change.</p>
        </form>

        <form action="#" @submit.prevent="updateCharData">
            <Input label="Name" type="text" name="name" v-model="charData.name" required="required" />

            <Input label="Alternative Names" type="text" name="altNames" v-model="charData.altNames" />

            <Input label="Character info URL" note="include http(s)://" type="url" name="charWiki" v-model="charData.charWiki" />

            <Input label="Character Fandom" type="text" name="fandom" v-model="charData.fandom" />

            <Input label="Fandom Info URL" note="include http(s)://" type="url" name="fandomWiki" v-model="charData.fandomWiki" />

            <Input label="Birthday" type="text" name="bday" v-model="charData.bday" />

            <Input label="Age" type="text" name="age" v-model="charData.age" />

            <Input label="Gender/Pronouns" type="text" name="gender" v-model="charData.gender" />

            <Input label="Creature type" type="text" name="creature" v-model="charData.creature" />

            <Input label="Timeline info" type="text" name="timeline" v-model="charData.timeline" />

            <Input label="Intro" type="textarea" note="Basic html allowed here" name="intro" v-model="charData.intro" />

            <Input label="Background Info" note="Basic html allowed here" type="textarea" name="background" v-model="charData.background" />

            <Input label="Personality info" note="Basic html allowed here" type="textarea" name="personality" v-model="charData.personality" />

            <Button type="submit">Submit Update</Button>
        </form>

        <p v-if="error">{{ error }}</p>
        <p v-if="success === true">Your profile has been successfully updated</p>
    </div>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    .icon-upload {
        margin-bottom: 2rem;
        padding: 1rem;
        width: calc(100% - 2rem);
        background: $gray;
        border-radius: 15px;
    }
</style>

<script>
import { db } from '../firebase'
import firebase from '../firebase'
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
                bday: '',
                age: '',
                gender: '',
                creature: '',
                timeline: '',
                intro: '',
                background: '',
                personality: '',
            },
            error: null,
            success: false,
            char: this.$route.params.char,
            iconError: null,
            iconSuccess: false,
            imageFile: '',
            imageName: '',
            imageUrl: ''
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
        fileChange: function(event) {
            const files = event.target.files;
            if (files[0] !== undefined) {
                this.imageName = 'char_' + this.char;

                const fr = new FileReader();
                fr.readAsDataURL(files[0])
                fr.addEventListener('load', () => {
                    this.imageUrl = fr.result;
                    this.imageFile = files[0]
                })
            } else {
                this.imageName = '';
                this.imageFile = '';
                this.imageUrl = '';
            }
        },
        uploadIcon: function() {
            var storageRef = firebase.storage().ref();
            var mountainsRef = storageRef.child(`images/${this.imageName}`);
            mountainsRef.put(this.imageFile).then(snapshot => {
                if (snapshot.state === 'success') {
                    console.log('upload successful')
                    const bucketName = "open-rp.appspot.com"
                    const filePath = this.imageName;
                    this.$firestore.characters.doc(this.char).update({
                        icon: `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/images` + `%2F` + `${encodeURIComponent(filePath)}_100x100?alt=media`
                    }).then(() => {
                        this.iconSuccess = true
                        this.iconError = null
                    }).catch(err => {
                        console.log('error updating db')
                        this.iconError = err.message
                    })
                } else {
                    this.iconError = "There was an error when uploading your icon, try refreshing the page and trying again."
                }
            })
        },
        updateCharData: function() {

            this.$firestore.characters.doc(this.char).update({
                name: this.charData.name || '',
                altNames: this.charData.altNames || '',
                charWiki: this.charData.charWiki || '',
                fandom: this.charData.fandom || '',
                fandomWiki: this.charData.fandomWiki || '',
                bday: this.charData.bday || '',
                age: this.charData.age || '',
                gender: this.charData.gender || '',
                creature: this.charData.creature || '',
                timeline: this.charData.timeline || '',
                intro: this.checkSanitized(this.charData.intro),
                background: this.checkSanitized(this.charData.background),
                personality: this.checkSanitized(this.charData.personality)
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