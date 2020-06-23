<template>
    <div class="update-wrapper">
        <Title type="h1">Update Your Profile</Title>

        <p>All fields are optional but all filled fields will appear on your user info page.</p>

        <form action="#" @submit.prevent="uploadIcon" class="icon-upload">
            <Input label="User Icon" note="Images that are not 100 x 100 pixels will be automatically resized" name="icon" type="file" ref="icon"  v-on:change="fileChange"/>

            <Button type="submit">Upload new icon</Button>

            <p v-if="iconError">{{ error }}</p>
            <p v-if="iconSuccess === true">Your icon has been successfully updated. Next time you're on your user page or dashboard you might need to refresh the page to see the change.</p>
        </form>

        <form action="#" @submit.prevent="updateUserData">
            <Input label="Name" type="text" name="name" v-model="userData.name" />

            <Input label="Birthday" note="required if you want to participate in 18+ chats" type="date" name="birthday" v-model="userData.birthday" />

            <Input label="Pronouns" type="text" name="name" v-model="userData.pronouns" />

            <Input label="Time zone" name="Use GMT+/-" type="text" v-model="userData.timezone" />

            <Input label="Twitter account name" note="username only" type="text" name="twitter" v-model="userData.twitter" />

            <Input label="Discord username" note="Enter format DisplayName#0000" type="text" name="discord" v-model="userData.discord" />

            <Input label="Plurk user name" note="username only" type="text" name="plurk" v-model="userData.plurk" />
            
            <Input label="Tumblr username" note="blog profile name only" type="text" name="tumblr" v-model="userData.tumblr" />

            <Input label="Livejournal username" note="lj profile name only" type="text" name="livejournal" v-model="userData.livejournal" />

            <Input label="Dreamwidth username" note="dw profile name only" type="text" name="tumblr" v-model="userData.dreamwidth" />

            <Input label="Other info" note="Basic html allowed here" type="textarea" name="extra" v-model="userData.extra" />

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
import { mapGetters } from 'vuex'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'

export default {
    name: 'UpdateProfile',
    components: {
        Title,
        Button,
        Input
    },
    data() {
        return {
            userData: {
                name: '',
                birthday: '',
                pronouns: '',
                timezone: '',
                twitter: '',
                plurk: '',
                discord: '',
                tumblr: '',
                livejournal: '',
                dreamwidth: '',
                extra: '',
                icon: ''
            },
            error: null,
            success: false,
            iconError: null,
            iconSuccess: false,
            imageFile: '',
            imageName: '',
            imageUrl: ''
        }
    },
    firestore() {
        return {
            users: db.collection('users')
        }
    },
    methods: {
        getUserData: function() {
            this.$firestore.users.doc(this.user.data.displayName).get().then(snapshot => {
                this.userData = snapshot.data()
            })
        },
        fileChange: function(event) {
            const files = event.target.files;
            if (files[0] !== undefined) {
                this.imageName = this.user.data.displayName;

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
                    this.$firestore.users.doc(this.user.data.displayName).update({
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
        updateUserData: function() {
            this.$firestore.users.doc(this.user.data.displayName).update({
                name: this.userData.name || '',
                birthday: this.userData.birthday || '',
                pronouns: this.userData.pronouns || '',
                timezone: this.userData.timezone || '',
                twitter: this.userData.twitter || '',
                plurk: this.userData.plurk || '',
                discord: this.userData.discord || '',
                tumblr: this.userData.tumblr || '',
                livejournal: this.userData.livejournal || '',
                dreamwidth: this.userData.dreamwidth || '',
                extra: this.$sanitize(this.userData.extra) || ''
            }).then(() => {
                this.success = true
                this.$router.replace({ name: 'dashboard' })
            }).catch(err => {
                this.error = err.message
            })
        }
    },
    computed: {
        ...mapGetters({
            user: 'user'
        })
    },
    created() {
        this.getUserData()
    }
}
</script>