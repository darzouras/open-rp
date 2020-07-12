<template>
    <BoxShadow v-if="comment" class="comment-wrapper" ref="threadTop" v-bind:class="{deleted : comment.post === null}">
        <span v-if="comment.post !== null">
            <SmallTitle type="h3" class="comment-title">
                {{ charName }} <router-link :to="'/char/' + comment.char">({{ comment.char }})</router-link>
                <br /><span>posted at {{ getDateString(comment.timestamp) | formatDate }}</span>
            </SmallTitle>

            <img v-if="charIcon" :src="charIcon" alt="" class="comment-icon"/>
            
            <pre v-html="comment.post" class="comment-body readable"></pre>

            <SmallMessage class="comment-ooc" v-if="comment.ooc !== '' && comment.ooc !== undefined && comment.ooc !== null"><strong>OOC:</strong> <pre v-html="comment.ooc"></pre></SmallMessage>
        </span>

        <span v-else class="comment-deleted">
            <p>This comment has been deleted.</p>
        </span>

        <p v-if="top === 'top'" class="comment-actions">
            <router-link :to="'/char/' + playtester + '/open/' + comment.char + comment.timestamp" >Go to thread ({{ comment.length }} comments)</router-link>
            <span class="delete-link" v-if="activeChar === playtester || activeChar === comment.char"><a href="#" v-on:click.prevent="deleteThread">Delete this thread</a></span>
        </p>
        <p v-else class="comment-actions">
            <span class="delete-comment" v-if="(activeChar === playtester || activeChar === comment.char) && comment.post !== null"><a href="#" v-on:click.prevent="deleteComment">Delete this comment</a></span>
        </p>

        
    </BoxShadow>
</template>

<style lang="scss" scoped>
    @import '../../public/scss/global.scss';

    .comment-wrapper {
        overflow: auto;

        &.deleted {
            opacity: .6;
        }

        .comment-title {
            margin: 0 0 1rem;
            display: inline-block;
            width: calc(100% - 110px);

            span {
                font-size: .8em;
            }
        }

        .comment-icon {
            float: right;
            margin: 0 0 .5rem .5rem;
        }

        .comment-ooc {
            clear: both;

            strong:first-child {
                display: block;
                margin-bottom: .25rem;
            }
        }

        .comment-actions {
            margin-bottom: 0;
            text-align: center;
            clear: both;

            .delete-link {
                &::before {
                    content: '//';
                    margin: 0 .5rem;
                    color: $darkblue;
                }

                a {
                    color: $red;
                }
            }

            .delete-comment {
                a {
                    color: $red;
                }
            }
        }
    }
</style>

<script>
import { db } from '../firebase'
// import firebase from '../firebase'
import { mapGetters } from 'vuex'
import BoxShadow from '@/components/BoxShadow.vue'
import SmallTitle from '@/components/SmallTitle.vue'
import SmallMessage from '@/components/SmallMessage.vue'

export default {
    name: 'SingleComment',
    components: {
        BoxShadow,
        SmallTitle,
        SmallMessage
    },
    data() {
        return {
            charIcon: '',
            charName: '',
            thread: this.$route.params.thread,
            mapMod: null
        }
    },
    computed: {
        ...mapGetters({
            activeChar: 'activeChar'
        })
    },
    props: {
        comment: null,
        playtester: null,
        top: null,
        id: null,
        index: null,
    },
    firestore() {
        return {
            characters: db.collection('characters')
        }
    },
    methods: {
        getDateString: function(timestamp) {
            var date = new Date(timestamp)
            return date.toISOString()
        },
        getCharInfo: function(char) {
            this.$firestore.characters.doc(char).get().then(snapshot => {
                this.charIcon = snapshot.data().icon,
                this.charName = snapshot.data().name
            })
        },
        deleteThread: function() {
            this.$firestore.characters.doc(this.playtester)
            .collection('open')
            .doc(this.comment.path)
            .delete().then(() => {
                this.$destroy
                this.$el.parentNode.removeChild(this.$el);
            }).catch(err => {
                console.log(err.message)
            })
        },
        deleteComment: function() {
            // Make a copy of the thread and modify it
            this.$firestore.characters.doc(this.playtester)
            .collection('open')
            .doc(this.thread)
            .get().then(snapshot => {
                this.mapMod = snapshot.data().thread

                this.mapMod[this.index].post = null
                // console.log(this.mapMod[this.index])

                this.$firestore.characters.doc(this.playtester)
                .collection('open')
                .doc(this.thread)
                .update(
                    {
                        thread: this.mapMod
                    }
                ).then(() => {
                    console.log('comment deleted?')
                    this.comment.post = null;
                }).catch(err => {
                    console.log(err)
                })
            })

            
        }
    },
    created() {
        this.getCharInfo(this.comment.char)
    }
}
</script>