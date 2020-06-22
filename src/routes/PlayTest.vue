<template>
    <div class="playtest-wrapper">
        <Title type="h1">Playtesting: {{ charID}}</Title>

        <section>
            <div v-if="playtestBody !== ''" v-html="playtestBody" class="playtest-body"></div>

            <div v-if="activeChar === charID">
                <Button @click="bodyUpdate = true" v-if="bodyUpdate === false" full="full">Update playtest body</Button>

                <form v-if="bodyUpdate === true" v-on:submit.prevent="updateBody">
                    <Input label="Update your playtest post" note="Simple html allowed" type="textarea" v-model="playtestBody" />

                    <Button full="full">Update</Button>
                </form>
            </div>
        </section>

        <section>
            <TitleMed type="h2">Comments</TitleMed>

            <ul v-if="threadTops[0]" class="comment-list">
                <li v-for="thread in threadTops" :key="thread.post">
                    <SingleComment :comment="thread" :playtester="charID" top="top" />
                </li>
            </ul>

            <BigMessage v-else>No threads have been started yet.</BigMessage>

            <form class="add-comment" v-on:submit.prevent="addTopComment" v-if="activeChar && activeChar !== charID">
                <Input :label="'Start a new RP thread as ' + activeChar" type="textarea" note="basic HTML allowed" v-model="newThread"/>

                <Button>Add comment</Button>
            </form>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    .playtest-body {
        margin: 0 0 2rem;
    }
    .comment-list {
        list-style: none;
        margin: 0;
        padding: 0;
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

export default {
    name: 'Playtest',
    components: {
        Title,
        TitleMed,
        BigMessage,
        Input,
        Button,
        SingleComment
    },
    data() {
        return {
            charID: this.$route.params.char.toLowerCase(),
            newThread: null,
            threadTops: [],
            playtestBody: '',
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
            characters: db.collection('characters')
        }
    },
    methods: {
        updateBody: function() {
            this.$firestore.characters.doc(this.charID).update({
                'playtest': this.$sanitize(this.playtestBody)
            }).then(() => {
                this.bodyUpdate = false
            })
        },
        getPlaytestBody: function() {
            this.$firestore.characters.doc(this.charID).get().then(snapshot => {
                this.playtestBody = snapshot.data().playtest
            })
        },
        addTopComment: function() {
            this.$firestore.characters.doc(this.charID)
            .collection('playtest')
            .doc(this.activeChar + '?' + Date.now())
            .set({
                thread: [{
                    char: this.activeChar,
                    timestamp: Date.now(),
                    post: this.$sanitize(this.newThread)
                }]
            }).then(() => {
                // redirect to the new thread page
                this.threadTops = []
                this.getTopLevelThreads()
            }).catch(err => {
                console.log(err.message)
            })
        },
        getTopLevelThreads: function() {
            this.$firestore.characters.doc(this.charID).collection('playtest').get().then(snapshot => {
                // console.log(snapshot.docs[0].data())

                snapshot.docs.forEach(element => {
                    this.threadTops.push(element.data().thread[0])
                })
            })
        }
    },
    created() {
        this.getPlaytestBody()
        this.getTopLevelThreads()
    }
}
</script>