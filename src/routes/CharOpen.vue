<template>
    <div class="playtest-wrapper">
        <Title type="h1">Open RP with <router-link :to="'/char/' + charID">{{ charID }}</router-link></Title>

        <SmallMessage v-if="activeChar === charID">
            <p>Use this RP space for general RP! Get a feel for your character's voice here. If you want to use this space for particular kinds of RP or set rules you can update the post body and list them.</p>

            <Button @click="bodyUpdate = true" v-if="bodyUpdate === false" full="full">Update post body</Button>

            <form v-if="bodyUpdate === true" v-on:submit.prevent="updateBody">
                <Input label="Update your open RP post" note="Simple html allowed, you can check your changes below as you make them" type="textarea" v-model="openBody" />

                <Button full="full">Update</Button>
            </form>
        </SmallMessage>

        <section>
            <div v-if="openBody !== ''" v-html="openBody" class="playtest-body"></div>
        </section>

        <section>
            <TitleMed type="h2">Threads</TitleMed>

            <ul v-if="threadTops[0]" class="comment-list">
                <li v-for="thread in threadTops" :key="thread.post">
                    <SingleComment :comment="thread" :playtester="charID" top="top" />
                </li>
            </ul>

            <BigMessage v-else>No threads have been started yet.</BigMessage>

            <form class="add-comment" v-on:submit.prevent="addTopComment" v-if="activeChar && activeChar !== charID">
                <Input :label="'Start a new RP thread as ' + activeChar" type="textarea" note="basic HTML allowed" v-model="newThread"/>

                <div class="add-comment-preview" v-if="newThread">
                    <SmallTitle type="p">Preview:</SmallTitle>

                    <pre v-html="newThread"></pre>
                </div>
                <Button v-bind:class="{ inactive : newThread === null || newThread === '' }">Start new thread</Button>
            </form>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    .playtest-body {
        margin: 2rem 0;
    }
    .comment-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    .add-comment {
        margin-bottom: 2rem;

        .add-comment-preview {
            margin-bottom: 1.5rem;
        }
    }
</style>

<script>
import { mapGetters } from 'vuex'
import { db } from '../firebase'
// import firebase from '../firebase'
import Title from '@/components/Title.vue'
import BigMessage from '@/components/BigMessage.vue'
import TitleMed from '@/components/TitleMed.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import SingleComment from '@/components/SingleComment.vue'
import SmallMessage from '@/components/SmallMessage.vue'
import SmallTitle from '@/components/SmallTitle.vue'

export default {
    name: 'CharOpen',
    components: {
        Title,
        TitleMed,
        BigMessage,
        Input,
        Button,
        SingleComment,
        SmallMessage,
        SmallTitle
    },
    data() {
        return {
            charID: this.$route.params.char.toLowerCase(),
            newThread: null,
            threadTops: [],
            openBody: '',
            openUser: null,
            bodyUpdate: false
        }
    },
    computed: {
        ...mapGetters({
            activeChar: 'activeChar'
        })
    },
    firestore() {
        return {
            characters: db.collection('characters'),
            users: db.collection('users'),
            mail: db.collection('mail')
        }
    },
    methods: {
        updateBody: function() {
            this.$firestore.characters.doc(this.charID).update({
                'open': this.$sanitize(this.openBody)
            }).then(() => {
                this.bodyUpdate = false
            })
        },
        getOpenInfo: function() {
            this.$firestore.characters.doc(this.charID).get().then(snapshot => {
                this.openBody = snapshot.data().open
                this.openUser = snapshot.data().user
            })
        },
        addTopComment: function() {
            const timestamp = Date.now()
            this.$firestore.characters.doc(this.charID)
            .collection('open')
            .doc(this.activeChar + timestamp)
            .set({
                thread: [{
                    char: this.activeChar,
                    timestamp: timestamp,
                    post: this.$sanitize(this.newThread)
                }]
            }).then(() => {
                // send notification
                this.$firestore.users.doc(this.openUser).get().then(snapshot => {
                    const email = snapshot.data().email
                    this.sendEmail(
                        email,
                        `New comment from ${this.activeChar}`,
                        `${this.activeChar} has started a new thread:
https://open-rp.web.app/char/${this.charID}/open/${this.activeChar}${timestamp}`
                    )
                }).catch(err => {
                    console.log('Error getting user' + err)
                })
                
                // redirect to the new thread page
                this.threadTops = []
                this.newThread = null
                this.getTopLevelThreads()
            }).catch(err => {
                console.log(err.message)
            })
        },
        getTopLevelThreads: function() {
            this.$firestore.characters.doc(this.charID).collection('open').get().then(snapshot => {
                // console.log(snapshot.docs[0].data())
                snapshot.docs.forEach(element => {
                    var threadExtras = { 'path': element.id, 'length': element.data().thread.length }
                    var threadData = { ... threadExtras, ... element.data().thread[0]}
                    this.threadTops.push(threadData)
                })
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
        this.getOpenInfo()
        this.getTopLevelThreads()
    }
}
</script>