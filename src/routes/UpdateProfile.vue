<template>
    <div class="update-wrapper">
        <Title type="h1">Update Your Profile</Title>

        <form action="#" @submit.prevent="updateUserData">
            <Input label="Name" type="name" name="name" v-model="userData.name" />

            <Input label="Twitter account name" type="text" name="twitter" v-model="userData.twitter" />

            <Input label="Discord username" type="text" name="discord" v-model="userData.discord" />

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
                twitter: '',
                discord: '',
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
                name: this.userData.name,
                twitter: this.userData.twitter,
                discord: this.userData.discord
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