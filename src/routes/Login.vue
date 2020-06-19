<template>
    <div class="login-wrapper">
        <Title type="h1" title="Login" />

        <div v-if="error" class="error">{{ error }}</div>
        <form action="#" @submit.prevent="submit" autocomplete="on">
            <Input label="Email" type="email" name="email" required="required" autofocus="autofocus" v-model="form.email"/>

            <Input label="Password" type="password" name="password" required="required" v-model="form.password" />

            <Button type="submit">Login</Button>
        </form>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import firebase from '../firebase'
import { db } from '../firebase'
import { mapMutations } from 'vuex'

import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

export default {
    name: 'Login',
    components: {
        Title,
        Input,
        Button
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
    firestore() {
        return {
            users: db.collection('users')
        }
    },
    methods: {
        submit() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(data => {
                    data.user
                    if (data.user) {
                        this.$firestore.users.doc(data.user.displayName).get().then(snapshot => {
                            if (snapshot.data().activeChar) {
                                this.$store.commit('setChar', snapshot.data().activeChar)
                            }
                        })
                        this.$router.replace({ name: "dashboard" });
                    }
                })
                .catch(err => {
                    this.error = err.message
                })
        },
        ...mapMutations([
            'setChar'
        ])
    }
}
</script>