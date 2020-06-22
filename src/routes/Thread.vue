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

        <RouteButton :route="'/char/' + charID + '/playtest'" full="full">Back to post</RouteButton>
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
</style>

<script>
import { db } from '../firebase'

import SingleComment from '@/components/SingleComment.vue'
import TitleMed from '@/components/TitleMed.vue'
import RouteButton from '@/components/RouteButton.vue'

export default {
    name: 'Thread',
    components: {
        SingleComment,
        TitleMed,
        RouteButton
    },
    data() {
        return {
            charID: this.$route.params.char.toLowerCase() || null,
            thread: this.$route.params.thread,
            threadComments: null,
            originalBody: String
        }
    },
    firestore() {
        return {
            characters: db.collection('characters')
        }
    },
    methods: {
        getOriginal: function() {
            this.$firestore.characters.doc(this.charID).get().then(snapshot => {
                this.originalBody = snapshot.data().playtest
            })
        },
        getThread: function() {
            this.$firestore.characters
            .doc(this.charID)
            .collection('playtest')
            .doc(this.thread).get().then(snapshot => {
                this.threadComments = snapshot.data().thread
            })
        }
    },
    created() {
        if (this.charID !== null) this.getOriginal()
        this.getThread()
    }
}
</script>