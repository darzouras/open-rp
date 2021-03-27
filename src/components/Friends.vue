<template>
    <section v-show="friends.length > 0 || friended.length > 0">
        <TitleMed type="h2" class="friends-title" >
            Friends 
            <button @click="friendsExpanded = !friendsExpanded" class="friends-button">
                <i :class="{'ri-arrow-right-s-line': !friendsExpanded, 'ri-arrow-down-s-line': friendsExpanded}"></i>
            </button>
        </TitleMed>

        <transition name="slide-fade">
            <div v-show="friendsExpanded" :aria-hidden="(!friendsExpanded).toString()">
                <div v-if="friends && friends.length > 0" class="friends-group">
                    <smallTitle type="h3">Friends</smallTitle>
                    <ul class="friends-list">
                        <li class="friends-list-item" v-for="(friend, index) in friends" :key="index">
                            <a :href="`/user/${friend}`">{{ friend }}</a><span v-if="index != friends.length - 1">,</span>
                        </li>
                    </ul>
                </div>

                <div v-if="friended && friended.length > 0" class="friends-group">
                    <smallTitle type="h3">Friended by</smallTitle>
                    <ul class="friends-list">
                        <li class="friends-list-item" v-for="(friend, index) in friended" :key="index">
                            <a :href="`/user/${friend}`">{{ friend }}</a><span v-if="index != friended.length - 1">,</span>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </section>
</template>

<style lang="scss" scoped>
.friends-title {
    position: relative;
    display: flex;
    align-items: flex-end;
    width: min-content;

    .friends-button {
        padding: 0;
        background: none;
        border: 0;
        cursor: pointer;

        i {
            font-size: 1.25rem;
            line-height: 1rem;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }
    }
}

.friends-group {
    margin-bottom: 1rem;
}

.friends-list {
    list-style: none;
    margin: 0;
    padding: 0;

    .friends-list-item {
        display: inline-block;
        margin: 0;
        padding: 0;
    }
}
</style>

<script>
import TitleMed from '@/components/TitleMed.vue'
import SmallTitle from '@/components/SmallTitle.vue'

export default {
    components: {
        TitleMed,
        SmallTitle,
    },
    props: {
        friends: Array,
        friended: Array,
    },
    data() {
        return {
            friendsExpanded: false,
        }
    },
}
</script>