<template>
    <div class="update-wrapper">
        <Title type="h1">Update Password</Title>

        <BigMessage v-if="success">
            Your password has been updated.
        </BigMessage>
        <BigMessage v-if="error" alert="alert">
            {{ error }}
        </BigMessage>

        <form action="#" @submit.prevent="updatePassword">
            <Input label="Enter a new password" type="password" name="password" required="required" autofocus="autofocus" v-model="password" />
            <Input label="Confirm your new password" type="password" name="password-confirm" required="required" v-model="passwordConfirm" />
            <Button type="submit">Update Password</Button>
        </form>
    </div>
</template>

<script>
import firebase from '../firebase'

import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import BigMessage from '@/components/BigMessage.vue'

export default {
    name: 'UpdatePassword',
    components: { 
        Title,
        Input,
        Button,
        BigMessage
    },
    data() {
        return {
            error: null,
            success: false,
            password: null,
            passwordConfirm: null
        }
    },
    methods: {
        updatePassword() {
            if (this.password !== this.passwordConfirm) {
                this.success = false
                this.error = "Passwords do not match"
            }
            else {
                var fbUser = firebase.auth().currentUser
                fbUser.updatePassword(this.password).then(() => {
                    this.error = null
                    this.success = true
                    this.password = null 
                    this.passwordConfirm = null
                }).catch(err => {
                    this.success = false
                    this.error = err
                })
            }
        }
    }
}
</script>