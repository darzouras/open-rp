<template>
    <BoxShadow class="comment-wrapper" ref="threadTop">
        <SmallTitle type="h3" class="comment-title">
            <router-link :to="'/char/' + comment.char">{{ comment.char }}</router-link> posted at {{ getDateString(comment.timestamp) | formatDate }}
        </SmallTitle>

        <img :src="charIcon" alt="" class="comment-icon"/>
        
        <div v-html="comment.post" class="comment-body"></div>

        <p v-if="top === 'top'">
            <router-link :to="'/char/' + playtester + '/open/' + comment.char + comment.timestamp" >Go to thread ({{ comment.length }} comments)</router-link>
            <span class="delete-link" v-if="activeChar === playtester || activeChar === comment.char"><a href="#" v-on:click.prevent="deleteThread">Delete this thread</a></span>
        </p>
    </BoxShadow>
</template>

<style lang="scss" scoped>
    @import '../../public/scss/global.scss';

    .comment-wrapper {
        overflow: auto;

        .comment-title {
            margin: 0 0 1rem;
            display: inline-block;
            width: calc(100% - 110px);
        }

        .comment-icon {
            float: right;
            margin: 0 0 .5rem .5rem;
        }

        .delete-link {
            &::before {
                content: '//';
                margin: 0 .5rem;
                color: $darkblue;
            }
        }
    }
</style>

<script>
import { db } from '../firebase' 
import { mapGetters } from 'vuex'
import BoxShadow from '@/components/BoxShadow.vue'
import SmallTitle from '@/components/SmallTitle.vue'

export default {
    name: 'SingleComment',
    components: {
        BoxShadow,
        SmallTitle
    },
    data() {
        return {
            charIcon: ''
        }
    },
    computed: {
        ...mapGetters({
            activeChar: 'activeChar'
        })
    },
    props: {
        comment: Object,
        playtester: String,
        top: null,
        id: String
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
        getCharIcon: function(char) {
            this.$firestore.characters.doc(char).get().then(snapshot => {
                this.charIcon = snapshot.data().icon
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
        }
    },
    created() {
        this.getCharIcon(this.comment.char)
    }
}
</script>