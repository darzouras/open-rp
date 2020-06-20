<template>
    <div class="register-wrapper">
        <Title type="h1" title="Register" />

        <BigMessage v-if="success" >
            Your account has been created, go to the <router-link to='/login'>login page</router-link> and use the email and password you entered to access your dashboard.
        </BigMessage>
        <BigMessage v-if="error" alert="alert" >
            {{ error }}
        </BigMessage>
        <form action="#" @submit.prevent="submit">
            <Input label="Username" type="name" name="name" placeholder="This will be the name other people see" required="required" autofocus="autofocus" v-model="form.name" />

            <Input label="Email" type="email" name="email" placeholder="whoever@whatever.com" required="required" v-model="form.email" />

            <Input label="Password" type="password" name="password" required="required" v-model="form.password" />

            <p class="reg-message">
                This application promises to not sell any piece of your personal info.
            </p>

            <Button type="submit">Register</Button>
        </form>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import firebase from '../firebase'
import { db } from '../firebase'

import Title from '@/components/Title.vue'
import BigMessage from '@/components/BigMessage.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

export default {
    name: 'Register',
    components: {
        Title,
        BigMessage,
        Input,
        Button
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
    firestore() {
        return {
            users: db.collection('users')
        }
    }, 
    methods: {
        submit() {
            this.$firestore.users.doc(this.form.name.toLowerCase()).get().then(snapshot => {
                if (!snapshot.exists) {
                    firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.form.email, this.form.password)
                    .then(data => {
                        data.user
                        .updateProfile({
                            displayName: this.form.name.toLowerCase()
                        })
                        .then(() => {
                            this.$firestore.users
                                .doc(this.form.name.toLowerCase())
                                .set({
                                    email: this.form.email,
                                    created: new Date(),
                                    new: true
                                })
                                .then(() => { })

                            this.error = null
                            this.success = true
                        });
                    })
                    .catch(err => {
                        this.error = err.message
                    })
                } else {
                    this.error = 'Sorry, that username is already being used.'
                }
            })
        }
    }
}
</script>