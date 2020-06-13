<template>
    <div class="register-wrapper">
        <Title type="h1" title="Register" />

        <div v-if="success" role="alert">
            Your account has been created, go to the <router-link to='/login'>login page</router-link> and use the email and password you entered to access your dashboard.
        </div>
        <div v-if="error" class="error" role="alert">{{ error }}</div>
        <form action="#" @submit.prevent="submit">
            <Input label="Display name" type="name" name="name" placeholder="This will be the name other people see" required="required" autofocus="autofocus" v-model="form.name" />

            <Input label="Email" type="email" name="email" placeholder="whoever@whatever.com" required="required" v-model="form.email" />

            <Input label="Password" type="password" name="password" required="required" v-model="form.password" />

            <p class="reg-message">
                This application promises to not sell any piece of your personal info.
            </p>

            <button type="submit">Register</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import firebase from 'firebase'

import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'

export default {
    name: 'Register',
    components: {
        Title,
        Input
    },
    data() {
        return {
            error: null,
            success: null,
            form: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        submit() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.form.email, this.form.password)
                .then(data => {
                    data.user
                    .updateProfile({
                        displayName: this.form.name
                    })
                    .then(() => {
                        this.success = true
                    });
                })
                .catch(err => {
                    this.error = err.message
                })
        }
    }
}
</script>