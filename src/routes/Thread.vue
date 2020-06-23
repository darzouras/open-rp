<template>
    <div class="thread-wrapper">
        <div v-if="charID !== null" v-html="originalBody" class="original-post">
        </div>

        <transition name="slide-fade">
            <section class="comments" v-if="threadComments">
                <TitleMed type="h2">Thread started by <router-link :to="'/char/' + threadComments[0].char">{{ threadComments[0].char }}</router-link></TitleMed>
                <ul>
                    <li v-for="comment in threadComments" :key="comment.timestamp">
                        <SingleComment :comment="comment" :playtester="charID" />
                    </li>
                </ul>
            </section>
        </transition>

        <form v-if="user.loggedIn" class="add-comment" v-on:submit.prevent="addToThread">
            <Input :label="'Respond to thread as ' + activeChar" note="basic HTML allowed" type="textarea" v-model="newComment" />

            <div class="add-comment-preview" v-if="newComment">
                <SmallTitle type="p">Preview:</SmallTitle>

                <div v-html="newComment"></div>
            </div>

            <Button v-bind:class="{ inactive : newComment === null || newComment === '' }">Add comment</Button>
        </form>

        <RouteButton :route="'/char/' + charID + '/open'" full="full">Back to post</RouteButton>
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

        .add-comment-preview {
            margin-bottom: 1.5rem;
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
import RouteButton from '@/components/RouteButton.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

export default {
    name: 'Thread',
    components: {
        SingleComment,
        TitleMed,
        SmallTitle,
        RouteButton,
        Input,
        Button
    },
    data() {
        return {
            charID: this.$route.params.char.toLowerCase() || null,
            thread: this.$route.params.thread,
            threadComments: null,
            originalBody: String,
            newComment: null
        }
    },
    firestore() {
        return {
            characters: db.collection('characters')
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
                    post: this.$sanitize(this.newComment)
                })
            }).then(() => {
                this.getThread()
                this.newComment = null
            }).catch(err => {
                console.log(err.message)
            })
        }
    },
    created() {
        if (this.charID !== null) this.getOriginal()
        this.getThread()
    }
}
</script>