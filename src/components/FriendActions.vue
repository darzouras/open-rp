<template>
    <div class="friend-status">
        <p v-if="checkFriends && checkFriended">
            You are mutual friends with this player. 
            <a href="#" @click="removeFriend" v-if="!success">Remove them as a friend</a>
            <span v-else v-html="success" class="success"></span>.
            <span v-if="error" class="error" v-html="error"></span>
        </p>
        <p v-else-if="checkFriends && !checkFriended">
            This player has you added as a friend. 
            <a href="#" @click="addFriend" v-if="!success">Add them back</a>
            <span v-else v-html="success" class="success"></span>.
            <span v-if="error" class="error" v-html="error"></span>
        </p>
        <p v-else-if="checkFriended && !checkFriends">
            You have added this player as a friend. 
            <a href="#" @click="removeFriend" v-if="!success">Remove them as a friend</a>
            <span v-else v-html="success" class="success"></span>.
            <span v-if="error" class="error" v-html="error"></span>
        </p>
        <p v-else>
            <a href="#" @click="addFriend" v-if="!success">Add this player as a friend</a>
            <span v-else v-html="success" class="success"></span>.
            <span v-if="error" class="error" v-html="error"></span>
        </p>
    </div>
</template>

<script>
import { db } from '../firebase'
import firebase from '../firebase'

export default {
    data() {
        return {
            success: null,
            error: null,
        }
    },
    props: {
        player: String,
        user: String,
        friends: Array,
        friended: Array,
    },
    computed: {
        checkFriends: function() {
            return this.friends.includes(this.user)
        },
        checkFriended: function() {
            return this.friended.includes(this.user)
        }
    },
    firestore() {
        return {
            users: db.collection('users')
        }
    },
    methods: {
        removeFriend() {
            // modify the user's friends array
            this.$firestore.users
                .doc(this.user)
                .update({
                    friends: firebase.firestore.FieldValue.arrayRemove(this.player)
                })
                .then(() => {
                    // then modify the player's friended array
                    this.$firestore.users.doc(this.player)
                        .update({
                            friended: firebase.firestore.FieldValue.arrayRemove(this.user)
                        })
                        .then(() => {
                            this.success = '<i class="ri-emotion-sad-line"></i> This player has been removed as a friend'
                        })
                        .catch(err => {
                            this.error = err.message
                        })
                })
                .catch(err => {
                    this.error = err.message
                })
        },
        addFriend() {
            // modify the user's friends array
            this.$firestore.users
                .doc(this.user)
                .update({
                    friends: firebase.firestore.FieldValue.arrayUnion(this.player)
                })
                .then(() => {
                    // then modify the player's friended array
                    this.$firestore.users.doc(this.player)
                        .update({
                            friended: firebase.firestore.FieldValue.arrayUnion(this.user)
                        })
                        .then(() => {
                            this.success = '<i class="ri-emotion-happy-line"></i> This player has been added as your friend'
                        })
                        .catch(err => {
                            this.error = err.message
                        })
                })
                .catch(err => {
                    this.error = err.message
                })
        }
    }
}
</script>