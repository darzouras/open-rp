<template>
    <div class="update-wrapper">
        <Title type="h1">Update Your Profile</Title>

        <p>All fields are optional but all filled fields will appear on your user info page.</p>

        <form action="#" @submit.prevent="updateUserData">
            <Input label="Name" type="name" name="name" v-model="userData.name" />

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

        <p v-if="success === true">Your profile has been successfully updated</p>

    </div>
</template>

<script>
import { db } from '../firebase'
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
                extra: ''
            },
            error: null,
            success: false
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