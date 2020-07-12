<template>
    <div class="thread-wrapper">
        <pre v-if="charID !== null" v-html="originalBody" class="original-post readable">
        </pre>

        <transition name="slide-fade">
            <section class="comments" v-if="threadComments">
                <TitleMed type="h2">Thread started by <router-link :to="'/char/' + threadComments[0].char">{{ threadComments[0].char }}</router-link></TitleMed>
                <ul>
                    <li v-for="(comment, index) in threadComments" :key="comment.timestamp">
                        <SingleComment :comment="comment" :playtester="charID" :index="index" />
                    </li>
                </ul>
            </section>
        </transition>

        <form v-if="user.loggedIn" class="add-comment" v-on:submit.prevent="addToThread">
            <Input :label="'Respond to thread as ' + activeChar" note="basic HTML allowed" type="textarea" v-model="newComment" />

            <Button class="button-ooc" type="button" v-on:click="showOOC = !showOOC">Add OOC notes</Button>
            
            <transition name="slide-fade">
                <Input v-if="showOOC === true" label="OOC notes (optional):" note="Optional, basic HTML allowed" type="textarea" v-model="oocMessage" />
            </transition>

            <div class="add-comment-preview" v-if="newComment">
                <SmallTitle type="p">Preview:</SmallTitle>

                <pre v-html="newComment"></pre>

                <SmallMessage v-if="oocMessage"><strong>OOC:</strong><pre v-html="oocMessage"></pre></SmallMessage>
            </div>

            <Button v-bind:class="{ inactive : newComment === null || newComment === ''}" full="full">Add comment</Button>
        </form>

        <router-link :to="'/char/' + charID + '/open'" >Back to post</router-link>
    </div>
</template>

<style lang="scss" scoped>
    .original-post {
        margin-top: 2rem;
    }

    .comments {
        margin-bottom: 2rem;

        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
    }

    .add-comment {
        margin-bottom: 2rem;

        .button-ooc {
            margin-bottom: 1rem;
            font-size: 1rem;
        }

        .add-comment-preview {
            margin-bottom: 1rem;
        }
    }
</style>

<script>
import { db } from '../firebase'
import firebase from '../firebase'
import { mapGetters } from 'vuex'

import SingleComment from '@/components/SingleComment.vue'
import TitleMed from '@/components/TitleMed.vue'
import SmallTitle from '@/components/SmallTitle.vue'
import SmallMessage from '@/components/SmallMessage.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

export default {
    name: 'Thread',
    components: {
        SingleComment,
        TitleMed,
        SmallTitle,
        SmallMessage,
        Input,
        Button
    },
    data() {
        return {
            charID: this.$route.params.char.toLowerCase() || null,
            thread: this.$route.params.thread,
            threadComments: null,
            originalBody: String,
            newComment: null,
            oocMessage: null,
            ogUser: null,
            showOOC: false
        }
    },
    firestore() {
        return {
            characters: db.collection('characters'),
            users: db.collection('users'),
            mail: db.collection('mail')
        }
    },
    computed: {
        ...mapGetters({
            user: 'user',
            activeChar: 'activeChar'
        })
    },
    methods: {
        getOriginal: function() {
            this.$firestore.characters.doc(this.charID).get().then(snapshot => {
                this.originalBody = snapshot.data().open
                this.ogUser = snapshot.data().user
            })
        },
        getThread: function() {
            this.$firestore.characters
            .doc(this.charID)
            .collection('open')
            .doc(this.thread).get().then(snapshot => {
                this.threadComments = snapshot.data().thread
            })
        },
        addToThread: function() {
            this.$firestore.characters.doc(this.charID).collection('open').doc(this.thread).update({
                thread: firebase.firestore.FieldValue.arrayUnion({
                    char: this.activeChar,
                    timestamp: Date.now(),
                    post: this.checkSanitized(this.newComment),
                    ooc: this.checkSanitized(this.oocMessage)
                })
            }).then(() => {
                // send notification
                if (this.ogUser !== this.user.data.displayName) {
                    this.$firestore.users.doc(this.ogUser).get().then(snapshot => {
                        const email = snapshot.data().email
                        this.sendEmail(
                            email,
                            `New comment from ${this.activeChar}`,
                            `${this.activeChar} has posted a new reply to a thread:
        https://open-rp.web.app/char/${this.charID}/open/${this.thread}`
                        )
                    }).catch(err => {
                        console.log('Error getting user' + err)
                    })
                }

                this.getThread()
                this.newComment = null
                this.showOOC = false
                this.oocMessage = null
            }).catch(err => {
                console.log(err.message)
            })
        },
        sendEmail: function(email, subject, message) {
            this.$firestore.mail.doc(email + Date.now()).set({
                to: email,
                message: {
                    subject: subject,
                    text: message
                }
            }).then(() => {
                console.log('notification triggered')
            }).catch(err => {
                console.log('notification error: ' + err)
            })
        }
    },
    created() {
        if (this.charID !== null) this.getOriginal()
        this.getThread()
    }
}
</script>