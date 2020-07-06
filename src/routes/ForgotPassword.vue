<template>
    <div class="forgot-wrapper">
        <Title type="h1">Recover Password</Title>

        <form action="#" @submit.prevent="sendRecovery">
            <Input label="Your email address" type="email" name="email" required="required" autofocus="autofocus" v-model="email" />
            <Button type="submit">Send recovery email</Button>
        </form>

        <BigMessage v-if="success">
            Check your email for a link to reset your password.
        </BigMessage>
        <BigMessage v-if="error" alert="alert">
            {{ error }}
        </BigMessage>
    </div>
</template>

<script>
import firebase from '../firebase'

import Title from '@/components/Title.vue'
import BigMessage from '@/components/BigMessage.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

export default {
    name: 'ForgotPassword',
    components: {
        Title,
        BigMessage,
        Input,
        Button
    },
    data() {
        return {
            error: null,
            success: false,
            email: null
        }
    },
    methods: {
        sendRecovery: function() {
            var auth = firebase.auth()
            auth.sendPasswordResetEmail(this.email).then(() => {
                this.error = null
                this.success = true 
            }).catch(err => {
                this.success = false
                this.error = err
            })
        }
    }
}
</script>