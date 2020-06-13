<template>
    <div class="dashboard-wrapper">
        <Title type="h1" title="Your Dashboard" />

        <p v-if="user.loggedIn">{{user.data.displayName}} logged in!</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex' 
import Title from '@/components/Title.vue'

export default {
    name: 'Dashboard',
    components: {
        Title
    },
    computed: {
        ...mapGetters({
            user: 'user'
        })
    }
}
</script>