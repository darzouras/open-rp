<template>
    <div class="update-wrapper">
        <Title type="h1">Update Email</Title>

        <p v-if="currentEmail">Your email is currently set to {{ currentEmail }}</p>

        <BigMessage v-if="success">
            Your email address has been updated.
        </BigMessage>
        <BigMessage v-if="error" alert="alert">
            {{ error }}
        </BigMessage>

        <form action="#" @submit.prevent="updateEmail">
            <Input label="Enter your updated email" type="email" name="email" required="required" autofocus="autofocus" v-model="email" />
            <Input label="Enter your email again to confirm" type="email" name="email-confirm" required="required" v-model="emailConfirm" />
            <Button type="submit">Update Email</Button>
        </form>
    </div>
</template>

<script>
import firebase from '../firebase'
import { db } from '../firebase'
import { mapGetters } from 'vuex'

import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import BigMessage from '@/components/BigMessage.vue'

export default {
    name: 'UpdateEmail',
    components: {
        Title,
        Input,
        Button,
        BigMessage
    },
    data() {
        return {
            error: null,
            currentEmail: null,
            email: null,
            emailConfirm: null,
            success: false
        }
    },
    firestore() {
        return {
            users: db.collection('users')
        }
    },
    computed: {
        ...mapGetters({
            user: 'user'
        })
    },
    methods: {
        getCurrentEmail() {
            this.currentEmail = this.user.data.email
        },
        updateEmail() {
            // confirm that the emails match
            if (this.email.toLowerCase() !== this.emailConfirm.toLowerCase()) {
                this.error = "Email addresses do not match."
            }
            else if (this.email.toLowerCase() == this.currentEmail) {
                this.error = "This email matches your current email."
            }
            else {
                // update user info
                var fbUser = firebase.auth().currentUser
                fbUser.updateEmail(this.email.toLowerCase()).then(() => {
                    // update database info
                    this.$firestore.users.doc(this.user.data.displayName).update({
                        email: this.email
                    }).then(() => {
                        this.error = null
                        this.success = true
                        this.currentEmail = this.email
                        this.email = null
                        this.emailConfirm = null
                    }).catch(err => {
                        this.error = err
                    })
                }).catch(err => {
                    this.error = err;
                })
            }
        }
    },
    created() {
        this.getCurrentEmail()
    }
}
</script>