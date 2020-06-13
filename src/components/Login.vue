<template>
    <div class="login-wrapper">
        <Title type="h1" title="Register" />

        <div v-if="error" class="error">{{ error }}</div>
        <form action="#" @submit.prevent="submit">
            <Input label="Email" type="email" name="email" required="required" autofocus="autofocus" v-model="form.email"/>

            <Input label="Password" type="password" name="password" required="required" v-model="form.password" />

            <button type="submit">Login</button>
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
    name: 'Login',
    components: {
        Title,
        Input
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            error: null
        }
    },
    methods: {
        submit() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(data => {
                    data.user
                    this.$router.replace({ name: "main" });
                })
                .catch(err => {
                    this.error = err.message
                })
        }
    }
}
</script>